import Card from "components/common/Card";
import { usePropertyData } from "context/PropertyDataContext";
import React, { useEffect, useState } from "react";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { useS3Client } from "context/s3ClientContext";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Swal from "sweetalert2";
import { useAuth } from "context/AuthContext";

export default function AdditionalFiles(props) {
  const { basePath, className, setHasUnsavedChanges, handleFieldChange } = props;
  const { propertyData } = usePropertyData();
  const { s3Client, bucketName } = useS3Client();
  const { user } = useAuth();
  const [files, setFiles] = useState([]); // Archivos locales seleccionados
  const [s3Files, setS3Files] = useState([]); // Archivos listados de S3
  const [loading, setLoading] = useState(false);
  const [changedFields, setChangedFields] = useState({});

  const postulantId = propertyData?.projectPostulant?.id; // ID del postulante
  const campaignOwnerId = propertyData?.propertyCampaign?.userId; // ID del dueño de la campaña
  const canUpload = user?.id === postulantId || user?.id === campaignOwnerId;


  useEffect(() => {
    listS3Files();
  }, [basePath, s3Client]);

  const listS3Files = async () => {
    setLoading(true);
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: basePath,
      });
      const response = await s3Client.send(command);
      const allFiles = response.Contents || [];
  
      const filesWithUploader = allFiles.map((file) => {
        if (!file.Key) return null; // Evita errores si Key es undefined
        
        const fileName = file.Key.split("/").pop(); // Obtiene solo el nombre del archivo
        const parts = fileName.split("_"); // Dividir por "_" para extraer el ID del usuario
        const uploaderId = parts.length > 1 ? parts[0] : "Desconocido";
        const cleanFileName = parts.slice(1).join("_"); // Extraer solo el nombre real del archivo
  
        // Determinar si es postulante o dueño
        let uploaderLabel = "";
        if (uploaderId === postulantId) uploaderLabel = "(Postulante)";
        if (uploaderId === campaignOwnerId) uploaderLabel = "(Dueño)";
  
        return { key: file.Key, name: cleanFileName, uploader: uploaderLabel, uploaderId};
      }).filter(Boolean); // Filtrar valores nulos
  
      setS3Files(filesWithUploader);
    } catch (error) {
      console.error("Error al listar archivos en S3:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const uploadFiles = async () => {
    if (!canUpload) {
      Swal.fire("Acceso Denegado", "No tienes permisos para subir archivos.", "error");
      return;
    }
    setLoading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const fileKey = `${user.id}_${file.name}`; 
        const command = new PutObjectCommand({
          Bucket: bucketName,
          Key: `${basePath}${fileKey}`,
          Body: file,
          ContentType: file.type,
          ContentDisposition: "inline"
        });
        await s3Client.send(command);
      });
      await Promise.all(uploadPromises);
      setFiles([]); // Limpiar archivos locales después de subir
      await listS3Files(); // Actualizar lista de archivos en S3
      setHasUnsavedChanges(false);
      setChangedFields({});
      Object.keys(changedFields).forEach((key) => handleFieldChange(key, false));
      handleFieldChange("filesUploaded", false);
    } catch (error) {
      console.error("Error al subir archivos a S3:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteS3File = async (fileKey) => {
    if (!canUpload) {
      Swal.fire("Acceso Denegado", "No tienes permisos para eliminar archivos.", "error");
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el archivo de S3.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const command = new DeleteObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
          });
          await s3Client.send(command);
          await listS3Files(); // Actualizar lista de archivos en S3
          setHasUnsavedChanges(false);
          handleFieldChange("filesDeleted", false);
        } catch (error) {
          console.error("Error al eliminar archivo de S3:", error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const getSignedFileUrl = async (fileKey) => {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
  
    return await getSignedUrl (s3Client, command, { expiresIn: 3600 }); // Expira en 1 hora
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
    setHasUnsavedChanges(true);
  };

  const handleFileSelection = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    setHasUnsavedChanges(true);
    handleFieldChange("filesSelected", true);
    event.target.value = ""; // Solución: Reinicia el input después de seleccionar archivos
  };

  const removeFile = (index) => {
    if (!canUpload) {
      Swal.fire("Acceso Denegado", "No tienes permisos para subir archivos.", "error");
      return;
    }
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setHasUnsavedChanges(false);
  };

  return (
    <Card className={className}>
      <Card.Header title="Subir documentación adicional" sep={true} />
      <Card.Body>
        <div className="max-w-xl mx-auto bg-white">
        {canUpload && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
              ${files.length > 0 ? "border-red-500 bg-red-100" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}
            `}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="text-gray-700 text-lg font-medium mb-2">
              Arrastra y suelta tus archivos aquí
            </p>
            <p className="text-sm text-gray-500 mb-4">
              o haz clic para seleccionarlos
            </p>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileSelection}
            />
             {canUpload && (
            <label
              htmlFor="file-upload"
              className="mt-3 inline-block px-6 py-3 bg-[#74742c] text-white rounded-md text-sm font-semibold hover:bg-[#5f5f23] shadow cursor-pointer transition-all duration-200"
            >
              Seleccionar archivos
            </label>
            )}
          </div>
           )}

{canUpload && files.length > 0 && (
            <>
              <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-4">
                Archivos seleccionados:
              </h3>
              <ul className="space-y-3 m-0 p-0">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 shadow-md rounded-lg px-4 py-3 hover:bg-gray-200 transition-all duration-200"
                  >
                    <span className="text-sm text-gray-800 truncate">
                      {file.name}
                    </span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-600 text-sm font-semibold hover:underline"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
             
                <button
                  onClick={uploadFiles}
                  className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md text-sm font-semibold hover:bg-green-600 shadow-lg transition-all duration-200"
                >
                  Subir archivo seleccionado
                </button>
                  
              </div>
            </>
              )}

{s3Files.length > 0 && (
  <>
    <h3 className="text-lg font-semibold text-gray-700 mt-10 mb-4">
      Archivos 
    </h3>
    <ul className="space-y-3 m-0 p-0">
      {s3Files.map((file, index) => {
        const fileName = file.name
        const fileUrl = `https://${bucketName}.s3.amazonaws.com/${file.Key}`;
        
        return (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-100 shadow-md rounded-lg px-4 py-3 hover:bg-gray-200 transition-all duration-200"
          >
           <span className="text-gray-800 text-sm truncate">
              {fileName} 
              <strong className="text-blue-600 ml-2">{file.uploader}</strong>
            </span>
            
            <div className="flex gap-3">
  {/* Botón para Ver archivo 👁 */}
  <button 
    onClick={async () => window.open(await getSignedFileUrl(file.key), "_blank")} 
    className="text-blue-500 hover:text-blue-700 transition !bg-transparent !border-none !shadow-none !p-0 !m-0"
    title="Ver archivo"
  >
    👁
  </button>

  {/* Botón para Descargar archivo ⬇ */}
  <a 
    href={file.key} 
    download={file.name} 
    className="text-green-500 hover:text-green-700 transition !bg-transparent !border-none !shadow-none !p-0 !m-0"
    title="Descargar archivo"
  >
    ⬇
  </a>

  {/* Botón para Eliminar archivo 🗑 */}
  {user?.id === file.uploaderId && (
    <button
      onClick={() => deleteS3File(file.key)}
      className="text-red-600 hover:text-red-800 transition !bg-transparent !border-none !shadow-none !p-0 !m-0"
      title="Eliminar archivo"
    >
      🗑
    </button>
  )}
</div>

          </li>
        );
      })}
    </ul>
  </>
)}
          {loading && (
            <p className="text-center text-gray-500 mt-6 text-sm">
              Procesando...
            </p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
