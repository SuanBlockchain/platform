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
import awsconfig from "../../../aws-exports";


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
class Validators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validators: [],
      newUser: {
        id: "",
        username: "",
        email: "",
        role: "validator",
        subRole: "financial",
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
    // OnCreate User
    await this.loadValidatorUsers();
    this.createValidatorListener = API.graphql(
      graphqlOperation(onCreateUser)
    ).subscribe({
      next: (createdUser) => {
        this.loadValidatorUsers();
      },
    });
    this.deleteValidatorListener = API.graphql(
      graphqlOperation(onDeleteUser)
    ).subscribe({
      next: (deleteUser) => {
        this.loadValidatorUsers();
      },
    });
    this.updateUserListener = API.graphql(
      graphqlOperation(onUpdateUser)
    ).subscribe({
      next: (updatedUserData) => {
        let tempValidators = this.state.validators.map((mapValidators) => {
          if (updatedUserData.value.data.onUpdateUser.id === mapValidators.id) {
            return updatedUserData.value.data.onUpdateUser;
          } else {
            return mapValidators;
          }
        });
        this.setState({ validators: tempValidators });
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
      .then((result) => {
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
    // Set the user to delete and show the modal
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
        showModal: false, // Hide the modal after confirmation
      });
    }
  }
  async loadValidatorUsers() {
    let filter = {
      role: {
        contains: "validator",
      },
    };
    const listUsersResult = await API.graphql({
      query: listUserValidators,
      variables: { filter: filter },
    });
    this.setState({ validators: listUsersResult.data.listUsers.items });
  }

  validateForm = () => {
    const { username, email } = this.state.newUser;
    const errors = {};
  
    // Validar nombre de usuario
    if (!username.trim()) {
      errors.username = "El nombre de usuario es obligatorio.";
    } else if (username.length < 3) {
      errors.username = "El nombre de usuario debe tener al menos 3 caracteres.";
    }
  
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(email)) {
      errors.email = "El correo electrónico no es válido.";
    }
  
    this.setState({ errors, showErrors: true }); // Activar la visualización de errores
    return Object.keys(errors).length === 0; // Retorna true si no hay errores
  };
  
  
  handleOnChangeInputForm = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const updatedUser = {
        ...prevState.newUser,
        [name]: value,
      };
  
      // Si se ha intentado enviar el formulario, validar en tiempo real
      const updatedErrors = { ...prevState.errors };
      if (prevState.showErrors) {
        if (name === "username") {
          if (!value.trim()) {
            updatedErrors.username = "El nombre de usuario es obligatorio.";
          } else if (value.length < 3) {
            updatedErrors.username = "El nombre de usuario debe tener al menos 3 caracteres.";
          } else {
            delete updatedErrors.username; // Eliminar el error si es válido
          }
        }
  
        if (name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value.trim()) {
            updatedErrors.email = "El correo electrónico es obligatorio.";
          } else if (!emailRegex.test(value)) {
            updatedErrors.email = "El correo electrónico no es válido.";
          } else {
            delete updatedErrors.email; // Eliminar el error si es válido
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
        role: "validator",
        subRole: "financial",
      },
      showModalCreate: false,
      errors: {},
    });
  }
  async signUp() {
    const { username, email, role, subRole } = this.state.newUser;
    if (username !== "" && email !== "") {
      try {
        const userPayload = {
          id: uuidv4().split("-")[4],
          name: username,
          email: email,
          isProfileUpdated: false,
          role: `${role}_${subRole}`,
        };
        await API.graphql(graphqlOperation(createUser, { input: userPayload }));
      } catch (error) {
        console.log(
           "El nombre de usuario ya existe. Por favor, escoja otro."
        );
      }
    } else {
      console.log("Agregar usuario e email");
    }
  }
  render() {
    let { validators, newUser, errors } = this.state;

    const renderValidators = () => {
      if (validators.length > 0) {
        return (
          <div className="container mx-auto mt-8 bg-white p-4 rounded-lg shadow-sm mb-4">
            <h4 className="text-lg font-semibold mb-4">Lista Consultores</h4>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Nombe</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Subrol</th>
                    <th className="border px-4 py-2">Creado:</th>
                    <th className="border px-4 py-2">Confirmacion</th>
                    <th className="border px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {validators.map((validator) => (
                    <tr key={validator.id}>
                      <td className="border px-4 py-2">{validator.name}</td>
                      <td className="border px-4 py-2">{validator.email}</td>
                      <td className="border px-4 py-2">{validator.subrole}</td>
                      <td className="border px-4 py-2">
                        {`${validator.createdAt.split("T")[0].split("-")[2]}-${
                          validator.createdAt.split("T")[0].split("-")[1]
                        }-${validator.createdAt.split("T")[0].split("-")[0]}`}
                      </td>
                      <td className="border px-4 py-2">
                        {validator.isProfileUpdated ? "Confirmado" : "Pendiente"}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                          onClick={() =>
                            this.showModalDelete({
                              id: validator.id,
                              username: validator.name,
                            })
                          }
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    };

    return (
      <div className="container mx-auto ">
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm mb-4">
          <h4 className="text-lg">Crear un nuevo consultor</h4>
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
                type="email"
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
            <div className="mb-4">
              <label
                htmlFor="formGridValidatorType"
                className="block font-semibold"
              >
               Tipo de consultor
              </label>
              <select
                id="formGridValidatorType"
                name="subRole"
                value={newUser.subRole}
                onChange={(e) => this.handleOnChangeInputForm(e)}
                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              >
                <option value="financial">Financiero</option>
                <option value="technical">Técnico</option>
                <option value="fullaccessvalidator">Full access</option>
              </select>
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
        {renderValidators()}
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
          style={{ maxWidth: "fit-content", margin: "auto", position:"absolute", left:"25%" }} 
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
                  <th className="border px-4 py-2">Sub rol</th>
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
                  <td className="border px-4 py-2">
                    {this.state.newUser.subRole}
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
              className="bg-[#6e6c35] border-1 border-dark hover:bg-[#6e6c35] border-1 border-dark text-white font-bold py-2 px-4 rounded"
            >
              Confirmar
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Validators;