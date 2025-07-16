import React, { useEffect, useRef, useState } from "react";
// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import HeaderNavbar from "components/views/Navbars/HeaderNavbar";
import TerrasachaLogo from "./TerrasachaLogo";
import { Dropdown } from "react-bootstrap";
import { useNavigate, Link } from "react-router";
// Import images
//import LOGO from "components/common/_images/suan_logo.png";
import { Auth } from "aws-amplify";
import s from "components/Constructor/Navbar/HeaderNavbar.module.css";
import { LogoutIcon } from "./icons/LogoutIcon";
import { useLocation } from "react-router-dom";
import DropDownProjects from "./DropDownProjects";
import { BellFill } from "react-bootstrap-icons";
import {
  listNotifications,
  listVerificationComments,
  verificationsByUserVerifiedID,
  verificationsByUserVerifierID,
} from "graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import NotificationsModal from "./NotificationsModal";


export default function NewHeaderNavbar() {
  const [user, setUser] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        setUser(data);
        const userId = data.attributes.sub; // Obtener `sub` en lugar de `username`
        const role = data.attributes["custom:role"];

        if (["validator", "constructor", "legal"].includes(role)) {
          fetchPendingMessages(userId); // Eliminar `role` del llamado
        }
      })
      .catch((err) => console.log("Error obteniendo usuario:", err));
}, []);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

useEffect(() => {
  Auth.currentAuthenticatedUser()
    .then((data) => {
      const userId = data.attributes.sub;

      const reloadKey = `pageReloadedForUser-${userId}`;

      if (!sessionStorage.getItem(reloadKey)) {
        sessionStorage.setItem(reloadKey, "true");
        window.location.reload();
      }
    })
    .catch((err) => {
      console.log("Error obteniendo usuario para control de reload:", err);
    });
}, []);




const fetchPendingMessages = async (userId) => { // Eliminar `role` de los parámetros
    if (!userId) return;

    try {
        // Consultar notificaciones no leídas del usuario autenticado
        const response = await API.graphql(
            graphqlOperation(listNotifications, {
                filter: {
                    userID: { eq: userId },  // Notificaciones dirigidas al usuario
                    isRead: { eq: false },   // Solo las no leídas
                },
            })
        );

        const notifications = response?.data?.listNotifications?.items || [];

        // Mapear las notificaciones con los datos necesarios
        const formattedMessages = notifications.map((notification) => ({
            id: notification.id,
            message: notification.message,
            senderName: notification.userOrigin?.name || "Desconocido",
            senderRole: notification.userOrigin?.role || "Desconocido",
            propertyID: notification.resourceID || null,
            type: notification.type, 
            createdAt: notification.createdAt,
            isRead: notification.isRead,
        }));

        // Ordenar por fecha de creación (más recientes primero)
        formattedMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Eliminar duplicados por ID
        const uniqueMessages = Array.from(
            new Map(formattedMessages.map((msg) => [msg.id, msg])).values()
        );

        setMessages(uniqueMessages);
    } catch (error) {
        console.error("❌ Error cargando notificaciones pendientes:", error);
    }
};

  

