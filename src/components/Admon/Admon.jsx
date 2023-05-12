import React, { Component } from 'react';
// Auth
import { Auth } from 'aws-amplify';
// Bootstrap
import { Alert, Col, Container, Row } from 'react-bootstrap';
// Components
import UserProducts from './UserProducts/UserProducts';
import AdmonProfile from './AdmonProfile/AdmonProfile';
import Categorys from './Categorys/Categorys';
import Configure from './Configure/Configure';
import Documents from './Documents/Documents';
import Features from './Features/Features';
import Formulas from './Formulas/Formulas';
import HeaderNavbar from './Navbars/HeaderNavbar';
import Validators from './Validators/Validators';
import Products from './Products/Products';
import Results from './Results/Results';
import UOM from './UOM/UOM';
// GraphQL
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../graphql/mutations';

export default class Admon extends Component {

    constructor(props) {
        super(props)
        this.state = {
            actualUser: null,
            isActualUserLogged: true,
            user: {
                id: '',
                name: '',
                dateOfBirth: '',
                isProfileUpdated: false,
                addresss: '',
                latitude: '',
                longitude: '',
                cellphone: '',
            },
            isShowAdmonProfile: false,
            isShowProducts: true,
            isShowCategorys: false,
            isShowFeatures: false,
            isShowNotAuthorize: false,
            isShowUOM: false,
            isShowFormulas:false,
            isShowValidators: false,
            isShowResults: false,
            isShowDocuments: false,
            
            isShowConstructorAdmon: false, 
            isShowConfigure: false, 
        }
        this.changeHeaderNavBarRequest = this.changeHeaderNavBarRequest.bind(this)
        this.setUserGraphQLUser = this.setUserGraphQLUser.bind(this)
        this.handleCUUser = this.handleCUUser.bind(this)
        this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this)
        this.setUserIDUsingCognitoSignedUser = this.setUserIDUsingCognitoSignedUser.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
    }

    async componentDidMount() {
        console.log('componentDidMount')
        // const tempActualUser =  await Auth.currentAuthenticatedUser()
        // await this.setState({actualUser: tempActualUser})
        // if (this.state.user.id === '') { // Is not logged
        //     this.changeHeaderNavBarRequest('admon_profile')
        // }
    }

    async componentDidUpdate(prevProps, prevState) {
        // if (this.state.actualUser !== prevProps.actualUser) {
        //     // this.fetchData(this.props.userID);
        //     console.log('actualUser: ', this.state.actualUser)
        //     await this.setState({isActualUserLogged: true})
        // }

        // if (prevState.actualUser === null) {
        //     console.log('actualUser: ', this.state.actualUser)
        //     await this.setState({isActualUserLogged: true})
        // }
        
    }
    async handleSignOut() {
        try {
            await Auth.signOut()
            localStorage.removeItem('role');
            this.setState({actualUser: null, isActualUserLogged: false})
            /* this.props.history.push("/") */
            window.location.href="/"
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    async setUserGraphQLUser(pUser) {
        await this.setState({user: pUser})
    }

    async changeHeaderNavBarRequest(pRequest) {
        console.log('changeHeaderNavBarRequest: ', pRequest)

        if (pRequest === 'admon_profile') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: true,
                isShowNotAuthorize: false,
                isShowUOM: false,
                isShowFormulas:false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
            })
        }

        if (pRequest === 'user_not_authorize') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: true,
                isShowUOM: false,
                isShowFormulas:false,
                isShowResults: false,
                isShowDocuments: false,
                isShowValidators: false,
                isShowConstructorAdmon: false,
                isShowConfigure: false,
            })
        }


        if (pRequest === 'products') {
            this.setState({
                isShowProducts: true,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowUOM: false,
                isShowFormulas:false,
                isShowValidators: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
            })
        }

        if (pRequest === 'categorys') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: true,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowUOM: false,
                isShowFormulas:false,
                isShowValidators: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
            })
        }
        if (pRequest === 'features') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: true,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowUOM: false,
                isShowFormulas:false,
                isShowValidators: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
        })
        }
        if (pRequest === 'uom') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowUOM: true,
                isShowFormulas:false,
                isShowValidators: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
        })
        }
        if (pRequest === 'formulas') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowUOM: false,
                isShowFormulas:true,
                isShowValidators: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
        })
        }
        if (pRequest === 'results') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowUOM: false,
                isShowFormulas: false,
                isShowValidators: false,
                isShowResults: true,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
        })
        }
        if (pRequest === 'documents') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowValidators: false,
                isShowUOM: false,
                isShowFormulas: false,
                isShowResults: false,
                isShowDocuments: true,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
        })
        }
        if (pRequest === 'constructor_admon') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowValidators: false,
                isShowUOM: false,
                isShowFormulas: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: true,
                isShowConfigure: false,
        })
        }
        
        if (pRequest === 'validation') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowValidators: false,
                isShowUOM: false,
                isShowFormulas: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: false,
        })
        }
        if (pRequest === 'settings') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowValidators: false,
                isShowUOM: false,
                isShowFormulas: false,
                isShowResults: false,
                isShowDocuments: false,
                
                isShowConstructorAdmon: false,
                isShowConfigure: true,
        })
        }
        if (pRequest === 'validators') {
            this.setState({
                isShowProducts: false,
                isShowCategorys: false,
                isShowFeatures: false,
                isShowAdmonProfile: false,
                isShowNotAuthorize: false,
                isShowUOM: false,
                isShowFormulas: false,
                isShowResults: false,
                isShowDocuments: false,
                isShowValidators: true,
                isShowConstructorAdmon: false,
                isShowConfigure: false,
        })
        }
        
    }

    async handleCUUser(pIsNewUser) {
        let tempUser = this.state.user
        tempUser.isProfileUpdated = true
        // To updates
        if (!pIsNewUser) {
            delete tempUser.ordersClient
            delete tempUser.ordersWiller
            delete tempUser.createdAt
            delete tempUser.updatedAt
            tempUser.dateOfBirth = '2000-10-01'
            await API.graphql(graphqlOperation(updateUser, { input: tempUser }))
        }
        this.setState({isRenderCompleteOrUpdateProfile: false})
    }

    async handleOnChangeInputForm(event) {
        if (event.target.name === 'user.name') {
            let tempUser = this.state.user
            tempUser.name = event.target.value.toUpperCase()
            await this.setState({user: tempUser })
        }
        if (event.target.name === 'user.addresss') {
            let tempUser = this.state.user
            tempUser.addresss = event.target.value.toUpperCase()
            await this.setState({user: tempUser})
        }
        if (event.target.name === 'user.cellphone') {
            let tempUser = this.state.user
            tempUser.cellphone = event.target.value
            await this.setState({user: tempUser})
        }
    }

    async setUserIDUsingCognitoSignedUser(pID) {
        let tempUser = this.state.user
        tempUser.id = pID
        await this.setState({user: tempUser})
    }

    // RENDER
    render() {
        let {isShowProducts,
            isShowCategorys,
            isShowFeatures,
            isShowAdmonProfile,
            isShowNotAuthorize,
            isShowUOM,
            isShowFormulas,
            isShowResults,
            isShowDocuments,
            isShowValidators,
            isShowConstructorAdmon,
            isShowConfigure
        } = this.state

        const renderAdmonProfile = () => {
            if (isShowAdmonProfile) {
                return (
                    <AdmonProfile
                        user={this.state.user}
                        setUserIDUsingCognitoSignedUser={this.setUserIDUsingCognitoSignedUser}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        setUserGraphQLUser={this.setUserGraphQLUser}
                        handleOnChangeInputForm={this.handleOnChangeInputForm}
                        handleCUUser={this.handleCUUser}
                    ></AdmonProfile>
                )
            }
        }

        const renderProducts = () => {
            if (isShowProducts) {
                return (
                    <Products 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                    ></Products>
                )
            }
        }

        const renderCategorys = () => {
            if (isShowCategorys) {
                return (
                    <Categorys 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        handleCUUser={this.handleCUUser}
                    ></Categorys>
                )
            }
        }
        const renderFeatures = () => {
            if (isShowFeatures) {
                return (
                    <Features 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        handleCUUser={this.handleCUUser}
                    ></Features>
                )
            }
        }
        const renderOUM = () => {
            if (isShowUOM) {
                return (
                    <UOM 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        handleCUUser={this.handleCUUser}
                    ></UOM>
                )
            }
        }
        const renderFormulas = () => {
            if (isShowFormulas) {
                return (
                    <Formulas 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        handleCUUser={this.handleCUUser}
                    ></Formulas>
                )
            }
        }
        const renderResults = () => {
            if (isShowResults) {
                return (
                    <Results 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        handleCUUser={this.handleCUUser}
                    ></Results>
                )
            }
        }
        const renderDocuments = () => {
            if (isShowDocuments) {
                return (
                    <Documents 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        handleCUUser={this.handleCUUser}
                    ></Documents>
                )
            }
        }
        const renderConfiguration = () => {
            if (isShowConfigure) {
                return (
                    <Configure 
                        user={this.state.user}
                        changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                        handleCUUser={this.handleCUUser}
                    ></Configure>
                )
            }
        }

       
        const renderUserNoAuthorize = () => {
            if (isShowNotAuthorize) {
                return (
                    <Alert key="key_warning" variant="warning">
                        Perfil no autorizado
                    </Alert>
                )
            }
        }
        const renderConstructorAdmon = () => {
            if (isShowConstructorAdmon) {
                return (
                    <UserProducts />
                )
            }
        }
        const renderValidator = () => {
            if (isShowValidators) {
                return (
                    <Validators />
                )
            }
        }

        return (
            <Container fluid style={{paddingTop: 70, minHeight: '100vh'}} >

                <h4>Admon Dashboard</h4>
                
                <Row>
                    <Col>
                        <HeaderNavbar 
                            changeHeaderNavBarRequest={this.changeHeaderNavBarRequest}
                            handleSignOut={this.handleSignOut}
                            actualUser={this.state.actualUser}
                            isActualUserLogged={this.state.isActualUserLogged}
                        ></HeaderNavbar>
                    </Col>
                </Row>

                <Row>
                    {renderProducts()}
                    {renderCategorys()}
                    {renderFeatures()}
                    {renderOUM()}
                    {renderFormulas()}
                    {renderResults()}
                    {renderDocuments()}
                    {renderAdmonProfile()}
                    {renderUserNoAuthorize()}
                    {renderConstructorAdmon()}
                    {renderValidator()}
                    {renderConfiguration()}
                </Row>

            </Container>
        )
    }
}