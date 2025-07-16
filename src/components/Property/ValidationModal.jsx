import React, { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import {
  FaFileUpload,
  FaTrash,
  FaEye,
  FaEdit,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useS3Client } from "context/s3ClientContext";
import { useAuth } from "context/AuthContext";
import { usePropertyData } from "context/PropertyDataContext";
import {
  ListObjectsV2Command,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API, graphqlOperation } from "aws-amplify";
import {
  createDocument,
  createPropertyFeature,
  createVerification,
  updateProperty,
} from "graphql/mutations";
import PropertyChat from "components/Legal/PropertyChat";
import { getProperty } from "utilities/customQueries";

export default function ValidationModal({
  isOpen,
  onClose,
  onValidationComplete,
}) {
  const { s3Client, bucketName } = useS3Client();
  const { user } = useAuth();
  const { propertyData } = usePropertyData();
  const [selectedFiles, setSelectedFiles] = useState({});
  const [s3Files, setS3Files] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [propertyFeatureID, setPropertyFeatureID] = useState(null);
  const [verificationCreated, setVerificationCreated] = useState(false);
  const [pendingFiles, setPendingFiles] = useState({});
  const [property, setPropertyData] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState(null);
  const propertyID = propertyData.propertyInfo?.id;

  // ✅ Verifica si el predio ya tiene archivos subidos o es nuevo
  const isNewProperty =
    !propertyData?.projectFiles || propertyData.projectFiles.length === 0;

  // ✅ Verifica si tiene una campaña asociada
  const hasCampaign = propertyData?.propertyCampaign?.id !== null;

  // ✅ Ruta base específica del predio
  const basePath = `public/property/${propertyData.propertyInfo?.id}/other/`;

  useEffect(() => {
    if (isOpen) {
      listS3Files();
    }

  }, [isOpen, propertyData?.propertyInfo?.id]);

  useEffect(() => {
    if (isOpen && propertyID) {
      fetchPropertyData(propertyID);
    }
  }, [isOpen, propertyID]);

  // Función para obtener los datos de la propiedad desde la API
  const fetchPropertyData = async (propertyID) => {
    try {
      const response = await API.graphql(
        graphqlOperation(getProperty, { id: propertyID })
      );
      setPropertyDetails(response.data.getProperty);
    } catch (error) {
      console.error("❌ Error al obtener los datos de la propiedad:", error);
    }
  };

  // 📌 Verifica si la carga debe estar deshabilitada
  const isUploadDisabled = propertyDetails
    ? (propertyDetails.status === "DOC_UPLOADED" &&
        propertyDetails.userLegalID) ||
      ["SELECTABLE", "REJECTED"].includes(propertyDetails.status)
    : true; // Si no hay datos, deshabilitamos por defecto

  const listS3Files = async () => {
    setLoading(true);
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: basePath,
      });

      const response = await s3Client.send(command);
      const allFiles = response.Contents || [];

      const formattedFiles = allFiles.map((file) => ({
        key: file.Key,
        name: file.Key.split("/").pop(),
      }));

      setS3Files(formattedFiles);

      // 🔴 Asignar archivos ya subidos según el predio seleccionado
      const uploaded = {};
      formattedFiles.forEach((file) => {
        const fileType = file.name.split("_")[0];
        uploaded[fileType] = file.key;
      });

      setUploadedFiles(uploaded);
    } catch (error) {
      console.error("Error al listar archivos en S3:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async () => {
    setLoading(true);
    try {
      const uploadedDocuments = [];

      // ✅ Marcar archivos como en proceso de carga
      const progressState = {};
      Object.keys(selectedFiles).forEach((fileType) => {
        progressState[fileType] = "loading";
      });
      setUploadProgress(progressState);

      await Promise.all(
        Object.entries(selectedFiles).map(async ([fileType, file]) => {
          // ✅ Verificar si ya hay un archivo en S3 y eliminarlo
          if (uploadedFiles[fileType]) {
            console.log(
              `🗑️ Eliminando archivo existente antes de subir el nuevo: ${uploadedFiles[fileType]}`
            );
            await deleteS3File(uploadedFiles[fileType], fileType);
          }

          // ✅ Definir la nueva clave del archivo a subir
          const fileKey = `${basePath}${fileType}_${file.name}`;

          const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
            Body: file,
            ContentType: file.type,
          });

          await s3Client.send(command);
          uploadedDocuments.push({ key: fileKey, name: file.name });

          // ✅ Actualizar el estado de archivos subidos y limpiar `pendingFiles`
          setUploadedFiles((prev) => ({
            ...prev,
            [fileType]: fileKey, // Guardamos la nueva clave del archivo subido
          }));
          setPendingFiles((prev) => {
            const updated = { ...prev };
            delete updated[fileType]; // 🔹 Eliminar de `pendingFiles`
            return updated;
          });

          // ✅ Actualizar estado de carga a "success"
          setUploadProgress((prev) => ({ ...prev, [fileType]: "success" }));
        })
      );

      await listS3Files();
      setSelectedFiles({});

      await createPropertyFeatureEntry(uploadedDocuments);

      toast.success("Los archivos fueron actualizados con éxito");
      checkIfAllFilesUploaded(uploadedFiles);
    } catch (error) {
      console.error("❌ Error al subir archivos a S3:", error);
      toast.error("Error al subir los archivos. Inténtalo de nuevo.");

      // ❌ Marcar el archivo con error si falló la carga
      setUploadProgress((prev) => {
        const failedFiles = Object.keys(selectedFiles).reduce(
          (acc, fileType) => {
            acc[fileType] = "error";
            return acc;
          },
          {}
        );
        return { ...prev, ...failedFiles };
      });
    } finally {
      setLoading(false);
    }
  };

  const createPropertyFeatureEntry = async (documents) => {
    try {
      const propertyID = propertyData.propertyInfo?.id;
      if (!propertyID) throw new Error("❌ El propertyID es indefinido.");

      // ✅ Si ya tenemos el propertyFeatureID, solo asociamos los documentos
      if (propertyFeatureID) {
        console.log("📌 Usando PropertyFeature existente:", propertyFeatureID);
        await Promise.all(
          documents.map(async (doc) => {
            await createDocumentEntry(propertyFeatureID, doc);
          })
        );
        return;
      }

      // ✅ Si no existe, lo creamos y guardamos su ID
      const input = {
        propertyID,
        featureID: "GLOBAL_PROPERTY_FILES",
      };

      console.log("📌 Creando PropertyFeature con:", input);
      const propertyFeatureResponse = await API.graphql(
        graphqlOperation(createPropertyFeature, { input })
      );
      const newPropertyFeatureID =
        propertyFeatureResponse.data.createPropertyFeature.id;

      setPropertyFeatureID(newPropertyFeatureID);
      console.log("✅ PropertyFeature creado:", newPropertyFeatureID);

      // ✅ Asociar documentos con el nuevo PropertyFeature
      await Promise.all(
        documents.map(async (doc) => {
          await createDocumentEntry(newPropertyFeatureID, doc);
        })
      );

      // ✅ Crear `Verification` una sola vez
      await createVerificationEntry(newPropertyFeatureID);
    } catch (error) {
      console.error("❌ Error al crear PropertyFeature:", error);
    }
  };

  const createDocumentEntry = async (propertyFeatureID, document) => {
    try {
      const fileUrl = await getS3FileUrl(document.key); // 🔹 Obtener Signed URL
      if (!fileUrl)
        throw new Error("No se pudo generar la URL del archivo en S3.");

      // ✅ Extraer el fileType correctamente desde document.key
      const fileNameParts = document.key.split("/").pop().split("_");
      const fileType = fileNameParts[0]; // Extraer el prefijo (ejemplo: "certificado", "escrituras", "planos")

      // ✅ Mapear el fileType a los tipos de documento correctos
      let documentType = "";
      switch (fileType) {
        case "certificado":
          documentType = "CERTIFICADO_TRADICION";
          break;
        case "escrituras":
          documentType = "ESCRITURA_PUBLICA";
          break;
        case "planos":
          documentType = "PLANO_CATASTRAL";
          break;
        default:
          console.warn(`⚠️ Tipo de documento desconocido: ${fileType}`);
          documentType = "DESCONOCIDO"; // Opcional: manejar casos inesperados
      }

      // ✅ Crear la estructura del JSON para el atributo `data`
      const documentData = {
        name: document.name,
        type: documentType,
        url: fileUrl,
      };

      const input = {
        propertyFeatureID,
        userID: user.id,
        url: fileUrl, // ✅ Usar la Signed URL generada
        data: JSON.stringify(documentData), // 🔹 Guardar como JSON string
        timeStamp: Math.floor(Date.now() / 1000),
        docHash: null,
        signed: null,
        signedHash: null,
        isApproved: false,
        status: "PENDING",
        visible: true,
        isUploadedToBlockChain: false,
      };

      console.log("📌 Creando Documento con:", input);
      await API.graphql(graphqlOperation(createDocument, { input }));

      console.log("✅ Documento creado con éxito.");
    } catch (error) {
      console.error("❌ Error al crear Documento:", error);
    }
  };

  const createVerificationEntry = async (propertyFeatureID) => {
    try {
      if (verificationCreated) {
        console.log("📌 Verification ya creada. No se volverá a crear.");
        return;
      }

      const input = {
        userVerifiedID: user.id,
        propertyFeatureID,
      };

      console.log("📌 Creando Verification con:", input);
      await API.graphql(graphqlOperation(createVerification, { input }));

      setVerificationCreated(true);
      console.log("✅ Verification creada.");
    } catch (error) {
      console.error("❌ Error al crear Verification:", error);
    }
  };

  const deleteS3File = async (fileKey, fileType) => {
    try {
      console.log(`🗑️ Eliminando archivo de S3: ${fileKey}`);

      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      });

      await s3Client.send(command);

      // ✅ Actualizar el estado eliminando el archivo del registro
      setUploadedFiles((prev) => {
        const updated = { ...prev };
        delete updated[fileType];
        return updated;
      });

      console.log("✅ Archivo eliminado con éxito.");
    } catch (error) {
      console.error("❌ Error al eliminar archivo de S3:", error);
    }
  };

  const getSignedFileUrl = async (fileKey) => {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  };

  const getS3FileUrl = async (fileKey) => {
    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      });

      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600,
      });
      return signedUrl;
    } catch (error) {
      console.error("❌ Error al generar Signed URL:", error);
      return null;
    }
  };

  const handleFileSelection = (event, fileType) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setSelectedFiles((prev) => ({ ...prev, [fileType]: selectedFile }));
      setPendingFiles((prev) => ({ ...prev, [fileType]: true })); // ✅ Marcar como en precarga

      // 🔹 Simular que el archivo ya está "cargado" para cambiar de "Subir" a "Editar"
      setUploadedFiles((prev) => ({
        ...prev,
        [fileType]: `pending-${selectedFile.name}`, // Simulamos un archivo subido con un prefijo temporal
      }));

      // 🔹 LIMPIAR el input para permitir seleccionar otro archivo con el mismo nombre
      event.target.value = "";
    }
  };

  const updatePropertyStatus = async () => {
    try {
      const propertyID = propertyData.propertyInfo?.id;
      if (!propertyID) throw new Error("❌ El propertyID es indefinido.");

      if (propertyData.propertyInfo?.status === "DOC_UPLOADED") {
        console.log(
          "⚠️ El estado ya es 'DOC_UPLOADED'. No se actualizará nuevamente."
        );
        return;
      }

      const input = {
        id: propertyID,
        status: "DOC_UPLOADED",
      };

      console.log(
        "📌 Actualizando estado de la propiedad a DOC_UPLOADED con:",
        input
      );
      await API.graphql(graphqlOperation(updateProperty, { input }));

      console.log("✅ Estado de la propiedad actualizado.");
      onValidationComplete(); // ✅ Llamamos a onValidationComplete para avanzar al siguiente paso
    } catch (error) {
      console.error("❌ Error al actualizar estado de la propiedad:", error);
    }
  };

  const checkIfAllFilesUploaded = (files) => {
    const requiredFiles = ["certificado", "escrituras", "planos"];
    const allFilesUploaded = requiredFiles.every(
      (fileType) => fileType in files
    );

    if (allFilesUploaded) {
      console.log(
        "✅ Todos los archivos requeridos han sido subidos. Actualizando estado..."
      );
      updatePropertyStatus(); // ✅ Ahora SOLO se llama si el usuario subió archivos nuevos
    } else {
      console.log(
        "⚠️ Aún faltan archivos por subir. No se actualizará el estado."
      );
    }
  };


  return (
    <Modal size="lg" show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Requisitos para la Prefactibilidad</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 mb-4">
              Para completar este paso, debes subir los siguientes documentos:
            </p>

            {["certificado", "escrituras", "planos"].map((fileType) => (
              <div
                key={fileType}
                className="flex items-center justify-between border p-3 rounded-md shadow-sm mb-3"
              >
                <span className="text-gray-700 text-sm capitalize">
                  {fileType === "certificado"
                    ? "Certificado de Libertad(vigencia 30 dias)"
                    : fileType === "escrituras"
                    ? "Escrituras Públicas"
                    : "Planos Catastrales"}
                </span>

                <div className="flex items-center gap-2">
                  {/* 🔹 Botón "Ver" solo si el archivo ya está en S3 */}
                  {uploadedFiles[fileType] &&
                    !uploadedFiles[fileType].startsWith("pending-") && (
                      <button
                        onClick={async () =>{
                          console.log('uploadedFiles[fileType]', uploadedFiles[fileType])
                          window.open(
                            await getSignedFileUrl(uploadedFiles[fileType]),
                            "_blank"
                          )}
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-2"
                      >
                        <FaEye size={14} />
                        Ver
                      </button>
                    )}

                  {!isUploadDisabled ? (
                    (uploadedFiles[fileType] || pendingFiles[fileType]) && (
                      <>
                        <input
                          type="file"
                          className="hidden"
                          id={`file-upload-${fileType}`}
                          onChange={(e) => handleFileSelection(e, fileType)}
                        />
                        <label
                          htmlFor={`file-upload-${fileType}`}
                          className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 flex items-center gap-2"
                        >
                          <FaEdit size={14} />
                          Editar
                        </label>
                      </>
                    )
                  ) : (
                    <span className="text-gray-500 text-sm italic">
                      No editable
                    </span>
                  )}

                  {/* 🔹 Botón "Subir" solo si no hay un archivo seleccionado todavía */}
                  {!isUploadDisabled &&
                    !uploadedFiles[fileType] &&
                    !pendingFiles[fileType] && (
                      <>
                        <input
                          type="file"
                          className="hidden"
                          id={`file-upload-${fileType}`}
                          onChange={(e) => handleFileSelection(e, fileType)}
                        />
                        <label
                          htmlFor={`file-upload-${fileType}`}
                          className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-2"
                        >
                          <FaFileUpload size={14} />
                          Subir
                        </label>
                      </>
                    )}
                </div>
              </div>
            ))}
          </div>
          <div>
            <PropertyChat
              propertyId={propertyData.propertyInfo?.id}
              featureChat={"GLOBAL_PROPERTY_FILES"}
            />
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => uploadFiles()}
            disabled={loading || Object.keys(selectedFiles).length === 0}
          >
            {loading ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>

        {!hasCampaign && (
          <p className="text-red-500 text-sm mt-4 font-semibold">
            Cualquier solicitud en esta etapa debe realizarse a través de un
            PQRS, ya que aún no hay un consultor asignado.
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
}
