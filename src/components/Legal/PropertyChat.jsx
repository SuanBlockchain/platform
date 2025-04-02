import React, { useEffect, useState, useRef } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useAuth } from "context/AuthContext";
import { notify } from "utilities/notify";
import {
  createNotification,
  createVerificationComment,
} from "graphql/mutations";
import { getProperty } from "utilities/customQueries";

export default function PropertyChat({ propertyId, featureChat }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [verificationID, setVerificationID] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [availableChatUsers, setAvailableChatUsers] = useState([]);
  const [verifierRole, setVerifierRole] = useState(null);
  const [propertyID, setPropertyID] = useState(null);
  const [propertyName, setPropertyName] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
  
        const response = await API.graphql(
          graphqlOperation(getProperty, { id: propertyId })
        );
  
        const property = response.data.getProperty;
        setPropertyID(property.id)
        setPropertyName(property.name);
  
        const propertyVerification = property?.propertyFeatures?.items.find(
          (feature) => feature.featureID === featureChat
        )?.verifications?.items[0];
  
        if (!propertyVerification) {
          console.warn(`⚠️ No se encontró Verification para featureChat: ${featureChat}`);
          setVerificationID(null);
          setMessages([]);
          setLoading(false);
          return;
        }
  
        setVerificationID(propertyVerification.id);
  
        // 🔍 Filtrar mensajes solo de la Verification correspondiente al featureChat
        const filteredMessages = propertyVerification.verificationComments?.items || [];
  
        // 🔍 Ordenar mensajes por fecha de creación
        const sortedMessages = filteredMessages.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
  
        setMessages(sortedMessages);
        setLoading(false);
  
        // 🔍 Asignar usuarios disponibles en el chat
        const userVerifierId = propertyVerification?.userVerifierID;
        const userVerifiedId = propertyVerification.userVerifiedID;
        setAvailableChatUsers([userVerifierId, userVerifiedId]);
        setVerifierRole(propertyVerification?.userVerifier?.role);
  
        console.log("✅ propertyVerificationID:", propertyVerification.id);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
        notify({ msg: "Error al cargar los mensajes", type: "error" });
        setLoading(false);
      }
    };
  
    fetchMessages();
  }, [propertyId, featureChat]);
  

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log("availableChatUsers", availableChatUsers);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const commentData = {
      verificationID: verificationID, // O el ID de la verificación correspondiente
      comment: newMessage,
      isCommentByVerifier: user.role === "legal" || user.role === "validator", // Asumiendo que el usuario Legal está enviando el mensaje
    };

    const notificationData = {
      userOriginID: user.id,
      userID:
        user.id === availableChatUsers[1]
          ? (availableChatUsers[0] || '')
          : availableChatUsers[1], // ID del usuario que debe recibir la notificación
      message: `Tienes un nuevo mensaje en el predio: ${propertyName}`,
      type: "MESSAGE",
      resourceID: propertyID,
      isRead: false,
    };

    try {
      await API.graphql(
        graphqlOperation(createVerificationComment, { input: commentData })
      );

      if(availableChatUsers[0]) {
        await API.graphql(
          graphqlOperation(createNotification, { input: notificationData })
        );
      }
      
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          comment: newMessage,
          createdAt: new Date().toISOString(),
          isCommentByVerifier:
            user.role === "legal" || user.role === "validator",
        },
      ]);
      setNewMessage("");
      notify({ msg: "Mensaje enviado", type: "success" });
    } catch (error) {
      console.error("Error sending message:", error);
      notify({ msg: "Error al enviar el mensaje", type: "error" });
    }
  };

  const roleMapper = {
    admon: "Administrador",
    analyst: "Analista",
    legal: "Legal",
    constructor: "Propietario",
    validator: "Validador",
  };

  return (
    <>
      {verificationID && (
        <div className="bg-white p-3 border rounded-md shadow-sm h-96 flex flex-col">
          <h2 className="text-lg font-bold mb-2">Mensajería</h2>
          <div className="flex-grow max-h-96 overflow-y-auto">
            {loading ? (
              <p>Cargando mensajes...</p>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 mb-2 rounded-md ${
                    message.isCommentByVerifier ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <p className="font-semibold mb-0">
                    {message.isCommentByVerifier
                      ? roleMapper[verifierRole]
                      : "Propietario"}
                    :
                  </p>
                  <p className="mb-0">{message.comment}</p>
                  <p className="text-sm text-gray-500 mb-0 text-right">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              className="border border-gray-300 rounded-md p-2 flex-grow"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              disabled={!availableChatUsers.includes(user.id)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
              onClick={handleSendMessage}
              disabled={!availableChatUsers.includes(user.id)}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
