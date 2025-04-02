import React, { Component } from "react";
import { Form, Button, Modal, Container } from "react-bootstrap";
import { Storage, Auth } from "aws-amplify";
import awsmobile from "aws-exports";
import s from "./LandingPage.module.css";
import { FaArrowLeft } from "react-icons/fa";

export default class PQRForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prqDescription: "",
      prqFile: null, // Cambiado de prqImage a prqFile para admitir imágenes y PDFs
      prqEmail: "",
      showModal: false,
      modalMessage: "",
      modalType: "",
      isAuthenticated: false,
      isLoading: false,
    };
    this.handlePRQSubmit = this.handlePRQSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.setState({ isAuthenticated: true });
    } catch (error) {
      console.error("Usuario no autenticado:", error);
      window.location.href = "/";
    }
  }

  async handlePRQSubmit(e) {
    e.preventDefault();
    const { prqDescription, prqFile, prqEmail } = this.state;

    this.setState({ isLoading: true });

    let imageUrl = null;
    let pdfUrl = null;

    if (prqFile) {
      const fileName = `prq-files/${Date.now()}_${prqFile.name}`;
      try {
        const result = await Storage.put(fileName, prqFile, {
          contentType: prqFile.type,
          level: "public", // Asegurar que el nivel es público
        });

        // Construir la URL pública completa del archivo
        const bucketName = awsmobile.aws_user_files_s3_bucket;
        const region = awsmobile.aws_user_files_s3_bucket_region;
        const bucketUrl = `https://${bucketName}.s3.${region}.amazonaws.com/public`;
        const fileUrl = `${bucketUrl}/${result.key}`;


        // Asignar URL a la variable correcta según el tipo de archivo
        if (prqFile.type === "application/pdf") {
          pdfUrl = fileUrl;
        } else {
          imageUrl = fileUrl;
        }
      } catch (error) {
        console.error("Error subiendo el archivo a S3:", error);
        this.setState({
          showModal: true,
          modalMessage: "Error al subir el archivo. Inténtalo de nuevo.",
          modalType: "error",
        });
        return;
      }
    }

    const requestBody = {
      prqDescription,
      imageUrl,
      pdfUrl,
      prqEmail,
    };

    try {
      const response = await fetch(process.env['REACT_APP_URL_API_PQR'], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        this.setState({
          showModal: true,
          modalMessage: "Tu PQR se envió exitosamente.",
          modalType: "success",
          prqDescription: "",
          prqFile: null,
          prqEmail: "",
          isLoading: false,
        });
      } else {
        this.setState({
          showModal: true,
          modalMessage: "Hubo un error al enviar el PQR. Inténtalo de nuevo.",
          modalType: "error",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error enviando el PQR:", error);
      this.setState({
        showModal: true,
        modalMessage: "Hubo un error al enviar el PQR. Inténtalo de nuevo.",
        modalType: "error",
        isLoading: false,
      });
    }
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const {
      showModal,
      modalMessage,
      modalType,
      prqDescription,
      prqEmail,
      isAuthenticated,
      isLoading,
    } = this.state;

    if (!isAuthenticated) {
      return null;
    }

    return (
      <div className="container-fluid bg-tecnologia p-5" id="tecnologia">
        <Container className={`${s.pqrContainer} mt-5 p-4`}>
          <Button
            variant="link"
            style={{ color: "#1C3541" }}
            className="mb-4 d-flex align-items-center gap-2"
            onClick={() => (window.location.href = "/")}
          >
            <FaArrowLeft />
            Regresar
          </Button>
          <h2 className="text-center mb-4">Envía tu PQRS</h2>
          <Form onSubmit={this.handlePRQSubmit}>
            <Form.Group controlId="prqDescription" className="mb-3">
              <Form.Label>Descripción de la consulta</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={prqDescription}
                onChange={(e) =>
                  this.setState({ prqDescription: e.target.value })
                }
                required
                minLength="30"
                placeholder="Describe detalladamente tu consulta"
              />
              <Form.Text className="text-muted">
                La descripción debe tener al menos 30 caracteres.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="prqFile" className="mb-3">
              <Form.Label>Archivo (opcional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg, application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const maxFileSize = 15 * 1024 * 1024; // 15 MB en bytes
                    if (
                      ![
                        "image/png",
                        "image/gif",
                        "image/jpeg",
                        "image/jpg",
                        "application/pdf",
                      ].includes(file.type)
                    ) {
                      alert(
                        "Solo se aceptan imágenes en formato PNG, GIF, PDF, JPEG o JPG."
                      );
                      e.target.value = null; // Limpiar el campo de archivo
                    } else if (file.size > maxFileSize) {
                      alert(
                        "El tamaño máximo permitido para el archivo es de 15 MB."
                      );
                      e.target.value = null; // Limpiar el campo de archivo
                    } else {
                      this.setState({ prqFile: file });
                    }
                  }
                }}
              />
              <Form.Text className="text-muted">
                Formatos aceptados: PNG, GIF, JPEG, PDF, JPG. Tamaño máximo: 15
                MB.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="prqEmail" className="mb-3">
              <Form.Label>Correo de contacto</Form.Label>
              <Form.Control
                type="email"
                value={prqEmail}
                onChange={(e) => this.setState({ prqEmail: e.target.value })}
                required
                placeholder="Ingresa tu correo electrónico"
              />
            </Form.Group>
            <Button
              type="submit"
              style={{
                backgroundColor: "#1C3541",
                borderColor: "#1C3541",
                color: "#fff",
              }}
              variant="primary"
              className="w-100 mt-3"
              disabled={isLoading}
            >
              Enviar PQRS
            </Button>
          </Form>

          <Modal show={showModal} onHide={this.closeModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalType === "success" ? "Éxito" : "Error"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.closeModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
}
