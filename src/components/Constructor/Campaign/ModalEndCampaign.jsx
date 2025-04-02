import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import { updateCampaign, createProduct, updateProperty } from 'graphql/customMutations';
export default function ModalEndCampaign({fetchCampaign, showModalEndCampaign, handleCloseEndCampaign, campaign}) {
    const [loading, setLoading] = useState(false);
    const pendingProperties = campaign?.properties?.items?.filter(property => property.status.toUpperCase() === "PENDING") || [];
    const handleSave = async () => {
        setLoading(true);
        try {
            const inputUpdate = {
            id: campaign.id,
            available: false,
            };
            
            await API.graphql(graphqlOperation(updateCampaign, { input: inputUpdate }));
            await fetchCampaign()
            handleCloseEndCampaign();
        } catch (error) {
            console.error("Error al actualizar la campaña:", error);
        } finally {
            setLoading(false);
        }
        };
    const getApprovedProperties = () =>{

        const propertiesToUpdate = campaign.properties.items.filter(item => item.status === 'APPROVED')
        return propertiesToUpdate
    }
    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showModalEndCampaign} onHide={handleCloseEndCampaign}>
            <Modal.Header closeButton>
                <Modal.Title as="h1" className='text-lg text-gray-700'>
                    Finalizar campaña
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* 🔹 Mostrar lista de predios pendientes si los hay */}
                {pendingProperties.length > 0 ? (
                    <>
                        <p className="text-red-600 font-semibold">
                            ⚠️ Antes de cerrar, revisa los siguientes predios que aún están pendientes de aprobación:
                        </p>
                        <ul className="list-disc pl-5 text-gray-600">
                            {pendingProperties.map((property, index) => (
                                <li key={index} className="text-gray-700">
                                    📍 {property.name}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-3 font-semibold text-red-600">
                            ¿Deseas cerrar la convocatoria de todas formas?
                        </p>
                    </>
                ) : (
                    <p className="text-gray-700">
                        🎉 ¡Todo listo! No hay predios pendientes por aprobar. 
                        <br /> Al cerrar la convocatoria, se avanzará a la siguiente fase del proceso. 
                        <br /><strong>¿Deseas continuar?</strong>
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEndCampaign}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={handleSave} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Finalizar campaña"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
