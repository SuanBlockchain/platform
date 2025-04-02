import React, { useState, useEffect, useRef } from "react";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
  CompleteMultipartUploadCommand,
  UploadPartCommand,
  CreateMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { FolderIcon } from "components/common/icons/FolderIcon";
import { convertAWSDatetimeToDate } from "components/Constructor/ProjectPage/utils";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { AddFolderIcon } from "components/common/icons/AddFolderIcon";
import { S3ClientProvider, useS3Client } from "context/s3ClientContext";
import ModalMoveToProject from "./ModalMoveToProject";

const S3FileManager = ({ userId, products }) => {
  const { s3Client, bucketName } = useS3Client();
  const [currentPath, setCurrentPath] = useState(""); // Ruta actual en la navegación
  const [items, setItems] = useState([]); // Archivos y carpetas en el nivel actual
  const [totalProgress, setTotalProgress] = useState(0); // Progreso total
  const [showModalNewProperty, setShowModalNewProperty] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const activeUploads = new Map();

  const handleCloseNewProperty = () => setShowModalNewProperty(false);
  const handleShowNewProperty = () => setShowModalNewProperty(true);

  useEffect(() => {
    if (userId) listItems(); // Carga inicial de archivos
  }, [userId, currentPath, s3Client]);

  const listItems = async () => {
    try {
      const prefix = `public/analyst/${userId}/${currentPath}`;
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: prefix,
      });

      const response = await s3Client.send(command);

      const allFiles = response.Contents || [];

      const folders = new Set();
      const files = [];

      if (allFiles) {
        allFiles.forEach((item) => {
          const relativePath = item.Key.replace(
            `public/analyst/${userId}/`,
            ""
          );
          const parts = relativePath.replace(currentPath, "").split("/");

          if (parts.length > 1) {
            folders.add(parts[0]);
          } else {
            files.push({
              name: parts[0],
              size: item.Size,
              lastModified: item.LastModified,
              Key: item.Key,
            });
          }
        });
      }

      setItems([
        ...Array.from(folders).map((folder) => ({
          name: folder,
          isFolder: true,
        })),
        ...files,
      ]);
    } catch (error) {
      console.error("Error al listar archivos y carpetas:", error);
    }
  };

  const navigateToFolder = (folderName) => {
    setCurrentPath((prev) => `${prev}${folderName}/`);
  };

  const goBack = () => {
    setCurrentPath((prev) => {
      const parts = prev.split("/").filter((part) => part);
      parts.pop();
      return parts.length ? parts.join("/") + "/" : "";
    });
  };

  const handleCreateFolder = async () => {
    const folderName = prompt("Ingresa el nombre de la nueva carpeta:");

    if (!folderName) {
      alert("Debe ingresar un nombre para la carpeta.");
      return;
    }

    try {
      const folderPath = `public/analyst/${userId}/${currentPath}${folderName}/`;
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: folderPath,
        Body: "", // Crea un objeto vacío
      });

      await s3Client.send(command);

      alert(`Carpeta '${folderName}' creada exitosamente.`);
      listItems();
    } catch (error) {
      console.error("Error al crear carpeta:", error);
      alert("No se pudo crear la carpeta. Intenta nuevamente.");
    }
  };

  const handleFileUpload = async (event) => {
    const input = event.target;
    const filesToUpload = Array.from(input.files);

    if (filesToUpload.length > 0) {
      setTotalProgress(0);
      await uploadFiles(filesToUpload);
      input.value = "";
    }
  };

  const uploadFiles = async (files) => {
    let totalLoaded = 0;
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);

    setTotalProgress(1); // Inicializa el progreso total

    for (const file of files) {
      try {
        const relativePath = file.webkitRelativePath || file.name;
        const s3Key = `public/analyst/${userId}/${currentPath}${relativePath}`;

        if (file.size > 5 * 1024 * 1024) {
          // Subir archivo grande con multipart upload
          await uploadFileMultipart(s3Key, file, (fileProgress) => {
            // Calcula el progreso acumulado basado en los bytes cargados
            totalLoaded += fileProgress; // Incrementa el total con los bytes reportados
            const totalProgress = (totalLoaded / totalSize) * 100; // Calcula progreso general
            setTotalProgress(parseInt(totalProgress) === 0 ? 1 : totalProgress);
          });
        } else {
          // Subir archivo pequeño
          await uploadSmallFile(s3Key, file);
          totalLoaded += file.size;
          const totalProgress = (totalLoaded / totalSize) * 100;
          setTotalProgress(totalProgress);
        }
      } catch (error) {
        console.error(`Error en ${file.name}:`, error);
      }
    }

    listItems();
    setTotalProgress(0); // Restablece el progreso total al finalizar
  };

  const uploadSmallFile = async (key, file) => {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName, // Nombre del bucket S3
        Key: key, // Ruta clave del archivo en el bucket
        Body: file, // Contenido del archivo
        ContentType: file.type, // Tipo de contenido (MIME)
      });

      await s3Client.send(command);
    } catch (error) {
      console.error(`Error al subir el archivo pequeño (${key}):`, error);
      throw error;
    }
  };

  const uploadFileMultipart = async (key, file, onProgress) => {
    const uploadId = await createMultipartUpload(key);
    activeUploads.set(key, { uploadId, paused: false, aborted: false });

    const partSize = 5 * 1024 * 1024; // 5MB
    const parts = Math.ceil(file.size / partSize);
    let completedBytes = 0; // Bytes cargados acumulados hasta ahora
    let completedParts = [];

    for (let i = 0; i < parts; i++) {
      const start = i * partSize;
      const end = Math.min(start + partSize, file.size);
      const partNumber = i + 1;
      const partData = file.slice(start, end);

      // Control de pausa
      while (activeUploads.get(key).paused) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Espera activa
      }

      // Control de cancelación
      if (activeUploads.get(key).aborted) {
        await abortMultipartUpload(key, uploadId);
        activeUploads.delete(key);
        return;
      }

      const partResponse = await uploadPart(
        key,
        uploadId,
        partNumber,
        partData
      );
      completedParts.push(partResponse);
      completedBytes += end - start; // Incrementa bytes cargados acumulados
      onProgress(end - start); // Notifica los bytes cargados en esta parte
    }

    if (!activeUploads.get(key).aborted) {
      await completeMultipartUpload(key, uploadId, completedParts);
      activeUploads.delete(key);
    }
  };

  const createMultipartUpload = async (key) => {
    const command = new CreateMultipartUploadCommand({
      Bucket: bucketName,
      Key: key,
    });
    const response = await s3Client.send(command);
    return response.UploadId;
  };

  const uploadPart = async (key, uploadId, partNumber, body) => {
    const command = new UploadPartCommand({
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
      Body: body,
    });
    const response = await s3Client.send(command);
    return { PartNumber: partNumber, ETag: response.ETag };
  };

  const completeMultipartUpload = async (key, uploadId, completedParts) => {
    const command = new CompleteMultipartUploadCommand({
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: completedParts },
    });
    await s3Client.send(command);
  };

  const abortMultipartUpload = async (key, uploadId) => {
    const command = new AbortMultipartUploadCommand({
      Bucket: bucketName,
      Key: key,
      UploadId: uploadId,
    });
    await s3Client.send(command);
    activeUploads.delete(key);
  };

  // Función para pausar una carga
  const pauseUpload = (key) => {
    if (activeUploads.has(key)) {
      activeUploads.get(key).paused = true;
    }
  };

  // Función para reanudar una carga
  const resumeUpload = (key) => {
    if (activeUploads.has(key)) {
      activeUploads.get(key).paused = false;
    }
  };

  // Función para cancelar una carga
  const cancelUpload = async (key) => {
    if (activeUploads.has(key)) {
      activeUploads.get(key).aborted = true;
      const { uploadId } = activeUploads.get(key);
      await abortMultipartUpload(key, uploadId);
      activeUploads.delete(key);
    }
  };

  /* const uploadFiles = async (filesToUpload) => {
    let totalLoaded = 0;

    for (const file of filesToUpload) {
      try {
        const s3Key = `public/analyst/${userId}/${currentPath}${file.name}`;
        const fileSize = file.size;
        const partSize = 5 * 1024 * 1024; // 5MB
        const totalParts = Math.ceil(fileSize / partSize);
        const uploadId = await initiateMultipartUpload(s3Key);

        const uploadedParts = [];
        for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
          const start = (partNumber - 1) * partSize;
          const end = Math.min(start + partSize, fileSize);
          const partData = file.slice(start, end);

          const part = await uploadPart(s3Key, uploadId, partData, partNumber);
          uploadedParts.push(part);

          // Actualizar progreso por parte
          totalLoaded += partData.size;
          const progressPercent = Math.round((totalLoaded / fileSize) * 100);
          setTotalProgress(progressPercent);
        }

        await completeMultipartUpload(s3Key, uploadId, uploadedParts);

        console.log(`Archivo ${file.name} subido exitosamente.`);
      } catch (error) {
        console.error("Error al subir archivo:", error);
      }
    }

    setTotalProgress(0);
    listItems();
  }; */

  const moveItem = async (newPath) => {
    const isFolder = selectedItem.isFolder;
    const oldPrefix = `public/analyst/${userId}/${currentPath}${selectedItem.name}`;
    const newPrefix = `${newPath}${selectedItem.name}`;

    let totalLoaded = 0;
    setTotalProgress(0);

    try {
      if (isFolder) {
        // Listar todos los objetos dentro de la carpeta
        const listCommand = new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: oldPrefix,
        });

        const listResponse = await s3Client.send(listCommand);
        const itemsToMove = listResponse.Contents || [];

        let totalFiles = itemsToMove.length;

        for (const obj of itemsToMove) {
          const oldKey = obj.Key;
          const newKey = obj.Key.replace(oldPrefix, newPrefix);

          // Copiar cada archivo dentro de la carpeta
          const copyCommand = new CopyObjectCommand({
            Bucket: bucketName,
            CopySource: `${bucketName}/${oldKey}`,
            Key: newKey,
          });

          await s3Client.send(copyCommand);

          // Borrar el archivo original
          const deleteCommand = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: oldKey,
          });

          await s3Client.send(deleteCommand);

          totalLoaded++;
          const newTotalProgress = Math.round((totalLoaded / totalFiles) * 100);
          setTotalProgress(newTotalProgress);
        }
      } else {
        // Si es un archivo, solo copiar y borrar
        const oldKey = oldPrefix;
        const newKey = newPrefix;

        // Copiar el archivo
        const copyCommand = new CopyObjectCommand({
          Bucket: bucketName,
          CopySource: `${bucketName}/${oldKey}`,
          Key: newKey,
        });

        await s3Client.send(copyCommand);

        // Borrar el archivo original
        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: oldKey,
        });

        await s3Client.send(deleteCommand);
      }

      setTotalProgress(0);
      alert(
        `Elemento '${selectedItem.name}' movido exitosamente a '${newPath}'.`
      );
      listItems(); // Actualiza la lista después de mover
    } catch (error) {
      console.error("Error al mover archivo o carpeta:", error);
      alert("No se pudo mover el archivo o carpeta. Intenta nuevamente.");
    }
  };

  const deleteItem = async (item) => {
    const key = `public/analyst/${userId}/${currentPath}${item.name}`;
    setTotalProgress(0); // Inicia el progreso en 0%

    try {
      if (item.isFolder) {
        // Listar todos los objetos en la carpeta
        const listCommand = new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: key,
        });

        const response = await s3Client.send(listCommand);

        let deletedCount = 0;
        const totalItems = response.Contents.length;

        if (response.Contents) {
          // Eliminar cada objeto dentro de la carpeta
          for (const obj of response.Contents) {
            const deleteCommand = new DeleteObjectCommand({
              Bucket: bucketName,
              Key: obj.Key,
            });
            await s3Client.send(deleteCommand);
            deletedCount++;
            const progress = Math.round((deletedCount / totalItems) * 100);
            setTotalProgress(progress);
          }
        }
      } else {
        const command = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: key,
        });
        await s3Client.send(command);
      }

      setTotalProgress(0);
      listItems();
    } catch (error) {
      console.error("Error al eliminar archivo o carpeta:", error);
    }
  };

  const bytesToSize = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Gestor de Archivos S3
      </h1>

      {/* Barra de progreso */}
      {totalProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-300 h-2">
            <div
              className="bg-blue-600 h-2"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-center text-gray-600">
            {parseInt(totalProgress)}% Completado
          </p>
        </div>
      )}

      {/* Opciones de gestión de carga */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-gray-600">
          Ruta actual: {currentPath || "/"}
        </p>
        <div className="flex gap-2">
          <button
            className="p-2 text-white bg-blue-600 rounded-md"
            onClick={handleCreateFolder}
          >
            <AddFolderIcon />
          </button>
          <label className="p-2 text-white bg-blue-600 rounded-md" style={{backgroundColor:"#74742c"}}>
            Subir Carpeta
            <input
              type="file"
              multiple
              webkitdirectory="true"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <label className="p-2 text-white bg-blue-600 rounded-md" style={{backgroundColor:"#74742c"}}  >
            Subir Archivos
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th style={{ width: "600px" }}>Nombre</th>
            <th className="text-center" style={{ width: "150px" }}>
              Tamaño
            </th>
            <th className="text-center" style={{ width: "300px" }}>
              Ultima modificación
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {currentPath.length > 1 && (
            <tr className="border-t-[1px] w-full" style={{ height: "3rem" }}>
              <td onClick={() => goBack()}>
                <div className="flex items-end">
                  <FolderIcon />
                  <span className="text-lg w-fit pl-2">...</span>
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
          {items
            .filter((obj) => obj.name !== "")
            .map((item, index) => {
              const fileUrl = `https://${bucketName}.s3.amazonaws.com/${item.Key}`;
              return (
                <tr
                  key={index}
                  className="border-t-[1px]"
                  style={{ height: "3rem" }}
                >
                  <td
                    onClick={() =>
                      item.isFolder ? navigateToFolder(item.name) : null
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex items-end">
                      {item.isFolder ? <FolderIcon /> : <></>}
                      <span className="text-lg w-fit pl-2">{item.name}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    {item.size ? bytesToSize(item.size) : ""}
                  </td>
                  <td className="text-center">
                    {item.lastModified
                      ? new Date(item.lastModified).toLocaleString()
                      : ""}
                  </td>
                  <td className="text-end">
                    <DropdownButton
                      align="end"
                      title="Acciones"
                      drop="end"
                      size="sm"
                    >
                      {!item.isFolder && (
                        <>
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm font-semibold hover:underline hover:text-blue-800 truncate p-3"
                          >
                            Descargar
                          </a>

                          <Dropdown.Divider />
                        </>
                      )}
                      <Dropdown.Item
                        eventKey="4"
                        onClick={() => {
                          setSelectedItem(item);
                          handleShowNewProperty();
                        }}
                      >
                        Mover a
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="4"
                        onClick={() => deleteItem(item)}
                      >
                        Eliminar
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <ModalMoveToProject
        showModal={showModalNewProperty}
        handleClose={handleCloseNewProperty}
        products={products}
        moveItem={moveItem}
      />
    </div>
  );
};

export default S3FileManager;
