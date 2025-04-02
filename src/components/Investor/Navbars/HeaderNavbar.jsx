import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Modal, Button, Offcanvas } from "react-bootstrap";
import { BellFill } from "react-bootstrap-icons";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom"; // Para redirección sin recargar la página
import TerrasachaLogo from "../../common/TerrasachaLogo";

const HeaderNavbar = ({ logOut, changeHeaderNavBarRequest }) => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSignOut = () => {
    logOut();
  };

  const handleShowNotifications = () => {
    if (!user) return;

    const role = user.attributes["custom:role"];
    const userId = user.attributes.sub;

    if (role === "validator" || role === "constructor") {
      fetchPendingMessages(userId, role);
    }
    setShowNotifications(true);
  };

  const fetchPendingMessages = async (userId, role) => {
    setMessages([
      { id: 1, text: "Nueva verificación pendiente" },
      { id: 2, text: "Comentario agregado a un predio" },
    ]);
  };

  const roleDisplayNames = {
    admon: "Administrador",
    validator: "Consultor",
    analyst: "Analista",
    constructor: "Propietario",
    legal: "Legal",
  };

  const role = user?.attributes?.["custom:role"] || "";
  const displayRole = roleDisplayNames[role] || "Sin Rol";

  return (
    <>
      <Navbar expand="lg" bg="light" fixed="top" className="shadow-md py-2">
        <Container className="flex justify-between items-center">
          {/* Logo */}
          <Navbar.Brand href="/" className="flex items-center">
            <TerrasachaLogo className="w-48 h-auto" />
          </Navbar.Brand>

          {/* Botón de menú en móviles */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          {/* Menú Offcanvas */}
          <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <a href="/">
                  <TerrasachaLogo className="w-48 h-auto" />
                </a>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto flex items-center gap-6">
                {role === "validator" && (
                  <div className="flex items-center gap-4">
                    {/* Botón Crear Campaña */}
                    <a
                      hre f="/new_campaign"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition flex items-center"
                    >
                      Crear Campaña
                    </a>

                    {/* Notificaciones */}
                    <div className="relative cursor-pointer" onClick={handleShowNotifications}>
                      <BellFill className="w-6 h-6 text-gray-800" />
                      {messages.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                          {messages.length}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Botón de sesión */}
                {role ? (
                  <div className="flex items-center gap-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                      onClick={handleSignOut}
                    >
                      Desconectar
                    </button>
                    <span className="text-gray-800 font-semibold">{displayRole}</span>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
                    onClick={() => navigate("/login")}
                  >
                    Ingresar
                  </button>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Modal de Notificaciones */}
      <Modal show={showNotifications} onHide={() => setShowNotifications(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messages.length > 0 ? (
            <ul className="list-disc pl-4">
              {messages.map((msg) => (
                <li key={msg.id}>{msg.text}</li>
              ))}
            </ul>
          ) : (
            <p>No tienes notificaciones pendientes.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNotifications(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HeaderNavbar;
