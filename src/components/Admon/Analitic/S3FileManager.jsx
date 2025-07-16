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
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { AddFolderIcon } from "components/common/icons/AddFolderIcon";
import { S3ClientProvider, useS3Client } from "context/s3ClientContext";
import ModalMoveToProject from "./ModalMoveToProject";
import { notify } from "utilities/notify";

const S3FileManager = ({ userId, products, selectedItem, type }) => {
  const { s3Client, bucketName } = useS3Client();
  const [currentPath, setCurrentPath] = useState(""); // Ruta actual en la navegación
  const [items, setItems] = useState([]); // Archivos y carpetas en el nivel actual
  const [totalProgress, setTotalProgress] = useState(0); // Progreso total
  const [showModalNewProperty, setShowModalNewProperty] = useState(false);
  const [selectedItemToMove, setSelectedItemToMove] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const activeUploads = new Map();

  const handleCloseNewProperty = () => setShowModalNewProperty(false);
  const handleShowNewProperty = () => setShowModalNewProperty(true);

  useEffect(() => {
    if (userId && selectedItem && s3Client) {
      setIsLoading(true);
      setError(null);
      listItems().catch(err => {
        setError(err.message);
        notify({ msg: 'Error al cargar los archivos', type: 'error' });
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [userId, currentPath, s3Client, selectedItem]);

  const getBasePath = () => {
    if (!selectedItem) return '';
    
    if (type === 'project') {
      return `public/projects/${selectedItem.id}`;
    } else if (type === 'property') {
      return `public/property/${selectedItem.id}`;
    }
    return '';
  };

  const listItems = async () => {
    if (!s3Client) {
      throw new Error('Cliente S3 no inicializado');
    }

    try {
      const basePath = getBasePath();
      const prefix = `${basePath}/${currentPath}`;
      
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
          const relativePath = item.Key.replace(`${basePath}/`, "");
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
      notify({ msg: 'Error al listar archivos', type: 'error' });
      throw error;
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
      notify({ msg: 'Debe ingresar un nombre para la carpeta', type: 'warning' });
      return;
    }

    try {
      const basePath = getBasePath();
      const folderPath = `${basePath}/${currentPath}${folderName}/`;
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: folderPath,
        Body: "", // Crea un objeto vacío
      });

      await s3Client.send(command);
      notify({ msg: `Carpeta '${folderName}' creada exitosamente`, type: 'success' });
      listItems();
    } catch (error) {
      console.error("Error al crear carpeta:", error);
      notify({ msg: 'No se pudo crear la carpeta', type: 'error' });
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

    setTotalProgress(1);

    for (const file of files) {
      try {
        const basePath = getBasePath();
        const relativePath = file.webkitRelativePath || file.name;
        const s3Key = `${basePath}/${currentPath}${relativePath}`;

        if (file.size > 5 * 1024 * 1024) {
          await uploadFileMultipart(s3Key, file, (fileProgress) => {
            totalLoaded += fileProgress;
            const totalProgress = (totalLoaded / totalSize) * 100;
            setTotalProgress(parseInt(totalProgress) === 0 ? 1 : totalProgress);
          });
        } else {
          await uploadSmallFile(s3Key, file);
          totalLoaded += file.size;
          const totalProgress = (totalLoaded / totalSize) * 100;
          setTotalProgress(totalProgress);
        }
      } catch (error) {
        console.error(`Error en ${file.name}:`, error);
        notify({ msg: `Error al subir ${file.name}`, type: 'error' });
      }
    }

    listItems();
    setTotalProgress(0);
    notify({ msg: 'Archivos subidos exitosamente', type: 'success' });
  };

  const uploadSmallFile = async (key, file) => {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: file,
        ContentType: file.type,
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
    let completedBytes = 0;
    let completedParts = [];

    for (let i = 0; i < parts; i++) {
      const start = i * partSize;
      const end = Math.min(start + partSize, file.size);
      const partNumber = i + 1;
      const partData = file.slice(start, end);

      while (activeUploads.get(key).paused) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      if (activeUploads.get(key).aborted) {
        await abortMultipartUpload(key, uploadId);
        activeUploads.delete(key);
        return;
      }

      const partResponse = await uploadPart(key, uploadId, partNumber, partData);
      completedParts.push(partResponse);
      completedBytes += end - start;
      onProgress(end - start);
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

  const deleteItem = async (item) => {
    const basePath = getBasePath();
    const key = `${basePath}/${currentPath}${item.name}`;

    try {
      if (item.isFolder) {
        const listCommand = new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: key,
        });

        const response = await s3Client.send(listCommand);

        let deletedCount = 0;
        const totalItems = response.Contents.length;

        if (response.Contents) {
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
      notify({ msg: 'Elemento eliminado exitosamente', type: 'success' });
    } catch (error) {
      console.error("Error al eliminar archivo o carpeta:", error);
      notify({ msg: 'Error al eliminar el elemento', type: 'error' });
    }
  };

  const moveItem = async (newPath) => {
    if (!selectedItemToMove) return;

    const basePath = getBasePath();
    const oldPrefix = `${basePath}/${currentPath}${selectedItemToMove.name}`;
    const newPrefix = `${newPath}${selectedItemToMove.name}`;

    let totalLoaded = 0;
    setTotalProgress(0);

    try {
      if (selectedItemToMove.isFolder) {
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

          const copyCommand = new CopyObjectCommand({
            Bucket: bucketName,
            CopySource: `${bucketName}/${oldKey}`,
            Key: newKey,
          });

          await s3Client.send(copyCommand);

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
        const copyCommand = new CopyObjectCommand({
          Bucket: bucketName,
          CopySource: `${bucketName}/${oldPrefix}`,
          Key: newPrefix,
        });

        await s3Client.send(copyCommand);

        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucketName,
          Key: oldPrefix,
        });

        await s3Client.send(deleteCommand);
      }

      setTotalProgress(0);
      notify({ msg: `Elemento '${selectedItemToMove.name}' movido exitosamente`, type: 'success' });
      listItems();
    } catch (error) {
      console.error("Error al mover archivo o carpeta:", error);
      notify({ msg: 'Error al mover el elemento', type: 'error' });
    }
  };

  const bytesToSize = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  };

  if (!userId || !selectedItem) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => {
            setIsLoading(true);
            setError(null);
            listItems().catch(err => {
              setError(err.message);
              notify({ msg: 'Error al cargar los archivos', type: 'error' });
            }).finally(() => {
              setIsLoading(false);
            });
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Gestor de Archivos
      </h1>

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

      <div className="flex justify-between items-center mb-2">
        {/* <p className="text-sm text-gray-600">
          Ruta {getBasePath()}
        </p> */}
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

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tamaño
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Última Modificación
            </th>
            <th className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentPath && (
            <tr className="border-t-[1px] hover:bg-gray-50" style={{ height: "3rem" }}>
              <td
                onClick={goBack}
                style={{ cursor: "pointer" }}
                className="text-blue-600 hover:text-blue-800"
              >
                <div className="flex items-end pl-2">
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
                    className="text-blue-600 hover:text-blue-800"
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
                      {/* <Dropdown.Item
                        eventKey="4"
                        onClick={() => {
                          setSelectedItemToMove(item);
                          handleShowNewProperty();
                        }}
                      >
                        Mover a
                      </Dropdown.Item> */}
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
