import React, { useEffect, useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import {
  FaCheckCircle,
  FaHourglassHalf,
  FaClipboardList,
  FaProjectDiagram,
  FaUpload,
  FaTimesCircle,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ValidationModal from "./ValidationModal";
import PropertyChat from "components/Legal/PropertyChat";
import { API, graphqlOperation } from "aws-amplify";
import { Modal } from "react-bootstrap";
import { createPropertyFeature, createVerification, updateVerification } from "graphql/mutations";
import { listPropertyFeatures, listVerifications } from "graphql/queries";
import { useAuth } from "context/AuthContext";
import ConstructorWorkflow from "./ConstructorWorkflow";
import StepHelpModal from "./StepHelpModal";
import { FaQuestionCircle } from "react-icons/fa";


export default function Timeline({
  currentStep = 1,
  isFormComplete,
  onStepChange,
  propertyStatus,
  propertyId,
  userId, 
  campaignOwnerId,
  openChatOnLoad=false,
  chatTarget
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [chatModalIsOpen, setChatModalIsOpen] = useState(false);
  const [propertyFeatureID, setPropertyFeatureID] = useState(null);
  const [propertyVerificationID, setPropertyVerificationID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [helpStep, setHelpStep] = useState(null); // null o el step actual
  const openHelp = (step) => setHelpStep(step);
  const closeHelp = () => setHelpStep(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!openChatOnLoad || !chatTarget) return;
  
    if (chatTarget === "legal" ) {
      setModalIsOpen(true); // Abrir ValidationModal
    }
  
    if (chatTarget === "validator" ) {
      handleChatFeature(); // Abrir PropertyChat
    }
  }, [openChatOnLoad, currentStep, chatTarget]);
  
  
  

  useEffect(() => {
    if (propertyId) {
      checkExistingFeature();
    }
  }, [propertyId]);
  
  const checkExistingFeature = async () => {
    try {
      if (!propertyId) return;
  
      const response = await API.graphql(
        graphqlOperation(listPropertyFeatures, {
          filter: {
            propertyID: { eq: propertyId },
            featureID: { eq: "GLOBAL_PROPERTY_CHAT" },
          },
        })
      );
  
      const existingFeature = response?.data?.listPropertyFeatures?.items?.[0];
  
      if (existingFeature) {
        setPropertyFeatureID(existingFeature.id);
        setPropertyVerificationID(existingFeature?.verification?.id || null);
      } else {
        console.warn(`⚠️ No se encontró PropertyFeature para propertyId=${propertyId}`);
        setPropertyFeatureID(null);
        setPropertyVerificationID(null);
      }
    } catch (error) {
      console.error("❌ Error al verificar PropertyFeature:", error);
    }
  };
   

 
  const openModal = (stepId) => {
    if (stepId === 2) {
      setModalIsOpen(true);
    }
    if (stepId === 4) {
      handleChatFeature();
    }
  };
  

  const closeModal = () => {
    console.log("🔴 Cerrando el modal...");
    setModalIsOpen(false);
  };

  const handleValidationComplete = () => {
    console.log("📌 Documentos subidos correctamente. Pasando al paso 3...");
    onStepChange(3);
  };

  const isApproved = propertyStatus === "APPROVED";
  const isRejected = propertyStatus === "REJECTED";

 const steps = [
  {
    id: 1,
    title: "Predio Inscrito",
    description: "El predio ha sido registrado.",
    helpText: "Por favor, diligencia el formulario con la información disponible y guarda los cambios para continuar con el siguiente paso.",
    icon: <FaClipboardList size={18} />,
  },
  {
    id: 2,
    title: "Documentación Legal",
    description: "Carga de documentos para validación.",
    helpText: "Aquí se debe subir la documentación legal obligatoria, como escrituras, certificados y planos catrastales. La revisión inicia después de completarlo.",
    icon: <FaUpload size={18} />,
  },
  {
    id: 3,
    title: "Validación Legal",
    description: "Revisión de documentos y requisitos.",
    helpText: "Un equipo legal revisa la documentación enviada para verificar su autenticidad, validez y cumplimiento de requisitos.",
    icon: <FaProjectDiagram size={18} />,
  },
  {
    id: 4,
    title: "Estudio",
    description: "Análisis técnico y estudios ambientales.",
    helpText: "Se realizan estudios técnicos, como análisis de suelo, uso del suelo, impacto ambiental y viabilidad del predio para el proyecto.",
    icon: <FaHourglassHalf size={18} />,
  },
  {
    id: 5,
    title: isApproved ? "Predio Aprobado" : isRejected ? "Predio Rechazado" : "Proyecto Elegido",
    description: isApproved ? "El predio ha sido aprobado." : isRejected ? "El predio ha sido rechazado." : "Aprobación final del predio.",
    helpText: isApproved
      ? "El predio ha cumplido con todos los requisitos y ha sido aprobado para continuar en el proceso."
      : isRejected
      ? "El predio no cumplió con los requisitos técnicos o legales y ha sido rechazado. Puede reiniciar el proceso si se corrigen los errores."
      : "Se ha seleccionado el predio para integrar el proyecto. Inicia la siguiente etapa del proyecto. Debes esperar que se cierre la campaña y aceptar la propuesta financiera ",
    icon: isApproved ? (
      <FaCheckCircle size={18} className="text-white" />
    ) : isRejected ? (
      <FaTimesCircle size={18} className="text-white" />
    ) : (
      <FaCheckCircle size={18} />
    ),
  },
];


  const handleChatFeature = async () => {
    try {

      if (currentStep !== 4) {
        console.warn("⚠️ El chat solo puede abrirse en el paso 4.");
        return;
      }
      
      if (!propertyId || !userId) {
        console.error("❌ propertyId o userId no están definidos.");
        return;
      }
  
      if (propertyFeatureID) {
        console.log("✅ PropertyFeature ya existe. Verificando actualización de Verification...");
  
        if (propertyVerificationID && campaignOwnerId) {
          console.log("🔍 Obteniendo Verification actual...");
          const response = await API.graphql(
            graphqlOperation(listVerifications, {
              filter: { id: { eq: propertyVerificationID } },
            })
          );
  
          const currentVerification = response?.data?.listVerifications?.items?.[0];
  
          if (currentVerification) {
            console.log("✅ Verification encontrada:", currentVerification);
  
            // Solo actualizar si userVerifierID es null o diferente del campaignOwnerId
            if (!currentVerification.userVerifierID || currentVerification.userVerifierID !== campaignOwnerId) {
              console.log("🔄 Actualizando Verification con userVerifierID:", campaignOwnerId);
              await API.graphql(
                graphqlOperation(updateVerification, {
                  input: {
                    id: propertyVerificationID,
                    userVerifierID: campaignOwnerId,
                  },
                })
              );
            } else {
              console.log("⚠️ No es necesario actualizar, userVerifierID ya está asignado correctamente.");
            }
          } else {
            console.warn("⚠️ No se encontró Verification asociada a esta PropertyFeature.");
          }
        }
  
        setChatModalIsOpen(true);
        return;
      }
  
      setIsLoading(true);
  
      console.log("🛠 Creando nuevo PropertyFeature...");
  
      const propertyFeatureInput = {
        propertyID: propertyId,
        featureID: "GLOBAL_PROPERTY_CHAT",
      };
  
      const propertyFeatureResponse = await API.graphql(
        graphqlOperation(createPropertyFeature, { input: propertyFeatureInput })
      );
  
      const newPropertyFeatureID = propertyFeatureResponse.data.createPropertyFeature.id;
      setPropertyFeatureID(newPropertyFeatureID);
  
      console.log("🛠 Creando Verification...");
  
      const verificationInput = {
        userVerifiedID: userId,
        propertyFeatureID: newPropertyFeatureID,
      };
  
      const verificationResponse = await API.graphql(
        graphqlOperation(createVerification, { input: verificationInput })
      );
  
      setPropertyVerificationID(verificationResponse.data.createVerification.id);
  
      if (campaignOwnerId) {
        console.log("🔄 Asignando campaignOwnerId como userVerifierID...");
        await API.graphql(
          graphqlOperation(updateVerification, {
            input: {
              id: verificationResponse.data.createVerification.id,
              userVerifierID: campaignOwnerId,
            },
          })
        );
      }
  
      setChatModalIsOpen(true);
      console.log("✅ PropertyFeature y Verification creados con éxito.");
    } catch (error) {
      console.error("❌ Error al crear PropertyFeature y Verification:", error);
    } finally {
      setIsLoading(false);
    }
  };
   

  return (
    <div className="w-full flex flex-col items-center mt-6 px-4">
      <div className="w-full max-w-3xl">
        <ProgressBar
          percent={((currentStep - 1) / (steps.length - 1)) * 100}
          filledBackground="linear-gradient(to right, #34d399, #059669)"
          height={6}
          transitionDuration={800}
        >
          {steps.map((step, index) => (
            <Step key={step.id}>
              {({ accomplished }) => {
                let stepClass =
                  "bg-gray-300 text-gray-500 border-gray-400 opacity-50";

                // 🔥 Si es el paso actual, se pone amarillo
                if (step.id === currentStep && step.id !== steps.length) {
                  stepClass = "bg-yellow-500 text-white border-yellow-600 animate-pulse shadow-xl";
                }
                 else if (accomplished) {
                  stepClass =
                    "bg-green-500 text-white border-green-600 shadow-lg hover:shadow-xl";
                }

                // 🔥 Animación especial para el paso 2 (resplandor y pulsación)
                const isStep2Active = step.id === 2 && currentStep === 2;
                const glowEffect = isStep2Active
                  ? "animate-pulse ring-4 ring-yellow-400"
                  : "";

                return (
                  <div className="flex flex-col items-center w-24 text-center relative">
                    {/* 📌 Flecha animada SOLO para el paso 2 */}
                    {isStep2Active && (
                      <div className="absolute -top-8 text-yellow-500 text-lg font-bold animate-bounce">
                        ⬇️
                        <p className="text-xs font-semibold">clic</p>
                      </div>
                    )}

                    {/* 📌 Ícono del paso con animación especial para el paso 2 */}
<div className="flex flex-col items-center">
  <div className="relative flex flex-col items-center">
    {/* Ícono principal del paso */}
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${stepClass} ${glowEffect}`}
      data-tooltip-id={`tooltip-${step.id}`}
      onClick={() => openModal(step.id)}
    >
      {step.icon}
    </div>

    {/* Ícono de ayuda alineado a la derecha del círculo */}
    <span
      onClick={() => openHelp(step)}
      className="absolute left-full top-1/2 -translate-y-1/2 ml-2 cursor-pointer"
      title="Ver explicación del paso"
      aria-label="Ayuda del paso"
    >
      <FaQuestionCircle size={14} className="text-[#7b7b2c] opacity-90 hover:opacity-100" />
    </span>

    <Tooltip id={`help-tooltip-${step.id}`} place="top" effect="solid" />
  </div>
</div>



                    <div className="w-1 h-6 bg-gray-400 mx-auto mt-1"></div>

                    <Tooltip
                      id={`tooltip-${step.id}`}
                      effect="solid"
                      place="bottom"
                      className="text-xs p-3 bg-black text-white rounded-md shadow-md flex items-center gap-2 animate-fade-in"
                    >
                      {step.id === 1 ? (
                        !isFormComplete ? (
                          <div className="flex items-center gap-2">
                            <FaTimesCircle className="text-red-500" size={14} />
                            <span>
                              Para completar el paso 1, debes llenar toda la
                              información del formulario.
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <FaCheckCircle
                              className="text-green-500"
                              size={14}
                            />
                            <span>¡Paso 1 completado!</span>
                          </div>
                        )
                      ) : (
                        <span>{step.description}</span>
                      )}
                    </Tooltip>

                    <p
                      className={`mt-2 text-xs font-semibold transition-colors duration-500 ${
                        step.id === currentStep
                          ? "text-yellow-600 font-bold"
                          : accomplished
                          ? "text-green-600"
                          : "text-gray-500"
                      } hover:text-green-500`}
                    >
                      {step.title}
                    </p>
                  </div>
                );
              }}
            </Step>
          ))}
        </ProgressBar>
      </div>
      

      <ValidationModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onValidationComplete={handleValidationComplete}
        checkDocuments={true}
      />

<Modal show={chatModalIsOpen} onHide={() => setChatModalIsOpen(false)} size="xl" centered>
  <Modal.Header closeButton>
    <Modal.Title>Proceso del Predio</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <ConstructorWorkflow propertyId={propertyId} />
  </Modal.Body>
</Modal>
{helpStep && (
  <StepHelpModal
    isOpen={!!helpStep}
    onClose={closeHelp}
    stepTitle={helpStep.title}
    stepDescription={helpStep.helpText}
  />
)}


    </div>
  );
}
