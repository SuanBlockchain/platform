import React, { Component } from "react";

//Bootstrap
import { Button, Card, Container, Stack, Badge, Table, Modal } from "react-bootstrap";
import HeaderNavbar from "../../Investor/Navbars/HeaderNavbar";
// GraphQL
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listProducts, listProperties } from "../../../utilities/customQueries";
import {
  getImagesCategories,
  getYearFromAWSDatetime,
} from "../../Constructor/ProjectPage/utils";
import S3FileManager from "./S3FileManager";
import { S3ClientProvider } from "context/s3ClientContext";
import TerrasachaLogo from "components/common/TerrasachaLogo";

export const listDocuments = /* GraphQL */ `
  query ListDocuments(
    $filter: ModelDocumentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocuments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        data
        timeStamp
        docHash
        signedHash
        signed
        url
        signed
        signedHash
        isApproved
        status
        isUploadedToBlockChain
        productFeatureID
        productFeature {
          id
          value
          isToBlockChain
          order
          isOnMainCard
          productID
          featureID
          createdAt
          updatedAt
          feature {
            name
            id
            isVerifable
            description
            featureType {
              id
              name
            }
          }
          product {
            id
            name
            transactions {
              items {
                id
              }
            }
            category {
              name
            }
            productFeatures {
              items {
                id
                featureID
                value
              }
            }
          }
          verifications {
            items {
              id
              userVerifierID
              userVerifier {
                name
              }
              userVerifiedID
              userVerified {
                name
              }
              updatedOn
              sign
              createdOn
              verificationComments {
                items {
                  comment
                  createdAt
                  id
                  isCommentByVerifier
                  verificationID
                }
              }
            }
          }
        }
        userID
        user {
          id
          name
          dateOfBirth
          isProfileUpdated
          addresss
          cellphone
          role
          status
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
class AnalitycsAdmon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      actualUser: "",
      documents: [],
      tokenPrices: {},
      tokenNames: {},
      amountTokens: {},
      documentsPending: [],
      otherDocuments: [],
      featuresVerifables: [],
      showPending: true,
      showOther: false,
      isShowProductDocuments: true,
      isShowUsers: false,
      showModalDocument: false,
      showModalComments: false,
      showModalValidate: false,
      showModalDetailsValidation: false,
      selectedDocument: null,
      selectedDocumentID: null,
      selectedProductValidation: null,
      selectedProductVerificationID: null,
      creatingVerification: false,
      users: [],
      properties: [],
      showFileManager: false,
      selectedItem: null,
      fileManagerType: null, // 'project' o 'property'
      verification: {
        id: "",
        createdOn: "",
        updatedOn: "",
        sign: "",
        userVerifierID: "",
        userVerifiedID: "",
        productFeatureID: "",
        documentStatus: "",
      },
      newVerificationComment: {
        verificationID: "",
        isCommentByVerifier: true,
        comment: "",
      },
    };
    this.changeHeaderNavBarRequest = this.changeHeaderNavBarRequest.bind(this);
    this.logOut = this.logOut.bind(this);
    this.handleShowFileManager = this.handleShowFileManager.bind(this);
    this.handleCloseFileManager = this.handleCloseFileManager.bind(this);
  }

  componentDidMount = async () => {
    let actualUser = await Auth.currentAuthenticatedUser();
    actualUser = actualUser.attributes.sub;
    this.setState({ actualUser: actualUser });

    await this.loadVerifierProducts();
    await this.loadProperties();
  };

  async loadVerifierProducts() {
    const response = await API.graphql(graphqlOperation(listProducts));
    const verifierAssignedProducts = response.data.listProducts.items.filter(
      (product) => {
        const isProjectVerifier = product.userProducts?.items.some(
          (up) => up.user?.id === this.state.actualUser
        );
        const isVisible = product.isActiveOnPlatform;
        return isProjectVerifier && isVisible;
      }
    );

    this.setState({ products: verifierAssignedProducts });
  }

  async loadProperties() {
    try {
      const response = await API.graphql(graphqlOperation(listProperties));
      this.setState({ properties: response.data.listProperties.items });
    } catch (error) {
      console.error("Error loading properties:", error);
      toast.error("Error al cargar los predios");
    }
  }

  async changeHeaderNavBarRequest(pRequest) {
    if (pRequest === "product_documents") {
      this.setState({
        isShowProductDocuments: true,
        isShowUsers: false,
      });
    }
    if (pRequest === "users") {
      this.setState({
        isShowProductDocuments: false,
        isShowUsers: true,
      });
    }
  }
  async logOut() {
    await Auth.signOut();
    window.location.href = "/";
    localStorage.removeItem("role");
  }

  handleShowFileManager = (item, type) => {
    this.setState({
      showFileManager: true,
      selectedItem: item,
      fileManagerType: type
    });
  };

  handleCloseFileManager = () => {
    this.setState({
      showFileManager: false,
      selectedItem: null,
      fileManagerType: null
    });
  };

  render() {
    const { products, properties, showFileManager, selectedItem, fileManagerType } = this.state;

    console.log('properties', properties);
    console.log('products', products);

    const renderProjectsTable = () => {
      return (
        <div className="mt-5">
          <h2>Proyectos</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Marketplace</th>
                <th>Fecha de Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.categoryID}</td>
                  <td>
                    <Stack direction="horizontal" gap={2}>
                      {product.isActive && (
                        <Badge bg="success">Activo</Badge>
                      )}
                      {product.projectReadiness && (
                        <Badge bg="primary">Listo</Badge>
                      )}
                    </Stack>
                  </td>
                  <td>{product.showOn || "No asignado"}</td>
                  <td>{getYearFromAWSDatetime(product.createdAt)}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      href={`project/${product.id}`}
                      className="me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => this.handleShowFileManager(product, 'project')}
                    >
                      Archivos
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    };

    const renderProjectsAndPropertiesTable = () => {
      return (
        <div className="mt-5">
          <h2>Proyectos y Predios</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Predio</th>
                <th>Departamento</th>
                <th>Estado</th>
                <th>Propietario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const productProperties = properties.filter(
                  (prop) => prop.productID === product.id
                );
                
                return productProperties.map((property, index) => (
                  <tr key={`${product.id}-${property.id}`}>
                    <td>{index === 0 ? product.name : ""}</td>
                    <td>{property.name}</td>
                    <td>{property.department}</td>
                    <td>
                      <Badge bg={property.status === "APPROVED" ? "success" : "warning"}>
                        {property.status}
                      </Badge>
                    </td>
                    <td>{property.user?.name || "No asignado"}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        href={`property/${property.id}`}
                        className="me-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver
                      </Button>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => this.handleShowFileManager(property, 'property')}
                      >
                        Archivos
                      </Button>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </Table>
        </div>
      );
    };

    const renderUploadFiles = () => {
      return (
        <S3ClientProvider>
          <S3FileManager userId={this.state.actualUser} products={products} />
        </S3ClientProvider>
      );
    };

    const renderValidatingProjects = () => {
      if (products) {
        return (
          <>
            {/* <h2 className="mt-5">Tus Campañas asignadas</h2>
            <div className="row row-cols-1 row-cols-sm-3 g-2 m-4">
              {products.length > 0 &&
                products
                  .filter((prod) => !(prod.campaignID === null))
                  .map((product, index) => {
                    return (
                      <div key={index} className="p-3">
                        <Card key={product.id} className="p-0">
                          <img
                            variant="top"
                            src={getImagesCategories(product.categoryID)}
                            style={{ height: "150px" }}
                            alt="Hola"
                          />
                          <Card.Body>
                            <div className="d-flex">
                              <Stack direction="horizontal" gap={2}>
                                <Badge bg="primary">
                                  {getYearFromAWSDatetime(product.createdAt)}
                                </Badge>
                                <Badge bg="primary">{product.categoryID}</Badge>
                                {product.isActive && (
                                  <Badge bg="success">Publicado</Badge>
                                )}
                                {product.showOn && (
                                  <Badge bg="secondary">
                                    Marketplace {product.showOn}
                                  </Badge>
                                )}
                              </Stack>
                            </div>
                            <p className="fs-5 my-2">{product.campaign.name}</p>
                            <hr className="mb-2" />
                            <p className="fs-6 my-2 text-h">
                              {product.campaign.description}
                            </p>
                          </Card.Body>
                          <Card.Footer>
                            <div className="d-flex justify-content-center align-items-center">
                              <a href={"campaign/" + product.campaignID}>
                                <Button>Ver Campaña</Button>
                              </a>
                            </div>
                          </Card.Footer>
                        </Card>
                      </div>
                    );
                  })}
            </div> */}
            {products.length > 0 && (
              <h2 className="mt-5">Tus Proyectos Asignados</h2>
            )}
            <div className="row row-cols-1 row-cols-sm-3 g-2 m-4">
              {products.length > 0 &&
                products.map((product, index) => {
                  return (
                    <div key={index} className="p-3">
                      <Card key={product.id} className="p-0">
                        <img
                          variant="top"
                          src={getImagesCategories(product.categoryID)}
                          style={{ height: "150px" }}
                          alt="Hola"
                        />
                        <Card.Body>
                          <div className="d-flex">
                            <Stack direction="horizontal" gap={2}>
                              <Badge bg="primary">
                                {getYearFromAWSDatetime(product.createdAt)}
                              </Badge>
                              <Badge bg="primary">{product.categoryID}</Badge>
                              {product.isActive && (
                                <Badge bg="success">Publicado</Badge>
                              )}
                              {product.showOn && (
                                <Badge bg="secondary">
                                  Marketplace {product.showOn}
                                </Badge>
                              )}
                            </Stack>
                          </div>
                          <p className="fs-5 my-2">{product.name}</p>
                          <hr className="mb-2" />
                          <p className="fs-6 my-2 text-h">
                            {product.description}
                          </p>
                        </Card.Body>
                        <Card.Footer>
                          <div className="d-flex justify-content-center align-items-center">
                            <a href={"project/" + product.id}>
                              <Button>Ver más</Button>
                            </a>
                          </div>
                        </Card.Footer>
                      </Card>
                    </div>
                  );
                })}
            </div>
          </>
        );
      } else {
        return <div>is loading ...</div>;
      }
    };

    return (
      <Container style={{ paddingTop: 70, minHeight: "100vh" }}>
        <HeaderNavbar
          logOut={this.logOut}
          changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
        ></HeaderNavbar>
        <ToastContainer />
        {renderProjectsTable()}
        {renderProjectsAndPropertiesTable()}

        <Modal
          show={showFileManager}
          onHide={this.handleCloseFileManager}
          size="xl"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {fileManagerType === 'project' 
                ? `Archivos del Proyecto: ${selectedItem?.name}`
                : `Archivos del Predio: ${selectedItem?.name}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <S3ClientProvider>
              <S3FileManager
                userId={this.state.actualUser}
                products={products}
                selectedItem={selectedItem}
                type={fileManagerType}
              />
            </S3ClientProvider>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}
export default AnalitycsAdmon;
