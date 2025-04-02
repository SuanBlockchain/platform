import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import { updateCampaign } from 'graphql/customMutations';
import { toast } from 'react-toastify';

export default function ModalEditCampaign({ showModal, handleClose, campaign, fetchCampaign }) {
  const [name, setName] = useState(campaign.name || '');
  const [description, setDescription] = useState(campaign.description || '');
  const [endDate, setEndDate] = useState(
    campaign.endDate ? new Date(campaign.endDate * 1000).toISOString().split('T')[0] : ''
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showModal && campaign) {
      setName(campaign.name || '');
      setDescription(campaign.description || '');
      setEndDate(campaign.endDate ? new Date(campaign.endDate * 1000).toISOString().split('T')[0] : '');
    }
  }, [showModal, campaign]);

  const handleSave = async () => {
    setLoading(true);
    const duplicates = await checkDuplicateCampaignName(name);
      if (duplicates.length > 0 && duplicates[0].id !== campaign.id) {
        toast.error("El nombre de la campaña ya existe. Por favor, elige otro.");
        setLoading(false);
        return;
      }
    try {
      const timestampData = {
        id: campaign.id,
        name,
        description,
        endDate: endDate ? Math.floor(new Date(endDate).getTime() / 1000) : null,
      };      

      await API.graphql(graphqlOperation(updateCampaign, { input: timestampData }));
      await fetchCampaign();
      handleClose();
    } catch (error) {
      console.error('Error al actualizar la campaña:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkDuplicateCampaignName = async (name) => {
    const query = `
      query CheckDuplicateCampaign($filter: ModelCampaignFilterInput) {
        listCampaigns(filter: $filter) {
          items {
            id
            name
          }
        }
      }
    `;
  
    try {
      const result = await API.graphql(
        graphqlOperation(query, {
          filter: {
            name: { eq: name },
          },
        })
      );
      return result.data.listCampaigns.items;
    } catch (error) {
      console.error("Error verificando nombres duplicados:", error);
      return [];
    }
  };
  

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title as="h1" className="text-lg text-gray-700">
          Editar convocatoria
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campo para editar el nombre */}
          <Form.Group className="pb-4" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingrese el nombre de la campaña"
              required
            />
          </Form.Group>

          {/* Campo para editar la descripción */}
          <Form.Group className="pb-4" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ingrese una descripción"
              required
              className="h-28"
            />
          </Form.Group>

          {/* Campo para editar la fecha de finalización */}
          <Form.Group className="pb-4" controlId="endDate">
            <Form.Label>Fecha de finalización</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Guardar Cambios'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
