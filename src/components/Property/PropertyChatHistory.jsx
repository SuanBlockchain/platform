import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { getProperty } from "utilities/customQueries";

export default function PropertyChatHistory({ propertyId, featureChat }) {
  const [verifications, setVerifications] = useState([]);

  useEffect(() => {
    const fetchVerifications = async () => {
      try {
        if (!propertyId || !featureChat) return;

        const response = await API.graphql(
          graphqlOperation(getProperty, { id: propertyId })
        );

        const property = response.data.getProperty;
        const matchedFeatures = property.propertyFeatures.items.filter(
          (feature) => feature.featureID === featureChat
        );

        const allVerifications = matchedFeatures.flatMap(
          (f) => f.verifications?.items || []
        );

        const verificationsWithComments = allVerifications.filter(
          (v) => v.verificationComments?.items?.length > 0
        );

        setVerifications(verificationsWithComments);
      } catch (error) {
        console.error("❌ Error al cargar historial de chat:", error);
      }
    };

    fetchVerifications();
  }, [propertyId, featureChat]);

  return (
    <div className="flex flex-col gap-3">
      {verifications.length === 0 ? (
        <p className="text-gray-500 text-sm italic">
          No hay historial de mensajes.
        </p>
      ) : (
        verifications.map((v) =>
          v.verificationComments.items
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.isCommentByVerifier ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 text-sm shadow-md max-w-[80%] whitespace-pre-wrap ${
                    msg.isCommentByVerifier
                      ? "bg-blue-100 text-gray-800"
                      : "bg-green-100 text-gray-800"
                  }`}
                >
                  <p className="text-xs font-bold mb-1">
                    {msg.isCommentByVerifier ? "Legal" : "Propietario"}
                  </p>
                  <p className="text-sm leading-snug">{msg.comment}</p>
                  <p className="text-[10px] text-right text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleString("es-CO", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            ))
        )
      )}
    </div>
  );
}
