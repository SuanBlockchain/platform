import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useAuth } from "context/AuthContext";
import { notify } from "utilities/notify";
import { useNavigate } from "react-router-dom";
import { listNotifications } from "graphql/queries";
import { updateNotification } from "graphql/mutations";

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(listNotifications, { filter: { userID: { eq: user.id } } })
        );
        setNotifications(response.data.listNotifications.items);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        notify({ msg: "Error al cargar las notificaciones", type: "error" });
      }
    };

    fetchNotifications();
  }, [user.id]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await API.graphql(
          graphqlOperation(updateNotification, {
            input: { id: notification.id, isRead: true },
          })
        );
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
        );
      } catch (error) {
        console.error("Error marking notification as read:", error);
        notify({ msg: "Error al marcar la notificación como leída", type: "error" });
      }
    }

    navigate(`/property/${notification.resourceID}`, { state: { openChat: true } });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Notificaciones</h2>
      <div>
        {notifications.length === 0 ? (
          <p>No tienes notificaciones.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-2 mb-2 rounded-md ${notification.isRead ? "bg-gray-100" : "bg-blue-100"}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 