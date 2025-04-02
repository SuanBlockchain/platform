import React, { Component } from "react";
// import '@aws-amplify/ui-react/styles.css'
// Bootstrap
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
// Auth css custom
// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import {
  createUnitOfMeasure,
  updateUnitOfMeasure,
} from "../../../graphql/mutations";
import { listUnitOfMeasures } from "../../../graphql/queries";
import {
  onCreateUnitOfMeasure,
  onUpdateUnitOfMeasure,
} from "../../../graphql/subscriptions";

class UOM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitOfMeasures: [],
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      newUnitOfMeasure: {
        id: "",
        engineeringUnit: "",
        description: "",
        isFloat: false,
      },
    };
    this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this);
    this.handleCRUDUnitOfMeasure = this.handleCRUDUnitOfMeasure.bind(this);
    this.handleLoadEditUnitOfMeasure =
      this.handleLoadEditUnitOfMeasure.bind(this);
  }

  componentDidMount = async () => {
    await this.loadUnitOfMeasures();

    // Subscriptions
    // OnCreate OUM
    let tempUnitOfMeasures = this.state.unitOfMeasures;
    this.createUnitOfMeasureListener = API.graphql(
      graphqlOperation(onCreateUnitOfMeasure)
    ).subscribe({
      next: (createdUnitOfMeasureData) => {
        let tempOnCreateUnitOfMeasure =
          createdUnitOfMeasureData.value.data.onCreateUnitOfMeasure;
        tempUnitOfMeasures.push(tempOnCreateUnitOfMeasure);
        // Ordering categorys by name
        tempUnitOfMeasures.sort((a, b) => (a.name > b.name ? 1 : -1));
        // this.updateStateCategorys(tempCategorys)
        this.setState((state) => ({ unitOfMeasures: tempUnitOfMeasures }));
      },
    });

    // OnUpdate OUM
    this.updateCategoryListener = API.graphql(
      graphqlOperation(onUpdateUnitOfMeasure)
    ).subscribe({
      next: (updatedUnitOfMeasureData) => {
        let tempUnitOfMeasures = this.state.unitOfMeasures.map(
          (mapUnitOfMeasure) => {
            if (
              updatedUnitOfMeasureData.value.data.onUpdateUnitOfMeasure.id ===
              mapUnitOfMeasure.id
            ) {
              return updatedUnitOfMeasureData.value.data.onUpdateUnitOfMeasure;
            } else {
              return mapUnitOfMeasure;
            }
          }
        );
        // Ordering categorys by name
        tempUnitOfMeasures.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.setState((state) => ({ unitOfMeasures: tempUnitOfMeasures }));
      },
    });
  };
  componentWillUnmount() {
    // TODO: Why is not working the unsubscribe
    // this.createUnitOfMeasureListener.unsubscribe();
    // this.updateCategoryListener.unsubscribe();
  }

  async loadUnitOfMeasures() {
    const listUnitOfMeasuresResult = await API.graphql(
      graphqlOperation(listUnitOfMeasures)
    );
    listUnitOfMeasuresResult.data.listUnitOfMeasures.items.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    this.setState({
      unitOfMeasures: listUnitOfMeasuresResult.data.listUnitOfMeasures.items,
    });
  }

  handleOnChangeInputForm = async (event, pProperty) => {
    let tempNewUnitOfMeasure = this.state.newUnitOfMeasure;
    if (event.target.name === "newUnitOfMeasure.engineeringUnit") {
      tempNewUnitOfMeasure.engineeringUnit = event.target.value;
      tempNewUnitOfMeasure.id = event.target.value.replaceAll(" ", "_");
    }
    if (event.target.name === "newUnitOfMeasure.description") {
      tempNewUnitOfMeasure.description = event.target.value;
    }
    if (pProperty === "isFloat") {
      tempNewUnitOfMeasure.isFloat = !tempNewUnitOfMeasure.isFloat;
    }
    this.setState({ newUnitOfMeasure: tempNewUnitOfMeasure });
    this.validateCRUDUnitOfMeasure();
  };

  async validateCRUDUnitOfMeasure() {
    if (this.state.newUnitOfMeasure.name !== "") {
      this.setState({ isCRUDButtonDisable: false });
    }
  }

  async handleCRUDUnitOfMeasure() {
    let tempNewUnitOfMeasure = this.state.newUnitOfMeasure;

    if (this.state.CRUDButtonName === "CREAR") {
      await API.graphql(
        graphqlOperation(createUnitOfMeasure, { input: tempNewUnitOfMeasure })
      );
      await this.cleanUnitOfMeasureOnCreate();
    }

    if (this.state.CRUDButtonName === "UPDATE") {
      delete tempNewUnitOfMeasure.createdAt;
      delete tempNewUnitOfMeasure.updatedAt;
      delete tempNewUnitOfMeasure.formulas;
      delete tempNewUnitOfMeasure.features;
      await API.graphql(
        graphqlOperation(updateUnitOfMeasure, { input: tempNewUnitOfMeasure })
      );
      await this.cleanUnitOfMeasureOnCreate();
    }
  }

  handleLoadEditUnitOfMeasure = async (unitOfMeasures, event) => {
    this.setState({
      newUnitOfMeasure: unitOfMeasures,
      CRUDButtonName: "UPDATE",
      isCRUDButtonDisable: false,
    });
    this.validateCRUDUnitOfMeasure();
  };

  async cleanUnitOfMeasureOnCreate() {
    this.setState({
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      newUnitOfMeasure: {
        id: "",
        engineeringUnit: "",
        description: "",
        isFloat: false,
      },
    });
  }

  // RENDER
  render() {
    // State Varibles
    let { unitOfMeasures, newUnitOfMeasure, CRUDButtonName } = this.state;

    const renderUnitOfMeasures = () => {
      if (unitOfMeasures.length > 0) {
        return (
          <div className="container mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-4">Unit of Measures</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Engineering Unit</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Is Float</th>
                    <th className="border px-4 py-2">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {unitOfMeasures.map((unitOfMeasure) => (
                    <tr key={unitOfMeasure.id}>
                      <td className="border px-4 py-2">
                        {unitOfMeasure.engineeringUnit}
                      </td>
                      <td className="border px-4 py-2">
                        {unitOfMeasure.description}
                      </td>
                      <td className="border px-4 py-2">
                        {unitOfMeasure.isFloat ? "Yes" : "No"}
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={(e) =>
                            this.handleLoadEditUnitOfMeasure(unitOfMeasure, e)
                          }
                        >
                          Editar
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
      <div className="container mt-8 mx-auto bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="mt-8 mb-8">
          <h2 className="text-2xl">{CRUDButtonName} Unidad de medida</h2>
          <form className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="formGridEngineeringUnit"
                className="block font-semibold"
              >
                Unidad de Ingeniería
              </label>
              <input
                type="text"
                placeholder=""
                id="formGridEngineeringUnit"
                name="newUnitOfMeasure.engineeringUnit"
                value={newUnitOfMeasure.engineeringUnit}
                onChange={(e) => this.handleOnChangeInputForm(e)}
                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="formGridDescription"
                className="block font-semibold"
              >
                Descripción
              </label>
              <input
                type="text"
                placeholder=""
                id="formGridDescription"
                name="newUnitOfMeasure.description"
                value={newUnitOfMeasure.description}
                onChange={(e) => this.handleOnChangeInputForm(e)}
                className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">¿Es Float?</label>
              <br />
              <button
                type="button"
                onClick={(e) => this.handleOnChangeInputForm(e, "isFloat")}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  newUnitOfMeasure.isFloat ? "bg-blue-700" : ""
                }`}
              >
                {newUnitOfMeasure.isFloat ? "SI" : "NO"}
              </button>
            </div>
            <button
              type="button"
              onClick={this.handleCRUDUnitOfMeasure}
              disabled={this.state.isCRUDButtonDisable}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {CRUDButtonName}
            </button>
          </form>
        </div>
        {renderUnitOfMeasures()}
      </div>
    );
  }
}

export default UOM;
