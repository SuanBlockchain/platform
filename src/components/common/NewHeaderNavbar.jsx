import React, { useEffect, useState } from "react";
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
import { listVerificationComments, verificationsByUserVerifiedID, verificationsByUserVerifierID } from "graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import NotificationsModal from "./NotificationsModal";


export default function NewHeaderNavbar() {
  const [user, setUser] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [messages, setMessages] = useState([]);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleOpenOffcanvas = () => setShowOffcanvas(true);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => {
        setUser(data);
        const userId = data.attributes.sub; // Obtener `sub` en lugar de `username`
        const role = data.attributes["custom:role"];
  
        if (["validator", "constructor"].includes(role)) {
          fetchPendingMessages(userId, role);
        }
      })
      .catch((err) => console.log("Error obteniendo usuario:", err));
  }, []);


  const fetchPendingMessages = async (userId, role) => {
    if (!userId || !role) return;
  
    try {
      let messages = [];
  
      if (role === "constructor") {
        const ownerResponse = await API.graphql(
          graphqlOperation(verificationsByUserVerifiedID, { userVerifiedID: userId })
        );
  
        messages = ownerResponse?.data?.verificationsByUserVerifiedID?.items?.flatMap(
          (verification) =>
            verification.verificationComments?.items?.map((comment) => ({
              ...comment,
              senderName: verification.userVerifier?.name || "Desconocido",
              propertyID: verification.propertyFeature?.propertyID || null,  // Agregar nombre del verificador
            })) || []
        ) || [];
  
      } else if (role === "validator") {
        const verifierResponse = await API.graphql(
          graphqlOperation(verificationsByUserVerifierID, { userVerifierID: userId })
        );
  
        messages = verifierResponse?.data?.verificationsByUserVerifierID?.items?.flatMap(
          (verification) =>
            verification.verificationComments?.items?.map((comment) => ({
              ...comment,
              senderName: verification.userVerified?.name || "Desconocido",
              propertyID: verification.propertyFeature?.propertyID || null,  // Agregar nombre del verificador
            })) || []
        ) || [];
      }
  
      // Eliminar duplicados
      const uniqueMessages = Array.from(new Map(messages.map((msg) => [msg.id, msg])).values());
      setMessages(uniqueMessages);
    } catch (error) {
      console.error("❌ Error cargando mensajes pendientes:", error);
    }
  };
  
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      localStorage.removeItem("role");
      window.location.href = window.location.pathname;
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
  
  const handleCloseNotifications = () => setShowNotifications(false);

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
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Nav>
              <Nav className="items-center space-x-0 md:space-x-5 space-y-5 md:space-y-0 text-[#6e6c35] font-bold">
               {user && ["constructor", "investor"].includes(user.attributes["custom:role"]) && (
  <>
    <Nav.Link onClick={() => navigate("/constructor")}>Mis Predios</Nav.Link>
    <Nav.Link onClick={() => navigate("/PQRS")}>PQRS</Nav.Link>

    {/* Ícono de Notificaciones para Constructores */}
    <div className="relative cursor-pointer" onClick={handleShowNotifications}>
      <BellFill className="w-6 h-6 text-gray-800" />
      {messages.length > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
          {messages.length}
        </span>
      )}
    </div>
  </>
)}

                {user?.attributes["custom:role"] === "validator" && (
                  <>
                    <Nav.Link onClick={() => navigate("/consultor_admon")}>Mis campañas</Nav.Link>
                    <div className="relative cursor-pointer" onClick={handleShowNotifications}>
                      <BellFill className="w-6 h-6 text-gray-800" />
                          {messages.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                          {messages.length}
                        </span>
                      )}
                    </div>
                  </>
                )}
                {user && user.attributes["custom:role"] === "admon" && (
  <div>
    <Nav.Link onClick={() => navigate("/admon")}>Panel Administrador</Nav.Link>
  </div>
)}
                {user && user.attributes["custom:role"] === "analyst" && (
                  <>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        (window.location.href = "/project_analyst")
                      }
                    >
                      Mis campañas
                    </div>
                  </>
                )}
                {(user && user.attributes["custom:role"] === "legal") && (
                    <>
                     <div
                    className="relative cursor-pointer"
                    onClick={handleShowNotifications}
                  >
                    <BellFill className="w-6 h-6 text-gray-800" />
                    {messages?.length > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                        {messages.length}
                      </span>
                    )}
                  </div>
                    <Nav.Link
                      onClick={() => (window.location.href = "/legal_admon")}
                    >
                      Listado de predios
                    </Nav.Link>
                  </>
                 
                )}
                {user ? (
                  <>
                    <div class="flex items-center font-medium dark:text-white rtl:text-right bg-[#6e6c35] p-2 rounded-md text-center shadow-md">
                      <div className="mr-2">
                        <div class="text-sm text-white">
                          {user.username.toUpperCase()}
                        </div>
                        <hr className="border-2 m-1" />
                        <div class="text-xs text-white ">
                          {userRoleMapper[user.attributes["custom:role"]] || ''}
                        </div>
                      </div>
                      <button
                        className="bg-white p-2 rounded-md"
                        onClick={() => handleSignOut()}
                      >
                        <LogoutIcon className="text-[#6e6c35]" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <a
                      className="cursor-pointer text-[#6e6c35]"
                      href="#tecnologia"
                      onClick={handleCloseOffcanvas}
                    >
                      Tecnología
                    </a>
                    <a className="cursor-pointer text-[#6e6c35]" href="#porque" onClick={handleCloseOffcanvas}>
                      ¿Por qué Terrasacha?
                    </a>
                    {/* <DropDownProjects variant={"secondary"} /> */}
                    <a
                      className={
                        "bg-white p-2 rounded-md text-[#6e6c35] border-2 border-[#6e6c35]"
                      }
                      href={
                        process.env.REACT_APP_ENV === "INTERNAL"
                          ? "https://internal-marketplace.terrasacha.com/"
                          : "https://marketplace.terrasacha.com/"
                      }
                    >
                      Ver proyectos
                    </a>
                    <button
                      className={
                        "bg-[#6e6c35] p-2 rounded-md text-white border-2 border-dark"
                      }
                      onClick={() => (window.location.href = "/login")}
                    >
                      Ingresar
                    </button>
                  </>
                )}
              </Nav>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <NotificationsModal
  show={showNotifications}
  onClose={handleCloseNotifications}
  messages={messages}
/>
      </Container>
    </Navbar>
  );
}
