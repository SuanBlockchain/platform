import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Spinner } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { listProperties } from "graphql/queries";
import { updateProperty } from "graphql/mutations";
import { useNavigate } from "react-router-dom";
import vacio from "../../views/_images/caja-vacia-gris.png";
import Swal from "sweetalert2";

export default function ModalAssignProperty({ showModal, handleClose, campaignId, productId, fetchCampaign }) {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    if (showModal) {
      fetchProperties();
    }
  }, [showModal]);

  // Obtener lista de predios sin campaña
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const result = await API.graphql(
        graphqlOperation(listProperties, {
          filter: { campaignID: { attributeExists: false } }
        })
      );
      setProperties(result.data.listProperties.items);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
    setLoading(false);
  };

  // Asignar predio a la campaña y al producto asociado con confirmación de Swal
  const assignProperty = async () => {
    if (!selectedProperty) return;

    // ✅ Mostrar SweetAlert2 antes de asignar
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este predio será asignado a la campaña y al producto asociado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, asignar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: selectedProperty,
            campaignID: campaignId,
            productID: productId, // Se asigna también al `productID`
          },
        })
      );

      // ✅ Mostrar mensaje de éxito con SweetAlert
      Swal.fire({
        title: "Asignado con éxito",
        text: "El predio ha sido vinculado correctamente.",
        icon: "success",
        confirmButtonColor: "#4CAF50",
      });

      fetchCampaign(); // Refrescar la campaña actual
      handleClose();
    } catch (error) {
      console.error("Error assigning property:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al asignar el predio.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
    setLoading(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose} fullscreen>
      <Modal.Header closeButton>
        <Modal.Title className="flex items-center gap-2 text-lg font-bold">
          📌 Asignar Predio a la Campaña
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
            🏡 Predios Disponibles para Asignar
          </h2>

          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className={`p-4 bg-white shadow-md rounded-lg border transition-all ${
                    selectedProperty === property.id ? "border-green-500 shadow-lg" : "border-gray-300"
                  }`}
                >
                  <h3 className="text-lg font-bold mb-2 text-center">{property.name}</h3>
                  <p className="text-gray-500 text-sm text-center mb-4">ID: {property.id}</p>
                  <div className="flex justify-center gap-3">
                    <a
                      href={`/property/${property.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-300 text-gray-800 text-sm font-bold px-4 py-2 rounded hover:bg-gray-400 transition-all"
                    >
                      Ver
                    </a>
                    <button
                      onClick={() => setSelectedProperty(property.id)}
                      className={`text-white text-sm font-bold px-4 py-2 rounded transition-all ${
                        selectedProperty === property.id
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {selectedProperty === property.id ? "Seleccionado" : "Seleccionar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <img src={vacio} className="w-32 h-32 mx-auto mb-4" alt="Sin predios" />
              <p className="text-gray-500">No hay predios disponibles.</p>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button variant="secondary" onClick={handleClose} className="px-4 py-2 font-semibold text-white bg-gray-500 hover:bg-gray-600 transition-all">
          Cerrar
        </Button>
        <Button
          variant="primary"
          onClick={assignProperty}
          disabled={!selectedProperty || loading}
          className="px-4 py-2 font-semibold text-white bg-green-500 hover:bg-green-600 transition-all"
        >
          {loading ? <Spinner animation="border" size="sm" /> : "Asignar Predio"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}