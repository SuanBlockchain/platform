import React, { Component } from "react";
import { Container, Table, Form, Button, Alert } from "react-bootstrap";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

import { listProducts, listUserProducts } from "graphql/queries";
import { createUserProduct, deleteUserProduct } from "graphql/mutations";

const listAnalysts = /* GraphQL */ `
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

export default class AssignAnalyst extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analysts: [],
      products: [],
      availableProducts: [],
      userProducts: [],
      selectedAnalyst: "",
      selectedProduct: "",
      showSuccess: false,
      showError: false,
      showDeleteSuccess: false, // Estado para mostrar el mensaje de eliminación
    };
  }

  componentDidMount = async () => {
    try {
      await Promise.all([
        this.loadAnalysts(),
        this.loadProducts(),
        this.loadUserProducts(),
      ]);
    } catch (error) {
      console.error("Error cargando los datos:", error);
    }
  };

  async loadAnalysts() {
    const filter = { role: { eq: "analyst" } };
    return API.graphql(graphqlOperation(listAnalysts, { filter })).then(
      (result) => {
        this.setState({ analysts: result.data.listUsers.items });
      }
    );
  }

  async loadProducts() {
    try {
      const result = await API.graphql(graphqlOperation(listProducts));
      this.setState({ products: result.data.listProducts.items });
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  async loadUserProducts() {
    try {
      const result = await API.graphql(graphqlOperation(listUserProducts));
      const filteredUserProducts = result.data.listUserProducts.items.filter(
        (up) => up.user?.role === "analyst"
      );
      this.setState({ userProducts: filteredUserProducts });
    } catch (error) {
      console.error("Error al cargar productos asignados:", error);
    }
  }

  handleSelectAnalyst = (analystId) => {
    const { userProducts, products } = this.state;

    // Obtener los IDs de los productos asignados al analista seleccionado
    const assignedProductIds = userProducts
      .filter((up) => up.userID === analystId)
      .map((up) => up.productID);

    // Filtrar productos disponibles para este analista
    const availableProducts = products.filter(
      (product) => !assignedProductIds.includes(product.id)
    );

    this.setState({
      selectedAnalyst: analystId,
      availableProducts, // Actualizar productos disponibles para este analista
      selectedProduct: "", // Reiniciar la selección del producto
    });
  };

  handleAssignAnalyst = async () => {
    const { selectedAnalyst, selectedProduct } = this.state;

    if (!selectedAnalyst || !selectedProduct) {
      this.setState({ showError: true });
      return;
    }

    const payload = {
      id: uuidv4(),
      userID: selectedAnalyst,
      productID: selectedProduct,
    };

    await API.graphql(graphqlOperation(createUserProduct, { input: payload }));
    this.setState({
      selectedAnalyst: "",
      selectedProduct: "",
      showSuccess: true,
      showError: false,
    });
    await this.loadUserProducts();
    this.handleSelectAnalyst(selectedAnalyst);
  };

  handleDeleteAssignment = async (userProductId) => {
    try {
      await API.graphql(
        graphqlOperation(deleteUserProduct, { input: { id: userProductId } })
      );
      await this.loadUserProducts(); // Refresh the user-products table
      if (this.state.selectedAnalyst) {
        this.handleSelectAnalyst(this.state.selectedAnalyst); // Actualizar productos disponibles
      }
      this.setState({ showDeleteSuccess: true }); // Mostrar mensaje de éxito
    } catch (error) {
      console.error("Error al eliminar asignación:", error);
      alert("Error al eliminar la asignación.");
    }
  };

  render() {
    const {
      analysts,
      products,
      userProducts,
      selectedAnalyst,
      selectedProduct,
      showSuccess,
      showError,
      showDeleteSuccess, // Estado del mensaje de eliminación
    } = this.state;

    return (
      <div className="container mx-auto mt-20">
        <div className="flex flex-col mb-8 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-center mb-4">Asignar Analista</h2>

          {/* Mensajes de alerta */}
          {showSuccess && (
            <Alert
              variant="success"
              onClose={() => this.setState({ showSuccess: false })}
              dismissible
            >
              Analista asignado correctamente.
            </Alert>
          )}
          {showError && (
            <Alert
              variant="danger"
              onClose={() => this.setState({ showError: false })}
              dismissible
            >
              Por favor, seleccione un analista y un producto antes de
              continuar.
            </Alert>
          )}
          {showDeleteSuccess && (
            <Alert
              variant="warning"
              onClose={() => this.setState({ showDeleteSuccess: false })}
              dismissible
            >
              Asignación eliminada correctamente.
            </Alert>
          )}

          {/* Formulario de selección */}
          <Form className="mb-4">
            <Form.Group controlId="selectAnalyst" className="mb-3">
              <Form.Label>Seleccionar Analista</Form.Label>
              <Form.Select
                value={selectedAnalyst}
                onChange={(e) => this.handleSelectAnalyst(e.target.value)}
              >
                <option value="">-- Seleccione un analista --</option>
                {analysts.map((analyst) => (
                  <option key={analyst.id} value={analyst.id}>
                    {analyst.name} ({analyst.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="selectProduct" className="mb-3">
              <Form.Label>Seleccionar Producto</Form.Label>
              <Form.Select
                value={selectedProduct}
                onChange={(e) =>
                  this.setState({ selectedProduct: e.target.value })
                }
                disabled={!selectedAnalyst}
              >
                <option value="">-- Seleccione un Producto --</option>
                {this.state.availableProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.categoryID})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="text-center">
              <Button
                variant="primary"
                onClick={this.handleAssignAnalyst}
                disabled={!selectedAnalyst || !selectedProduct}
              >
                Asignar Analista
              </Button>
            </div>
          </Form>

        </div>

        <div className="flex flex-col mb-8 p-4 bg-white rounded-md shadow-md">
          <h4 className="text-center mb-4">Analistas Asignados</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre del Analista</th>
                <th>Producto Asignado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {userProducts.length > 0 ? (
                userProducts.map((up) => (
                  <tr key={up.id}>
                    <td>{up.user?.name || "Desconocido"}</td>
                    <td>{up.product?.name || "Sin nombre"}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => this.handleDeleteAssignment(up.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No hay analistas asignados todavía.
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
