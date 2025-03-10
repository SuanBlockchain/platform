import React, { Component } from "react";
// Auth
import { Auth } from "aws-amplify";
// Bootstrap
import { Alert, Col, Container, Row } from "react-bootstrap";
// Components
import UserProducts from "./UserProducts/UserProducts";
import AdmonProfile from "./AdmonProfile/AdmonProfile";
import Categorys from "./Categorys/Categorys";
import Items from "./Items/Items";
import Configure from "./Configure/Configure";
import Documents from "./Documents/Documents";
import Features from "./Features/Features";
import Formulas from "./Formulas/Formulas";
import HeaderNavbar from "./Navbars/HeaderNavbar";
import Validators from "./Validators/Validators";
import ManageMarketplaceAdmin from "./ManageMarketplaceAdmin/ManageMarketplaceAdmin";
import CheckAppStatus from "./CheckAppStatus"
import Products from "./Products/Products";
import Results from "./Results/Results";
import UOM from "./UOM/UOM";
// GraphQL
import { API, graphqlOperation } from "aws-amplify";
import { updateUser } from "../../graphql/mutations";
import AssignPF from "./AssignPF/AssignPF";
import { ToastContainer } from "react-toastify";
import Analysts from "./Analitic/Analysts";
import AssignAnalyst from "./assignAnali/AssignAnalyst";


