import React, { Component } from "react";
// Bootstrap
import {
  Accordion,
  Button,
  Card,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
// Auth css custom
// Routing
// import { useHistory } from 'react-router-dom'
// GraphQL
import { API, Auth, graphqlOperation } from "aws-amplify";
import {
  createUser,
  createWallet,
  deleteWallet,
  updateUser,
} from "../../graphql/mutations";
import { getUser } from "../../graphql/queries";
// Components
import wallet from "./assets/crypto-digital-wallet-gID_4.jpg";
import profile from "./assets/PngItem_4042710.png";
import Documents from "./Documents/Documents";
import ProductsList from "./ProductsList/ProductsList";
import s from "./ConstructorAdmon.module.css";
import HeaderNavbar from "./Navbar/HeaderNavbar";
import ProductsBuyed from "./ProductsBuyed/ProductsBuyed";
import NewProduct from "./NewProduct/NewProduct";
import DocumentStatus from "./Documents/DocumentStatus";
import NewProject from "./NewProject/NewProject";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";

class ConstructorAdmon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      walletAddress: "",
      editWallet: false,
      isShowDocuments: false,
      isShowProductsBuyed: false,
      isShowProductsList: true,
      uploadNewProduct: false, //false
      isShowInvestorProfile: false, //true
      showModalDocument: false,
      isRenderProfile: false,
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
    console.log("componentDidMount");
    const actualUser = await Auth.currentAuthenticatedUser();
    let userResult = await API.graphql({
      query: getUser,
      variables: { id: actualUser.attributes.sub },
    });
    this.loadUserInfo(userResult);
  }
  loadUserInfo(userResult) {
    this.setState({ user: userResult.data.getUser });
    if (userResult.data.getUser.wallets?.items?.length > 0) {
      this.setState({
        walletAddress: userResult.data.getUser.wallets.items[0].id,
      });
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
          isRenderProfile: true,
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
            isRenderProfile: true,
            isNewUser: false,
            showModalDocument: true,
          });
        } else {
          // The user exists and the profile is complete
          await this.setState({
            user: result.data.getUser,
            isRenderProfile: false,
            isShowProductsList: true,
            isShowDocuments: false,
            isNewUser: false,
          });
          // await this.props.setUserGraphQLUser(result.data.getUser)
        }
      }
    }
  }

  async changeHeaderNavBarRequest(pRequest) {
    console.log("changeHeaderNavBarRequest: ", pRequest);

    if (pRequest === "perfil") {
      this.setState({
        isShowDocuments: false,
        isShowProductsBuyed: false,
        isShowInvestorProfile: false,
        isRenderProfile: true,
        uploadNewProduct: false,
        isShowProductsList: false,
      });
    }

    if (pRequest === "investor_documents") {
      this.setState({
        isShowDocuments: true,
        isShowProductsBuyed: false,
        isShowInvestorProfile: false,
        isRenderProfile: false,
        uploadNewProduct: false,
        isNewUser: false,
        isShowProductsList: false,
      });
    }
    if (pRequest === "products_buyed") {
      this.setState({
        isShowDocuments: false,
        isShowProductsBuyed: true,
        isShowInvestorProfile: false,
        isRenderProfile: false,
        uploadNewProduct: false,
        isNewUser: false,
        isShowProductsList: false,
      });
    }
    if (pRequest === "upload_product") {
      this.setState({
        isShowDocuments: false,
        isShowProductsBuyed: false,
        isShowInvestorProfile: false,
        isRenderProfile: false,
        uploadNewProduct: true,
        isNewUser: false,
        isShowProductsList: false,
      });
    }
    if (pRequest === "investor_products") {
      this.setState({
        isShowDocuments: false,
        isShowProductsBuyed: false,
        isShowInvestorProfile: false,
        isRenderProfile: false,
        uploadNewProduct: false,
        isNewUser: false,
        isShowProductsList: true,
      });
    }
  }

  async setUserGraphQLUser(pUser) {
    await this.setState({ user: pUser });
  }

  async handleRenderCompleteOrUpdateProfile() {
    this.setState({ isRenderProfile: !this.state.isRenderProfile });
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
    this.setState({ isRenderProfile: false });
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
        isRenderProfile: false,
      });
      window.location.href = "/";
      // TODO: Check the option with router
      // const history = new useHistory()
      // history.push('/investor_admon')
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  editUserWallet(e) {
    if (e.target.name === "walletAddress") {
      this.setState({ walletAddress: e.target.value });
    }
  }
  async updateUserWallet(walletID) {
    await API.graphql(
      graphqlOperation(deleteWallet, { input: { id: walletID } })
    );
    let info = {
      id: this.state.walletAddress,
      name: this.state.walletAddress,
      status: "new",
      isSelected: true,
      userID: this.state.user.id,
    };
    await API.graphql(graphqlOperation(createWallet, { input: info }));
    let tempUser = this.state.user;
    tempUser.wallets.items[0].id = this.state.walletAddress;
    this.setState({ editWallet: true, user: tempUser });

    setTimeout(() => {
      this.setState({ editWallet: false });
    }, 2000);
  }
  render() {
    let {
      isShowDocuments,
      user,
      isRenderProfile,
      isShowProductsBuyed,
      uploadNewProduct,
      isShowProductsList,
    } = this.state;
    const renderUserWallets = (user) => {
      if (user.wallets !== undefined && user.wallets.items !== undefined) {
        if (user.wallets.items.length > 0) {
          return (
            <InputGroup className="mb-3">
              <Form.Control
                value={this.state.walletAddress}
                placeholder="Paste your address"
                name="walletAddress"
                aria-describedby="basic-addon2"
                onChange={(e) => this.editUserWallet(e)}
              />
              <Button
                variant="outline-success"
                id="button-addon2"
                onClick={(e) => this.updateUserWallet(user.wallets.items[0].id)}
              >
                {this.state.editWallet ? "Done" : "Edit"}
              </Button>
            </InputGroup>
          );
        }
      }
    };
    {
      /* <>
{user.wallets.items.map(wallet => (
                <div key={wallet.id}>
                    {wallet.id}
                </div>
            ))}
        </> */
    }

    const renderOrders = () => {
      if (isShowDocuments) {
        return <DocumentStatus />;
      }
    };
    const renderProductsList = () => {
      if (isShowProductsList) {
        return <ProductsList />;
      }
    };
    const renderProductsBuyed = () => {
      if (isShowProductsBuyed) {
        return <ProductsBuyed />;
      }
    };
    const renderNewProduct = () => {
      if (uploadNewProduct) {
        return <NewProduct />;
      }
    };

    const renderProfile = () => {
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
                <h6>Wallet Address</h6>
                {renderUserWallets(user)}
              </div>
            </div>
          </div>
        </div>
      );
    };
    const renderModalWallet = () => {
      if (isRenderProfile) {
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

    return (
      <div>
        <div className="container-sm " style={{ paddingTop: 60, minHeight: "100vh" }}>
          <div className="mb-5">
            <NewHeaderNavbar></NewHeaderNavbar>
          </div>

          <div className="mt-4">
            {renderProductsList()}
            {/* {renderProfile()} */}
            {/* {renderOrders()} */}
            {/* {renderProductsBuyed()} */}
            {/* {renderNewProduct()} */}
            {/* {renderModalWallet()} */}
            {/* <NewProduct /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ConstructorAdmon;
