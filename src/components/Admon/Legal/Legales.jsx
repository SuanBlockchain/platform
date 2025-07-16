import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
  Modal,
} from "react-bootstrap";

import { API, graphqlOperation, Auth } from "aws-amplify";
import {
  onCreateUser,
  onUpdateUser,
  onDeleteUser,
} from "../../../graphql/subscriptions";
import {
  createUser,
  updateUser,
  deleteUser,
  deleteUserProduct,
} from "../../../graphql/mutations";
import { listUserProducts } from "../../../graphql/queries";
import { v4 as uuidv4 } from "uuid";

const listUserLegales = `
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
      status
      createdAt
    }
    nextToken
  }
}
`;

class Legales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legales: [],
      newUser: {
        id: "",
        username: "",
        email: "",
        role: "legal",
      },
      errors: {},
      showErrors: false,
      showModal: false,
      showModalCreate: false,
      userToDelete: { id: null, username: null },
    };
    this.handleCRUDUser = this.handleCRUDUser.bind(this);
  }

  componentDidMount = async () => {
    await this.loadLegalesUsers();
    this.createLegalListener = API.graphql(
      graphqlOperation(onCreateUser)
    ).subscribe({
      next: (createdUser) => {
        this.loadLegalesUsers();
      },
    });
    this.deleteLegalListener = API.graphql(
      graphqlOperation(onDeleteUser)
    ).subscribe({
      next: (deleteUser) => {
        this.loadLegalesUsers();
      },
    });
    this.updateUserListener = API.graphql(
      graphqlOperation(onUpdateUser)
    ).subscribe({
      next: (updatedUserData) => {
        let tempLegales = this.state.legales.map((mapLegales) => {
          if (updatedUserData.value.data.onUpdateUser.id === mapLegales.id) {
            return updatedUserData.value.data.onUpdateUser;
          } else {
            return mapLegales;
          }
        });
        this.setState({ legales: tempLegales });
      },
    });
  };

  handleDeleteUser = async (id) => {
    const input = { id };
    let promises = [];
    API.graphql(
      graphqlOperation(listUserProducts, { filter: { userID: { eq: id } } })
    ).then((result) => {
      if (result.data.listUserProducts.items.length > 0) {
        result.data.listUserProducts.items.map((mapUserProducts) => {
          promises.push(
            API.graphql(
              graphqlOperation(deleteUserProduct, {
                input: { id: mapUserProducts.id },
              })
            )
          );
        });
      }
    });
    promises.push(API.graphql(graphqlOperation(deleteUser, { input: input })));
    await Promise.all(promises)
      .then(() => {
        console.log("información eliminada exitosamente");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showModalCreate() {
    this.setState({
      showModalCreate: true,
    });
  }

  showModalDelete(user) {
    this.setState({
      userToDelete: user,
      showModal: true,
    });
  }

  async confirmCreateUser() {
    if (!this.validateForm()) {
      return;
    }
    const { newUser } = this.state;
    if (newUser) {
      await this.handleCRUDUser();
      this.cleanUserOnCreate();
      this.setState({ showErrors: false });
    }
  }

  confirmDeleteUser() {
    const { userToDelete } = this.state;
    if (userToDelete) {
      this.handleDeleteUser(userToDelete.id);
      this.setState({
        userToDelete: { id: null, username: null },
        showModal: false,
      });
    }
  }

  async loadLegalesUsers() {
    let filter = {
      role: {
        contains: "legal", // Filtrar usuarios con rol "legales"
      },
    };
    const listUsersResult = await API.graphql({
      query: listUserLegales,
      variables: { filter: filter },
    });
    this.setState({ legales: listUsersResult.data.listUsers.items });
  }

  validateForm = () => {
    const { username, email } = this.state.newUser;
    const errors = {};

    if (!username.trim()) {
      errors.username = "El nombre de usuario es obligatorio.";
    } else if (username.length < 3) {
      errors.username =
        "El nombre de usuario debe tener al menos 3 caracteres.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(email)) {
      errors.email = "El correo electrónico no es válido.";
    }

    this.setState({ errors, showErrors: true });
    return Object.keys(errors).length === 0; // True si no hay errores
  };

  handleOnChangeInputForm = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedUser = { ...prevState.newUser, [name]: value };

      // Validar en tiempo real solo si ya se ha intentado enviar
      const updatedErrors = { ...prevState.errors };
      if (prevState.showErrors) {
        if (name === "username") {
          if (!value.trim()) {
            updatedErrors.username = "El nombre de usuario es obligatorio.";
          } else if (value.length < 3) {
            updatedErrors.username =
              "El nombre de usuario debe tener al menos 3 caracteres.";
          } else {
            delete updatedErrors.username;
          }
        }

        if (name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value.trim()) {
            updatedErrors.email = "El correo electrónico es obligatorio.";
          } else if (!emailRegex.test(value)) {
            updatedErrors.email = "El correo electrónico no es válido.";
          } else {
            delete updatedErrors.email;
          }
        }
      }

      return { newUser: updatedUser, errors: updatedErrors };
    });
  };

  async handleCRUDUser() {
    let tempNewUser = this.state.newUser;
    await this.signUp(
      tempNewUser.username,
      tempNewUser.email,
      tempNewUser.role
    );
  }

  handleHideModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleHideModalCreate() {
    this.setState({ showModalCreate: !this.state.showModalCreate });
  }

  cleanUserOnCreate() {
    this.setState({
      newUser: {
        id: "",
        username: "",
        email: "",
        role: "legal", // Mantener rol de "legales"
      },
      errors: {},
      showModalCreate: false,
    });
  }

  async signUp() {
    const { username, email, role } = this.state.newUser;
    if (username !== "" && email !== "") {
      try {
        const userPayload = {
          id: uuidv4(),
          name: username,
          email: email,
          isProfileUpdated: false,
          role: `${role}`,
        };
        const response = await API.graphql(
          graphqlOperation(createUser, { input: userPayload })
        );
        this.setState({ message: "Usuario creado exitosamente!" });
        this.handleHideModalCreate();
        this.cleanUserOnCreate();
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Agregar usuario e email");
    }
  }

  render() {
    let { legales, newUser, errors } = this.state;

    const renderLegales = () => {
      if (legales.length > 0) {
        return (
          <div className="flex flex-col mb-8 p-4 bg-white rounded-md shadow-md">
            <h4 className="text-lg font-semibold mb-4">Lista de legal</h4>
            <div className="overflow-x-auto">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Nombre</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Creado :</th>
                    <th className="border px-4 py-2">Confirmacion</th>
                    <th className="border px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {legales.map((legales) => {
                    return (
                      <tr key={legales.id}>
                        <td className="border px-4 py-2">{legales.name}</td>
                        <td className="border px-4 py-2">{legales.email}</td>
                        <td className="border px-4 py-2">
                          {`${legales.createdAt.split("T")[0].split("-")[2]}-${
                            legales.createdAt.split("T")[0].split("-")[1]
                          }-${legales.createdAt.split("T")[0].split("-")[0]}`}
                        </td>
                       <td className="border px-4 py-2">
                      {legales.status === "confirmed" ? "Confirmado" : "Pendiente"}
                          </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              this.showModalDelete({
                                id: legales.id,
                                username: legales.name,
                              })
                            }
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        );
      }
    };

    return (
      <div className="container mx-auto mt-20">
        <div className="flex flex-col mb-8 p-4 bg-white rounded-md shadow-md">
          <h4 className="text-lg">Crea un nuevo legal</h4>
          <form className="mt-4">
            <div className="mb-4">
              <label htmlFor="formGridUsername" className="block font-semibold">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={newUser.username}
                onChange={this.handleOnChangeInputForm}
                className={`block w-full border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mt-1 focus:outline-none`}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="formGridEmail" className="block font-semibold">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={newUser.email}
                onChange={this.handleOnChangeInputForm}
                className={`block w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded px-3 py-2 mt-1 focus:outline-none`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => this.showModalCreate()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Crear
            </button>
          </form>
        </div>
        {renderLegales()}
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`¿Estás seguro que quieres borrar el usuario ${this.state.userToDelete.username}?`}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => this.setState({ showModal: false })}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => this.confirmDeleteUser()}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Eliminar
            </button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={this.state.showModalCreate}
          onHide={() => this.setState({ showModalCreate: false })}
          size="lg"
          style={{
            maxWidth: "fit-content",
            margin: "auto",
            position: "absolute",
            left: "25%",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar datos de nuevo usuario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Nombre</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">
                    {this.state.newUser.username}
                  </td>
                  <td className="border px-4 py-2">
                    {this.state.newUser.email}
                  </td>
                  <td className="border px-4 py-2">
                    {this.state.newUser.role}
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => this.setState({ showModalCreate: false })}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => this.confirmCreateUser()}
              className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Confirmar
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Legales;
