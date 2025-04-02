import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

export default function ModalMoveToProject({
  showModal,
  handleClose,
  products,
  moveItem
}) {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ show: false, message: "" }); // Estado para el modal de error
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Mover a un proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="pb-4" controlId="cadastralNumbers">
              <Form.Label>Proyectos</Form.Label>
              <Form.Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">-- Seleccione un proyecto --</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
         {/* <Form.Group className='pb-4' controlId="images">
            <Form.Label>Certificado de tradición</Form.Label>
            <Form.Control
              type="file"
              name="files"
              multiple
              onChange={handleChange}
            />
          </Form.Group> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => {
            moveItem(`projects/${selectedProject}/analyst/`)
            handleClose()
        }} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Mover"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para errores */}
      <Modal
        centered
        show={errorModal.show}
        onHide={() => setErrorModal({ show: false, message: "" })}
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorModal.message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => setErrorModal({ show: false, message: "" })}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
