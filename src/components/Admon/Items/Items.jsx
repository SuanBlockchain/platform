import React, { Component } from "react";
// Amplify
// import '@aws-amplify/ui-react/styles.css'
// Bootstrap
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import {
  createProductItem,
  updateProductFeature,
  updateProductItem,
} from "../../../graphql/mutations";
import { listProductItems } from "../../../graphql/queries";
import {
  onCreateProductItem,
  onUpdateProductItem,
} from "../../../graphql/subscriptions";
import { getFilteredProductFeatures } from "services/getFilteredProductFeatures";
import { getProductItemName } from "services/getProductItemName";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      newCategory: { name: "", type: "" },
    };
    this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this);
    this.handleCRUDCategory = this.handleCRUDCategory.bind(this);
    this.handleLoadEditCategory = this.handleLoadEditCategory.bind(this);
  }

  componentDidMount = async () => {
    await this.loadItems();

    // Subscriptions
    // OnCreate Category
    this.createCategoryListener = API.graphql(
      graphqlOperation(onCreateProductItem)
    ).subscribe({
      next: async (createdCategoryData) => {
        await this.loadItems();
      },
    });

    // OnUpdate Category
    this.updateCategoryListener = API.graphql(
      graphqlOperation(onUpdateProductItem)
    ).subscribe({
      next: (updatedCategoryData) => {
        let tempCategorys = this.state.categorys.map((mapCategory) => {
          if (
            updatedCategoryData.value.data.onUpdateProductItem.id ===
            mapCategory.id
          ) {
            return updatedCategoryData.value.data.onUpdateProductItem;
          } else {
            return mapCategory;
          }
        });
        // Ordering categorys by name
        tempCategorys.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.setState((state) => ({ categorys: tempCategorys }));
      },
    });
  };
  componentWillUnmount() {}

  async loadItems() {
    const listProductItemsResult = await API.graphql(
      graphqlOperation(listProductItems)
    );
    listProductItemsResult.data.listProductItems.items.sort((a, b) =>
      a.type > b.type ? 1 : -1
    );
    this.setState({
      categorys: listProductItemsResult.data.listProductItems.items,
    });
  }

  handleOnChangeInputForm = async (event) => {
    let tempNewCategory = this.state.newCategory;
    if (event.target.name === "category.name") {
      tempNewCategory.name = event.target.value.toUpperCase();
    }
    if (event.target.name === "category.type") {
      tempNewCategory.type = event.target.value;
    }
    this.setState({ newCategory: tempNewCategory });
    this.validateCRUDCategory();
  };

  async validateCRUDCategory() {
    if (this.state.newCategory.name !== "") {
      this.setState({ isCRUDButtonDisable: false });
    }
  }

  filterByConcept = (productFeatures, concept) => {
    return productFeatures.filter((objeto) => {
      // Parsear el valor del atributo "value" como un array de objetos
      const valores = JSON.parse(objeto.value);

      // Verificar si alguno de los objetos tiene el concepto buscado
      return valores.some(
        (valor) => valor.CONCEPTO.replace(/\t/g, "") === concept
      );
    });
  };

  async handleCRUDCategory() {
    let tempNewCategory = this.state.newCategory;

    if (this.state.CRUDButtonName === "CREAR") {
      const response = await API.graphql(
        graphqlOperation(createProductItem, { input: tempNewCategory })
      );
      await this.cleanCategoryOnCreate();
    }

    if (this.state.CRUDButtonName === "UPDATE") {
      let tempNewCategory = {
        id: this.state.newCategory.id,
        name: this.state.newCategory.name,
        type: this.state.newCategory.type,
      };
      const oldName = await getProductItemName(tempNewCategory.id);
      await API.graphql(
        graphqlOperation(updateProductItem, { input: tempNewCategory })
      );
      await this.cleanCategoryOnCreate();

      // Update al product features related to GLOBAL_INGRESOS_POR_PRODUCTO	GLOBAL_INDICADORES_FINANCIEROS GLOBAL_INDICADORES_FINANCIEROS_TOKEN GLOBAL_PRODUCTOS_DEL_CICLO_DE_PROYECTO
      let featureID;
      if (tempNewCategory.type === "Ingresos por producto") {
        featureID = "GLOBAL_INGRESOS_POR_PRODUCTO";
      }
      if (tempNewCategory.type === "Productos del ciclo del proyecto") {
        featureID = "GLOBAL_PRODUCTOS_DEL_CICLO_DE_PROYECTO";
      }
      if (tempNewCategory.type === "Indicadores financieros (Proyecto)") {
        featureID = "GLOBAL_INDICADORES_FINANCIEROS";
      }
      if (tempNewCategory.type === "Indicadores financieros (Token)") {
        featureID = "GLOBAL_INDICADORES_FINANCIEROS_TOKEN";
      }

      const productFeatures = await getFilteredProductFeatures(featureID);
      const productFeaturesFiltered = this.filterByConcept(
        productFeatures,
        oldName
      );
      productFeaturesFiltered.forEach(async (pf) => {
        let pfValue = JSON.parse(pf.value);

        pfValue.forEach((valor) => {
          if (valor.CONCEPTO.replace(/\t/g, "") === oldName) {
            valor.CONCEPTO = tempNewCategory.name;
          }
        });

        let tempUpdatedProductFeature = {
          id: pf.id,
          value: JSON.stringify(pfValue),
        };
        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: tempUpdatedProductFeature,
          })
        );
      });
    }
  }

  handleLoadEditCategory = async (category, event) => {
    this.setState({
      newCategory: category,
      CRUDButtonName: "UPDATE",
      isCRUDButtonDisable: false,
    });
    this.validateCRUDCategory();
  };

  async cleanCategoryOnCreate() {
    this.setState({
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      newCategory: { name: "", type: "" },
    });
  }

  // RENDER
  render() {
    // State Varibles
    let { categorys, newCategory, CRUDButtonName } = this.state;

    const renderCategorys = () => {
      if (categorys.length > 0) {
        return (
          <div className="container">
            <table className="w-full border-collapse border rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {categorys.map((category) => (
                  <tr key={category.id} className="bg-white border-b">
                    <td className="px-4 py-2">{category.name}</td>
                    <td className="px-4 py-2">{category.type}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={(e) =>
                          this.handleLoadEditCategory(category, e)
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
      <div className="container mx-auto mt-8">
        <div className="container mb-8 p-4 bg-white rounded-md">
          <h2 className="text-2xl mb-4">
            {CRUDButtonName} Items de proyecto: {newCategory.name}
          </h2>
          <form className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block">Nombre</label>
                <input
                  type="text"
                  id="formGridNewCategoryName"
                  className="form-input"
                  placeholder="Ex. NUEVO CONCEPTO"
                  name="category.name"
                  value={newCategory.name}
                  onChange={(e) => this.handleOnChangeInputForm(e)}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block">Categoría</label>
                <select
                  id="formGridNewCategoryType"
                  className="form-select"
                  name="category.type"
                  value={newCategory.type}
                  onChange={(e) => this.handleOnChangeInputForm(e)}
                >
                  <option disabled value="">
                    Selecciona una opción
                  </option>
                  <option value="Ingresos por producto">
                    Ingresos por producto
                  </option>
                  <option value="Productos del ciclo del proyecto">
                    Productos del ciclo del proyecto
                  </option>
                  <option value="Indicadores financieros (Proyecto)">
                    Indicadores financieros (Proyecto)
                  </option>
                  <option value="Indicadores financieros (Token)">
                    Indicadores financieros (Token)
                  </option>
                  <option value="Distribución volumen de tokens">
                    Distribución volumen de tokens
                  </option>
                </select>
              </div>
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={this.handleCRUDCategory}
                disabled={this.state.isCRUDButtonDisable}
              >
                {CRUDButtonName}
              </button>
            </div>
          </form>
        </div>
        <br />
        {renderCategorys()}
      </div>
    );
  }
}

export default Items;
