import React, { Component } from 'react';
//Bootstrap
import { Button, Card, Col, Container, Dropdown, DropdownButton, Form, Modal, Row, Table } from 'react-bootstrap';
import { ArrowRight, CheckCircle, HourglassSplit, XCircle } from 'react-bootstrap-icons';
import Bootstrap from "../../common/themes";
// GraphQL
import { API, Auth, graphqlOperation, Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import { createDocument } from '../../../graphql/mutations';
import { getUser, listDocuments } from '../../../graphql/queries';
import { onCreateDocument } from '../../../graphql/subscriptions';
import URL from '../../common/_conf/URLS3';

class Documents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            documents: [],
            actualUserID: null,
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
            userProductsDoc: [],
            listPFWithoutDoc: [],
            showAllDocuments: true,
            showProductsWithoutDoc: false,
            productToShow: null,
            showModalDocument: false,
            productFeatureToAddDoc: null,
            fileToUpload: null,
            creatingDocument: false,
        }
        this.handleLoadUserProduct = this.handleLoadUserProduct.bind(this)
        this.handleCreateDocument = this.handleCreateDocument.bind(this)
        this.handleInputCreateDocument = this.handleInputCreateDocument.bind(this)
        this.handleHideModalDocument = this.handleHideModalDocument.bind(this)
    }

    componentDidMount = async () => {
        let actualUser = await  Auth.currentAuthenticatedUser()
        const actualUserID = actualUser.attributes.sub
        this.setState({
            actualUserID: actualUserID
        })
        await this.loadUserProducts(actualUserID)
        await this.loadDocuments(actualUserID)
        // Subscriptions
        // OnCreate Document
        this.createDocumentListener = API.graphql(graphqlOperation(onCreateDocument))
        .subscribe({
            next: async createdDocumentData => {
                let isOnCreateList = false;
                this.state.documents.map((mapDocument) => {
                    if (createdDocumentData.value.data.onCreateDocument.id === mapDocument.id) {
                        isOnCreateList = true;
                    } 
                    return mapDocument
                })
                let tempDocuments = this.state.documents
                let tempOnCreateDocument = createdDocumentData.value.data.onCreateDocument
                if (!isOnCreateList) {
                    tempDocuments.push(tempOnCreateDocument)
                }
                await this.loadUserProducts(actualUserID)
                this.setState((state) => ({documents: tempDocuments}))
            }
        })
    }
    componentWillUnmount() {
        this.createDocumentListener.unsubscribe();
      }
    async loadUserProducts(pActualUserID) {
        let userResult = await API.graphql({ query: getUser, variables: { id: pActualUserID }})
        let profileDocument = userResult.data.getUser.role
        if(profileDocument === 'admon') profileDocument = 'ADMON_DOCUMENT'
        if(profileDocument === 'investor') profileDocument = 'INVESTOR_DOCUMENT'
        if(profileDocument === 'constructor') profileDocument = 'CONSTRUCTOR_DOCUMENT'
        let listUserProducts = userResult.data.getUser.userProducts.items
        listUserProducts.map(userProduct => userProduct.product)
        let listUserProductsDocs = listUserProducts.map(userProduct =>{
            let aux = 0
            for (let i = 0; i < userProduct.product.productFeatures.items.length; i++) {
                if(userProduct.product.productFeatures.items[i].feature.featureTypeID === profileDocument  ) aux++
            }
            if(aux > 0) return userProduct
            else return ''

        }).filter(userProduct => userProduct !== '')
        listUserProductsDocs.map(up =>{ 
            let productFeaturesFiltered = up.product.productFeatures.items.filter(productFeature => productFeature.feature.featureTypeID === profileDocument)
            up.product.productFeatures.items = productFeaturesFiltered
            return up
        })

        let listProductFeatures = []
        listUserProductsDocs.map(up => up.product.productFeatures.items.map(pf => listProductFeatures.push(pf)))
        let listPFWithoutDoc = []

        for(let i = 0; i< listProductFeatures.length;i++){
        if(listProductFeatures[i].documents.items.length === 0) listPFWithoutDoc.push(listProductFeatures[i])
        if(listProductFeatures[i].documents.items.length > 0){
            let aux = 0
            for(let j = 0; j < listProductFeatures[i].documents.items.length; j++){
            if(listProductFeatures[i].documents.items[j].userID === this.state.actualUserID) aux++
            }
            if(aux === 0) listPFWithoutDoc.push(listProductFeatures[i])
        }
        }
        this.setState({listPFWithoutDoc: listPFWithoutDoc})
    }
    async loadDocuments(actualUserID) {
        const listDocumentsResult = await API.graphql(graphqlOperation(listDocuments))
        listDocumentsResult.data.listDocuments.items.sort((a, b) => (a.id > b.id) ? 1 : -1)
        let filtered = listDocumentsResult.data.listDocuments.items.filter(document => document.userID === actualUserID)
        this.setState({documents: filtered})
        }
    
    handleLoadUserProduct = (userProduct) => {
        this.setState({productToShow: userProduct})
    }
    handleInputCreateDocument = (e) => {
        if(e.target.name === 'selected_file'){
            const { target: { files } } = e;
            const [file,] = files || [];
            if (!file) {
                return
            }
            this.setState({fileToUpload: file})
        }
    }
    handleCreateDocument = async() => {
        let tempNewDocument = this.state.newDocument
          this.setState({creatingDocument: true})
          // Creating image ID
          let imageId = ''
          let uploadImageResult = null
          let fileNameSplitByDotfileArray = this.state.fileToUpload.name.split('.')
          imageId = fileNameSplitByDotfileArray[0].replaceAll(' ', '_').replaceAll('-','_')
          // Getting extension
          let imageExtension = fileNameSplitByDotfileArray[fileNameSplitByDotfileArray.length-1]
          let imageName = imageId + '.' + imageExtension
          // Uploading image TO DO  MOVE TO PRIVATE
          uploadImageResult = await Storage.put(imageName, this.state.fileToUpload, {
            level: "public/documents",
            contentType: "image/jpeg",
          });
          
          tempNewDocument.id = uuidv4().replaceAll('-','_')
          tempNewDocument.url = URL + uploadImageResult.key
          tempNewDocument.productFeatureID = this.state.productFeatureToAddDoc.id
          tempNewDocument.timeStamp = Date.now()
          tempNewDocument.data = JSON.stringify({empty: ''})
          tempNewDocument.userID = this.state.actualUserID
          await API.graphql(graphqlOperation(createDocument , { input: tempNewDocument }))
          this.cleanState()
    }
    handleHideModalDocument() {
        this.setState({showModalDocument: !this.state.showModalDocument, productFeatureToAddDoc: null})
    }
    cleanState = () => {
        this.setState({
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
            productToShow: null,
            showModalDocument: false,
            productFeatureToAddDoc: null,
            fileToUpload: null,
            creatingDocument: false,
        })
    }
    
  render() {
    let {userProductsDoc, productFeatureToAddDoc, showProductsWithoutDoc, showAllDocuments, listPFWithoutDoc} = this.state
    const listDocumentationStatus = () => {
        if(showAllDocuments && userProductsDoc){
            return(
                <Container className='mt-4 '>
                    <Row className="justify-content-md-center">
                        <Col xs >
                            <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                <h5 className='mr-5'>Your documentation</h5> 
                                {dropDown()}
                            </div>
                            <Table hover className='mt-4'> 
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Feature</th>
                                        <th>Document Status</th>       
                                        <th>Doc Hash</th>       
                                        <th>Sign</th>       
                                        <th>Sign Hash</th>       
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.documents.map(document => {
                                            return(
                                                <tr key={document.id}>
                                                    <td>{document.productFeature.product.name}</td>
                                                    <td>{document.productFeature.feature.name}</td>
                                                    <td>{ 
                                                    document.status === 'pending'? <HourglassSplit size={25} color='grey'/> : 
                                                    document.status === 'accepted'? <CheckCircle size={25} color='#449E48'/> : <XCircle size={25} color='#CC0000'/>
                                                    }</td>
                                                    <td>{document.docHash? document.docHash : ''}</td>
                                                    <td>{document.signed?document.signed : ''}</td>
                                                    <td>{document.signedHash? document.signedHash : ''}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
    const uploadDocumentation = () => {
        if(showProductsWithoutDoc){
        return (
            <Container className='mt-3'>
              <Row>
                  <Col xs>
                            <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}} className='mb-5'>
                                <h5>Product documentation</h5> 
                                {dropDown()}
                            </div>
                            {listPFWithoutDoc.length === 0? '' : 
                                listPFWithoutDoc.map(pf =>{
                                    return(
                                        <Card key={pf.id} className='mb-2'>
                                            <Card.Header>{pf.product.name}</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{pf.feature.name}</Card.Title>
                                                <Card.Text>
                                                    {pf.feature.description}
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => this.setState({showModalDocument: true, productFeatureToAddDoc: pf})}>Upload Document</Button>
                                            </Card.Body>
                                        </Card> 
                                    )
                                })
                            }
                  </Col>
              </Row>
            </Container>
          )
        }
    }
    const modalDocument = () => {

        if (productFeatureToAddDoc !== null) {
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
                        {productFeatureToAddDoc?.feature.name}
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
                    <Button disabled={this.state.creatingDocument?true:false} onClick={(e) => this.handleCreateDocument()}>{this.state.creatingDocument?'Uploading':'Upload Document'}</Button>
                </Modal.Footer>
            </Modal>
        )
        }
    }
    const dropDown = () => {
        return(
        <DropdownButton  title='Documentation' size="sm">
            <Dropdown.Item as="button" onClick={() =>this.setState({showProductsWithoutDoc: false, showAllDocuments: true, productToShow: null})}>See your documentation status</Dropdown.Item>
            <Dropdown.Item as="button" onClick={() =>this.setState({showProductsWithoutDoc: true, showAllDocuments: false})}>Upload documentation</Dropdown.Item>
          </DropdownButton>
        )
    }
    return (
        <Container>
            <Container>
                {listDocumentationStatus()}
                {uploadDocumentation()}
                {modalDocument()}
            </Container>
        </Container>
    )
  }
}
export default Documents
