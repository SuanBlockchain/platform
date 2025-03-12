import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useAuth } from "context/AuthContext";
import { notify } from "utilities/notify";
import { getProperty } from "graphql/queries"; // Asegúrate de tener esta consulta
import { createVerificationComment } from "graphql/mutations";

export default function PropertyChat({ propertyId }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [verificationID, setVerificationID] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(getProperty, { id: propertyId })
        );
        const property = response.data.getProperty;
        const verificationComments = property.propertyFeatures.items.flatMap(
          (feature) => feature.verifications.items.flatMap((verification) => verification.verificationComments.items)
        );
            
        const propertyVerificationID = property?.propertyFeatures?.items.find(
          (feature) => feature.featureID === "GLOBAL_PROPERTY_FILES"
        ).verifications.items[0].id;
        setVerificationID(propertyVerificationID)
        
        setMessages(verificationComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
        notify({ msg: "Error al cargar los mensajes", type: "error" });
        setLoading(false);
      }
    };

    fetchMessages();
  }, [propertyId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const commentData = {
      verificationID: verificationID, // O el ID de la verificación correspondiente
      comment: newMessage,
      isCommentByVerifier: true, // Asumiendo que el usuario Legal está enviando el mensaje
    };

    try {
      await API.graphql(graphqlOperation(createVerificationComment, { input: commentData }));
      setMessages((prevMessages) => [...prevMessages, { comment: newMessage, createdAt: new Date().toISOString(), isCommentByVerifier: true }]);
      setNewMessage("");
      notify({ msg: "Mensaje enviado", type: "success" });
    } catch (error) {
      console.error("Error sending message:", error);
      notify({ msg: "Error al enviar el mensaje", type: "error" });
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Mensajeria</h2>
      {loading ? (
        <p>Cargando mensajes...</p>
      ) : (
        <div className="max-h-60 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`p-2 mb-2 rounded-md ${message.isCommentByVerifier ? "bg-blue-100" : "bg-gray-100"}`}>
              <p className="font-semibold">{message.isCommentByVerifier ? "Legal" : "Propietario"}:</p>
              <p>{message.comment}</p>
              <p className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      <div className="flex">
        <input
          type="text"
          placeholder="Escribe tu mensaje..."
          className="border border-gray-300 rounded-md p-2 flex-grow"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={handleSendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
} 