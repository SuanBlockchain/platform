import React from "react";
import { Modal } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

export default function StepHelpModal({ isOpen, onClose, stepTitle, stepDescription }) {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      contentClassName="rounded-2xl shadow-lg border border-gray-200"
    >
      <Modal.Header
        closeButton
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl py-3 px-4"
      >
        <Modal.Title className="flex items-center gap-2 text-lg font-semibold">
          <FaInfoCircle size={18} className="text-white" />
          Ayuda: {stepTitle}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-white px-6 py-5">
        <div className="text-gray-700 text-sm leading-relaxed">
          {stepDescription}
        </div>
      </Modal.Body>

      <div className="px-6 pb-4 flex justify-end bg-white rounded-b-2xl">
        <button
          onClick={onClose}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg shadow transition duration-200"
        >
          Entendido
        </button>
      </div>
    </Modal>
  );
}
