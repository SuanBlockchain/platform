import React, { Component } from "react";

// import '@aws-amplify/ui-react/styles.css'
// Bootstrap
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
// Auth css custom
import Bootstrap from "../../common/themes";
// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import {
  createFeatureType,
  updateFeatureType,
} from "../../../graphql/mutations";

class FeaturesType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      featureTypes: [],
      newFeatureType: {
        id: "",
        name: "",
        description: "",
      },
    };
    this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this);
    this.handleCRUDFeatureType = this.handleCRUDFeatureType.bind(this);
    this.handleLoadEditFeatureType = this.handleLoadEditFeatureType.bind(this);
  }

  componentDidMount = async () => {};

  /*     async loadFeatureTypes() {
        const listFeatureTypesResult = await API.graphql(graphqlOperation(listFeatureTypes))
        listFeatureTypesResult.data.listFeatureTypes.items.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.setState({featureTypes: listFeatureTypesResult.data.listFeatureTypes.items})
        } */

  handleOnChangeInputForm = async (event) => {
    let tempNewFeatureType = this.state.newFeatureType;
    if (event.target.name === "featureType.name") {
      tempNewFeatureType.name = event.target.value.toUpperCase();
      tempNewFeatureType.name = tempNewFeatureType.name.replace(" ", "");
    }
    if (event.target.name === "featureType.description") {
      tempNewFeatureType.description = event.target.value;
    }

    this.setState({ newFeatureType: tempNewFeatureType });
    this.validateCRUDFeatureType();
  };

  async validateCRUDFeatureType() {
    if (this.state.newFeatureType.name !== "") {
      this.setState({ isCRUDButtonDisable: false });
    }
  }

  async handleCRUDFeatureType() {
    let tempNewFeatureType = this.state.newFeatureType;

    if (this.state.CRUDButtonName === "CREAR") {
      const newFeatureTypeId = this.state.newFeatureType.name;
      tempNewFeatureType.id = newFeatureTypeId;
      await API.graphql(
        graphqlOperation(createFeatureType, { input: tempNewFeatureType })
      );
      await this.cleanFeatureTypeOnCreate();
    }

    if (this.state.CRUDButtonName === "UPDATE") {
      delete tempNewFeatureType.createdAt;
      delete tempNewFeatureType.updatedAt;
      delete tempNewFeatureType.features;

      await API.graphql(
        graphqlOperation(updateFeatureType, { input: tempNewFeatureType })
      );
      await this.cleanFeatureTypeOnCreate();
    }
  }

  handleLoadEditFeatureType = async (featureType, event) => {
    this.setState({
      newFeatureType: featureType,
      CRUDButtonName: "UPDATE",
      isCRUDButtonDisable: false,
    });
    this.validateCRUDFeatureType();
  };

  async cleanFeatureTypeOnCreate() {
    this.setState({
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      newFeatureType: {
        id: "",
        name: "",
        description: "",
      },
    });
  }

  render() {
    let { newFeatureType, CRUDButtonName } = this.state;
    let { featureTypes } = this.props;

    const renderFeatureTypes = () => {
      if (featureTypes.length > 0) {
        return (
          <div className="container mx-auto max-h-screen overflow-y-scroll">
            <h2 className="text-xl font-semibold mb-4">Features Types</h2>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200 w-full">
                  <th className="border p-2 w-full b-[1px]">Name</th>
                  <th className="border p-2 w-full b-[1px]">Description</th>
                  <th className="border p-2 w-full b-[1px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {featureTypes.map((featuresType, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border p-2">{featuresType.name}</td>
                    <td className="border p-2">{featuresType.description}</td>
                    <td className="border p-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        onClick={(e) =>
                          this.handleLoadEditFeatureType(featuresType, e)
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
        );
      }
    };

    return (
      <div className="container mx-auto  bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {CRUDButtonName} Tipo de Característica: {newFeatureType.name}
          </h2>
          <form className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="w-full">
                <label htmlFor="formGridNewFeatureName" className="block">
                  Nombre
                </label>
                <input
                  type="text"
                  id="formGridNewFeatureName"
                  className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                  placeholder="Nombre..."
                  name="featureType.name"
                  value={newFeatureType.name}
                  onChange={(e) => this.handleOnChangeInputForm(e)}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="formGridNewFeatureDescription"
                  className="block"
                >
                  Descripción
                </label>
                <input
                  type="text"
                  id="formGridNewFeatureDescription"
                  className="block w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:outline-none focus:border-blue-500"
                  placeholder="Descripción..."
                  name="featureType.description"
                  value={newFeatureType.description}
                  onChange={(e) => this.handleOnChangeInputForm(e)}
                />
              </div>
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={this.handleCRUDFeatureType}
                disabled={this.state.isCRUDButtonDisable}
              >
                {CRUDButtonName}
              </button>
            </div>
          </form>
        </div>
        {renderFeatureTypes()}
      </div>
    );
  }
}

export default FeaturesType;
