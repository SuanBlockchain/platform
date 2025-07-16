import React, { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { getProjectProgress } from "services/getProjectProgress";
import { CheckIcon } from "components/common/icons/CheckIcon";
import { HourGlassIcon } from "components/common/icons/HourGlassIcon";
import { usePropertyData } from "context/PropertyDataContext";
import Swal from "sweetalert2";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import ActualUseAndPotential from "components/Constructor/Property/ActualUseAndPotential";
import UseRestrictions from "./UseRestrictions";
import Ecosystem from "./Ecosystem";
import GeneralAspects from "./GeneralAspects";
import Relations from "./Relations";
import CadastralRecords from "./CadastralRecords";
import AdditionalFiles from "./AdditionalFiles";
import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";
import { createNotification, updateProperty } from "graphql/mutations";
import { listPropertyFeatures } from "graphql/queries";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { useS3Client } from "context/s3ClientContext";

// --- Mapeo de tipos de documento ---
const documentTypeMapper = {
  CERTIFICADO_TRADICION: "Certificado de Tradición",
  ESCRITURA_PUBLICA: "Escritura Pública",
  PLANO_CATASTRAL: "Plano Catastral",
};

export default function PropertyDetails({
  visible,
  setHasUnsavedChanges,
  handleFieldChange,
  setIsFormComplete,
  currentStep,
}) {
  const { s3Client, bucketName } = useS3Client();
  const { propertyData } = usePropertyData();
  const [autorizedUser, setAutorizedUser] = useState(false);
  const [isPostulant, setIsPostulant] = useState(false);
  const [isVerifier, setIsVerifier] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [totalArea, setTotalArea] = useState(0);
  const [latLngCentroid, setLatLngCentroid] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [status, setStatus] = useState("");
  const [formCompletion, setFormCompletion] = useState({
    cadastralRecords: false,
    actualUseAndPotential: false,
    useRestrictions: false,
    ecosystem: false,
    generalAspects: false,
    relations: false,
  });
  const [propertyFiles, setPropertyFiles] = useState([]);

  useEffect(() => {
    console.log(
      "📌 Valor actual de currentStep en PropertyDetails:",
      currentStep
    );
  }, [currentStep]); // ✅ Se ejecuta cuando cambia currentStep

  useEffect(() => {
    if (user && propertyData) {
      const postulant = propertyData?.projectPostulant?.id;
      const authorizedUsers = [...propertyData.projectVerifiers, postulant];

      console.log("propertyData", propertyData);
      console.log(
        "propertyData.projectVerifiers",
        propertyData.projectVerifiers
      );
      console.log("user.id", user.id);

      setAutorizedUser(
        (authorizedUsers.includes(user.id) &&
          (propertyData.propertyInfo.status === null ||
            propertyData.propertyInfo.status === "PENDING")) ||
          user.role === "admon" ||
          user.role === "analyst" ||
          propertyData.projectVerifiers.includes(user.id)
      );

      setIsPostulant(postulant === user.id);

      setIsVerifier(propertyData.projectVerifiers.includes(user.id));
    }
  }, [user, propertyData]);

  useEffect(() => {
    if (user && propertyData) {
      setStatus(propertyData?.propertyInfo?.status || "PENDING"); // Inicializar estado
    }
  }, [user, propertyData, setHasUnsavedChanges]);

  const handleValidateProperty = async (status) => {
    if (!propertyData?.propertyInfo?.id) {
      console.error("❌ Error: El predio no tiene un ID válido.");
      toast.error("Error en la información del predio.");
      return;
    }

    setIsLoading(true);
    try {
      // 🔹 Actualizar estado del predio en la API
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: propertyData.propertyInfo.id,
            status,
          },
        })
      );

      // 🔹 Obtener el ID del dueño del predio
      const propertyOwnerID = propertyData.projectPostulant?.id || null;

      if (!propertyOwnerID) {
        console.warn("⚠️ No se encontró un dueño del predio en propertyData.");
      }

      // 🔹 Crear mensaje de notificación según estado
      const notificationMessage =
        status === "APPROVED"
          ? `✅ Tu predio '${propertyData.propertyInfo.name}' ha sido aprobado. 🎉`
          : `❌ Tu predio '${propertyData.propertyInfo.name}' ha sido rechazado.`;

      const notificationData = {
        userOriginID: user.id, // Usuario que realiza la validación
        userID: propertyOwnerID, // Dueño del predio
        message: notificationMessage,
        type: "PROPERTY",
        resourceID: propertyData.propertyInfo.id, // ID del predio
        isRead: false,
      };

      console.log("📩 Enviando notificación:", notificationData);

      // 🔹 Enviar la notificación si hay un propietario identificado
      if (propertyOwnerID) {
        await API.graphql(
          graphqlOperation(createNotification, { input: notificationData })
        );
      } else {
        console.warn(
          "⚠️ No se envió la notificación porque no hay dueño asignado al predio."
        );
      }

      toast.success(
        `Predio ${
          status === "APPROVED" ? "aprobado" : "rechazado"
        } exitosamente`
      );

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error(
        "❌ Error al actualizar el estado del predio o enviar la notificación:",
        error
      );
      toast.error("Error en la validación del predio.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormCompletion = (formName, isComplete) => {
    console.log(`📩 Recibido desde hijo: ${formName} →`, isComplete);

    setFormCompletion((prev) => {
      const newCompletion = { ...prev, [formName]: Boolean(isComplete) };
      const anyComplete = Object.values(newCompletion).some(
        (value) => value === true
      );
      setIsFormComplete(anyComplete);

      return newCompletion;
    });
  };

  const checkAllStepsCompleted = async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(listPropertyFeatures, {
          filter: {
            propertyID: { eq: propertyData?.propertyInfo?.id },
            featureID: { eq: "GLOBAL_PROPERTY_STATUS" },
          },
        })
      );

      const items = response?.data?.listPropertyFeatures?.items || [];
      if (items.length === 0) return false;

      const value = JSON.parse(items[0].value);

      const booleanFieldsValid =
        value.analisis === true &&
        value.monitoreos === true &&
        value.revision_memorando === true &&
        value.validacion_inicial === true;

      const memorandoValid =
        value.memorando &&
        !!value.memorando.uploadDate &&
        !!value.memorando.url;

      return booleanFieldsValid && memorandoValid;
    } catch (error) {
      console.error("❌ Error verificando pasos del propertyFeature:", error);
      return false;
    }
  };

  // Función para mostrar el modal con las opciones de validación
  const handleVerifyClick = async () => {
    const allStepsReady = await checkAllStepsCompleted();

    if (!allStepsReady) {
      Swal.fire({
        icon: "warning",
        title: "Pasos pendientes",
        text: "Aún hay pasos del propietario sin completar. Por favor, completa todos antes de validar.",
      });
      return;
    }

    Swal.fire({
      title: "Verificación del predio",
      text: "Selecciona si deseas aprobar o rechazar el predio.",
      icon: "question",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "✅ Aprobar",
      denyButtonText: "❌ Rechazar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      confirmButtonColor: "#28a745",
      denyButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        handleValidateProperty("APPROVED");
      } else if (result.isDenied) {
        handleValidateProperty("REJECTED");
      }
    });
  };

  // Función para setear los documentos del predio (GLOBAL_PROPERTY_FILES)
  const updatePropertyFiles = () => {
    const globalFilesFeature = propertyData?.propertyFeatures?.find(
      (feature) => feature.featureID === "GLOBAL_PROPERTY_FILES"
    );
    if (!globalFilesFeature || !Array.isArray(globalFilesFeature.documents?.items)) {
      setPropertyFiles([]);
      return;
    }
    const files = globalFilesFeature.documents.items.map((document) => {
      let documentData = {};
      try {
        documentData = JSON.parse(document.data || "");
      } catch {
        documentData = {};
      }
      return {
        name: documentData.name || document.id,
        type:
          documentTypeMapper[documentData.type] ||
          "Tipo de documento desconocido",
        url: documentData.url || document.url,
      };
    });
    console.log('files', files)
    setPropertyFiles(files);
  };

  const getSignedFileUrl = async (fileKey) => {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  };

  useEffect(() => {
    updatePropertyFiles();
    // eslint-disable-next-line
  }, [propertyData]);

  return (
    <>
      {visible && propertyData && (
        <>
          <div className="row row-cols-1 row-cols-xl-2 g-4">
            <div className="col-12 col-xl-12">
              <CadastralRecords
                autorizedUser={autorizedUser}
                totalArea={totalArea}
                latLngCentroid={latLngCentroid}
                setTotalArea={setTotalArea}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleFieldChange={handleFieldChange}
                updateFormCompletion={(isComplete) =>
                  updateFormCompletion("cadastralRecords", isComplete)
                }
              />
            </div>

            <div className="col-12">
              <ActualUseAndPotential
                autorizedUser={autorizedUser}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleFieldChange={handleFieldChange}
                updateFormCompletion={(isComplete) =>
                  updateFormCompletion("actualUseAndPotential", isComplete)
                }
              />
            </div>

            <div className="col-12">
              <UseRestrictions
                autorizedUser={autorizedUser}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleFieldChange={handleFieldChange}
                updateFormCompletion={(isComplete) =>
                  updateFormCompletion("useRestrictions", isComplete)
                }
              />
            </div>

            <div className="col-12">
              <Ecosystem
                autorizedUser={autorizedUser}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleFieldChange={handleFieldChange}
                updateFormCompletion={(isComplete) =>
                  updateFormCompletion("ecosystem", isComplete)
                }
              />
            </div>

            <div className="col">
              <GeneralAspects
                autorizedUser={autorizedUser}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleFieldChange={handleFieldChange}
                updateFormCompletion={(isComplete) =>
                  updateFormCompletion("generalAspects", isComplete)
                }
              />
            </div>

            <div className="col">
              <Relations
                autorizedUser={autorizedUser}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleFieldChange={handleFieldChange}
                updateFormCompletion={(isComplete) =>
                  updateFormCompletion("relations", isComplete)
                }
              />
            </div>

            <div className="col">
              <AdditionalFiles
                autorizedUser={autorizedUser}
                basePath={`projects/${propertyData.propertyInfo?.projectID}/other/`}
                setHasUnsavedChanges={setHasUnsavedChanges}
                handleFieldChange={handleFieldChange}
              />
            </div>

            {/* Sección de documentos del predio */}
            <div className="col">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4">Documentos del predio</h3>
                {propertyFiles.length === 0 ? (
                  <p className="text-gray-500 italic">No hay documentos asociados.</p>
                ) : (
                  <ul>
                    {propertyFiles.map((doc, idx) => (
                      <li
                        key={doc.url + idx}
                        className="flex items-center justify-between border-b py-2"
                      >
                        <span className="truncate max-w-xs">
                          {doc.name}{" "}
                          <span className="text-gray-400 text-xs">({doc.type})</span>
                        </span>
                        <button
                          type="button"
                          onClick={async () => {
                            window.open(doc.url, "_blank");
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          aria-label={`Ver documento ${doc.name}`}
                          tabIndex={0}
                        >
                          Ver
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="w-full mt-12 mb-16">
            <div className="bg-white shadow-xl rounded-lg p-6 w-full text-center border border-gray-300">
              {/* Mostrar estado del predio */}
              {status === "APPROVED" && (
                <div className="px-4 py-2 text-white bg-green-500 rounded-md font-semibold">
                  ✅ Predio Aprobado
                </div>
              )}

              {status === "REJECTED" && (
                <div className="px-4 py-2 text-white bg-red-500 rounded-md font-semibold">
                  ❌ Predio Rechazado
                </div>
              )}

              {status === "NOT_SELECTABLE" && (
                <div className="px-4 py-2 text-white bg-red-500 rounded-md font-semibold">
                  ❌ Predio no elegible
                </div>
              )}
              {/* Mostrar el botón solo si el usuario es verificador y el estado es PENDING */}

              {isVerifier && (
                <>
                  <button
                    className="w-full mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
                    onClick={handleVerifyClick}
                    disabled={isLoading || currentStep < 4} // ✅ Bloqueado si no estamos en el paso 3
                  >
                    {isLoading ? "Procesando..." : "Verificar"}
                  </button>

                  {/* 🔴 Mensaje de advertencia si el usuario intenta verificar antes del paso 3 */}
                  {currentStep < 4 && (
                    <p className="text-red-500 text-sm mt-2">
                      ⚠ Debes completar los pasos anteriores antes llegar al
                      paso 4.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
