import React from "react";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { updateNotification } from "graphql/mutations";

export default function NotificationsModal({ show, onClose, messages, fetchPendingMessages, userId }) {
  const navigate = useNavigate();

  const markAsRead = async (notificationId) => {
    try {
      const response = await API.graphql(
        graphqlOperation(updateNotification, {
          input: {
            id: notificationId,
            isRead: true,
          },
        })
      );
      if (response?.data?.updateNotification) {
        await fetchPendingMessages(userId);
      }
    } catch (error) {
      console.error("❌ Error al actualizar la notificación:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadMessages = messages.filter((msg) => !msg.isRead);
      await Promise.all(
        unreadMessages.map((msg) =>
          API.graphql(
            graphqlOperation(updateNotification, {
              input: { id: msg.id, isRead: true },
            })
          )
        )
      );
      await fetchPendingMessages(userId);
    } catch (error) {
      console.error("❌ Error al marcar todas como leídas:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton className="header-custom">
        <Modal.Title>📩 Mensajes Pendientes</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom">
        {messages.length > 0 && (
          <div className="d-flex justify-end mb-3">
            <OverlayTrigger
              placement="left"
              overlay={<Tooltip>Marcar todos como leídos</Tooltip>}
            >
              <Button
                variant="outline-success"
                size="sm"
                onClick={markAllAsRead}
              >
                ✅ Marcar todos
              </Button>
            </OverlayTrigger>
          </div>
        )}

        {messages.length > 0 ? (
          <div className="messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className="message-box">
                <p className="sender-name">
                  <strong>De:</strong> {msg.senderName || "Desconocido"}
                </p>
                <p className="message-text">{msg.message}</p>
                <p className="message-date">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString()
                    : "Fecha desconocida"}
                </p>

                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="mark-read-button"
                    onClick={() => markAsRead(msg.id)}
                  >
                    Marcar como leído
                  </Button>

                  {msg.propertyID ? (
                    <Button
                      variant="primary"
                      size="sm"
                      className="reply-button"
                      onClick={async () => {
                        await markAsRead(msg.id);
                        let chatTargetParam = "";
                        if (msg.type === "MESSAGE_LEGAL") chatTargetParam = "legal";
                        else if (msg.type === "MESSAGE_VALIDATOR") chatTargetParam = "validator";

                        if (msg.type === "CAMPAING") {
                          navigate(`/campaign/${msg.propertyID}`);
                        } else if (msg.type === "PROPERTY") {
                          navigate(`/property/${msg.propertyID}`);
                        } else {
                          navigate(`/property/${msg.propertyID}?openChat=true&chatTarget=${chatTargetParam}`);
                        }
                      }}
                    >
                      {msg.type === "CAMPAING"
                        ? "Ir a campaña"
                        : msg.type === "PROPERTY"
                        ? "Ir al predio"
                        : "Responder"}
                    </Button>
                  ) : (
                    <p className="no-reply-text">No se puede responder a este mensaje.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No tienes mensajes pendientes.</p>
        )}
      </Modal.Body>

      <Modal.Footer className="footer-custom">
        <Button variant="secondary" onClick={onClose} className="close-button">
          Cerrar
        </Button>
      </Modal.Footer>

      {/* Estilos mejorados */}
     <style jsx>{`
  .custom-modal .modal-content {
    max-width: 520px;
    border-radius: 15px;
    box-shadow: #7b7b2c;
    border: 2px solid #ccc;
  }

  .header-custom {
    background: #3b3b3b;
    color: white;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding: 15px;
    font-weight: bold;
  }

  .modal-body-custom {
    max-height: 450px;
    overflow-y: auto;
    padding: 20px;
    background: #f2f2f2;
  }

  .messages-container {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .message-box {
    background: white;
    padding: 15px;
    border-radius: 10px;
    border-left: 5px solid #6e6e6e;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
  }

  .message-box:hover {
    transform: scale(1.02);
  }

  .sender-name {
    font-weight: bold;
    color: #333;
    font-size: 14px;
  }

  .message-text {
    color: #555;
    font-size: 15px;
    margin: 5px 0;
    line-height: 1.4;
  }

  .message-date {
    font-size: 12px;
    color: gray;
    margin-top: 5px;
  }

  .reply-button {
    background: #666666;
    border: none;
    color: white;
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    border-radius: 5px;
  }

  .reply-button:hover {
    background: #4d4d4d;
  }

  .no-reply-text {
    font-size: 13px;
    color: #888;
    margin-top: 5px;
  }

  .footer-custom {
    display: flex;
    justify-content: center;
    background: #f2f2f2;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    padding: 12px;
  }

  .close-button {
    background: #666666;
    border: none;
    color: white;
    transition: 0.3s;
  }

  .close-button:hover {
    background: #4d4d4d;
  }
`}</style>

    </Modal>
  );
}
