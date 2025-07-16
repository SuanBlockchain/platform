import React, { Component } from "react";
// Bootstrap
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
// GraphQL
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  createImage,
  createProduct,
  createProductFeature,
  createUserProduct,
  deleteFeature,
  deleteImage,
  deleteProduct,
  updateDocument,
  updateImage,
  updateProduct,
  updateProductFeature,
} from "../../../graphql/mutations";
import {
  listCategories,
  listFeatures,
  listProductFeatures,
} from "../../../graphql/queries";
import { listProducts } from "../../Investor/querys";
import {
  onCreateProduct,
  onCreateVerification,
  onCreateProductFeature,
  onUpdateProduct,
  onUpdateProductFeature,
  onDeleteProductFeature,
  onDeleteProduct,
  onUpdateDocument,
} from "../../../graphql/subscriptions";
import checkIfUserExists from "../../../utilities/checkIfIDuserExist";
// Utils
import Select from "react-select";
import WebAppConfig from "../../common/_conf/WebAppConfig";
//Components
import CRUDProductFeatures from "./CRUDProductFeatures";
import CRUDProductImages from "./CRUDProductImages";
import ListProducts from "./ListProducts";
// AWS S3 Storage
import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CRUD_Product: {
        id: uuidv4().replaceAll("-", "_"),
        name: "",
        description: "",
        isActive: true,
        status: "draft",
        order: "",
        categoryID: "",
        images: [],
      },
      productFeatures: [],
      listPF: [],
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      isImageUploadingFile: false,
      products: [],
      categorySelectList: [],
      featuresSelectList: [],
      selectedCategory: null,
      selectedFeature: null,
      valueProductFeature: 0,
      isShowModalAreYouSureDeleteProduct: false,
      productToDelete: null,
    };
    this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this);
    this.handleChangeProductImageProperty =
      this.handleChangeProductImageProperty.bind(this);
    this.handleAddNewImageToActualProduct =
      this.handleAddNewImageToActualProduct.bind(this);
    this.handleCRUDProduct = this.handleCRUDProduct.bind(this);
    this.handleOnSelectCategory = this.handleOnSelectCategory.bind(this);
    this.handleOnSelectFeature = this.handleOnSelectFeature.bind(this);
    this.handleUpdateProductIsActive =
      this.handleUpdateProductIsActive.bind(this);
    this.handleUpdateProductTechnical =
      this.handleUpdateProductTechnical.bind(this);
    this.handleUpdateProductFinancial =
      this.handleUpdateProductFinancial.bind(this);
    this.handleGetTechnicalStatus.bind(this);
    this.handleGetFinancialStatus.bind(this);
    this.handleUpdateDocumentStatus =
      this.handleUpdateDocumentStatus.bind(this);
    this.handleUpdateProductStatus = this.handleUpdateProductStatus.bind(this);
    this.handleLoadEditProduct = this.handleLoadEditProduct.bind(this);
    this.handleShowAreYouSureDeleteProduct =
      this.handleShowAreYouSureDeleteProduct.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleHideModalAreYouSureDeleteProduct =
      this.handleHideModalAreYouSureDeleteProduct.bind(this);
    this.handleDeleteImageProduct = this.handleDeleteImageProduct.bind(this);
    this.handleDeleteFeatureProduct =
      this.handleDeleteFeatureProduct.bind(this);
    this.handleAddNewFeatureToActualProduct =
      this.handleAddNewFeatureToActualProduct.bind(this);
    this.goToTop = this.goToTop = this.goToTop.bind(this);
  }

  componentDidMount = async () => {
    // if (this.props.user.id !== '') {
    //     if (this.props.user.role === 'admon') {
    Promise.all([
      this.loadProducts(),
      this.loadCategorysSelectItems(),
      this.loadFeaturesSelectItems(),
      this.loadProductFeatures(),
    ]);
    // Subscriptions
    // OnCreate Product
    this.createProductListener = API.graphql(
      graphqlOperation(onCreateProduct)
    ).subscribe({
      next: (createdProductData) => {
        let isOnCreateList = false;
        this.state.products.map((mapProduct) => {
          if (
            createdProductData.value.data.onCreateProduct.id === mapProduct.id
          ) {
            isOnCreateList = true;
          }
          return mapProduct;
        });
        let tempProducts = this.state.products;
        let tempOnCreateProduct = createdProductData.value.data.onCreateProduct;
        if (!isOnCreateList) {
          tempProducts.push(tempOnCreateProduct);
        }
        // Ordering products by name
        tempProducts.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.setState((state) => ({ products: tempProducts }));
      },
    });
    // OnUpdate Product
    this.updateProductListener = API.graphql(
      graphqlOperation(onUpdateProduct)
    ).subscribe({
      next: (updatedProductData) => {
        API.graphql(graphqlOperation(listProducts))
          .then((response) => {
            let products = response.data.listProducts.items;
            products.sort((a, b) => (a.order > b.order ? 1 : -1));
            this.setState({ products: products });
          })
          .catch((error) => {
            console.log(error);
          });
      },
    });
    this.updateDocument = API.graphql(
      graphqlOperation(onUpdateDocument)
    ).subscribe({
      next: (updatedDocumentData) => {
        let tempProductFeatures = this.state.listPF.map((mapPF) => {
          if (
            updatedDocumentData.value.data.onUpdateDocument.productFeatureID ===
              mapPF.id &&
            mapPF.documents.items[0].id ===
              updatedDocumentData.value.data.onUpdateDocument.id
          ) {
            mapPF.documents.items[0].status =
              updatedDocumentData.value.data.onUpdateDocument.status;
            return mapPF;
          } else {
            return mapPF;
          }
        });
        tempProductFeatures.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.setState((state) => ({ listPF: tempProductFeatures }));
      },
    });
    // OnUpdate ProductFeature
    this.updateProductFeatureListener = API.graphql(
      graphqlOperation(onUpdateProductFeature)
    ).subscribe({
      next: (updatedProductFeatureData) => {
        let tempProductFeatures = this.state.listPF.map((mapPF) => {
          if (
            updatedProductFeatureData.value.data.onUpdateProductFeature.id ===
            mapPF.id
          ) {
            return updatedProductFeatureData.value.data.onUpdateProductFeature;
          } else {
            return mapPF;
          }
        });
        tempProductFeatures.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.setState((state) => ({ listPF: tempProductFeatures }));
        this.loadProducts();
      },
    });
    // OnDelete ProductFeature
    this.deleteProductFeatureListener = API.graphql(
      graphqlOperation(onDeleteProductFeature)
    ).subscribe({
      next: (deletedProductFeatureData) => {
        let tempProductFeatures = this.state.listPF.map((mapPF) => {
          if (
            deletedProductFeatureData.value.data.onDeleteProductFeature.id ===
            mapPF.id
          ) {
            return {};
          } else {
            return mapPF;
          }
        });
        tempProductFeatures.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.setState((state) => ({ listPF: tempProductFeatures }));
      },
    });
    // OnCreate ProductFeature
    this.createProductFeatureListener = API.graphql(
      graphqlOperation(onCreateProductFeature)
    ).subscribe({
      next: (createdProductFeatureData) => {
        let isOnCreateList = false;
        this.state.listPF.map((mapPF) => {
          if (
            createdProductFeatureData.value.data.onCreateProductFeature.id ===
            mapPF.id
          ) {
            isOnCreateList = true;
          }
          return mapPF;
        });
        let tempProductFeatures = this.state.listPF;
        let tempOnCreateProductFeature =
          createdProductFeatureData.value.data.onCreateProductFeature;
        if (!isOnCreateList) {
          tempProductFeatures.push(tempOnCreateProductFeature);
        }
        tempProductFeatures.sort((a, b) => (a.order > b.order ? 1 : -1));
        this.setState((state) => ({ listPF: tempProductFeatures }));
      },
    });
    // OnCreate Verification
    this.createProductFeatureListener = API.graphql(
      graphqlOperation(onCreateVerification)
    ).subscribe({
      next: (createdVerification) => {
        this.loadProductFeatures();
      },
    });
    this.deleteProductListener = API.graphql(
      graphqlOperation(onDeleteProduct)
    ).subscribe({
      next: (createdVerification) => {
        this.loadProducts();
      },
    });
    //     }
    // } else {
    //     this.props.changeHeaderNavBarRequest('admon_profile')
    // }
  };
  componentWillUnmount() {
    this.createProductListener.unsubscribe();
    this.updateProductListener.unsubscribe();
    this.updateProductFeatureListener.unsubscribe();
    this.deleteProductFeatureListener.unsubscribe();
    this.createProductFeatureListener.unsubscribe();
  }
  async addNewImageToActualProductImages() {
    let tempCRUD_Product = this.state.CRUD_Product;
    let newProductImage = {
      id: uuidv4().replaceAll("-", "_"),
      imageURL: "",
      format: "",
      title: "",
      imageURLToDisplay: "",
      isOnCarousel: false,
      carouselLabel: "",
      carouselDescription: "",
      productID: "",
    };
    tempCRUD_Product.images.push(newProductImage);
    this.setState({ CRUD_Product: tempCRUD_Product });
  }

  handleOnSelectCategory(event) {
    this.setState({ selectedCategory: event.value });
    this.validateCRUDProduct();
  }
  handleOnSelectFeature(event) {
    this.setState({ selectedFeature: event.value });
    this.validateCRUDProduct();
  }
  goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  async loadCategorysSelectItems() {
    let categorysSelectItems = [];
    const listCategoriesResult = await API.graphql(
      graphqlOperation(listCategories)
    );
    if (listCategoriesResult.data.listCategories.items.length > 0) {
      let tempCategorys = listCategoriesResult.data.listCategories.items;
      // Ordering categorys by name
      tempCategorys.sort((a, b) => (a.name > b.name ? 1 : -1));
      tempCategorys.map((category) => {
        categorysSelectItems.push({ value: category, label: category.name });
        return category;
      });
    }
    this.setState({ categorySelectList: categorysSelectItems });
  }
  async loadFeaturesSelectItems() {
    let featuresSelectItems = [];
    const listFeaturesResult = await API.graphql(
      graphqlOperation(listFeatures)
    );
    if (listFeaturesResult.data.listFeatures.items.length > 0) {
      let tempFeatures = listFeaturesResult.data.listFeatures.items;
      // Ordering features by name
      tempFeatures.sort((a, b) => (a.name > b.name ? 1 : -1));
      tempFeatures.map((features) => {
        featuresSelectItems.push({ value: features, label: features.name });
        return features;
      });
    }
    this.setState({ featuresSelectList: featuresSelectItems });
  }

  async loadProducts() {
    const listProductsResult = await API.graphql(
      graphqlOperation(listProducts)
    );
    listProductsResult.data.listProducts.items.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    this.setState({ products: listProductsResult.data.listProducts.items });
  }
  async loadProductFeatures() {
    const listProductsResult = await API.graphql(
      graphqlOperation(listProductFeatures)
    );
    listProductsResult.data.listProductFeatures.items.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    this.setState({
      listPF: listProductsResult.data.listProductFeatures.items,
    });
  }

  async validateCRUDProduct() {
    if (
      this.state.selectedCategory !== null &&
      this.state.CRUD_Product.name !== "" &&
      this.state.CRUD_Product.description !== "" &&
      this.state.CRUD_Product.images.length > 0
    ) {
      this.setState({ isCRUDButtonDisable: false });
    }
  }

  async handleCRUDProduct() {
    const tempCRUD_Product = this.state.CRUD_Product;
    tempCRUD_Product.id = await checkIfUserExists(tempCRUD_Product.id);
    if (this.state.CRUDButtonName === "CREAR") {
      const payLoadNewProduct = {
        id: tempCRUD_Product.id,
        name: tempCRUD_Product.name,
        description: tempCRUD_Product.description,
        isActive: true, //Por que se manda true??
        status: tempCRUD_Product.status,
        counterNumberOfTimesBuyed: 0,
        categoryID: this.state.selectedCategory.id,
        order: tempCRUD_Product.order,
      };
      // Creating Product=>images
      tempCRUD_Product.images.map(async (image) => {
        const newImagePayLoad = {
          productID: tempCRUD_Product.id,
          id: image.id,
          imageURL: image.imageURL,
          format: image.format,
          title: image.title,
          isOnCarousel: image.isOnCarousel,
          carouselLabel: image.carouselLabel,
          carouselDescription: image.carouselDescription,
          isActive: true,
          order: image.order,
        };
        await API.graphql(
          graphqlOperation(createImage, { input: newImagePayLoad })
        );
        return image;
      });

      await API.graphql(
        graphqlOperation(createProduct, { input: payLoadNewProduct })
      );
      // Creating UserProduct
      let actualUser = await Auth.currentAuthenticatedUser();
      let actualUserID = actualUser.attributes.sub;

      const payLoadNewUserProduct = {
        userID: actualUserID,
        productID: tempCRUD_Product.id,
        isFavorite: true,
      };
      await API.graphql(
        graphqlOperation(createUserProduct, { input: payLoadNewUserProduct })
      );
      await this.cleanProductOnCreate();
      /* await this.cleanProductOnCreate() */
    }

    if (this.state.CRUDButtonName === "UPDATE") {
      const payLoadNewProduct = {
        id: tempCRUD_Product.id,
        name: tempCRUD_Product.name,
        description: tempCRUD_Product.description,
        isActive: tempCRUD_Product.isActive,
        status: tempCRUD_Product.status,
        counterNumberOfTimesBuyed: 0,
        categoryID: this.state.selectedCategory.id,
        order: tempCRUD_Product.order,
      };
      // Updating Product=>images
      let indexProduct = this.state.products.findIndex(
        (product) => product.id === tempCRUD_Product.id
      );
      tempCRUD_Product.images.map(async (image) => {
        const imagePayLoad = {
          productID: tempCRUD_Product.id,
          id: image.id,
          imageURL: image.imageURL,
          format: image.format,
          title: image.title,
          isOnCarousel: image.isOnCarousel,
          carouselLabel: image.carouselLabel,
          carouselDescription: image.carouselDescription,
          isActive: true,
          order: image.order,
        };
        if (indexProduct !== -1) {
          let indexImage = this.state.products[
            indexProduct
          ].images.items.findIndex((fImage) => fImage.id === image.id);
          if (indexImage !== -1) {
            await API.graphql(
              graphqlOperation(updateImage, { input: imagePayLoad })
            );
          } else {
            await API.graphql(
              graphqlOperation(createImage, { input: imagePayLoad })
            );
          }
        }
      });

      this.state.productFeatures?.map(async (productFeature, idx) => {
        if (!productFeature.feature) {
          return await API.graphql(
            graphqlOperation(createProductFeature, { input: productFeature })
          );
        }
      });

      // Updating new product
      await API.graphql(
        graphqlOperation(updateProduct, { input: payLoadNewProduct })
      );
      // Updating ProductFeatures  No es necesario porque ya lo hago cuando edito cada productFeature
      // Clean CRUD_Product
      await this.cleanProductOnCreate();
    }
  }

  setProductImageAndDownloadURL = async (product) => {
    Storage.get(product.image, { expires: 600 })
      .then((result) => {
        this.setState({ productImageURLToDisplay: result });
      })
      .catch((err) => console.log(err));
  };

  handleLoadEditProduct = async (product, event) => {
    this.goToTop();
    const tempCRUD_Product = {
      id: product.id,
      name: product.name,
      description: product.description,
      isActive: product.isActive,
      categoryID: product.categoryID,
      images: product.images.items,
      order: product.order,
      status: product.status,
    };
    const tempCategory = {
      id: product.category.id,
      isSelected: true,
      name: product.category.name,
    };
    const tempProductsFeatures = this.state.listPF.filter(
      (pf) => pf.productID === product.id
    );
    await this.setState({
      CRUD_Product: tempCRUD_Product,
      selectedCategory: tempCategory,
      productFeatures: tempProductsFeatures,
      CRUDButtonName: "UPDATE",
    });
    this.validateCRUDProduct();
  };
  handleUpdateProductIsActive = async (product) => {
    let tempProduct = {
      id: product.id,
      isActive: false,
    };
    tempProduct.isActive = !product.isActive;
    await API.graphql(graphqlOperation(updateProduct, { input: tempProduct }));
  };
  handleUpdateProductTechnical = async (product) => {
    const pf = product.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS";
    })[0];
    const pfID = pf.id;
    const pfValue = pf.value;

    let tempProductFeature = {
      id: pfID,
      value: pfValue === "true" ? "false" : "true",
    };
    await API.graphql(
      graphqlOperation(updateProductFeature, { input: tempProductFeature })
    );
    await API.graphql(
      graphqlOperation(updateProduct, {
        input: { id: product.id, isActive: false },
      })
    );
  };
  handleUpdateProductFinancial = async (product) => {
    const pf = product.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS";
    })[0];
    const pfID = pf.id;
    const pfValue = pf.value;

    let tempProductFeature = {
      id: pfID,
      value: pfValue === "true" ? "false" : "true",
    };
    await API.graphql(
      graphqlOperation(updateProductFeature, { input: tempProductFeature })
    );
    await API.graphql(
      graphqlOperation(updateProduct, {
        input: { id: product.id, isActive: false },
      })
    );
  };

  handleGetTechnicalStatus = (product) => {
    const pfValue = product.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS";
    })[0]?.value;

    return pfValue === "true" ? "Habilitar cambios" : "Congelar";
  };

  handleGetFinancialStatus = (product) => {
    const pfValue = product.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS";
    })[0]?.value;
    return pfValue === "true" ? "Habilitar cambios" : "Congelar";
  };

  handleUpdateProductStatus = async (product, status) => {
    let tempProduct = {
      id: product.id,
      status: status,
    };
    await API.graphql(graphqlOperation(updateProduct, { input: tempProduct }));
  };
  handleUpdateDocumentStatus = async (documentID, status) => {
    let tempDocument = {
      id: documentID,
      status: status,
    };
    let result = await API.graphql(
      graphqlOperation(updateDocument, { input: tempDocument })
    );
  };

  handleDeleteImageProduct = async (pProduct, pImage, event) => {
    let tempProducts = [];
    let tempImages = [];

    this.state.products.map((product) => {
      if (product.id === pProduct.id) {
        // Deleting image from UI
        product.images.items.map((image) => {
          if (image.id !== pImage.id) {
            tempImages.push(image);
          }
          return image;
        });
        product.images.items = tempImages;
        tempProducts.push(product);
      } else {
        tempProducts.push(product);
      }
      return product;
    });
    await this.setState({ products: tempProducts });
    // Deleting the Image
    const inputImageToDelete = {
      id: pImage.id,
    };
    API.graphql(graphqlOperation(deleteImage, { input: inputImageToDelete }));
  };

  handleDeleteFeatureProduct = async (pProduct, pFeature, event) => {
    let tempProducts = [];
    let tempFeatures = [];

    this.state.products.map((product) => {
      if (product.id === pProduct.id) {
        // Deleting feature from UI
        product.features.items.map((feature) => {
          if (feature.id !== pFeature.id) {
            tempFeatures.push(feature);
          }
          return feature;
        });
        product.features.items = tempFeatures;
        tempProducts.push(product);
      } else {
        tempProducts.push(product);
      }
      return product;
    });
    await this.setState({ products: tempProducts });
    // Deleting the Feature
    const inputFeatureToDelete = {
      id: pFeature.id,
    };
    API.graphql(
      graphqlOperation(deleteFeature, { input: inputFeatureToDelete })
    );
  };

  handleDeleteProduct = async () => {
    const tempProductToDelete = this.state.productToDelete;
    if (tempProductToDelete !== null) {
      // Deleting Product Images
      tempProductToDelete.images.items.map((image) => {
        const inputImageToDelete = {
          id: image.id,
        };
        API.graphql(
          graphqlOperation(deleteImage, { input: inputImageToDelete })
        );
        return image;
      });
      // Deleting Product Features
      tempProductToDelete.features.items.map((feature) => {
        const inputFeatureToDelete = {
          id: feature.id,
        };
        API.graphql(
          graphqlOperation(deleteFeature, { input: inputFeatureToDelete })
        );
        return feature;
      });
      const inputProductToDelete = {
        id: tempProductToDelete.id,
      };
      // Deleting the Product
      API.graphql(
        graphqlOperation(deleteProduct, { input: inputProductToDelete })
      );
      // Set null productToDelete
      this.setState({ productToDelete: null });
    }
  };

  handleShowAreYouSureDeleteProduct = async (product, event) => {
    await this.setState({
      isShowModalAreYouSureDeleteProduct:
        !this.isShowModalAreYouSureDeleteProduct,
      productToDelete: product,
    });
  };

  async handleAddNewImageToActualProduct(event) {
    this.addNewImageToActualProductImages();
    this.validateCRUDProduct();
  }

  handleAddNewFeatureToActualProduct(newProductFeature, action) {
    if (action === "ADD") {
      let tempProductFeatures = this.state.productFeatures;

      tempProductFeatures.push(newProductFeature);
      this.setState({ productFeatures: tempProductFeatures });
    }
    if (action === "UPDATE") {
      let tempProductFeatures = this.state.productFeatures;
      for (let i = 0; i < tempProductFeatures.length; i++) {
        if (tempProductFeatures[i].id === newProductFeature.id) {
          tempProductFeatures[i] = newProductFeature;
        }
      }
      this.setState({ productFeatures: tempProductFeatures });
    }
  }

  async cleanProductOnCreate() {
    this.setState({
      CRUD_Product: {
        id: uuidv4().replaceAll("-", "_"),
        name: "",
        description: "",
        isActive: true,
        order: "",
        status: "draft",
        categoryID: "",
        images: [],
      },
      productFeatures: [],
      CRUDButtonName: "CREAR",
      isCRUDButtonDisable: true,
      isImageUploadingFile: false, //se borraban los features y categorys
      selectedCategory: null,
      selectedFeature: null,
      valueProductFeature: 0,
      isShowModalAreYouSureDeleteProduct: false,
      productToDelete: null,
    });
  }

  handleOnChangeInputForm = async (event, pProperty) => {
    let tempCRUD_Product = this.state.CRUD_Product;
    if (event.target.name === "CRUD_ProductName") {
      tempCRUD_Product.name = event.target.value;
    }
    if (event.target.name === "CRUD_ProductDescription") {
      tempCRUD_Product.description = event.target.value;
    }
    if (event.target.name === "CRUD_ProductOrder") {
      tempCRUD_Product.order = parseInt(event.target.value);
    }
    if (pProperty === "productIsActive") {
      tempCRUD_Product.isActive = !tempCRUD_Product.isActive;
    }
    if (event.target.name === "CRUD_ProductStatus") {
      tempCRUD_Product.status = event.target.value;
    }
    await this.setState({ CRUD_Product: tempCRUD_Product });
    this.validateCRUDProduct();
  };

  async handleChangeProductImageProperty(event, pImage, pProperty) {
    let uploadImageResult = null;
    let imageId = "";
    if (pProperty === "carouselImage") {
      const {
        target: { files },
      } = event;
      const [file] = files || [];
      if (!file) {
        return;
      }
      // Creating image ID
      let fileNameSplitByDotfileArray = file.name.split(".");
      imageId = fileNameSplitByDotfileArray[0]
        .replaceAll(" ", "_")
        .replaceAll("-", "_");
      // Getting extension
      let imageExtension =
        fileNameSplitByDotfileArray[fileNameSplitByDotfileArray.length - 1];
      let imageName = imageId + "." + imageExtension;
      // Uploading image
      this.setState({ isImageUploadingFile: true });
      uploadImageResult = await Storage.put(imageName, file, {
        level: "public",
        contentType: "image/jpeg",
      });
      this.setState({ isImageUploadingFile: false });
    }

    let tempCRUD_Product = this.state.CRUD_Product;
    let tempImages = tempCRUD_Product.images.map((image) => {
      if (image.id === pImage.id) {
        if (pProperty === "newProductImageTitle") {
          image.title = event.target.value;
        }
        if (pProperty === "newProductImageOrder") {
          image.order = event.target.value;
        }
        if (pProperty === "isOnCarousel") {
          image.isOnCarousel = !image.isOnCarousel;
        }
        if (pProperty === "carouselLabel") {
          image.carouselLabel = event.target.value.toUpperCase();
        }
        if (pProperty === "carouselDescription") {
          image.carouselDescription = event.target.value.toUpperCase();
        }
        if (pProperty === "carouselImage") {
          if (uploadImageResult !== null) {
            image.imageURL = uploadImageResult.key;
            image.format = uploadImageResult.key.split(".")[1];
          }
        }
      }
      return image;
    });
    tempCRUD_Product.images = tempImages;
    await this.setState({ CRUD_Product: tempCRUD_Product });
    this.validateCRUDProduct();
  }

  async getSignedImageURL(image) {
    const signedURL = await Storage.get(image.imageURL);
    return signedURL;
  }

  async handleHideModalAreYouSureDeleteProduct(event) {
    this.setState({
      isShowModalAreYouSureDeleteProduct:
        !this.state.isShowModalAreYouSureDeleteProduct,
    });
  }

  // RENDER
  render() {
    // State Varibles
    let {
      CRUD_Product,
      CRUDButtonName,
      selectedCategory,
      isShowModalAreYouSureDeleteProduct,
      productToDelete,
    } = this.state;
    const urlS3Image = WebAppConfig.url_s3_public_images;

    // Render are you sure delete the product?
    const renderAreYouSureDeleteProduct = () => {
      if (isShowModalAreYouSureDeleteProduct && productToDelete !== null) {
        return (
          <Modal
            show={isShowModalAreYouSureDeleteProduct}
            onHide={(e) => this.handleHideModalAreYouSureDeleteProduct(e)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Confirmation to DELETE the product ({productToDelete.name})
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Alert key="idx_key_2" variant="warning">
                Are you sure to delete the Product ({productToDelete.name}) with{" "}
                {productToDelete.images.items.length} images, and{" "}
                {productToDelete.features.items.length} features?
              </Alert>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                size="md"
                onClick={(e) => this.handleDeleteProduct(e)}
              >
                YES
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={(e) =>
                  this.setState({ isShowModalAreYouSureDeleteProduct: false })
                }
              >
                NO
              </Button>
            </Modal.Footer>
          </Modal>
        );
      }
    };
    // Render colored break line
    const renderColoredBreakLine = (pColor) => (
      <hr
        style={{
          color: pColor,
          backgroundColor: pColor,
          height: 5,
        }}
      />
    );

    // RENDER
    return (
      <div className="w-full">
        {renderAreYouSureDeleteProduct()}
        <form className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">
            PROPIEDADES DEL PROYECTO en {CRUDButtonName}
            </h2>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="formGridCategorySelectList"
            >
              Categoría
            </label>
            <Select
              options={this.state.categorySelectList}
              onChange={this.handleOnSelectCategory}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Seleccionar ..."
            />
            <div className="mt-2">
              <Alert key="idx_key_1" variant="success">
                {selectedCategory === null
                  ? "No seleccionado"
                  : selectedCategory.name}
              </Alert>
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="formGridCRUD_ProductName"
              >
                Nombre
              </label>
              <input
                type="text"
                placeholder="Ejemplo: Proyecto B"
                name="CRUD_ProductName"
                value={CRUD_Product.name}
                onChange={(e) => this.handleOnChangeInputForm(e)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="formGridCRUD_ProductDescription"
              >
                Descripción
              </label>
              <input
                type="text"
                placeholder="Ejemplo: Descripción del Proyecto B"
                name="CRUD_ProductDescription"
                value={CRUD_Product.description}
                onChange={(e) => this.handleOnChangeInputForm(e)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="formGridCRUD_ProductStatus"
              >
                Estado
              </label>
              <select
                name="CRUD_ProductStatus"
                value={CRUD_Product.status || ""}
                onChange={(e) => this.handleOnChangeInputForm(e)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {["", "Prefactibilidad", "Factibilidad", "Documento de diseño del proyecto", "Validación externa", "Registro del proyecto"].map(
                  (op) => (
                    <option value={op} key={op}>
                      {op}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="w-full md:w-1/2 px-2 mb-4">
              <label className="block text-sm font-bold mb-2">Está activo?</label>
              <div>
                <button
                  className={`inline-block px-3 py-1 rounded-full ${
                    CRUD_Product.isActive
                      ? "bg-[#6e6c35] border-1 border-dark text-white"
                      : "bg-red-500 text-white"
                  }`}
                  onClick={(e) =>
                    this.handleOnChangeInputForm(e, "productIsActive")
                  }
                >
                  {CRUD_Product.isActive ? "SI" : "NO"}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="formGridCRUD_ProductOrder"
            >
              Orden
            </label>
            <input
              type="number"
              placeholder="Ejemplo: 1"
              name="CRUD_ProductOrder"
              value={CRUD_Product.order}
              onChange={(e) => this.handleOnChangeInputForm(e)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </form>

        <div className="pt-4 bg-white p-4 rounded-lg shadow-sm my-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Características del proyecto</h2>
          </div>

          <CRUDProductFeatures
            CRUD_Product={this.state.CRUD_Product}
            listPF={this.state.listPF}
            featuresSelectList={this.state.featuresSelectList}
            selectedFeature={this.state.selectedFeature}
            valueProductFeature={this.state.valueProductFeature}
            handleAddNewFeatureToActualProduct={
              this.handleAddNewFeatureToActualProduct
            }
            handleOnSelectFeature={this.handleOnSelectFeature}
            handleOnChangeInputFormProductFeatures={
              this.handleOnChangeInputFormProductFeatures
            }
          />
        </div>

        <div className="pt-4 bg-white p-4 rounded-lg shadow-sm my-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Imagenes de proyecto</h2>
          </div>

          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={(e) => this.handleAddNewImageToActualProduct(e)}
            >
              AGREGAR IMAGEN AL PROYECTO ACTUAL
            </button>
          </div>

          <CRUDProductImages
            CRUD_Product={CRUD_Product}
            isImageUploadingFile={this.state.isImageUploadingFile}
            urlS3Image={urlS3Image}
            handleChangeProductImageProperty={
              this.handleChangeProductImageProperty
            }
          />
        </div>

        <div className="mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={this.handleCRUDProduct}
            disabled={this.state.isCRUDButtonDisable}
          >
            {CRUDButtonName}
          </button>
        </div>
        {renderColoredBreakLine("red")}
        <br></br>
        <ListProducts
          products={this.state.products}
          listPF={this.state.listPF}
          urlS3Image={urlS3Image}
          handleShowAreYouSureDeleteProduct={
            this.handleShowAreYouSureDeleteProduct
          }
          handleLoadEditProduct={this.handleLoadEditProduct}
          handleDeleteFeatureProduct={this.handleDeleteFeatureProduct}
          handleDeleteImageProduct={this.handleDeleteImageProduct}
          handleUpdateDocumentStatus={this.handleUpdateDocumentStatus}
          handleUpdateProductIsActive={this.handleUpdateProductIsActive}
          handleUpdateProductStatus={this.handleUpdateProductStatus}
          handleUpdateProductTechnical={this.handleUpdateProductTechnical}
          handleUpdateProductFinancial={this.handleUpdateProductFinancial}
          handleGetFinancialStatus={this.handleGetFinancialStatus}
          handleGetTechnicalStatus={this.handleGetTechnicalStatus}
        />
      </div>
    );
  }
}

export default Products;
