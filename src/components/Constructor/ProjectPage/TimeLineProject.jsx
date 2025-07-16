import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import {
  FaClipboardCheck,
  FaClock,
  FaFileSignature,
  FaHandHoldingUsd,
  FaStore,
  FaQuestionCircle,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Modal, Button } from "react-bootstrap";

export default function TimelineProject({ currentStep = 1 }) {
  const [helpStep, setHelpStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "Proyecto creado",
      description: "El proyecto ha sido creado correctamente.",
      helpText: "En este paso se ha completado el registro inicial del proyecto. No requiere más acciones.",
      icon: <FaClipboardCheck size={18} />,
    },
    {
      id: 2,
      title: "Cierre de convocatoria",
      description: "Esperando el cierre de la convocatoria de predios.",
      helpText: "Aquí el proyecto permanece mientras la campaña de inscripción de predios está abierta.",
      icon: <FaClock size={18} />,
    },
    {
      id: 3,
      title: "Completar información",
      description: "Debes completar toda la información del proyecto.",
      helpText: "Incluye datos técnicos, financieros, geográficos y generales del proyecto.",
      icon: <FaFileSignature size={18} />,
    },
    {
      id: 4,
      title: "Condiciones financieras",
      description: "Esperando aceptación de condiciones financieras.",
      helpText: "El propietario debe aceptar las condiciones financieras ofrecidas para continuar.",
      icon: <FaHandHoldingUsd size={18} />,
    },
    {
      id: 5,
      title: "Proyecto subido a marketplace",
      description: "¡Tu proyecto ahora es visible en el marketplace!",
      helpText: "El proyecto cumple todos los requisitos y ha sido publicado en el marketplace.",
      icon: <FaStore size={18} />,
    },
  ];

  return (
    <div className="w-full flex flex-col items-start mt-6 px-4">
      <div className="w-full max-w-3xl ml-[-40px]">
        <ProgressBar
          percent={((currentStep - 1) / (steps.length - 1)) * 100}
          filledBackground="linear-gradient(to right, #34d399, #059669)"
          height={6}
          transitionDuration={800}
        >
          {steps.map((step) => (
            <Step key={step.id}>
              {({ accomplished }) => {
                let stepClass = "bg-gray-300 text-gray-500 border-gray-400 opacity-50";
                if (step.id === currentStep) {
                  stepClass = "bg-yellow-500 text-white border-yellow-600 animate-pulse shadow-xl";
                } else if (accomplished) {
                  stepClass = "bg-green-500 text-white border-green-600 shadow-lg";
                }

                return (
                  <div className="flex flex-col items-center w-24 text-center relative">
                    <div className="relative flex flex-col items-center">
                      {/* Círculo del paso */}
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-500 cursor-pointer shadow-md mb-2 ${stepClass}`}
                        data-tooltip-id={`tooltip-${step.id}`}
                      >
                        {step.icon}
                      </div>

                      {/* Ícono de ayuda a la derecha */}
                      <span
                        onClick={() => setHelpStep(step)}
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-2 cursor-pointer"
                        title="Ver explicación del paso"
                        aria-label="Ayuda del paso"
                        data-tooltip-id={`help-tooltip-${step.id}`}
                        data-tooltip-content="Ver explicación del paso"
                      >
                        <FaQuestionCircle size={14} className="text-[#7b7b2c] opacity-90 hover:opacity-100" />
                      </span>

                      <Tooltip id={`help-tooltip-${step.id}`} place="top" effect="solid" />
                    </div>

                    <div className="w-1 h-6 bg-gray-400 mx-auto mt-1"></div>

                    <Tooltip
                      id={`tooltip-${step.id}`}
                      effect="solid"
                      place="bottom"
                      className="text-xs p-3 bg-black text-white rounded-md shadow-md"
                    >
                      {step.description}
                    </Tooltip>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        step.id === currentStep
                          ? "text-yellow-600 font-bold"
                          : accomplished
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
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

      {/* Modal de ayuda */}
      <Modal show={!!helpStep} onHide={() => setHelpStep(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{helpStep?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{helpStep?.helpText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setHelpStep(null)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
