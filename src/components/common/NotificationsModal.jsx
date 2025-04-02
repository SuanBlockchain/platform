import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function NotificationsModal({ show, onClose, messages }) {
  const navigate = useNavigate(); // Hook para navegar a otra página

  return (
    <Modal show={show} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>📩 Mensajes Pendientes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom">
        {messages.length > 0 ? (
          <div className="messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className="message-box">
                <p className="sender-name">
                  <strong>De:</strong> {msg.senderName || "Desconocido"}
                </p>
                <p className="message-text">{msg.comment}</p>
                <p className="message-date">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Fecha desconocida"}
                </p>
                {/* Validación para evitar redirección si no hay propertyID */}
                {msg.propertyID ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="reply-button"
                    onClick={() => navigate(`/property/${msg.propertyID}`)}
                  >
                    Responder
                  </Button>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">No se puede responder a este mensaje.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tienes mensajes pendientes.</p>
        )}
      </Modal.Body>
      <Modal.Footer className="footer-custom">
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>

      {/* Estilos mejorados */}
      <style jsx>{`
        .custom-modal .modal-content {
          max-width: 500px;
          border-radius: 12px;
        }

        .modal-body-custom {
          max-height: 400px;
          overflow-y: auto;
          padding: 15px;
        }

        .messages-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .message-box {
          background: #f9f9f9;
          padding: 12px;
          border-radius: 8px;
          border-left: 5px solid #6e6c35;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        }

        .sender-name {
          font-weight: bold;
          color: #333;
        }

        .message-text {
          color: #555;
          font-size: 14px;
          margin: 5px 0;
        }

        .message-date {
          font-size: 12px;
          color: gray;
        }

        .reply-button {
          background: #6e6c35;
          border: none;
          color: white;
          padding: 6px 12px;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
        }

        .reply-button:hover {
          background: #56542a;
        }

        .footer-custom {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </Modal>
  );
}
