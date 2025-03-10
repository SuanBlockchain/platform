import React, { Component } from "react";

//Bootstrap
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
  Table,
  Stack,
  Nav,
  Badge
} from "react-bootstrap";
import {
  ArrowRight,
  CheckCircle,
  HourglassSplit,
  XCircle,
} from "react-bootstrap-icons";
import { v4 as uuidv4 } from "uuid";
import Bootstrap from "../../common/themes";
import HeaderNavbar from "../../Investor/Navbars/HeaderNavbar";
// GraphQL
import { API, Auth, Storage, graphqlOperation } from "aws-amplify";
import {
  createVerification,
  updateDocument,
  updateProductFeature,
  createVerificationComment,
  updateProduct,
  createDocument,
  deleteDocument,
} from "../../../graphql/mutations";
import {
  onUpdateDocument,
  onUpdateProductFeature,
  onCreateVerificationComment,
  onCreateDocument,
} from "../../../graphql/subscriptions";
import URLS3 from '../../common/_conf/URLS3';
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
            status
            category {
              name
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
class DocumentStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualUser: "",
      documents: [],
      documentsPending: [],
      otherDocuments: [],
      showPending: true,
      showOther: false,
      isShowProductDocuments: true,
      isShowUsers: false,
      showModalDocument: false,
      showModalUploadDocument: false,
      showModalComments: false,
      showModalValidate: false,
      showModalDetailsValidation: false,
      productFeatureToAddDoc: null,
      selectedDocument: null,
      selectedDocumentID: null,
      selectedProductValidation: null,
      selectedProductVerificationID: null,
      creatingVerification: false,
      users: [],
      newDocument: {
          id: null,
          data: null,
          timeStamp: null,
          docHash: '',
          url: '',
          signed: '',
          isApproved: false,
          status: 'pending',
          isUploadedToBlockChain: false,
          productFeatureID: ''
      },
      fileToUpload: null,
      creatingDocument: false,
      newVerificationComment: {
        verificationID: "",
        isCommentByVerifier: false,
        comment: "",
      },
    };
    this.handleHideModalDocument = this.handleHideModalDocument.bind(this);
    this.handleHideModalUploadDocument = this.handleHideModalUploadDocument.bind(this);
    this.handleHideModalComments = this.handleHideModalComments.bind(this);
    this.handleCreateDocument = this.handleCreateDocument.bind(this)
    this.handleInputCreateDocument = this.handleInputCreateDocument.bind(this)
    this.handleInputCreateVerificationComment =
      this.handleInputCreateVerificationComment.bind(this);
    this.handleInputValidate = this.handleInputValidate.bind(this);
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
    this.handleSelectStatus = this.handleSelectStatus.bind(this);
    this.getVerificationId = this.getVerificationId.bind(this);
  }

  componentDidMount = async () => {
    let actualUser = await Auth.currentAuthenticatedUser();
    actualUser = actualUser.attributes.sub;
    this.setState({ actualUser: actualUser });
    await this.loadDocuments();
    // Subscriptions
    // OnCreate Document
    this.updateDocumentListener = API.graphql(
      graphqlOperation(onCreateDocument)
    ).subscribe({
      next: async (updatedDocumentData) => {
        await this.loadDocuments();
      },
    });
    // OnUpdate Document
    this.updateDocumentListener = API.graphql(
      graphqlOperation(onUpdateDocument)
    ).subscribe({
      next: async (updatedDocumentData) => {
        await this.loadDocuments();
      },
    });
    // OnUpdate ProductFeature
    this.updateProductFeatureListener = API.graphql(
      graphqlOperation(onUpdateProductFeature)
    ).subscribe({
      next: async (updatedDocumentData) => {
        await this.loadUsers();
      },
    });

    // OnCerate VerificationComment
    this.createDocumentListener = API.graphql(
      graphqlOperation(onCreateVerificationComment)
    ).subscribe({
      next: async (createdVerificationComment) => {
        await this.loadDocuments();
      },
    });
  };

  async loadDocuments() {
    let filter1 = {
      status: {
        eq: "pending",
      },
    };
    let filter2 = {
      status: {
        notContains: "pending",
      },
    };
    const listDocumentsResultAll = await API.graphql({ query: listDocuments });
    listDocumentsResultAll.data.listDocuments.items.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    let documentsByVerificatorAll = [];
    listDocumentsResultAll.data.listDocuments.items.map((doc) =>
      doc.productFeature?.verifications?.items.map((v) => {
        if (v.userVerifiedID === this.state.actualUser)
          documentsByVerificatorAll.push(doc);
      })
    );
    if(this.state.selectedDocumentID !== ''){
      let documentSelectedUpdate = documentsByVerificatorAll.filter(doc => doc.id === this.state.selectedDocumentID)
      this.setState({selectedDocument: documentSelectedUpdate[0]})
    }
    this.setState({
      documents: documentsByVerificatorAll,
    });
    const listDocumentsResult = await API.graphql({
      query: listDocuments,
      variables: { filter: filter1 },
    });
    listDocumentsResult.data.listDocuments.items.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    let documentsByVerificatorFilter1 = [];
    listDocumentsResult.data.listDocuments.items.map((doc) =>
      doc.productFeature?.verifications?.items.map((v) => {
        if (v.userVerifiedID === this.state.actualUser)
          documentsByVerificatorFilter1.push(doc);
      })
    );
    this.setState({
      documentsPending: documentsByVerificatorFilter1,
    });
    const listDocumentsResult2 = await API.graphql({
      query: listDocuments,
      variables: { filter: filter2 },
    });
    listDocumentsResult2.data.listDocuments.items.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );
    let documentsByVerificatorFilter2 = [];
    listDocumentsResult2.data.listDocuments.items.map((doc) =>
      doc.productFeature?.verifications?.items.map((v) => {
        if (v.userVerifiedID === this.state.actualUser)
          documentsByVerificatorFilter2.push(doc);
      })
    );
    this.setState({
      otherDocuments: documentsByVerificatorFilter2,
    });
  }

  handleHideModalDocument() {
    this.setState({ showModalDocument: !this.state.showModalDocument });
  }
  handleHideModalUploadDocument() {
    this.setState({ showModalUploadDocument: !this.state.showModalUploadDocument, productFeatureToAddDoc: null });
  }
  handleHideModalComments() {
    this.setState({ showModalComments: !this.state.showModalComments });
  }
  handleSelectStatus(data) {
    if (data === "pendingDoc")
      this.setState({
        showPending: true,
        showOther: false,
        selectedProductValidation: null,
      });
    if (data === "approveRejectDoc")
      this.setState({
        showPending: false,
        showOther: true,
        selectedProductValidation: null,
      });
  }
  handleInputCreateDocument = (e) => {
      if (e.target.name === 'selected_file') {
          const { target: { files } } = e;
          const [file,] = files || [];
          if (!file) {
              return
          }
          this.setState({ fileToUpload: file })
      }
  }
  handleCreateDocument = async () => {
      let tempNewDocument = this.state.newDocument
      this.setState({ creatingDocument: true })

      // Eliminar archivo de base de datos y S3
      let deleteFileResult = null

      const fileToDelete = decodeURIComponent(this.state.selectedDocument.url.split('/').pop());
      deleteFileResult = await Storage.remove(fileToDelete);
      
      const docToDelete = {
        id: this.state.selectedDocument.id,
      };
      await API.graphql(
        graphqlOperation(deleteDocument, { input: docToDelete })
      );

      // Subir nuevo archivo a base de datos y S3
      // Creating image ID
      let imageId = ''
      let uploadImageResult = null
      let fileNameSplitByDotfileArray = this.state.fileToUpload.name.split('.')
      imageId = fileNameSplitByDotfileArray[0].replaceAll(' ', '_').replaceAll('-', '_')
      // Getting extension
      let imageExtension = fileNameSplitByDotfileArray[fileNameSplitByDotfileArray.length - 1]
      let imageName = `${this.state.productFeatureToAddDoc.id}_${imageId}.${imageExtension}`
      // Uploading image TO DO  MOVE TO PRIVATE
      uploadImageResult = await Storage.put(imageName, this.state.fileToUpload, {
        level: "public",
        contentType: '*/*',
      });

      tempNewDocument.id = `${this.state.productFeatureToAddDoc.id}_${imageId}`
      tempNewDocument.url = encodeURI(`${URLS3}${uploadImageResult.key}`)
      tempNewDocument.productFeatureID = this.state.productFeatureToAddDoc.id
      tempNewDocument.timeStamp = Date.now()
      tempNewDocument.data = JSON.stringify({ empty: '' })
      tempNewDocument.userID = this.state.actualUser
      await API.graphql(graphqlOperation(createDocument, { input: tempNewDocument })).then(()=> console.log('documento creado'))
      this.cleanState()
  }
  handleSelectProduct(product) {
    this.setState({ selectedProductValidation: product });
  }
  handleInputValidate(e) {
    if (e.target.name === "sign") {
      this.setState((prevState) => ({
        verification: { ...prevState.verification, sign: e.target.value },
      }));
    }
    if (e.target.name === "document_status") {
      this.setState((prevState) => ({
        verification: {
          ...prevState.verification,
          documentStatus: e.target.value,
        },
      }));
    }
  }
  
  handleDownload = async (doc) => {
    try {
      let id = doc.url.split('/').pop()
      const response = await Storage.get(id, { download: true });
      // Si el archivo se descargó correctamente, puedes crear un enlace para el usuario
      const url = URL.createObjectURL(response.Body);
      const link = document.createElement('a');
      link.href = url;
      link.download = id;
      link.click();
    } catch (error) {
      console.log('Error al descargar el archivo:', error);
    }
  };
  handleCreateVerification = async () => {
    if (this.state.selectedDocument) {
      this.setState({ creatingVerification: true });
      let docStatus = this.state.verification.documentStatus;
      if (docStatus === "Approve") {
        docStatus = {
          isApproved: true,
          status: "accepted",
        };
      } else
        docStatus = {
          isApproved: false,
          status: "denied",
        };
      //Me fijo si el proyecto el cual estoy verificando tiene o no algun doc aceptado para ponerlo en on_verification
      let putProductOnV = {
        onVerificacion: false,
        productID: this.state.selectedDocument.productFeature.product.id,
      };
      this.state.otherDocuments?.map((doc) => {
        if (doc.productFeature.product.id === putProductOnV.productID)
          return putProductOnV.onVerificacion === true;
      });
      !putProductOnV.onVerificacion &&
        (await API.graphql(
          graphqlOperation(updateProduct, {
            input: {
              id: putProductOnV.productID,
              status: "on_verification",
            },
          })
        ));
      //Me fijo si es el ultimo doc que falta del proyecto para ponerlo en verified
      let putProductVerified = {
        verify: false,
        productID: this.state.selectedDocument.productFeature.product.id,
      };
      let leftDocs = this.state.documentsPending?.filter(
        (doc) => doc.productFeature.product.id === putProductVerified.productID
      );
      if (leftDocs?.length === 1) putProductVerified.verify = true;
      let acceptedDocs = true;
      this.state.otherDocuments?.map((doc) => {
        if (
          doc.productFeature.product.id === putProductVerified.productID &&
          doc.status === "denied"
        )
          return (acceptedDocs = false);
      });
      putProductVerified.verify &&
        docStatus.status === "accepted" &&
        acceptedDocs &&
        (await API.graphql(
          graphqlOperation(updateProduct, {
            input: {
              id: putProductOnV.productID,
              status: "verified",
            },
          })
        ));
      await API.graphql(
        graphqlOperation(updateDocument, {
          input: {
            id: this.state.selectedDocument.id,
            isApproved: docStatus.isApproved,
            status: docStatus.status,
          },
        })
      );
    }
    this.cleanState();
  };

  async handleInputCreateVerificationComment(e) {
    if (e.target.name === "verificationComment") {
      await this.setState((prevState) => ({
        newVerificationComment: {
          ...prevState.newVerificationComment,
          comment: e.target.value,
        },
      }));
    }
  }

  async handleCreateVerificaionComment(e) {
    await this.setState((prevState) => ({
      newVerificationComment: {
        ...prevState.newVerificationComment,
        verificationID: this.state.selectedProductVerificationID,
      },
    }));

    let tempNewVerificationComment = this.state.newVerificationComment;
    if (tempNewVerificationComment.comment != "") {
      await API.graphql(
        graphqlOperation(createVerificationComment, {
          input: tempNewVerificationComment,
        })
      );
      await this.cleanNewVerificationComment();
    }
  }

  getVerificationId(document) {
    let verificationID = "";
    if (document.productFeature.verifications.items.length > 0) {
      document.productFeature.verifications.items.map((v) => {
        if (v.userVerifiedID === this.state.actualUser) {
          verificationID = v.id;
          return;
        }
      });
    }

    return verificationID;
  }

  validateInfoUser = async (pfID, userVerifiedID) => {
    let tempNewVerification = {};
    tempNewVerification.id = uuidv4().replaceAll("-", "_");
    tempNewVerification.createdOn = new Date().toISOString();
    tempNewVerification.updatedOn = new Date().toISOString();
    tempNewVerification.userVerifierID = this.state.actualUser;
    tempNewVerification.userVerifiedID = userVerifiedID;
    tempNewVerification.productFeatureID = pfID;
    await API.graphql(
      graphqlOperation(createVerification, { input: tempNewVerification })
    );
    let tempProductFeature = {
      id: pfID,
      value: "verified",
    };
    await API.graphql(
      graphqlOperation(updateProductFeature, { input: tempProductFeature })
    );

    this.cleanState();
  };

  cleanState = () => {
    this.setState({
      showModalDocument: false,
      showModalUploadDocument: false,
      showModalComments: false,
      showModalValidate: false,
      selectedDocument: null,
      creatingVerification: false,
      productFeatureToAddDoc: null,
      fileToUpload: null,
      creatingDocument: false,
      newDocument: {
          id: null,
          data: null,
          timeStamp: null,
          docHash: '',
          url: '',
          signed: '',
          isApproved: false,
          status: 'pending',
          isUploadedToBlockChain: false,
          productFeatureID: ''
      },
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
    });
  };

  cleanNewVerificationComment = () => {
    this.setState({
      newVerificationComment: {
        verificationID: "",
        isCommentByVerifier: false,
        comment: "",
      },
    });
  };

  render() {
    const renderValidations = () => {
      let documents = [];
      if (this.state.showPending) documents = this.state.documentsPending;
      if (this.state.showOther) documents = this.state.otherDocuments;
      let products = [];
      let status = [];
      documents.map((document) =>
        document.productFeature.verifications.items.map((v) => {
          if (v.userVerifiedID === this.state.actualUser) {
            if (!products.includes(document.productFeature.product.name)){
              products.push(document.productFeature.product.name);
              if (document.productFeature.product.status === "verified") {
                status.push("En verificación")
              }
              if (document.productFeature.product.status === "on_verification") {
                status.push("En verificación")
              }
              if (document.productFeature.product.status === "draft") {
                status.push("Por verificar")
              }
              if (document.productFeature.product.status === "certified") {
                status.push("Aprobado")
              }
            }
          }
        })
      );
      if (this.state.selectedProductValidation) {
        documents = documents.filter(
          (document) =>
            document.productFeature.product.name ===
            this.state.selectedProductValidation
        );
      }
      if (this.state.isShowProductDocuments) {
        return (
          <Container className="mt-4">
            <Row className="justify-content-md-center">
              <Col xs={2} className="text-center">
                <h3>Proyectos</h3>
                <Container className="mt-5">
                  {products?.map((product, i) => (
                    <Card
                      key={product}
                      body
                      className={
                        product === this.state.selectedProductValidation
                          ? "cardContainerSelected"
                          : "cardContainer"
                      }
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleSelectProduct(product)}
                    >
                      {product}
                      <ArrowRight />
                      <div>
                        <Badge>{status[i]}</Badge>
                      </div>
                    </Card>
                  ))}
                </Container>
              </Col>
              <Col xs={10}>
                <div>
                  <h3>Documentación</h3>
                  <DropdownButton
                    size="sm"
                    variant="outline-primary"
                    title="By status"
                  >
                    <Dropdown.Item
                      as="button"
                      onClick={() => this.handleSelectStatus("pendingDoc")}
                    >
                      Documentación pendiente
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={() =>
                        this.handleSelectStatus("approveRejectDoc")
                      }
                    >
                      Documentación aceptada/rechazada
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <Table striped hover className="mt-4">
                  <thead>
                    <tr>
                      <th>Proyecto</th>
                      <th>Categoría</th>
                      <th>Feature</th>
                      <th>Estado</th>
                      <th>Documento</th>
                      <th>Commentarios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((document) => (
                      <tr key={document.id}>
                        <td>{document.productFeature.product.name}</td>
                        <td>{document.productFeature.product.category.name}</td>
                        <td>
                          {
                            document.productFeature.feature.description.split(
                              "."
                            )[0]
                          }
                        </td>
                        <td>
                          {document.status === "pending" ? (
                            <HourglassSplit size={25} color="grey" />
                          ) : document.status === "accepted" ? (
                            <CheckCircle size={25} color="#449E48" />
                          ) : (
                            <XCircle size={25} color="#CC0000" />
                          )}
                        </td>
                        <td>
                          {document.status === "pending" || document.status === "accepted" ? (
                            <Button
                              variant="outline-primary"
                              size="sm"
                              /* onClick={() =>
                                this.setState({
                                  showModalDocument: true,
                                  selectedDocument: document,
                                })
                              } */
                              onClick={() => this.handleDownload(document)}
                            >
                              Ver documentación
                            </Button>
                          ) : (
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                this.setState({
                                  showModalUploadDocument: true,
                                  productFeatureToAddDoc: document.productFeature,
                                  selectedDocument: document,
                                })
                              }
                            >
                              Actualizar documentación
                            </Button>
                          )}
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              this.setState({
                                showModalComments: true,
                                selectedDocument: document,
                                selectedDocumentID: document.id,
                                selectedProductVerificationID:
                                  this.getVerificationId(document),
                              })
                            }
                          >
                            See comments
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        );
      }
    };
    const modalDocument = () => {
      if (this.state.showModalDocument) {
        return (
          <Modal
            show={this.state.showModalDocument}
            onHide={(e) => this.handleHideModalDocument()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.state.selectedDocument.productFeature.feature.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="d-block w-100"
                src={this.state.selectedDocument.url}
                alt={this.state.selectedDocument.id}
              />
            </Modal.Body>
          </Modal>
        );
      }
    };

    const modalUploadDocument = () => {
        if (this.state.productFeatureToAddDoc !== null && this.state.showModalUploadDocument) {
            return (
                <Modal
                    show={this.state.showModalUploadDocument}
                    onHide={(e) => this.handleHideModalUploadDocument()}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.productFeatureToAddDoc?.feature.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className='mb-3'>
                            <Form.Group>
                                <Form.Group >
                                    <Form.Label>Choose file</Form.Label>
                                    <Form.Control
                                        type='file'
                                        name='selected_file'
                                        onChange={(e) => this.handleInputCreateDocument(e)}
                                    />
                                </Form.Group>
                            </Form.Group>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button disabled={this.state.creatingDocument ? true : false} onClick={(e) => this.handleCreateDocument()}>{this.state.creatingDocument ? 'Uploading' : 'Upload Document'}</Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

    const modalComments = () => {
      if (this.state.showModalComments) {
        return (
          <Modal
            show={this.state.showModalComments}
            onHide={(e) => this.handleHideModalComments()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter "
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                {this.state.selectedDocument.productFeature.feature.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.selectedDocument.productFeature.verifications.items
                .length > 0 ? (
                this.state.selectedDocument.productFeature.verifications.items
                  .filter((v) => v.userVerifiedID === this.state.actualUser)[0]
                  .verificationComments.items.sort(function (a, b) {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  })
                  .map((vc) => {
                    return (
                      <p key={vc.id}>
                        {vc.createdAt} (
                        {vc.isCommentByVerifier === true ? "Verificador" : "Tú"}
                        ) {vc.comment}
                      </p>
                    );
                  })
              ) : (
                <p>Este documento aun no registra comentarios</p>
              )}
              <Stack direction="horizontal" gap={2}>
                <Form.Control
                  className="me-auto"
                  type="text"
                  placeholder="Escribe un comentario aqui ..."
                  name="verificationComment"
                  value={this.state.newVerificationComment.comment}
                  onChange={(e) => this.handleInputCreateVerificationComment(e)}
                />
                <div className="vr" />
                <Button
                  variant="secondary"
                  onClick={(e) => this.handleCreateVerificaionComment(e)}
                >
                  Enviar comentario
                </Button>
              </Stack>
            </Modal.Body>
          </Modal>
        );
      }
    };
    return (
      <Container style={{ paddingTop: 70, minHeight: "100vh" }}>
        {renderValidations()}
        {modalDocument()}
        {modalUploadDocument()}
        {modalComments()}
      </Container>
    );
  }
}
export default DocumentStatus;