export default class Admon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actualUser: null,
      isActualUserLogged: true,
      user: {
        id: "",
        name: "",
        dateOfBirth: "",
        isProfileUpdated: false,
        addresss: "",
        latitude: "",
        longitude: "",
        cellphone: "",
      },
      isShowAdmonProfile: false,
      isShowProducts: true,
      isShowCategorys: false,
      isShowFeatures: false,
      isShowNotAuthorize: false,
      isShowUOM: false,
      isShowFormulas: false,
      isShowValidators: false,
      isShowMarketplaceAdmin: false,
      isShowResults: false,
      isShowDocuments: false,
      isShowAPF: false,
      isShowAProducts: false,
      isShowConfigure: false,
      isShowAnalysts: false,
      isShowAppStatus: false,
      isShowAssign_analyst: false
    };
    this.changeHeaderNavBarRequest = this.changeHeaderNavBarRequest.bind(this);
    this.setUserGraphQLUser = this.setUserGraphQLUser.bind(this);
    this.handleCUUser = this.handleCUUser.bind(this);
    this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this);
    this.setUserIDUsingCognitoSignedUser =
      this.setUserIDUsingCognitoSignedUser.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  async componentDidMount() {
   
    // const tempActualUser =  await Auth.currentAuthenticatedUser()
    // await this.setState({actualUser: tempActualUser})
    // if (this.state.user.id === '') { // Is not logged
    //     this.changeHeaderNavBarRequest('admon_profile')
    // }
  }

  async componentDidUpdate(prevProps, prevState) {
    // if (this.state.actualUser !== prevProps.actualUser) {
    //     // this.fetchData(this.props.userID);
    //    
    //     await this.setState({isActualUserLogged: true})
    // }
    // if (prevState.actualUser === null) {

    //     await this.setState({isActualUserLogged: true})
    // }
  }
  async handleSignOut() {
    try {
      await Auth.signOut();
      localStorage.removeItem("role");
      this.setState({ actualUser: null, isActualUserLogged: false });
      /* this.props.history.push("/") */
      window.location.href = "/";
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  async setUserGraphQLUser(pUser) {
    await this.setState({ user: pUser });
  }

  async changeHeaderNavBarRequest(pRequest) {

    if (pRequest === "admon_profile") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: true,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAppStatus: false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
      });
    }

    if (pRequest === "analysts") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin: false,
        isShowAppStatus: false,
        isShowAnalysts: true,  // Mostrar analistas
        isShowAssign_analyst:false,

      });
    }

    if (pRequest === "assign_analyst") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin: false,
        isShowAppStatus: false,
        isShowAnalysts: false,  // Mostrar analistas
        isShowAssign_analyst:true,
      });
    }
    

    if (pRequest === "user_not_authorize") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: true,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowValidators: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAppStatus: false,
        isShowAssign_analyst:false,
      });
    }

    if (pRequest === "products") {
      this.setState({
        isShowProducts: true,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAppStatus: false,
        isShowAssign_analyst:false,
      });
    }

    if (pRequest === "categorys") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: true,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }

    if (pRequest === "items") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: true,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "features") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: true,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "uom") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: true,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "formulas") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: true,
        isShowValidators: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "results") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowValidators: false,
        isShowResults: true,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "documents") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowValidators: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: true,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "assign_products") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowValidators: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: true,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }

    if (pRequest === "validation") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowValidators: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "settings") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowValidators: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowAProducts: false,
        isShowConfigure: true,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "validators") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowValidators: true,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "assign_pf") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowValidators: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: true,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "marketplace_admin") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowValidators: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:true,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: false
      });
    }
    if (pRequest === "apps_status") {
      this.setState({
        isShowProducts: false,
        isShowCategorys: false,
        isShowItems: false,
        isShowFeatures: false,
        isShowAdmonProfile: false,
        isShowNotAuthorize: false,
        isShowUOM: false,
        isShowFormulas: false,
        isShowResults: false,
        isShowDocuments: false,
        isShowValidators: false,
        isShowAProducts: false,
        isShowConfigure: false,
        isShowAPF: false,
        isShowMarketplaceAdmin:false,
        isShowAnalysts: false,
        isShowAssign_analyst:false,
        isShowAppStatus: true
      });
    }
  }

  async handleCUUser(pIsNewUser) {
    let tempUser = this.state.user;
    tempUser.isProfileUpdated = true;
    // To updates
    if (!pIsNewUser) {
      delete tempUser.ordersClient;
      delete tempUser.ordersWiller;
      delete tempUser.createdAt;
      delete tempUser.updatedAt;
      tempUser.dateOfBirth = "2000-10-01";
      await API.graphql(graphqlOperation(updateUser, { input: tempUser }));
    }
    this.setState({ isRenderCompleteOrUpdateProfile: false });
  }

  async handleOnChangeInputForm(event) {
    if (event.target.name === "user.name") {
      let tempUser = this.state.user;
      tempUser.name = event.target.value.toUpperCase();
      await this.setState({ user: tempUser });
    }
    if (event.target.name === "user.addresss") {
      let tempUser = this.state.user;
      tempUser.addresss = event.target.value.toUpperCase();
      await this.setState({ user: tempUser });
    }
    if (event.target.name === "user.cellphone") {
      let tempUser = this.state.user;
      tempUser.cellphone = event.target.value;
      await this.setState({ user: tempUser });
    }
  }

  async setUserIDUsingCognitoSignedUser(pID) {
    let tempUser = this.state.user;
    tempUser.id = pID;
    await this.setState({ user: tempUser });
  }

  // RENDER
  render() {
    let {
      isShowProducts,
      isShowCategorys,
      isShowItems,
      isShowFeatures,
      isShowAdmonProfile,
      isShowNotAuthorize,
      isShowUOM,
      isShowFormulas,
      isShowResults,
      isShowDocuments,
      isShowValidators,
      isShowAProducts,
      isShowConfigure,
      isShowAPF,
      isShowMarketplaceAdmin,
      isShowAppStatus,
      isShowAnalysts,
      isShowAssign_analyst,
    } = this.state;
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="flex">
          <HeaderNavbar
            changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
            handleSignOut={this.handleSignOut}
            actualUser={this.state.actualUser}
            isActualUserLogged={this.state.isActualUserLogged}
          />
        </div>

        <div className="flex flex-wrap">
          {isShowAdmonProfile && (
            <AdmonProfile
              user={this.state.user}
              setUserIDUsingCognitoSignedUser={
                this.setUserIDUsingCognitoSignedUser
              }
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              setUserGraphQLUser={this.setUserGraphQLUser}
              handleOnChangeInputForm={this.handleOnChangeInputForm}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowProducts && (
            <Products
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
            />
          )}
          {isShowCategorys && (
            <Categorys
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowItems && (
            <Items
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowFeatures && (
            <Features
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowUOM && (
            <UOM
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowFormulas && (
            <Formulas
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowResults && (
            <Results
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowDocuments && (
            <Documents
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
          {isShowAnalysts && (
  <Analysts
    user={this.state.user}
    changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
    handleCUUser={this.handleCUUser}
  />
)}
{isShowAssign_analyst && (
  <AssignAnalyst
    user={this.state.user}
    changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
    handleCUUser={this.handleCUUser}
  />
)}
          {isShowNotAuthorize && (
            <Alert key="key_warning" variant="warning">
              Perfil no autorizado
            </Alert>
          )}
          {isShowAProducts && <UserProducts />}
          {isShowAPF && <AssignPF />}
          {isShowValidators && <Validators />}
          {isShowMarketplaceAdmin && <ManageMarketplaceAdmin/>}
          {isShowAppStatus && <CheckAppStatus/>}
          {isShowConfigure && (
            <Configure
              user={this.state.user}
              changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
              handleCUUser={this.handleCUUser}
            />
          )}
        </div>

        <ToastContainer></ToastContainer>
      </div>
    );
  }
}
