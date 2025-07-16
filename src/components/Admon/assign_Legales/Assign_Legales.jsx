import React, { Component } from "react";
import { Container, Table, Form, Button, Alert } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { listProperties } from "utilities/customQueries";
import { updateProperty } from "graphql/mutations";

const listLegales = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput) {
    listUsers(filter: $filter) {
      items {
        id
        name
        email
        role
      }
    }
  }
`;

export default class AssignLegal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legales: [],
      properties: [],
      availableProperties: [],
      selectedLegal: "",
      selectedProperty: "",
      showSuccess: false,
      showError: false,
      showDeleteSuccess: false,
    };
  }

  componentDidMount = async () => {
    try {
      await Promise.all([this.loadLegales(), this.loadProperties()]);
    } catch (error) {
      console.error("Error cargando los datos:", error);
    }
  };

  async loadLegales() {
    const filter = { role: { eq: "legal" } };
    return API.graphql(graphqlOperation(listLegales, { filter })).then(
      (result) => {
        this.setState({ legales: result.data.listUsers.items });
      }
    );
  }

  async loadProperties() {
    try {
      const result = await API.graphql(graphqlOperation(listProperties));
      this.setState({ properties: result.data.listProperties.items });
    } catch (error) {
      console.error("Error al cargar propiedades:", error);
    }
  }

  handleSelectLegal = (legalId) => {
    const { properties } = this.state;

    const availableProperties = properties.filter(
      (property) => !property.userLegalID || property.userLegalID === ""
    );

    this.setState({
      selectedLegal: legalId,
      availableProperties,
      selectedProperty: "",
    });
  };

  handleAssignLegal = async () => {
    const { selectedLegal, selectedProperty } = this.state;

    if (!selectedLegal || !selectedProperty) {
      this.setState({ showError: true });
      return;
    }

    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: selectedProperty,
            userLegalID: selectedLegal,
          },
        })
      );

      this.setState((prevState) => ({
        properties: prevState.properties.map((prop) =>
          prop.id === selectedProperty
            ? { ...prop, userLegalID: selectedLegal }
            : prop
        ),
        selectedLegal: "",
        selectedProperty: "",
        showSuccess: true,
        showError: false,
      }));
    } catch (error) {
      console.error("Error al asignar usuario legal a la propiedad:", error);
      this.setState({ showError: true });
    }
  };

  handleDeleteAssignment = async (propertyId) => {
    if (!propertyId) return;

    try {
      await API.graphql(
        graphqlOperation(updateProperty, {
          input: {
            id: propertyId,
            userLegalID: "",
          },
        })
      );

      this.setState((prevState) => ({
        properties: prevState.properties.map((prop) =>
          prop.id === propertyId ? { ...prop, userLegalID: "" } : prop
        ),
        showDeleteSuccess: true,
      }));
    } catch (error) {
      console.error("Error al eliminar asignación:", error);
      alert("Error al eliminar la asignación.");
    }
  };

  renderAlert(type, message, onClose) {
    return (
      <Alert variant={type} onClose={onClose} dismissible>
        {message}
      </Alert>
    );
  }

  render() {
    const {
      legales,
      availableProperties,
      properties,
      selectedLegal,
      selectedProperty,
      showSuccess,
      showError,
      showDeleteSuccess,
    } = this.state;

    return (
      <div className="container mx-auto mt-20">
        <div className="flex flex-col mb-8 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-center mb-4">Asignar Usuario Legal</h2>

          {showSuccess &&
            this.renderAlert(
              "success",
              "Usuario legal asignado correctamente.",
              () => this.setState({ showSuccess: false })
            )}
          {showError &&
            this.renderAlert(
              "danger",
              "Seleccione un usuario legal y una propiedad antes de continuar.",
              () => this.setState({ showError: false })
            )}
          {showDeleteSuccess &&
            this.renderAlert(
              "warning",
              "Asignación eliminada correctamente.",
              () => this.setState({ showDeleteSuccess: false })
            )}

          {/* Formulario */}
          <Form className="mb-4">
            <Form.Group controlId="selectLegal" className="mb-3">
              <Form.Label>Seleccionar Usuario Legal</Form.Label>
              <Form.Select
                value={selectedLegal}
                onChange={(e) => this.handleSelectLegal(e.target.value)}
              >
                <option value="">-- Seleccione un usuario legal --</option>
                {legales.map((legal) => (
                  <option key={legal.id} value={legal.id}>
                    {legal.name} ({legal.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="selectProperty" className="mb-3">
              <Form.Label>Seleccionar Propiedad</Form.Label>
              <Form.Select
                value={selectedProperty}
                onChange={(e) =>
                  this.setState({ selectedProperty: e.target.value })
                }
                disabled={!selectedLegal}
              >
                <option value="">-- Seleccione una Propiedad --</option>
                {availableProperties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name} (
                    {property.campaign ? property.campaign.name : "Sin campaña"}
                    )
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="text-center">
              <Button
                variant="primary"
                onClick={this.handleAssignLegal}
                disabled={!selectedLegal || !selectedProperty}
              >
                Asignar Usuario Legal
              </Button>
            </div>
          </Form>
        </div>

        <div className="flex flex-col mb-8 p-4 bg-white rounded-md shadow-md">
          <h4 className="text-center mb-4">Usuarios Legales Asignados</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre del Usuario Legal</th>
                <th>Propiedad Asignada</th>
                <th>Campaña</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties
                  .filter((prop) => prop.userLegalID) // Solo muestra propiedades con un usuario legal asignado
                  .map((prop) => {
                    const legalUser = legales.find(
                      (l) => l.id === prop.userLegalID
                    );
                    return (
                      <tr key={prop.id}>
                        <td>{legalUser ? legalUser.name : "Desconocido"}</td>
                        <td>{prop.name || "Sin nombre"}</td>
                        <td>
                          {prop.campaign ? prop.campaign.name : "Sin campaña"}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => this.handleDeleteAssignment(prop.id)}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No hay usuarios legales asignados todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
