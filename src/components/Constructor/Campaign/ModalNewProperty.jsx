import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { createProperty, createPropertyFeature } from "graphql/mutations";
import { TrashIcon } from "components/common/icons/TrashIcon";
import { useNavigate } from "react-router";
import { getPredialDataByCadastralNumber } from "services/getPredialDataByCadastralNumber";
import { CheckIcon } from "components/common/icons/CheckIcon";
import { XIcon } from "components/common/icons/XIcon";

const initialForm = {
  userID: "",
  campaignID: "",
  name: "",
  cadastralNumbers: [""],
  status: "PENDING",
  files: JSON.stringify([]),
};

export default function ModalNewProperty({
  showModal,
  handleClose,
  campaignId,
  productId,
  fetchCampaign,
}) {
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState({ show: false, message: "" }); // Estado para el modal de error
  const userID = useRef(null);
  const navigate = useNavigate();
  const [predialFetchedData, setPredialFetchedData] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const data = await Auth.currentAuthenticatedUser();
        userID.current = data.attributes.sub;
      } catch (error) {
        console.error("Error fetching authenticated user:", error);
      }
    };

    fetchAuthenticatedUser();
  }, []);

  const findFirstDuplicate = (arr) => {
    const set = new Set();
    for (const value of arr) {
      if (set.has(value)) return value;
      set.add(value);
    }
    return null;
  };

  const isPropertyNameDuplicate = async (name) => {
    try {
      const result = await API.graphql(
        graphqlOperation(
          `
          query CheckPropertyName($name: String!, $campaignID: ID!) {
            listProperties(filter: { name: { eq: $name }, campaignID: { eq: $campaignID } }) {
              items {
                id
              }
            }
          }
          `,
          { name, campaignID: campaignId }
        )
      );
      return result.data.listProperties.items.length > 0;
    } catch (error) {
      console.error("Error verifying property name:", error);
      return false;
    }
  };

  const showError = (message) => {
    setErrorModal({ show: true, message }); // Mostrar el popup de error
  };

  const handleSave = async () => {
    setLoading(true);

    if (formData.name.trim() === "") {
      showError("El nombre del predio es obligatorio.");
      setLoading(false);
      return;
    }

    const isDuplicate = await isPropertyNameDuplicate(formData.name.trim());
    if (isDuplicate) {
      showError("El nombre del predio ya existe en esta campaña.");
      setLoading(false);
      return;
    }

    const duplicatedCadastralNumbers = findFirstDuplicate(
      formData.cadastralNumbers
    );
    if (duplicatedCadastralNumbers) {
      showError(`Número cadastral repetido. Nro: ${duplicatedCadastralNumbers}`);
      setLoading(false);
      return;
    }

    try {
      const newProperty = {
        name: formData.name,
        cadastralNumber: JSON.stringify(formData.cadastralNumbers),
        campaignID: campaignId,
        productID: productId,
        userID: userID.current,
        status: formData.status,
      };

      const predialData = await getPredialDataByCadastralNumber(
        formData.cadastralNumbers
      );
      setPredialFetchedData(predialData);

      let totalArea = 0;
      const allGood = formData.cadastralNumbers.every((cadNum) => {
        if (predialData.hasOwnProperty(cadNum)) {
          totalArea += predialData[cadNum].AREA_TERRENO;
          return true;
        }
        return false;
      });

      if (!allGood) {
        showError("Identificador catastral no encontrado.");
        return;
      }

      const result = await API.graphql(
        graphqlOperation(createProperty, { input: newProperty })
      );
      const propertyId = result.data.createProperty.id;

      const cadastralNumbers = formData.cadastralNumbers.map((cadNum) => ({
        cadastralNumber: cadNum,
      }));

      const tempPropertyFeature = {
        value: JSON.stringify(cadastralNumbers),
        isToBlockChain: false,
        isOnMainCard: false,
        propertyID: propertyId,
        featureID: "A_predio_ficha_catastral",
      };
      await API.graphql(
        graphqlOperation(createPropertyFeature, { input: tempPropertyFeature })
      );

      const tempPropertyFeature2 = {
        value: totalArea,
        isToBlockChain: false,
        isOnMainCard: false,
        propertyID: propertyId,
        featureID: "D_area",
      };
      await API.graphql(
        graphqlOperation(createPropertyFeature, { input: tempPropertyFeature2 })
      );

      await fetchCampaign();
      setPredialFetchedData(null);
      setFormData(initialForm);
      handleClose();

      setTimeout(() => {
        navigate(`/property/${propertyId}`);
      }, 3000);
    } catch (error) {
      console.error("Error al postular el predio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCadastralChange = (e, index) => {
    const updatedNumbers = [...formData.cadastralNumbers];
    updatedNumbers[index] = e.target.value;
    setFormData({
      ...formData,
      cadastralNumbers: updatedNumbers,
    });
  };

  const addCadastralNumber = () => {
    setFormData({
      ...formData,
      cadastralNumbers: [...formData.cadastralNumbers, ""],
    });
  };

  const removeCadastralNumber = (index) => {
    const updatedNumbers = formData.cadastralNumbers.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      cadastralNumbers: updatedNumbers,
    });
  };

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Postular nuevo predio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="pb-4" controlId="cadastralNumber">
              <Form.Label>Nombre del predio</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="pb-4" controlId="cadastralNumbers">
              <Form.Label>Identificadores catastrales</Form.Label>
              {formData.cadastralNumbers.map((cadastralNumber, index) => (
                <div key={index} className="flex w-100 align-items-center mb-2">
                  <Form.Control
                    type="text"
                    className="border-dark"
                    name={`cadastralNumber-${index}`}
                    value={cadastralNumber}
                    placeholder="ex: 505730002000000070093000000000"
                    onChange={(e) => handleCadastralChange(e, index)}
                    required
                  />
                  {predialFetchedData &&
                    predialFetchedData[cadastralNumber.trim()] ? (
                    <CheckIcon className="ms-2 text-success" />
                  ) : (
                    <XIcon className="ms-2 text-danger" />
                  )}
                  <button
                    type="button"
                    className="btn btn-danger ms-2"
                    onClick={() => removeCadastralNumber(index)}
                  >
                    <TrashIcon />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={addCadastralNumber}
              >
                Agregar identificador
              </button>
              <div className="mt-3">
    <p className="text-muted">
      ¿No sabes cómo sacar tu número catastral?{" "}
      <a
        href="https://terrasacha.gitbook.io/terrasacha/guia-de-usuario-plataforma/rol-propietario/como-obtener-el-numero-catastral-de-un-predio"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        Mira esta guía
      </a>
    </p>
  </div>
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
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Postular"}
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
