import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { FaCheckCircle, FaHourglassHalf, FaClipboardList, FaProjectDiagram, FaUpload, FaTimesCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import ValidationModal from "./ValidationModal"; 

export default function Timeline({ currentStep = 1, isFormComplete, onStepChange, propertyStatus }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log("📌 currentStep recibido en Timeline:", currentStep);
  console.log("📌 propertyStatus recibido:", propertyStatus);

  const openModal = () => {
    if (currentStep === 2) { // ✅ Solo abrir el modal en el paso 2
      console.log("🟢 Abriendo el modal...");
      setModalIsOpen(true);
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
    { id: 1, title: "Predio Inscrito", description: "El predio ha sido registrado.", icon: <FaClipboardList size={18} /> },
    { id: 2, title: "Documentación Legal", description: "Carga de documentos para validación.", icon: <FaUpload size={18} /> },
    { id: 3, title: "Validación Legal", description: "Revisión de documentos y requisitos.", icon: <FaProjectDiagram size={18} /> },
    { id: 4, title: "Estudio", description: "Análisis técnico y estudios ambientales.", icon: <FaHourglassHalf size={18} /> },
    { 
      id: 5, 
      title: isApproved ? "Predio Aprobado" : isRejected ? "Predio Rechazado" : "Proyecto Elegido", 
      description: isApproved ? "El predio ha sido aprobado." : isRejected ? "El predio ha sido rechazado." : "Aprobación final del predio.", 
      icon: isApproved 
        ? <FaCheckCircle size={18} className="text-white" /> 
        : isRejected 
          ? <FaTimesCircle size={18} className="text-white" /> 
          : <FaCheckCircle size={18} />
    },
  ];

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
                let stepClass = "bg-gray-300 text-gray-500 border-gray-400 opacity-50";

                // 🔥 Si es el paso actual, se pone amarillo
                if (step.id === currentStep) {
                  stepClass = "bg-yellow-500 text-white border-yellow-600 animate-pulse shadow-xl";
                } else if (accomplished) {
                  stepClass = "bg-green-500 text-white border-green-600 shadow-lg hover:shadow-xl";
                }

                // 🔥 Animación especial para el paso 2 (resplandor y pulsación)
                const isStep2Active = step.id === 2 && currentStep === 2;
                const glowEffect = isStep2Active ? "animate-pulse ring-4 ring-yellow-400" : "";

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
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-500 cursor-pointer shadow-md mb-2 ${stepClass} ${glowEffect}`}
                      data-tooltip-id={`tooltip-${step.id}`}
                      onClick={() => {
                        if (step.id === 2) {
                          openModal(); // ✅ Solo permite abrir en el paso 2
                        }
                      }}    
                    >
                      {step.icon}
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
                            <span>Para completar el paso 1, debes llenar toda la información del formulario.</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" size={14} />
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

      <ValidationModal isOpen={modalIsOpen} 
      onClose={closeModal} 
      onValidationComplete={handleValidationComplete} 
      checkDocuments={true} 
      />
    </div>
  );
}
