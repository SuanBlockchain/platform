import React, { Component } from "react";
//Bootstrap
import {
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import {
  createUserProduct,
  updateUser,
  createVerification,
  deleteUserProduct,
} from "../../../graphql/mutations";
import {
  onCreateUserProduct,
  onCreateVerification,
  onDeleteUserProduct,
} from "../../../graphql/subscriptions";
import { listProducts, listUserProducts, listUsers } from "../../../graphql/queries";
import { graphql } from "graphql";
import { XIcon } from "components/common/icons/XIcon";
import { notify } from "utilities/notify";

export const listproductsAssignPF = /* GraphQL */ `
  query Listproducts(
    $filter: ModelProductFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listproducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isVerifable
        product {
          name
          description
          userProducts {
            items {
              id
              user {
                name
                role
                id
              }
            }
          }
        }
        featureID
        feature {
          id
          name
          description
          isVerifable
          featureTypeID
        }
        documents {
          items {
            status
          }
        }
        verifications {
          items {
            id
            userVerifiedID
            userVerifierID
            userVerifier {
              name
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const listProductsAssign = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        categoryID
        productFeatures {
          items {
            id
            product {
              userProducts {
                items {
                  id
                  user {
                    name
                    role
                    id
                  }
                }
              }
            }
            featureID
            feature {
              id
              name
              description
              isVerifable
              featureTypeID
            }
            documents {
              items {
                id
                status
              }
            }
            verifications {
              items {
                id
                userVerifiedID
                userVerifierID
                userVerifier {
                  name
                }
              }
            }
          }
        }
        userProducts {
          items {
            id
            user {
              name
              role
              id
            }
          }
        }
        transactions {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
const listUserValidators = `
query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      email
      isProfileUpdated
      role
      subrole
      status
      createdAt
    }
    nextToken
  }
}
`;
export default class AssignPF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validators: [],
      products: [],
      availableProducts: [],
      userProducts: [],
      selectedValidator: "",
      selectedProduct: "",
      showSuccess: false,
      showError: false,
      showDeleteSuccess: false,
    };
  }

  async componentDidMount() {
    try {
      await Promise.all([
        this.loadValidators(),
        this.loadProducts(),
        this.loadUserProducts(),
      ]);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }

  async loadValidators() {
    const filter = {
      or: [
        { role: { eq: "validator" } },
        { role: { eq: "validator_financial" } },
      ],
    };
    try {
      const result = await API.graphql(graphqlOperation(listUsers, { filter }));
      this.setState({ validators: result.data.listUsers.items });
    } catch (error) {
      console.error("Error al cargar validadores:", error);
    }
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
      const validUserProducts = result.data.listUserProducts.items.filter(
        (up) =>
          up.product !== null &&
          up.user !== null &&
          ["validator", "validator_financial"].includes(up.user.role)
      );
      this.setState({ userProducts: validUserProducts });
    } catch (error) {
      console.error("Error al cargar asignaciones:", error);
    }
  }

  handleSelectValidator = (validatorId) => {
    const { userProducts, products } = this.state;
  
    // Obtener los IDs de los productos asignados al consultor seleccionado
    const assignedProductIds = userProducts
      .filter((up) => up.user.id === validatorId)
      .map((up) => up.product.id);
  
    // Filtrar productos disponibles
    const availableProducts = products.filter(
      (product) => !assignedProductIds.includes(product.id)
    );
  
    this.setState({
      selectedValidator: validatorId,
      availableProducts,
      selectedProduct: "", // Reiniciar selección de producto
    });
  };
  

  handleAssignProduct = async () => {
    const { selectedValidator, selectedProduct } = this.state;

    if (!selectedValidator || !selectedProduct) {
      this.setState({ showError: true });
      return;
    }

    const payload = {
      userID: selectedValidator,
      productID: selectedProduct,
    };

    try {
      await API.graphql(graphqlOperation(createUserProduct, { input: payload }));
      this.setState({
        selectedValidator: "",
        selectedProduct: "",
        showSuccess: true,
        showError: false,
      });
      await this.loadUserProducts();
      this.handleSelectValidator(selectedValidator);
    } catch (error) {
      console.error("Error al asignar Consultor:", error);
    }
  };

  handleDeleteAssignment = async (assignmentId) => {
    try {
      await API.graphql(
        graphqlOperation(deleteUserProduct, { input: { id: assignmentId } })
      );
      this.setState({ showDeleteSuccess: true });
      await this.loadUserProducts();
      if (this.state.selectedValidator) {
        this.handleSelectValidator(this.state.selectedValidator); // Actualizar productos disponibles
      }
    } catch (error) {
      console.error("Error al eliminar asignación:", error);
    }
  };

  render() {
    const {
      validators,
      products,
      userProducts,
      selectedValidator,
      selectedProduct,
      showSuccess,
      showError,
      showDeleteSuccess,
    } = this.state;
    

    return (
      <div className="container-fluid bg-tecnologia p-5" id="tecnologia">
        <Container className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-center mb-4">Asignar Consultor</h2>

          {/* Mensajes de alerta */}
          {showSuccess && (
            <Alert
              variant="success"
              onClose={() => this.setState({ showSuccess: false })}
              dismissible
            >
              Consultor asignado correctamente.
            </Alert>
          )}
          {showError && (
            <Alert
              variant="danger"
              onClose={() => this.setState({ showError: false })}
              dismissible
            >
              Por favor, seleccione un consultor y un producto antes de continuar.
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
          <Form>
            <Form.Group controlId="selectValidator" className="mb-3">
              <Form.Label>Seleccionar consultor</Form.Label>
              <Form.Select
                value={selectedValidator}
                onChange={(e) =>
                  this.setState({ selectedValidator: e.target.value })
                }
              >
                <option value="">-- Seleccione un consultor --</option>
                {validators.map((validator) => (
                  <option key={validator.id} value={validator.id}>
                    {validator.name}
                    {validator.role === "validator_financial" ? " (Financiero)" : ""}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="selectProduct" className="mb-3">
  <Form.Label>Seleccionar Producto</Form.Label>
  <Form.Select
    value={selectedProduct}
    onChange={(e) => this.setState({ selectedProduct: e.target.value })}
    disabled={!selectedValidator} // Deshabilitar si no hay consultor seleccionado
  >
    <option value="">-- Seleccione un producto --</option>
    {this.state.availableProducts.map((product) => (
      <option key={product.id} value={product.id}>
        {product.name} {product.campaign ? `(${product.campaign.name})` : ""}
      </option>
    ))}
  </Form.Select>
</Form.Group>



            <div className="text-center">
              <Button
                variant="primary"
                onClick={this.handleAssignProduct}
                disabled={!selectedValidator || !selectedProduct}
              >
                Asignar Consultor
              </Button>
            </div>
          </Form>
        </Container>

        <Container className="bg-white mt-4 p-4 rounded-lg shadow-sm">
          <h4 className="text-center mb-4">Validadores Asignados</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Consultor</th>
                <th>Producto</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {userProducts.length > 0 ? (
                userProducts.map((up) => (
                  <tr key={up.id}>
                    <td>
                      {up.user.name}
                      {up.user.role === "validator" ? " (Consultor)" : " (Financiero)"}
                    </td>
                    <td>{up.product.name}</td>
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
                    No hay validadores asignados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}