import React, { Component } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createCategory, updateCategory } from "../../../graphql/mutations";
import { listCategories } from "../../../graphql/queries";
import {
  onCreateCategory,
  onUpdateCategory,
} from "../../../graphql/subscriptions";

class Categorys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      newCategory: {
        id: "",
        name: "",
      },
    };
    this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this);
    this.handleCRUDCategory = this.handleCRUDCategory.bind(this);
    this.handleLoadEditCategory = this.handleLoadEditCategory.bind(this);
  }

  componentDidMount = async () => {
    await this.loadCategorys();

    // Subscriptions
    // OnCreate Category
    this.createCategoryListener = API.graphql(
      graphqlOperation(onCreateCategory)
    ).subscribe({
      next: async (createdCategoryData) => {
        await this.loadCategorys();
      },
    });

    // OnUpdate Category
    this.updateCategoryListener = API.graphql(
      graphqlOperation(onUpdateCategory)
    ).subscribe({
      next: (updatedCategoryData) => {
        let tempCategorys = this.state.categorys.map((mapCategory) => {
          if (
            updatedCategoryData.value.data.onUpdateCategory.id ===
            mapCategory.id
          ) {
            return updatedCategoryData.value.data.onUpdateCategory;
          } else {
            return mapCategory;
          }
        });
        // Ordering categorys by name
        tempCategorys.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.setState({ categorys: tempCategorys });
      },
    });
  };

  componentWillUnmount() {}

  async loadCategorys() {
    const listCategoriesResult = await API.graphql(
      graphqlOperation(listCategories)
    );
    listCategoriesResult.data.listCategories.items.sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    this.setState({
      categorys: listCategoriesResult.data.listCategories.items,
    });
  }

  handleOnChangeInputForm = async (event) => {
    let tempNewCategory = this.state.newCategory;
    if (event.target.name === "category.name") {
      tempNewCategory.name = event.target.value.toUpperCase();
      if (this.state.CRUDButtonName !== "UPDATE") {
        tempNewCategory.id = tempNewCategory.name.replaceAll(" ", "_");
      }
    }
    this.setState({ newCategory: tempNewCategory });
    this.validateCRUDCategory();
  };

  async validateCRUDCategory() {
    if (this.state.newCategory.name !== "") {
      this.setState({ isCRUDButtonDisable: false });
    }
  }

  async handleCRUDCategory() {
    let tempNewCategory = this.state.newCategory;

    if (this.state.CRUDButtonName === "CREAR") {
      await API.graphql(
        graphqlOperation(createCategory, { input: tempNewCategory })
      );
      await this.cleanCategoryOnCreate();
    }

    if (this.state.CRUDButtonName === "UPDATE") {
      let tempNewCategory = {
        id: this.state.newCategory.id,
        name: this.state.newCategory.name,
      };
      await API.graphql(
        graphqlOperation(updateCategory, { input: tempNewCategory })
      );
      await this.cleanCategoryOnCreate();
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
      newCategory: {
        id: "",
        name: "",
      },
    });
  }

  // RENDER
  render() {
    // State Varibles
    let { categorys, newCategory, CRUDButtonName } = this.state;

    const renderCategorys = () => {
      if (categorys.length > 0) {
        return (
          <div className="container mx-auto">
            <table className="w-full border-collapse border border-gray-300 mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ID</th>
                  <th className="border border-gray-300 px-4 py-2">Nombre</th>
                  <th className="border border-gray-300 px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {categorys.map((category) => (
                  <tr key={category.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {category.id}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {category.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
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
        <div className="container mb-8">
          <h2 className="text-2xl mb-4">
            {CRUDButtonName} Categoría: {newCategory.name}
          </h2>
          <div>
            <div className="mb-2">
              <label htmlFor="formGridNewCategoryName" className="block">
                Nombre
              </label>
              <input
                type="text"
                id="formGridNewCategoryName"
                placeholder="Ex. NUEVA CATERORIA"
                name="category.name"
                value={newCategory.name}
                onChange={(e) => this.handleOnChangeInputForm(e)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-1">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={this.handleCRUDCategory}
                disabled={this.state.isCRUDButtonDisable}
              >
                {CRUDButtonName}
              </button>
            </div>
          </div>
        </div>
        <br />
        {renderCategorys()}
      </div>
    );
  }
}

export default Categorys;
