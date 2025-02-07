import React, { Component } from "react";

//Bootstrap
import { Button, Card, Container, Stack, Badge } from "react-bootstrap";
import HeaderNavbar from "../../Investor/Navbars/HeaderNavbar";
// GraphQL
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listProducts } from "../../../utilities/customQueries";
import {
  getImagesCategories,
  getYearFromAWSDatetime,
} from "../../Constructor/ProjectPage/utils";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";

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
class ValidatorAdmon extends Component {
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
  }

  componentDidMount = async () => {
    let actualUser = await Auth.currentAuthenticatedUser();
    actualUser = actualUser.attributes.sub;
    this.setState({ actualUser: actualUser });

    await this.loadVerifierProducts();
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

  render() {
    const { products } = this.state;
    const renderValidatingProjects = () => {
      console.log("products", products);
      if (products) {
        return (
          <>
            <h2 className="mt-5">Tus Campañas asignadas</h2>
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
            </div>
            <h2 className="mt-5">Tus Proyectos Asignados</h2>
            <div className="row row-cols-1 row-cols-sm-3 g-2 m-4">
              {products.length > 0 &&
                products
                  .filter((prod) => prod.campaign?.available === false || prod.campaignID === null)
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
                            <p className="fs-5 my-2">{product.name}</p>
                            <hr className="mb-2" />
                            <p className="fs-6 my-2 text-h">
                              {product.description}
                            </p>
                          </Card.Body>
                          <Card.Footer>
                            <div className="d-flex justify-content-center align-items-center">
                              <a href={"project/" + product.id}>
                              <button className="p-2 bg-[#6e6c35] text-white rounded-md border-1 border-dark">Ver más</button>
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
        {/* <HeaderNavbar
          logOut={this.logOut}
          changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
        ></HeaderNavbar> */}
        <NewHeaderNavbar/>
        <ToastContainer />
        {renderValidatingProjects()}
      </Container>
    );
  }
}
export default ValidatorAdmon;
