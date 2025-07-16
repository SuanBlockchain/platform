import React, { Component } from 'react';
//Bootstrap
import { Button, Col, Container, Dropdown, DropdownButton, Form, Modal, Row, Table } from 'react-bootstrap';
// GraphQL
import { API, graphqlOperation } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { createUserProduct, updateUser, createVerification } from '../../../graphql/mutations';
import { listProducts, listUserProducts, listUsers } from '../../../graphql/queries';
import { onCreateUserProduct, onUpdateUser } from '../../../graphql/subscriptions';



export default class UserProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      usersCopy: [],
      products: [],
      userProducts: [],
      showModalRole: false,
      userSelected: null,
      userSelectedRol: null,
      productSelected: null,
      roleSelected: '',
      newVerification: {
          id: '',
          createdOn: '',
          updatedOn: '',
          sign: '',
          userVerifierID: '',
          userVerifiedID: '',
          productFeatureID: '',
      },
    }
    this.loadUsers = this.loadUsers.bind(this)
    this.loadProducts = this.loadProducts.bind(this)
    this.loadUserProducts = this.loadUserProducts.bind(this)
    this.handleSelectUser = this.handleSelectUser.bind(this)
    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.handleAssignProduct = this.handleAssignProduct.bind(this)
    this.handleAssignRole = this.handleAssignRole.bind(this)
    this.handleHideModalProductFeatures = this.handleHideModalProductFeatures.bind(this)
  }
  componentDidMount = async() => {
    Promise.all([
      this.loadUsers(),
      this.loadProducts(),
      this.loadUserProducts()
  ])
    // OnCreate userProduct
    this.createUserProductListener = API.graphql(graphqlOperation(onCreateUserProduct))
    .subscribe({
        next: async createdUserProductData => {
            let isOnCreateList = false;
            this.state.userProducts.map((mapUserProduct) => {
                if (createdUserProductData.value.data.onCreateUserProduct.id === mapUserProduct.id) {
                    isOnCreateList = true;
                } 
                return mapUserProduct
            })
            let tempUserProducts = this.state.userProducts
            let tempOnCreateUserProduct = createdUserProductData.value.data.onCreateUserProduct
            if (!isOnCreateList) {
                tempUserProducts.push(tempOnCreateUserProduct)
            }
            this.setState((state) => ({userProducts: tempUserProducts}))
        }
    })
    // OnUpdate User
    this.updateUserListener = API.graphql(graphqlOperation(onUpdateUser))
    .subscribe({
        next: updatedUserData => {
            let tempUsers = this.state.users.map((mapUsers) => {
                if (updatedUserData.value.data.onUpdateUser.id === mapUsers.id) {
                    return updatedUserData.value.data.onUpdateUser
                } else {
                    return mapUsers
                }
            })
            // Ordering users by name
            tempUsers.sort((a, b) => (a.name > b.name) ? 1 : -1)
            this.setState((state) => ({users: tempUsers}))
        }
    })
}
componentWillUnmount() {
  this.createUserProductListener.unsubscribe();
  this.updateUserListener.unsubscribe();
}
  async loadUsers() {
  const listUsersResults = await API.graphql(graphqlOperation(listUsers))
  this.setState({users: listUsersResults.data.listUsers.items, usersCopy: listUsersResults.data.listUsers.items})
  }
  async loadProducts() {
    const listProductsResults = await API.graphql(graphqlOperation(listProducts))
    this.setState({products: listProductsResults.data.listProducts.items})
    }
  async loadUserProducts() {
    const listUserProductsResults = await API.graphql(graphqlOperation(listUserProducts))
    listUserProductsResults.data.listUserProducts.items.sort((a, b) => (a.user.id > b.user.id) ? 1 : -1)
    this.setState({userProducts: listUserProductsResults.data.listUserProducts.items})
    }
  handleSelectUser(user){
    this.setState({userSelected: user, userSelectedRol: user.role})
  }
  handleSelectProduct(product){
    this.setState({productSelected: product})
  }
  assignRole(user){
    this.handleSelectUser(user)
    this.setState({showModalRole: true})
  }
  handleHideModalProductFeatures() {
    this.setState({showModalRole: !this.state.showModalRole,})
  }
  handleInputChange(e){
    if(e.target.name === 'select_role'){
      this.setState({roleSelected: e.target.value})
    }
  }
  handleSelectUsersToShow(data){
    let users = this.state.users
    let filteredUsers = []
    if(data === 'show_all'){
      this.setState({usersCopy: this.state.users})
    }
    if(data === 'admon'){
      filteredUsers = users.filter(user => user.role === 'admon')
      if(filteredUsers.length > 0){
         this.setState({usersCopy: filteredUsers})
      }else this.setState({usersCopy: this.state.users})
      
    } 
    if(data === 'constructor'){
      filteredUsers = users.filter(user => user.role === 'constructor')
      if(filteredUsers.length > 0){
        this.setState({usersCopy: filteredUsers})
     }else this.setState({usersCopy: this.state.users})
    } 
    if(data === 'investor'){
      filteredUsers = users.filter(user => user.role === 'investor')
      if(filteredUsers.length > 0){
        this.setState({usersCopy: filteredUsers})
     }else this.setState({usersCopy: this.state.users})
    } 
    if(data === 'validator'){
      filteredUsers = users.filter(user => user.role === 'validator')
      if(filteredUsers.length > 0){
        this.setState({usersCopy: filteredUsers})
     }else this.setState({usersCopy: this.state.users})
    } 
  }
  async handleAssignProduct(){
    let existUP = false
    const userProducts = this.state.userProducts
    for(let i = 0; i < userProducts.length; i++){
      if(userProducts[i].userID === this.state.userSelected.id && userProducts[i].productID === this.state.productSelected.id){
        existUP = true
      }
    }
    if(!existUP){
      let payloadUserProduct = {
        id: uuidv4().replaceAll('-','_'),
        userID: this.state.userSelected.id,
        productID: this.state.productSelected.id
      }
      await API.graphql(graphqlOperation(createUserProduct, { input: payloadUserProduct }))
    }else{
      alert('Ya exite una Relación entre Producto y Usuario')
    }

    if(this.state.userSelectedRol === 'validator') {
      let userProduct = userProducts.filter( uP => uP.productID === this.state.productSelected.id)[0]
      let constructorID = ''
      userProducts.filter( uP => uP.productID === this.state.productSelected.id).map( uP => {
        if (uP.user.role === 'constructor') {
          constructorID = uP.user.id
          return
        }
      })
      let newVerifications = []
      userProduct.product.productFeatures.items.map( pf => {
        let isAlreadyVerifier = false
        pf.verifications.items.map( verif => {
          if (verif.userVerifierID === this.state.userSelected.id) {
            isAlreadyVerifier = true
          }
        })
        if(pf.isVerifable === true && !isAlreadyVerifier) {
          let tempNewVerification = this.state.newVerification
          tempNewVerification.id = uuidv4().replaceAll('-', '_')
          tempNewVerification.createdOn = new Date().toISOString()
          tempNewVerification.updatedOn = new Date().toISOString()
          tempNewVerification.productFeatureID = pf.id
          tempNewVerification.userVerifiedID = constructorID
          tempNewVerification.userVerifierID = this.state.userSelected.id
          newVerifications.push(tempNewVerification)
        }
      })
      for (let i = 0; i < newVerifications.length; i++) {
        await API.graphql(graphqlOperation(createVerification, { input: newVerifications[i] }))
      }

    }
    this.cleanState()
  }
  async handleAssignRole(){
    let payloadUser = {
      id: this.state.userSelected.id,
      role: this.state.roleSelected
    }
    await API.graphql(graphqlOperation(updateUser, { input: payloadUser }))
    this.cleanState()
  }
  cleanState(){
    this.setState({
      showModalRole: false,
      userSelected: null,
      productSelected: null,
      roleSelected: '',
    })
  }

  render() {
    let { usersCopy, products, userSelected, productSelected, roleSelected, userProducts } = this.state

    const renderUsers = () => {
      if(usersCopy.length > 0){
        return(
          <>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <h2 className='mr-5'>Users</h2> 
            {dropDown()}
          </div>
          <Table  bordered hover style={{cursor: 'pointer'}}>
              <thead>
              <tr>
                  <th>Name</th>
                  <th>isProfileUpdated</th>
                  <th>Role</th>
              </tr>
              </thead>
              <tbody>
                  {usersCopy?.map(user =>{ 
                      return(
                          <tr key={user.id} onClick={(e) => this.handleSelectUser(user)}>
                              <td>
                                  {user.name} 
                              </td>
                              <td>
                                  {user.isProfileUpdated? 'Yes': 'No'} 
                              </td>
                              <td>
                                  {user.role?
                                   user.role: 
                                    <Button
                                      size='sm' 
                                      onClick={(e) => this.assignRole(user)}>
                                      Assign role on DB
                                    </Button> 
                                  }
                              </td>
                          </tr>
                      )})}
              </tbody>
          </Table>
          </>
        )
      }
    }
    const renderProducts = () => {
      if(products.length > 0){
        return(
          <>
          <h2>Products</h2> 
          <Table  bordered hover style={{cursor: 'pointer'}}>
              <thead>
              <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
              </tr>
              </thead>
              <tbody>
                  {products?.map(product =>{ 
                      return(
                          <tr key={product.id} onClick={(e) => this.handleSelectProduct(product)}>
                              <td>
                                  {product.name} 
                              </td>
                              <td>
                                  {product.description?.slice(0,100)} 
                              </td>
                              <td>
                                  {product.categoryID} 
                              </td>
                          </tr>
                      )})}
              </tbody>
          </Table>
          </>
        )
      }
    }
    const renderUserProducts = () => {
      if(userProducts.length > 0){
        return(
          <>
            <h2>User Products</h2>
            <Table  bordered hover>
              <thead>
              <tr>
                  <th>User</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Category</th>
              </tr>
              </thead>
              <tbody>
                  {userProducts?.map(up =>{ 
                      return(
                          <tr key={up.id}>
                              <td>
                                  {up.user.name} 
                              </td>
                              <td>
                                  {up.product.name} 
                              </td>
                              <td>
                                  {up.product.description.slice(0,100)} 
                              </td>
                              <td>
                                  {up.product.category.name} 
                              </td>
                          </tr>
                      )})}
              </tbody>
            </Table>
          </>
          
        )
      }
    }
    const renderModalRole = () => {
      if(this.state.showModalRole){
        return (
          <Modal
              show={this.state.showModalRole}
              onHide={(e) => this.handleHideModalProductFeatures(e)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              >
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                      Assign Role
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Row className='mb-2'>
                        <Form.Group as={Col}>
                            <Form.Label>User</Form.Label>
                            <Form.Control
                                type='text'
                                disabled
                                value={this.state.userSelected !== null? this.state.userSelected.name : ''}
                                onChange={() => ''}
                                />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Product</Form.Label>
                            <Form.Select
                                value={roleSelected}
                                name='select_role'
                                onChange={(e) => this.handleInputChange(e)} 
                                >
                                <option value=''>-</option>
                              {['admon','investor','constructor'].map(op => <option value={op} key={op}>{op}</option>)}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className='mb-1'>
                        <Button
                        variant='primary'
                        size='sm'
                        disabled={userSelected === null || roleSelected === ''? true : false}
                        onClick={() => this.handleAssignRole()}
                        >Assign Role</Button>
                    </Row>
                </Form>
              </Modal.Body>
          </Modal>
      )
      }
    }
    const dropDown = () => {
      return(
      <DropdownButton  title='Filter By role' size="sm">
          <Dropdown.Item as="button" onClick={() =>this.handleSelectUsersToShow('show_all')}>Show all</Dropdown.Item>
          <Dropdown.Item as="button" onClick={() =>this.handleSelectUsersToShow('admon')}>Admins</Dropdown.Item>
          <Dropdown.Item as="button" onClick={() =>this.handleSelectUsersToShow('constructor')}>Constructors</Dropdown.Item>
          <Dropdown.Item as="button" onClick={() =>this.handleSelectUsersToShow('investor')}>Investors</Dropdown.Item>
          <Dropdown.Item as="button" onClick={() =>this.handleSelectUsersToShow('validator')}>Validators</Dropdown.Item>
        </DropdownButton>
      )
  }
    return (
      <>
      <Container>
          <Container>
              <h2>Assign Product</h2>
              <Form>
                  <Row className='mb-2'>
                      <Form.Group as={Col}>
                          <Form.Label>User</Form.Label>
                          <Form.Control
                              type='text'
                              placeholder='Select one User'
                              value={this.state.userSelected !== null? this.state.userSelected.name : ''}
                              onChange={() => ''}
                               />
                      </Form.Group>
                      <Form.Group as={Col}>
                          <Form.Label>Product</Form.Label>
                          <Form.Control
                              type='text'
                              placeholder='Select one Product'
                              value={this.state.productSelected !== null? this.state.productSelected.name : ''}
                              onChange={() => ''} 
                              />
                      </Form.Group>
                  </Row>

                  <Row className='mb-1'>
                      <Button
                      variant='primary'
                      size='sm'
                      disabled={userSelected === null || productSelected === null? true : false}
                      onClick={() => this.handleAssignProduct()}
                      >AssignProduct</Button>
                  </Row>
              </Form>
          </Container>
          <Container style={{display: 'flex', height: '580px'}}>
                <Container style={{overflow: 'auto'}}>           
                    {renderUsers()}       
                </Container>
                <Container style={{overflow: 'auto'}}>           
                    {renderProducts()}
                </Container>
          </Container>
          <Container>
            
            {renderUserProducts()}
          </Container>
      </Container>
      {renderModalRole()}
      </>
    )
  }
}
