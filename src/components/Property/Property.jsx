import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  createNotification,
  updateProperty,
  updateVerification,
} from "graphql/mutations";

// Contexts
import { S3ClientProvider, useS3Client } from "context/s3ClientContext";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import { HourGlassIcon } from "components/common/icons/HourGlassIcon";
import { getProperty } from "graphql/queries";
import PropertyDetails from "./PropertyDetails";
import { usePropertyData } from "context/PropertyDataContext";
import Timeline from "./Timeline";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { DocumentationModal } from "../Legal/LegalAdmon";
import { useAuth } from "context/AuthContext";
// Mostrar si tiene asignado validador
// Tiempo restante para verificar
const statusColor = {
  PENDING: "bg-gray-600",
  APPROVED: "bg-green-600",
  REJECTED: "bg-red-600",
};
const statusEs = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
  NOT_SELECTABLE: "No seleccionable",
};
export default function Property() {
  const { id } = useParams();
  const { propertyData, handlePropertyData } = usePropertyData();
  const [property, setProperty] = useState(null);
  const [editable, setEditable] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("details");
  const [changedFields, setChangedFields] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [s3Files, setS3Files] = useState([]);
  const [filesAreComplete, setFilesAreComplete] = useState(false);
  const [s3Loading, setS3Loading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const openChatOnLoad = queryParams.get("openChat") === "true";
  const chatTarget = queryParams.get("chatTarget"); // legal | validator
  const [showDocumentationModal, setShowDocumentationModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const status = propertyData?.propertyInfo?.status;
    console.log("📌 propertyData actualizado:", propertyData);

    if (status === "APPROVED" || status === "REJECTED") {
      setCurrentStep(5); // ✅ Ahora el paso final es el 5
    } else if (status === "SELECTABLE") {
      setCurrentStep(4); // ✅ Ahora el estudio se activa solo si es "ELEGIBLE"
    } else if (status === "DOC_UPLOADED") {
      setCurrentStep(3); // ✅ Si los archivos están completos, pasa a Validación Legal
    } else if (isFormComplete) {
      setCurrentStep(2); // ✅ Si el formulario está completo, pasa a Subir Documentación
    } else {
      setCurrentStep(1); // ✅ Estado inicial
    }

    console.log("📌 Nuevo currentStep:", currentStep);
  }, [isFormComplete, propertyData, filesAreComplete, s3Loading]);

  const handleValidationComplete = () => {
    console.log("📌 ¡Los archivos están completos! Pasando al paso 3.");
    handleStepChange(3);

    if (propertyData?.propertyInfo?.status === "ELEGIBLE") {
      console.log("📌 Predio es elegible. Pasando al paso 4...");
      setCurrentStep(4);
    }
  };

  useEffect(() => {
    /* const fetchUserGroups = async () => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          const groups = user.signInUserSession.idToken.payload['cognito:groups'] || [''];
          setUserGroup(groups[0])
        } catch (error) {
          console.error('Error fetching user groups: ', error);
        }
      };

      fetchUserGroups(); */
    const fetchPropertyData = async () => {
      await handlePropertyData({ pID: id });
    };
    if (id) {
      fetchPropertyData();
    }
  }, [id]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue =
          "Tienes cambios sin guardar. ¿Seguro que deseas salir?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleStepChange = (step) => {
    console.log(`📌 Cambiando al paso ${step}`);
    setCurrentStep(step);
  };

  const handleNavigation = (path) => {
    if (hasUnsavedChanges) {
      Swal.fire({
        title: "Cambios sin guardar",
        text: "Tienes cambios sin guardar. ¿Seguro que deseas salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(path);
        }
      });
    } else {
      navigate(path);
    }
  };

  const handleFieldChange = (field, value) => {
    setChangedFields((prev) => ({
      ...prev,
      [field]: true, // 🔴 Marca el campo como modificado
    }));
    setHasUnsavedChanges(true);
  };

  const isAuthor = async (id) => {
    try {
      const userLogged = await Auth.currentAuthenticatedUser();

      if (userLogged.attributes.sub === id) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const fetchProperty = async () => {
    try {
      const data = await API.graphql(graphqlOperation(getProperty, { id }));

      setProperty(data.data.getProperty);
      const isAuthorResult = await isAuthor(data.data.getProperty.userID);

      setEditable(isAuthorResult && propertyData.propertyInfo.status === null);
    } catch (error) {
      console.error("Error fetching campaign:", error);
    }
  };
  useEffect(() => {
    if (propertyData) {
      fetchProperty();
    }
  }, [propertyData]);

  // --- Reutilización de handleToggleAssign de LegalAdmon.jsx ---
  const handleToggleAssign = async (property) => {
    const propertyFeature = property.propertyFeatures?.items.find(
      (feature) => feature.featureID === "GLOBAL_PROPERTY_FILES"
    );
    const propertyVerificationID = propertyFeature?.verifications?.items[0]?.id;

    if (property.userLegal !== null) {
      if (property.userLegalID === user.id) {
        // Desasignar
        try {
          await API.graphql(
            graphqlOperation(updateProperty, {
              input: {
                id: property.id,
                userLegalID: null,
              },
            })
          );

          const notificationData = {
            userOriginID: user.id,
            userID: property.userID,
            message: `El revisor legal ya no está asignado a tu predio '${property.name}'.`,
            type: "PROPERTY",
            resourceID: property.id,
            isRead: false,
          };

          await API.graphql(
            graphqlOperation(createNotification, { input: notificationData })
          );

          toast.success(`Predio desasignado`);
          fetchProperty();
        } catch (error) {
          toast.error("Error al actualizar el estado del predio");
        }
        return;
      } else {
        toast.error("El predio pertenece a otro legal");
        return;
      }
    }

    // Asignar
    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: property.id,
            userLegalID: user.id,
          },
        })
      );

      if (propertyVerificationID) {
        await API.graphql(
          graphqlOperation(updateVerification, {
            input: {
              id: propertyVerificationID,
              userVerifierID: user.id,
            },
          })
        );
      }

      const notificationData = {
        userOriginID: user.id,
        userID: property.userID,
        message: `Se ha asignado un revisor legal a tu predio '${property.name}' para revisar la documentación.`,
        type: "PROPERTY",
        resourceID: property.id,
        isRead: false,
      };

      await API.graphql(
        graphqlOperation(createNotification, { input: notificationData })
      );

      toast.success(`Predio asignado`);
      fetchProperty();
    } catch (error) {
      toast.error("Error al actualizar el estado del predio");
    }
  };

  if (!property) return null;
  if (!propertyData) return null;

  return (
    <S3ClientProvider>
      <div>
        <div className="container-sm">
          <div className="mb-5">
            <NewHeaderNavbar />
          </div>
          <div className="my-2">-</div>
          <div className="mt-4">
            {property.campaign ? (
              <a
                onClick={() =>
                  handleNavigation(`/campaign/${property.campaign.id}`)
                }
                className="border-2 border-yellow-500 bg-yellow-500 rounded-md px-2 py-1 active:bg-yellow-600 active:border-yellow-600"
              >
                Regresar a la campaña
              </a>
            ) : (
              <a
                onClick={() => handleNavigation(`/constructor`)}
                className="border-2 border-yellow-500 bg-yellow-500 rounded-md px-2 py-1 active:bg-yellow-600 active:border-yellow-600"
              >
                Ir a mis predios
              </a>
            )}

            {/* 📌 Aquí está el contenedor donde agregaremos la línea de tiempo */}
            <div className="relative pt-3 px-4 mb-4 mt-4 border rounded shadow">
              <div className="row gy-2">
                <header className="d-flex justify-content-between">
                  <p className="fs-3 mb-0">{property.name}</p>
                </header>
                <section>
                  <p className="fs-6 mb-0 fw-bold">Fecha de creación:</p>
                  <p className="fs-6 mb-0">{property.createdAt}</p>
                </section>
                <section>
                  <p className="fs-6 mb-0 fw-bold">Área Total:</p>
                  <p className="fs-6 mb-0">
                    {propertyData.projectCadastralRecords.totalAreaFormatted}
                  </p>
                </section>
              </div>

              {/* 📌 Estado del predio */}
              <span
                className={`${
                  statusColor[property.status]
                } absolute top-4 right-4 bg-blue-500 text-xs text-white font-bold px-4 py-2 w-fit rounded-md text-nowrap`}
              >
                {statusEs[property.status]}
              </span>

              {/* 📌 Línea de tiempo horizontal dentro del div */}
              <div className="mt-6">
                <Timeline
                  currentStep={currentStep}
                  isFormComplete={isFormComplete}
                  handleValidationComplete={handleValidationComplete}
                  onStepChange={handleStepChange}
                  propertyStatus={propertyData?.propertyInfo?.status}
                  filesAreComplete={filesAreComplete}
                  propertyId={propertyData?.propertyInfo?.id}
                  userId={propertyData?.projectPostulant?.id}
                  campaignOwnerId={propertyData?.propertyCampaign?.userId || ""}
                  openChatOnLoad={openChatOnLoad}
                  chatTarget={chatTarget}
                />
              </div>

              <ul className="font-medium flex mt-4 pl-0 ">
                <li>
                  <a
                    href="#details"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection("details");
                    }}
                    className={`${
                      activeSection === "details"
                        ? "text-black border-t border-r border-l border-gray-400 rounded-t-md"
                        : "text-blue-500"
                    } flex py-2 px-3`}
                    aria-current="page"
                  >
                    Detalles
                  </a>
                </li>
              </ul>
            </div>
            {/* Acciones legales: Ver Documentación y Asignar/Desasignar predio */}
            {user?.role === "legal" && (() => {
              const canAssign = property.userLegalID === null && property.status !== "REJECTED" && property.status !== "APPROVED";
              const canUnassign = property.userLegalID === user.id && property.status !== "REJECTED" && property.status !== "APPROVED";
              const canValidate = property.userLegalID === user.id && property.status !== "APPROVED";
              const showActions = canAssign || canUnassign || canValidate;

              return showActions ? (
                <div
                  className="flex flex-wrap gap-2 mb-4"
                  role="group"
                  aria-label="Acciones legales"
                >
                  {canAssign && (
                    <button
                      className="w-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 text-white px-4 py-2 rounded transition-colors duration-150"
                      aria-label="Asignar predio"
                      tabIndex={0}
                      onClick={() => handleToggleAssign(property)}
                    >
                      Asignar predio
                    </button>
                  )}
                  {canUnassign && (
                    <button
                      className="w-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 text-white px-4 py-2 rounded transition-colors duration-150"
                      aria-label="Desasignar predio"
                      tabIndex={0}
                      onClick={() => handleToggleAssign(property)}
                    >
                      Desasignar predio
                    </button>
                  )}
                  {canValidate && (
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 text-white px-4 py-2 rounded transition-colors duration-150"
                      aria-label="Ver Documentación"
                      tabIndex={0}
                      onClick={() => setShowDocumentationModal(true)}
                    >
                      Validar Predio
                    </button>
                  )}
                </div>
              ) : null;
            })()}

            <PropertyDetails
              visible={activeSection === "details"}
              setHasUnsavedChanges={setHasUnsavedChanges}
              handleFieldChange={handleFieldChange}
              setIsFormComplete={setIsFormComplete}
              currentStep={currentStep}
            />
          </div>

          <ToastContainer />
        </div>
      </div>
      <DocumentationModal
        isOpen={showDocumentationModal}
        onClose={() => setShowDocumentationModal(false)}
        property={property}
        fetchProperties={fetchProperty}
        user={user}
      />
    </S3ClientProvider>
  );
}