const handleSignOut = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser();
    const userId = currentUser.attributes.sub;
    sessionStorage.removeItem(`pageReloadedForUser-${userId}`);
    
    await Auth.signOut();
    localStorage.removeItem("role");
    window.location.href = "/";
  } catch (error) {
    console.log("error signing out: ", error);
  }
};


  const userRoleMapper = {
    admon: "Administrador",
    constructor: "Propietario",
    validator: "Consultor",
    analyst: "Analista",
  };

  const findLastAuthUserKey = () => {
    for (let key in localStorage) {
      if (
        key.includes("CognitoIdentityServiceProvider") &&
        key.includes(".LastAuthUser")
      ) {
        const userlog = localStorage[key];
        return userlog;
      }
    }
    return null;
  };

  let userlog = findLastAuthUserKey();

  const handleShowNotifications = () => {
    const role = user?.attributes?.["custom:role"];
    if (role === "validator" || role === "constructor") {
      const userId = user.attributes.sub;
      fetchPendingMessages(userId, role);
    }
    setShowNotifications(true);
  };

  const role = user?.attributes?.["custom:role"];

  const roleDisplayNames = {
    admon: "Administrador",
    validator: "Consultor",
    analyst: "Analista",
    constructor: "Propietario",
    legal: "Legal",
  };

  const displayRole = roleDisplayNames[role] || "Sin Rol";
  
  const handleCloseNotifications = () => setShowNotifications(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  if (!user) return <HeaderNavbar />;
  return (
    <Navbar key="sm" expand="lg" fixed="top" className="bg-[#ecd798]">
      <Container fluid>
        <Navbar.Brand href="/" style={{ marginLeft: "2%" }}>
          <TerrasachaLogo className={"w-48 h-auto"} />
        </Navbar.Brand>
        <Navbar.Toggle className="border-2 p-2" onClick={handleOpenOffcanvas} />
        <Navbar.Offcanvas
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
          id={`offcanvasNavbar-expand-$'sm'`}
          aria-labelledby={`offcanvasNavbarLabel-expand-$'sm'`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$'sm'`}>
              <a href="/">
                <TerrasachaLogo className={"w-48 h-auto"} />
              </a>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
            <Nav>
              <Nav className={s.navGroup}>
                <div className="flex items-center gap-3 px-2">
                  {/* Botón "Mis Predios" */}
                  {(user.attributes["custom:role"] === "constructor" ||
                    user.attributes["custom:role"] === "investor") && (
                    <>
                      <button
                        onClick={() => navigate("/constructor")}
                        className="bg-[#3B82F6] text-white font-semibold px-2 py-1 text-xs rounded-md shadow-md hover:bg-[#2563EB] transition duration-300 flex items-center justify-center"
                        style={{
                          border: "none",
                          boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)",
                          minWidth: "90px",
                        }}
                      >
                        Mis Predios
                      </button>
                      <Nav.Link className="text-gray-800 text-sm hover:text-gray-600 transition duration-300" onClick={() => navigate("/PQRS")}>
                        PQRS
                      </Nav.Link>
                      
                      {/* Ícono de Notificaciones para Constructores */}
                      <div className="relative cursor-pointer flex items-center justify-center" onClick={handleShowNotifications}>
                        <div className="relative">
                          {messages.length > 0 && (
                            <>
                              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                            </>
                          )}
                          <BellFill className={`w-5 h-5 ${messages.length > 0 ? "text-red-500" : "text-gray-800"}`} />
                        </div>
                      </div>
                    </>
                  )}
  
                  {/* Enlace "Mis Campañas" para Validators */}
                  {user.attributes["custom:role"] === "validator" && (
  <>
    <Nav.Link
      className="text-gray-800 text-sm hover:text-gray-600 transition duration-300"
      onClick={() => navigate("/consultor_admon")}
    >
      Mis campañas
    </Nav.Link>
    <Nav.Link
      className="text-gray-800 text-sm hover:text-gray-600 transition duration-300"
      onClick={() => navigate("/new_campaign")}
    >
      Crear campaña
    </Nav.Link>
    <Nav.Link
      className="text-gray-800 text-sm hover:text-gray-600 transition duration-300"
      onClick={() => navigate("/PQRS")}
    >
      PQRS
    </Nav.Link>
  </>
)}

{user.attributes["custom:role"] === "admon" && (
  <Nav.Link
    className="text-gray-800 text-sm hover:text-gray-600 transition duration-300"
    onClick={() => navigate("/admon")}
  >
    Perfil
  </Nav.Link>
)}


  
                  {/* Enlace "Listado de predios" para Legales */}
                  {user.attributes["custom:role"] === "legal" && (
                    <Nav.Link
                      className="text-gray-800 text-sm hover:text-gray-600 transition duration-300"
                      onClick={() => (window.location.href = "/legal_admon")}
                    >
                      Listado de predios
                    </Nav.Link>
                  )}
  
                  {/* Ícono de Notificaciones para Validators y Legales */}
                  {(user.attributes["custom:role"] === "validator" ||
                    user.attributes["custom:role"] === "legal") && (
                    <div
                      className="relative cursor-pointer flex items-center justify-center"
                      onClick={handleShowNotifications}
                    >
                      <div className="relative">
                        {messages.length > 0 && (
                          <>
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
                            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
                          </>
                        )}
                        <BellFill className={`w-5 h-5 ${messages.length > 0 ? "text-red-500" : "text-gray-800"}`} />
                      </div>
                    </div>
                  )}
  
                 
  
                  {/* Contenedor del usuario MÁS PEQUEÑO Y COMPACTO */}
                  {user && (
  <div className="relative" ref={profileMenuRef}>
    {/* Contenedor del Usuario (hace clic para abrir el menú) */}
    <div
      className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-md shadow-md text-xs cursor-pointer"
      onClick={toggleProfileMenu}
    >
      {/* Ícono de Usuario */}
      <div className="bg-gray-700 p-1.5 rounded-full flex items-center justify-center w-6 h-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="14"
          viewBox="0 -960 960 960"
          width="14"
          fill="#fff"
        >
          <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
        </svg>
      </div>

      {/* Nombre del Usuario */}
      <p className="text-white font-semibold text-xs ml-2 truncate mb-0">{user.username}</p>
    </div>

    {/* Menú desplegable (solo visible cuando showProfileMenu es true) */}
    {showProfileMenu && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-3">
        <p className="text-gray-600 text-sm font-medium mb-2 text-center">{displayRole}</p>
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 text-sm rounded-md shadow-md transition duration-300"
          onClick={handleSignOut}
        >
          Desconectar
        </button>
      </div>
    )}
  </div>
)}


                </div>
              </Nav>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
  
      {/* Modal de Notificaciones */}
      <NotificationsModal
        show={showNotifications}
        onClose={handleCloseNotifications}
        messages={messages}
        fetchPendingMessages={fetchPendingMessages}
        userId={user?.attributes?.sub}
      />
    </Navbar>
  );
  
}
