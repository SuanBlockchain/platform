import React, { Component } from "react";
// Bootstrap
import { Auth } from "aws-amplify";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import { createUser, createWallet, updateUser } from "../../graphql/mutations";
import { getUser, getProduct } from "../../graphql/queries";
// Components
import wallet from "./assets/crypto-digital-wallet-gID_4.jpg";
import profile from "./assets/PngItem_4042710.png";
import Documents from "./Documents/Documents";
import s from "./InvestorAdmon.module.css";
import HeaderNavbar2 from "./Navbars/HeaderNavbar2";
import ProductsBuyed from "./ProductsBuyed/ProductsBuyed";
import InfoInvestor from "./infoInvestor/InfoInvestor";
import { queryUserStatus } from "./querys.js";
import ValidationError from "../validationError/ValidationError";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";

class InvestorAdmon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "",
        name: "",
        isProfileUpdated: false,
        walletID: "",
        walletName: "",
      },
      checkUserStatus: null,
      isShowDocuments: false,
      isShowProductsBuyed: false,
      isShowInvestorProfile: true,
      showModalDocument: false,
      isRenderCompleteOrUpdateProfile: false,
      isNewUser: false,
    };
    this.changeHeaderNavBarRequest = this.changeHeaderNavBarRequest.bind(this);
    this.setUserGraphQLUser = this.setUserGraphQLUser.bind(this);
    this.handleRenderCompleteOrUpdateProfile =
      this.handleRenderCompleteOrUpdateProfile.bind(this);
    this.handleHideModalDocument = this.handleHideModalDocument.bind(this);
    this.handleCUUser = this.handleCUUser.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async componentDidMount() {
    const actualUser = await Auth.currentAuthenticatedUser();
    let idUser = actualUser.attributes.sub;
    const variables = {
      id: "PRODUCT_USER_VALIDATION",
      /* featureID: `${idUser}_VALIDATION` */
      featureID: `0b803098-3834-4b1a-a326-db2fde4db615_VALIDATION`,
    };
    const result = await API.graphql(
      graphqlOperation(queryUserStatus, variables)
    );
    let checkUserStatusValue = this?.checkUser(result.data);
    this.setState({ checkUserStatus: checkUserStatusValue });
    this.loadActualLoggedUser(actualUser);
  }
  checkUser(data) {
    if (data?.getProduct?.productFeatures?.items?.length > 0) {
      if (data.getProduct.productFeatures.items[0].value === undefined)
        return false;
      if (data.getProduct.productFeatures.items[0].value !== "verified")
        return false;
      if (data.getProduct.productFeatures.items[0].value === "verified")
        return true;
    } else {
      return false;
    }
  }
  async loadActualLoggedUser(actualUser) {
    let tempUser = this.state.user;
    if (actualUser !== undefined) {
      // Setting ID user from register cognito User
      const filterByUserID = {
        id: actualUser.attributes.sub,
      };
      tempUser.id = actualUser.attributes.sub;
      this.setState({ user: tempUser });

      const result = await API.graphql(
        graphqlOperation(getUser, filterByUserID)
      );
      if (result.data.getUser === null) {
        // The user doesn't exists
        await this.setState({
          isRenderCompleteOrUpdateProfile: true,
          isNewUser: true,
          showModalDocument: true,
        });
      } else {
        if (
          result.data.getUser.isProfileUpdated === null ||
          !result.data.getUser.isProfileUpdated
        ) {
          // The user exists but the profile is not completed
          await this.setState({
            isRenderCompleteOrUpdateProfile: true,
            isNewUser: false,
            showModalDocument: true,
          });
        } else {
          // The user exists and the profile is complete
          await this.setState({
            user: result.data.getUser,
            isRenderCompleteOrUpdateProfile: false,
            isShowDocuments: false,
            isNewUser: false,
          });
          // await this.props.setUserGraphQLUser(result.data.getUser)
        }
      }
    }
  }

  async changeHeaderNavBarRequest(pRequest) {

    if (pRequest === "investor_profile") {
      this.setState({
        isShowDocuments: false,
        isShowProductsBuyed: false,
        isShowInvestorProfile: true,
        isRenderCompleteOrUpdateProfile: false,
      });
    }

    if (pRequest === "investor_documents") {
      this.setState({
        isShowDocuments: true,
        isShowProductsBuyed: false,
        isShowInvestorProfile: false,
        isRenderCompleteOrUpdateProfile: false,
        isNewUser: false,
      });
    }
    if (pRequest === "products_buyed") {
      this.setState({
        isShowDocuments: false,
        isShowProductsBuyed: true,
        isShowInvestorProfile: false,
        isRenderCompleteOrUpdateProfile: false,
        isNewUser: false,
      });
    }
  }

  async setUserGraphQLUser(pUser) {
    await this.setState({ user: pUser });
  }

  async handleRenderCompleteOrUpdateProfile() {
    this.setState({
      isRenderCompleteOrUpdateProfile:
        !this.state.isRenderCompleteOrUpdateProfile,
    });
  }

  async handleOnChangeInputForm(event) {
    if (event.target.name === "user.name") {
      let tempUser = this.state.user;
      tempUser.name = event.target.value.toUpperCase();
      await this.setState({ user: tempUser });
    }
    if (event.target.name === "user.walletID") {
      let tempUser = this.state.user;
      tempUser.walletID = event.target.value;
      await this.setState({ user: tempUser });
    }
    if (event.target.name === "user.walletName") {
      let tempUser = this.state.user;
      tempUser.walletName = event.target.value;
      await this.setState({ user: tempUser });
    }
    // if (event.target.name === 'user.cellphone') {
    //     let tempUser = this.state.user
    //     tempUser.cellphone = event.target.value
    //     await this.setState({user: tempUser})
    // }
  }

  async handleCUUser() {
    let tempUser = this.state.user;
    tempUser.isProfileUpdated = true;

    if (this.state.isNewUser) {
      const userPayload = {
        id: tempUser.id,
        name: tempUser.name,
        isProfileUpdated: true,
        role: "investor",
      };
      await API.graphql(graphqlOperation(createUser, { input: userPayload }));
    } else {
      const userPayload = {
        id: tempUser.id,
        name: tempUser.name,
        isProfileUpdated: true,
      };
      tempUser.dateOfBirth = "2000-10-01";
      await API.graphql(graphqlOperation(updateUser, { input: userPayload }));
    }
    // Creating Wallets
    const walletPayload = {
      id: tempUser.walletID,
      name: tempUser.walletName,
      userID: tempUser.id,
      status: "new",
    };
    await API.graphql(graphqlOperation(createWallet, { input: walletPayload }));
    this.setState({ isRenderCompleteOrUpdateProfile: false });
  }
  handleHideModalDocument() {
    this.setState({ showModalDocument: !this.state.showModalDocument });
  }

  async handleSignOut() {
    try {
      await Auth.signOut();
      localStorage.removeItem("role");
      this.setState({
        user: {
          id: "",
          name: "",
          isProfileUpdated: false,
          walletID: "",
          walletName: "",
        },
        isRenderCompleteOrUpdateProfile: false,
      });
      window.location.href = "/";
      // TODO: Check the option with router
      // const history = new useHistory()
      // history.push('/investor_admon')
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  render() {
    let {
      isShowDocuments,
      user,
      isRenderCompleteOrUpdateProfile,
      isShowProductsBuyed,
    } = this.state;

    const renderUserWallets = (user) => {
      if (user.wallets !== undefined && user.wallets.items !== undefined) {
        if (user.wallets.items.length > 0) {
          return (
            <Row xs={1} md={2} lg={3}>
              {user.wallets.items.map((wallet) => (
                <Col key={wallet.id}>
                  {wallet.name} / {wallet.id}
                </Col>
              ))}
            </Row>
          );
        }
      }
    };

    const renderOrders = () => {
      if (isShowDocuments) {
        return <Documents />;
      }
    };
    const renderProductsBuyed = () => {
      if (isShowProductsBuyed) {
        return <ProductsBuyed />;
      }
    };

    const renderCompleteProfile = () => {
      if (isRenderCompleteOrUpdateProfile) {
        return (
          <Container>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridUserContactName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre Contacto"
                    name="user.name"
                    value={user.name}
                    onChange={(e) => this.handleOnChangeInputForm(e)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUserWalletName">
                  <Form.Label>Wallet Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="user.walletName"
                    value={user.walletName}
                    onChange={(e) => this.handleOnChangeInputForm(e)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridUserWalletID">
                  <Form.Label>Wallet Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="user.walletID"
                    value={user.walletID}
                    onChange={(e) => this.handleOnChangeInputForm(e)}
                  />
                </Form.Group>
              </Row>

              <Button
                variant="primary"
                size="lg"
                onClick={() => this.handleCUUser()}
              >
                Actualizar
              </Button>
            </Form>
          </Container>
        );
      } else {
        return (
          <div
            style={{
              width: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className={s.container_profile}>
              <div className={s.profile_image_container}>
                <img src={profile} alt="profile" className={s.profile_image} />
              </div>
              <div className={s.profile_info_container}>
                <div className={s.profile_info}>
                  <h4>{user.name}</h4>
                  <h6>Wallets</h6>
                  {renderUserWallets(user)}
                </div>
                <button
                  className={s.button_update_profile}
                  onClick={(e) => this.handleRenderCompleteOrUpdateProfile(e)}
                >
                  Update info
                </button>
              </div>
            </div>
          </div>
        );
      }
    };
    const renderModalWallet = () => {
      if (isRenderCompleteOrUpdateProfile) {
        return (
          <Modal
            show={this.state.showModalDocument}
            onHide={(e) => this.handleHideModalDocument()}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <Card border="light">
                <Card.Img variant="top" src={wallet} />
                <Card.Body>
                  <Card.Title as="h2">
                    Paso para crear billetera en Cardano
                  </Card.Title>
                  <Accordion flush alwaysOpen>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Paso 1: Obtener billetera
                      </Accordion.Header>
                      <Accordion.Body>
                        Su billetera en Cardano es la herramienta principal
                        utilizada para interactuar con la Blockchain. En ella,
                        lo más importante son las llaves privadas, que en el
                        caso de la mayoría de billeteras están representadas por
                        una combinación de palabras ó frase de recuperación las
                        cuales deben ser guardadas fuera de línea en un sitio
                        seguro. Ver más acerca de la seguridad en Cardano y cómo
                        guardar de forma segura unas llaves privadas. Las
                        billeteras más populares en Cardano son:
                        https://eternl.io/, https://gerowallet.io, https://namiwallet.io, https://yoroi-wallet.com.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Paso 2: Pendiente</Accordion.Header>
                      <Accordion.Body>
                        La billetera recién creada es el sitio donde se van a
                        guardar sus tokens de inversión. Cualquier movimiento, o
                        transacción en la blockchain tiene un costo asociado que
                        en el caso de Cardano se paga en la moneda nativa
                        llamada ADA. Si ya invirtió, como inversionista
                        simplemente recibirá una cantidad de tokens proporcional
                        a su inversión con un número mínimo de ADAs como valor
                        necesario mínimo para mover los tokens durante la
                        transacción inicial. Si posteriormente desea mover los
                        tokens ya sea cambiarlos de billetera o venderlos
                        necesitará tener un saldo adicional en ADAs para pagar
                        los fees de transacción. Existen múltiples opciones para
                        adquirir ADAs a partir de dinero fiduciario en casas de
                        cambio conocidas en línea. Si presenta alguna inquietud
                        en este proceso, por favor contacte a soporte.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Paso 3: Pendiente</Accordion.Header>
                      <Accordion.Body>
                        Conectar la billetera a la plataforma Suan: Una vez
                        creada su billetera puede conectarla de forma segura al
                        sitio web de Suan. En este caso, un botón de conectar se
                        encuentra disponible en la parte superior derecha.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Modal.Body>
          </Modal>
        );
      }
    };
    if (this.state.checkUserStatus === null) {
      return (
        <Container fluid style={{ paddingTop: 50, minHeight: "100vh" }}>
          <Row>
            <Col>
              <NewHeaderNavbar />
            </Col>
          </Row>
          <div style={{ marginTop: "1%" }}>Cargando...</div>
        </Container>
      );
    }
    if (this.state.checkUserStatus) {
      return (
        <Container fluid style={{ paddingTop: 50, minHeight: "100vh" }}>
          <Row>
            <Col>
              <NewHeaderNavbar />
            </Col>
          </Row>

          <Row>
            {/*                     {renderCompleteProfile()}
                        {renderOrders()}
                        {renderProductsBuyed()}
                        {renderModalWallet()} */}
            <InfoInvestor />
          </Row>
        </Container>
      );
    } else {
      return (
        <Container fluid style={{ paddingTop: 50, minHeight: "100vh" }}>
          <Row>
            <Col>
              <NewHeaderNavbar />
            </Col>
          </Row>

          <Row>
            <ValidationError />
          </Row>
        </Container>
      );
    }
  }
}

export default InvestorAdmon;
