import React, { Component } from 'react'
import s from './NewProduct.module.css'
// GraphQL
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { createImage, createProduct, createUserProduct, createProductFeature, createFeatureType, createFeature, createDocument } from '../../../graphql/mutations'
import {  listCategories, listFeatures, listUserProducts, listProductFeatures } from '../../../graphql/queries'
import checkIfUserExists from '../../../utilities/checkIfIDuserExist'
import DragAreaJustImages from './dragArea/DragAreaJustImages'
import CompanyInformation from './companyInformation/CompanyInformation'
import FromPlantaciones from './FormPlantaciones/FormPlantaciones'
import FormRedd from './FormRedd/FormRedd'
import TyC from './TyC/TyC'
import Button from './components/Button/Button'
import { ToastContainer, toast } from 'react-toastify';
import { InfoCircle } from 'react-bootstrap-icons'
import { fillForm, validarString, updateProyectForm } from '../functions/functions'
import 'react-toastify/dist/ReactToastify.css';
import WebAppConfig from '../../common/_conf/WebAppConfig'
import URL from '../../common/_conf/URLS3';
// Utils 
import randomWords from 'random-words';
// AWS S3 Storage
import { Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import GuardarParcialmente from './GuardarParcialmente/GuardarParcialmente'
import ProductOnDraft from './ProductOnDraft/ProductOnDraft'

const regexInputName = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ ]+$/
const regexInputTokenName = /^[a-zA-Z0-9]{1,32}$/
const regexInputNumber = /^\d+(?:.\d+)?$/
const regexInputWebSite = /[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*\.[a-z]{2,}(\/[a-zA-Z0-9#?=&%.]*)*$/
const regexInputUbic = /^[a-zA-Z0-9,áéíóúÁÉÍÓÚñÑüÜ ]*$/
const regexInputCoord = /^-?\d{1,3}(.\d+)?,?\s*-?\d{1,3}(.\d+)?$/
const regexInputEmail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
export const listProductFeaturesUpdate = /* GraphQL */ `
  query ListProductFeatures(
    $filter: ModelProductFeatureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductFeatures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        productID
        featureID
      }
      nextToken
    }
  }
`;
export const getProductDraft = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
        name
        description
        createdAt
        images {
            items {
              id
              imageURL
              isActive
            }
          }
        category {
            name
            id
          }
          categoryID
          description
          id
          name
          productFeatures {
            items {
              id
              value
              documents {
                items {
                  id
                }
              }
              feature {
                description
                id
                name
              }
              featureID
              verifications {
                items {
                  id
                  userVerifiedID
                  userVerifierID
                  userVerified {
                    id
                    name
                  }
                }
              }
            }
          }
          userProducts {
            items {
              id
              productID
              userID
            }
          }
    }
  }
`;
class NewProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CRUD_Product: {
                id: uuidv4().split('-')[4],
                name: '',
                description: '',
                isActive: true,
                status: '',
                order: 0,
                categoryID: '',
                images: [],
            },
            newVerification: {
                id: '',
                createdOn: '',
                updatedOn: '',
                sign: '',
                userVerifierID: '',
                userVerifiedID: '',
                productFeatureID: '',
                documentStatus: '',
            },
            company: {
                name: '',
                id: '',
                direction: '',
                city: '',
                department: '',
                country: '',
                cp: '',
                phone: '',
                email: '',
                website: '',
            },
            companyerrors: {
                name: '',
                id: '',
                cp: '',
                phone: '',
                email: '',
                website: '',
            },
            productFeature: {
                ha_tot: '',
                fecha_inscripcion: '',
                C_ubicacion: '',
                coordenadas: '',
                periodo_permanencia: '',
                GLOBAL_TOKEN_NAME: randomWords({ exactly: 3, join: '' }).toUpperCase(),
                redd:{
                    redd_map: '',
                    redd_gob: '',
                    redd_ame_def: '',
                    redd_doc_des_gen_pro_act:'',
                    redd_act_pro: '',
                    redd_tur: '',
                    redd_esc_sin_pro: '',
                    redd_cre_car: '',
                    redd_par_ben: '',
                    redd_con_loc: '',
                },
                PP:{
                    PP_rep: '',
                    PP_for_ten_tie: '',
                    PP_pre_sue_tie: '',
                    PP_vin: '',
                    PP_reg_pla: '',
                    PP_pla_man_for: '',
                    PP_pol_del: '',
                    PP_pla_sie: '',
                    PP_mon: '',
                    PP_pert: '',
                }
            },
            errors: {
                title: '',
                ha_tot: '',
                C_ubicacion: '',
                coordenadas: '',
                periodo_permanencia: '',
                GLOBAL_TOKEN_NAME: ''
            },
            renderModalInformation: false,
            renderModalProductOnDraft: false,
            renderGuardarParcialmente: false,
            activeButton: '',
            renderModalTyC: false,
            mostrarFormInfodeEmpresa: false,
            productOnDraft: '',
            empresas: [],
            files: [],
            imageToUpload: '',
            isImageUploadingFile: false,
            loading: false,
            selectedCategory: null,
            selectedCompany: 'no company',
        }
        this.handleOnChangeInputForm = this.handleOnChangeInputForm.bind(this)
        this.handleCRUDProduct = this.handleCRUDProduct.bind(this)
        this.handleOnChangeInputFormCompany = this.handleOnChangeInputFormCompany.bind(this)
        this.handleCRUDCompany = this.handleCRUDCompany.bind(this)
        this.handleOnSelectCategory = this.handleOnSelectCategory.bind(this)
        this.handleOnSelectCompany = this.handleOnSelectCompany.bind(this)
        this.selectImage = this.selectImage.bind(this)
        this.fetchfeatureTypeIDS = this.fetchfeatureTypeIDS.bind(this)
        this.handleSetStateCompany = this.handleSetStateCompany.bind(this)
        this.onHideModalInformation = this.onHideModalInformation.bind(this)
        this.fillFormWithProductOnDraft = this.fillFormWithProductOnDraft.bind(this)
        this.onHideModalTyC = this.onHideModalTyC.bind(this)
        this.onHideModalGuardarP = this.onHideModalGuardarP.bind(this)
        this.onHideModalProductOnDraft = this.onHideModalProductOnDraft.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.cleanDragArea = this.cleanDragArea.bind(this)
    }
    componentDidMount = async () => { 
        await this.checkIfUserHasDraftProduct()
        await this.fetchfeatureTypeIDS()
        await this.loadCategorysSelectItems()

    }
    async checkIfUserHasDraftProduct(){
        const actualUser = await Auth.currentAuthenticatedUser()
        const userID = actualUser.attributes.sub;
        try {
            let filter = { userID: { eq : userID }};
            const userProductdata = await API.graphql({ query: listUserProducts, variables: { filter }});
            let productIDDraft = null;
            userProductdata.data.listUserProducts.items.map(up => {
                if(up.product.status === 'draft') return productIDDraft = up.product.id 
            })
            
            productIDDraft !== null && this.proyectDraftFounded(productIDDraft)
        } catch (error) {
            console.log(error)
        }

    }
    async proyectDraftFounded(productIDDraft){
        try {
            const product = {id: productIDDraft}
            const result = await API.graphql(graphqlOperation(getProductDraft, product))
            this.setState({productOnDraft: result.data.getProduct, renderModalProductOnDraft: true})
        } catch (error) {
            console.log(error)
        }
    }
    async fillFormWithProductOnDraft(){
        const actualUser = await Auth.currentAuthenticatedUser()
        const userID = actualUser.attributes.sub;
        this.onHideModalProductOnDraft()
        let result = await fillForm(this.state.productOnDraft, userID)
        this.setState(result)
        

    }
    async fetchfeatureTypeIDS() {
        const actualUser = await Auth.currentAuthenticatedUser()
        const userID = actualUser.attributes.sub;
        try {
            let filter = {
                id: {
                    contains: userID
                }
            };

            const featuresData = await API.graphql({
                query: listFeatures,
                variables: { filter }
            });
            let featuresCompany = featuresData.data.listFeatures.items.map(f => {
                let feature = f.id.split('_')
                let feature_info = feature.slice(1, -1).join("_");
                return feature_info
            })
            let valoresUnicos = [...new Set(featuresCompany)];
            this.setState({ empresas: valoresUnicos })
        } catch (error) {
            console.log(error)
        }
    }
    async addNewImageToActualProductImages() {
        let tempCRUD_Product = this.state.CRUD_Product
        let newProductImage = {
            id: uuidv4().replaceAll('-', '_'),
            imageURL: '',
            format: '',
            title: '',
            imageURLToDisplay: '',
            isOnCarousel: false,
            carouselLabel: '',
            carouselDescription: '',
            productID: '',
        }
        tempCRUD_Product.images.push(newProductImage)
        this.setState({ CRUD_Product: tempCRUD_Product })
    }


    selectImage(e, id) {
        if(id){
            let documentType = id.split('_')[0]
            this.setState(prevState => ({
                ...prevState,
                productFeature: {
                  ...prevState.productFeature,
                  [documentType]: {
                    ...prevState.productFeature[documentType],
                    [id]: e
                  }
                }
              }));
        }else{
            this.setState({imageToUpload: e})
        }
    }
    async handleFiles(e, productID) {
        let uploadImageResult = null
        let imageId = ''
        const { target: { files } } = e;
        const [file,] = files || [];
        if (!file) {
            return
        }
        // Creating image ID
        let fileNameSplitByDotfileArray = file.name.split('.')
        imageId = fileNameSplitByDotfileArray[0].replaceAll(' ', '_').replaceAll('-', '_')
        // Getting extension
        let imageExtension = fileNameSplitByDotfileArray[fileNameSplitByDotfileArray.length - 1]
        let imageName = `${imageId}_${productID}.${imageExtension}`
        this.setState({ isImageUploadingFile: true })
        uploadImageResult = await Storage.put(imageName, file, {
            level: "public",
            contentType: "image/jpeg",
        });
        const newImagePayLoad = {
            productID: productID,
            id: imageName,
            imageURL: uploadImageResult.key,
            format: uploadImageResult.key.split('.')[1],
            title: imageName,
            isOnCarousel: false,
            carouselLabel: '',
            carouselDescription: '',
            isActive: false,
            order: 0,
        }
        await API.graphql(graphqlOperation(createImage, { input: newImagePayLoad }))
        this.setState({ isImageUploadingFile: false })

    }
    //Crea productFeatures y documentacion de PP o REDD
    async handleDocuments(e,featureID, productID, userID) {
        let idProductFeature = uuidv4().replaceAll('-', '_')
        //creo pf
        if (typeof e === "string") {
            await API.graphql(graphqlOperation(createProductFeature, { input: { id: idProductFeature, featureID: featureID, productID: productID, value: e } }))
          } else {
            try {
                let imageId = ''
                const { target: { files } } = e;
                const [file,] = files || [];
                if (!file) {
                    return
                }
                await API.graphql(graphqlOperation(createProductFeature, { input: { id: idProductFeature, featureID: featureID, productID: productID, value: '' } }))
                // Creating image ID
                let fileNameSplitByDotfileArray = file.name.split('.')
                imageId = fileNameSplitByDotfileArray[0].replaceAll(' ', '_').replaceAll('-', '_')
                // Getting extension
                let imageExtension = fileNameSplitByDotfileArray[fileNameSplitByDotfileArray.length - 1]
                let imageName = `${idProductFeature}_${imageId}.${imageExtension}`

               let result = await Storage.put(imageName, file, {
                    level: "public",
                    contentType: '*/*',
                })
                const newDocPayLoad = {
                    id: `${idProductFeature}_${imageId}`,
                    productFeatureID: idProductFeature,
                    userID: userID,
                    data: JSON.stringify({empty: ''}),
                    timeStamp: Date.now(),
                    url: encodeURI(`${URL}${result.key}`),
                    signed: '',
                    signedHash: '',
                    isApproved: false,
                    status: 'pending',
                    isUploadedToBlockChain: false,
                }
                    await API.graphql(graphqlOperation(createDocument, { input: newDocPayLoad })).then(()=> console.log('documento creado'))
                
            } catch (error) {
                
            }
          }

    }

    async loadCategorysSelectItems() {
        let categorysSelectItems = []
        const listCategoriesResult = await API.graphql(graphqlOperation(listCategories))
        if (listCategoriesResult.data.listCategories.items.length > 0) {
            let tempCategorys = listCategoriesResult.data.listCategories.items
            // Ordering categorys by name
            tempCategorys.sort((a, b) => (a.name > b.name) ? 1 : -1)
            tempCategorys.map((category) => {
                categorysSelectItems.push({ value: category, label: category.name })
                return category
            })
        }
        this.setState({ categorySelectList: categorysSelectItems })
    }
    async handleCRUDProduct() {

        this.setState({ loading: true, renderModalTyC: false })
        const actualUser = await Auth.currentAuthenticatedUser()
        const userID = actualUser.attributes.sub;
        const tempCRUD_Product = this.state.CRUD_Product
        tempCRUD_Product.id = await checkIfUserExists(tempCRUD_Product.id)
        if (this.state.selectedCompany === 'no company') return this.notifyError('Debe seleccionar una empresa/persona natural')
        if ((this.state.errors.title === '' && this.state.errors.C_ubicacion === '' && this.state.errors.ha_tot === ''
            && this.state.errors.coordenadas === '' && this.state.companyerrors.name === '' && this.state.companyerrors.cp === ''
            && this.state.companyerrors.phone === '' && this.state.companyerrors.email === ''
            && this.state.companyerrors.website === '') || this.state.renderGuardarParcialmente) {
                if(this.state.productOnDraft === ''){
                    const payLoadNewProduct = {
                        id: tempCRUD_Product.id,
                        name: tempCRUD_Product.name,
                        description: tempCRUD_Product.description,
                        isActive: false,
                        status: this.state.renderGuardarParcialmente? 'draft': 'on_verification',
                        counterNumberOfTimesBuyed: 0,
                        categoryID: this.state.activeButton,
                        order: 0,
                    }
                    this.state.imageToUpload !== '' && this.handleFiles(this.state.imageToUpload, payLoadNewProduct.idGLOBAL_TOKEN_NAMEC_C_ubicacion)
                    await API.graphql(graphqlOperation(createProduct, { input: payLoadNewProduct }))
                    // Creating UserProduct
                    let actualUser = await Auth.currentAuthenticatedUser()
                    let actualUserID = actualUser.attributes.sub
        
                    const payLoadNewUserProduct = {
                        userID: actualUserID,
                        productID: tempCRUD_Product.id,
                        isFavorite: true
                    }
                    const payLoadAdmonProduct = {
                        userID: WebAppConfig.admon,
                        productID: tempCRUD_Product.id,
                        isFavorite: true
                    }
                    const productFeatures = [
                        { featureID: 'ha_tot', value: this.state.productFeature.ha_tot },
                        { featureID: 'C_ubicacion', value: this.state.productFeature.C_ubicacion },
                        { featureID: 'fecha_inscripcion', value: Date.parse(this.state.productFeature.fecha_inscripcion) },
                        { featureID: 'coordenadas', value: this.state.productFeature.coordenadas },
                        { featureID: 'periodo_permanencia', value: this.state.productFeature.periodo_permanencia },
                        { featureID: 'GLOBAL_TOKEN_NAME', value: this.state.productFeature.GLOBAL_TOKEN_NAME },
                      ];
                      
                    const userProducts = [payLoadNewUserProduct, payLoadAdmonProduct];
                    
                    const productFeaturePromises = productFeatures.map((feature) =>{

                        if(feature.featureID === 'GLOBAL_TOKEN_NAME' && feature.value === ""){
                        API.graphql(graphqlOperation(createProductFeature, { input: { featureID: feature.featureID, productID: tempCRUD_Product.id, value: `SUAN-${tempCRUD_Product.id}` } }))
                            
                        }else{
                            API.graphql(graphqlOperation(createProductFeature, { input: { featureID: feature.featureID, productID: tempCRUD_Product.id, value: feature.value } }))
                        }
                    }
                    );
                    
                    const userProductPromises = userProducts.map((payload) =>
                    API.graphql(graphqlOperation(createUserProduct, { input: payload }))
                    );
                    
                    const createUserProductFeaturePromise = API.graphql(graphqlOperation(createProductFeature, { input: { featureID: `${userID}_${this.state.company.name}_name`, productID: tempCRUD_Product.id } }));
        
                    if(this.state.activeButton === 'PROYECTO_PLANTACIONES'){
                        const PPFeatures = Object.entries(this.state.productFeature.PP).map(([key, value]) => ({
                            featureID: key,
                            value,
                            }));
                        PPFeatures.map(async (feature) =>  
                            await this.handleDocuments(feature.value,feature.featureID, tempCRUD_Product.id, userID),
                        );
                        
                    }   
                    if(this.state.activeButton === 'REDD+'){
                        const REDDFeatures = Object.entries(this.state.productFeature.redd).map(([key, value]) => ({
                            featureID: key,
                            value,
                            }));
                        REDDFeatures.map(async (feature) =>
                            await this.handleDocuments(feature.value,feature.featureID, tempCRUD_Product.id, userID)
                        );
                        
                    } 
                    const allPromises = [...productFeaturePromises, ...userProductPromises, createUserProductFeaturePromise];
                    
                    await Promise.all(allPromises);
                    await this.cleanProductOnCreate('no company')
                    this.setState({ loading: false })
                    this.notify('Formulario enviado')
                }else{
                    updateProyectForm(this.state.productOnDraft, this.state, userID)
                    await this.cleanProductOnCreate('no company')
                    this.setState({ loading: false })
                    this.notify('Formulario enviado')
                }
        } else {
            console.log('errors')
            this.notifyError('Tu formulario contiene campos vacíos o campos con valores erroneos')
        }
    }
    async handleCRUDCompany(tempCRUD_Product) {
        const tempCRUD_Company = this.state.company;
        const actualUser = await Auth.currentAuthenticatedUser();
        const userID = actualUser.attributes.sub;
        //Creo la FT CONSTRUCTOR_ORGANIZATION_INFORMATION_<COMPANY.NAME>
        const payloadNewFeatureType = {
          id: `CONSTRUCTOR_ORGANIZATION_INFORMATION_${userID}_${tempCRUD_Company.name}`,
          name: tempCRUD_Company.name,
        };
        await API.graphql(graphqlOperation(createFeatureType, { input: payloadNewFeatureType }));
        //Crear array de promesas
        const promises = [];
        for (let info in this.state.company) {
          let id = `${userID}_${this.state.company.name}_${info}`;
      
          const payloadNewFeature = {
            id: id,
            name: info,
            description: this.state.company[`${info}`],
            featureTypeID: `CONSTRUCTOR_ORGANIZATION_INFORMATION_${userID}_${tempCRUD_Company.name}`,
            unitOfMeasureID: 'no_unit'
          };
      
          const promise = API.graphql(graphqlOperation(createFeature, { input: payloadNewFeature }));
          promises.push(promise);
        }
        //Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);
      
        this.setState({
          renderModalInformation: false,
          selectedCompany: `${tempCRUD_Company.name}`
        });
        this.notify(`Formulario enviado. La información del proyecto estará asociada a ${tempCRUD_Company.name}`);
        await this.fetchfeatureTypeIDS()
      }
    checkFormStatus() {
        if (this.state.selectedCompany === 'no company') return this.notifyError('Debe seleccionar una empresa/persona natural')
        if (this.state.CRUD_Product.name !== '' && this.state.CRUD_Product.description !== '' && this.state.productFeature.ha_tot !== ''
            && this.state.productFeature.coordenadas !== '' && this.state.selectedCompany !== '') {
            this.setState({ renderModalTyC: true })
        } else {
            return this.notifyError('Asegurese de completar los campos necesarios antes de continuar')
        }
    }
    cleanDragArea(id){
            let documentType = id.split('_')[0]
            this.setState(prevState => ({
                ...prevState,
                productFeature: {
                  ...prevState.productFeature,
                  [documentType]: {
                    ...prevState.productFeature[documentType],
                    [id]: ''
                  }
                }
              }));

    }
    cleanDragAreaJustImages(id){
            this.setState({imageToUpload: ''})

    }
    async cleanProductOnCreate(company) {
        this.setState({
            CRUD_Product: {
                id: uuidv4().replaceAll('-', '_'),
                name: '',
                description: '',
                isActive: true,
                order: '',
                status: '',
                categoryID: '',
                images: [],
            },
            company: {
                name: '',
                id: '',
                direction: '',
                city: '',
                department: '',
                country: '',
                cp: '',
                phone: '',
                email: '',
                website: '',
            },
            companyerrors: {
                name: '',
                id: '',
                cp: '',
                phone: '',
                email: '',
                website: '',
            },
            productFeature: {
                ha_tot: '',
                fecha_inscripcion: '',
                C_ubicacion: '',
                coordenadas: '',
                periodo_permanencia: '',
                GLOBAL_TOKEN_NAME: randomWords({ exactly: 3, join: '_' }).toUpperCase(),
                redd:{
                    redd_map: '',
                    redd_gob: '',
                    redd_ame_def:'',
                    redd_doc_des_gen_pro_act:'',
                    redd_act_pro: '',
                    redd_tur: '',
                    redd_esc_sin_pro: '',
                    redd_cre_car: '',
                    redd_par_ben: '',
                    redd_con_loc: '',
                },
                PP:{
                    PP_rep: '',
                    PP_for_ten_tie: '',
                    PP_pre_sue_tie: '',
                    PP_vin: '',
                    PP_reg_pla: '',
                    PP_pla_man_for: '',
                    PP_pol_del: '',
                    PP_pla_sie: '',
                    PP_mon: '',
                    PP_pert: '',
                }
            },
            errors: {
                title: '',
                ha_tot: '',
                C_ubicacion: '',
                coordenadas: '',
                periodo_permanencia: '',
                GLOBAL_TOKEN_NAME: ''
            },
            imageToUpload: '',
            activeButton: '',
            isImageUploadingFile: false, //se borraban los features y categorys
            selectedCategory: null,
            selectedCompany: company,
            renderModalInformation: false,
            renderModalProductOnDraft: false,
            renderGuardarParcialmente: false,
            renderModalTyC: false,
            productOnDraft: '',
            mostrarFormInfodeEmpresa: false,
            loading: false,
        })
    }

    handleOnSelectCategory(event) {
        this.setState({ selectedCategory: event.target.value })
    }
    async handleOnSelectCompany(event) {
        if (event.target.value === 'no company') {
            this.setState({
                mostrarFormInfodeEmpresa: false,
                company: {
                    name: '',
                    id: '',
                    direction: '',
                    city: '',
                    department: '',
                    country: '',
                    cp: '',
                    phone: '',
                    email: '',
                    website: '',
                }
            })
        }
        if (event.target.value !== 'no company') {
            if (event.target.value === 'nueva empresa' || event.target.value === 'persona natural') {
                this.setState({ renderModalInformation: true })
            }
            this.setState({ selectedCompany: event.target.value, mostrarFormInfodeEmpresa: true })
        }
    }
    handleOnChangeInputForm = async (event, pProperty) => {
        let tempCRUD_Product = this.state.CRUD_Product
        let tempCRUD_productFeature = this.state.productFeature
        if (event.target.name === 'CRUD_ProductName') {
            tempCRUD_Product.name = event.target.value
            let error = validarString(event.target.value, regexInputName)
            this.setState(prevState => ({
                errors: { ...prevState.errors, title: error }
            }))
        }
        if (event.target.name === 'CRUD_ProductDescription') {
            tempCRUD_Product.description = event.target.value
        }
        if (event.target.name === 'productFeature_ha_tot') {
            tempCRUD_productFeature.ha_tot = event.target.value
            let error = validarString(event.target.value, regexInputNumber)
            this.setState(prevState => ({
                errors: { ...prevState.errors, ha_tot: error }
            }))
        }
        if (event.target.name === 'productFeature_fecha') {
            tempCRUD_productFeature.fecha_inscripcion = event.target.value
        }
        if (event.target.name === 'productFeature_C_ubicacion') {
            tempCRUD_productFeature.C_ubicacion = event.target.value
            let error = validarString(event.target.value, regexInputUbic)
            this.setState(prevState => ({
                errors: { ...prevState.errors, C_ubicacion: error }
            }))
        }
        if (event.target.name === 'productFeature_coord') {
            tempCRUD_productFeature.coordenadas = event.target.value
            let error = validarString(event.target.value, regexInputCoord)
            this.setState(prevState => ({
                errors: { ...prevState.errors, coordenadas: error }
            }))
        }
        if (event.target.name === 'productFeature_periodo_permanencia') {
            tempCRUD_productFeature.periodo_permanencia = event.target.value
            let error = validarString(event.target.value, regexInputNumber)
            this.setState(prevState => ({
                errors: { ...prevState.errors, periodo_permanencia: error }
            }))
        }
        if (event.target.name === 'productFeature_GLOBAL_TOKEN_NAME') {
            tempCRUD_productFeature.GLOBAL_TOKEN_NAME = event.target.value.toUpperCase()
            let error = validarString(event.target.value, regexInputTokenName)
            this.setState(prevState => ({
                errors: { ...prevState.errors, GLOBAL_TOKEN_NAME: error }
            }))
        }
        if (event.target.name === 'PP_for_ten_tie') {
            tempCRUD_productFeature.PP.PP_for_ten_tie = event.target.value
        }
        if (event.target.name === 'PP_pert') {
            tempCRUD_productFeature.PP.PP_pert = event.target.value
        }
        if (event.target.name === 'PP_vin') {
            tempCRUD_productFeature.PP.PP_vin = event.target.value
        }
        if (event.target.name === 'redd_act_pro') {
            tempCRUD_productFeature.redd.redd_act_pro = event.target.value
        }
        if (event.target.name === 'redd_ame_def') {
            tempCRUD_productFeature.redd.redd_ame_def = event.target.value
        }
        if (event.target.name === 'redd_doc_des_gen_pro_act') {
            tempCRUD_productFeature.redd.redd_doc_des_gen_pro_act = event.target.value
        }
        if (event.target.name === 'redd_tur') {
            tempCRUD_productFeature.redd.redd_tur = event.target.value
        }
        if (event.target.name === 'redd_esc_sin_pro') {
            tempCRUD_productFeature.redd.redd_esc_sin_pro = event.target.value
        }
        if (event.target.name === 'redd_par_ben') {
            tempCRUD_productFeature.redd.redd_par_ben = event.target.value
        }
        if (event.target.name === 'redd_con_loc') {
            tempCRUD_productFeature.redd.redd_con_loc = event.target.value
        }
        this.setState({ CRUD_Product: tempCRUD_Product, productFeature: tempCRUD_productFeature })
    }
    handleOnChangeInputFormCompany = async (event, pProperty) => {
        let tempCRUD_Company = this.state.company
        if (event.target.name === 'company_name') {
            tempCRUD_Company.name = event.target.value.toUpperCase().replace(/ /g, "_")
            let error = validarString(event.target.value, regexInputName)
            this.setState(prevState => ({
                companyerrors: { ...prevState.companyerrors, name: error }
            }))
        }
        if (event.target.name === 'company_id') {
            tempCRUD_Company.id = event.target.value
            let error = validarString(event.target.value, regexInputNumber)
            this.setState(prevState => ({
                companyerrors: { ...prevState.companyerrors, id: error }
            }))
        }
        if (event.target.name === 'company_direction') {
            tempCRUD_Company.direction = event.target.value
        }
        if (event.target.name === 'company_city') {
            tempCRUD_Company.city = event.target.value
        }
        if (event.target.name === 'company_department') {
            tempCRUD_Company.department = event.target.value
        }
        if (event.target.name === 'company_country') {
            tempCRUD_Company.country = event.target.value
        }
        if (event.target.name === 'company_CP') {
            tempCRUD_Company.cp = event.target.value
            let error = validarString(event.target.value, regexInputNumber)
            this.setState(prevState => ({
                companyerrors: { ...prevState.companyerrors, cp: error }
            }))
        }
        if (event.target.name === 'company_phone') {
            tempCRUD_Company.phone = event.target.value
            let error = validarString(event.target.value, regexInputNumber)
            this.setState(prevState => ({
                companyerrors: { ...prevState.companyerrors, phone: error }
            }))
        }
        if (event.target.name === 'company_email') {
            tempCRUD_Company.email = event.target.value
            let error = validarString(event.target.value, regexInputEmail)
            this.setState(prevState => ({
                companyerrors: { ...prevState.companyerrors, email: error }
            }))
        }
        if (event.target.name === 'company_website') {
            tempCRUD_Company.website = event.target.value
            let error = validarString(event.target.value, regexInputWebSite)
            this.setState(prevState => ({
                companyerrors: { ...prevState.companyerrors, website: error }
            }))
        }
        this.setState({ company: tempCRUD_Company })
    }
    handleSetStateCompany(tempCompany) {
        this.setState({
            company: tempCompany
        })
    }
    handleButtonClick(buttonId){
        this.setState({activeButton: buttonId});
      };
    notify = (e) => {
        toast.success(e, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    notifyError = (e) => {
        toast.error(e, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        this.setState({ loading: false })
    }
    onHideModalInformation() {
        this.setState({
            renderModalInformation: false,
        })
    }
    onHideModalTyC() {
        this.setState({
            renderModalTyC: false,
        })
    }
    onHideModalGuardarP() {
        this.setState({
            renderGuardarParcialmente: false,
        })
    }
    onHideModalProductOnDraft() {
        this.setState({
            renderModalProductOnDraft: false,
        })
    }
    render() {
        let { CRUD_Product, selectedCategory, productFeature, activeButton } = this.state
        const urlS3Image = WebAppConfig.url_s3_public_images
        return (
            <div className={s.container}>
                <ToastContainer />
                <div className={s.titleContainer}>
                    <h2>Creación de un nuevo proyecto</h2>
                    <p>Para crear un proyecto en nuestra plataforma, es necesario que completes el siguiente formulario.
                        Es importante que ingreses toda la información requerida de manera precisa y detallada para que podamos evaluar tu solicitud.
                    </p>
                    <p>
                        Una vez que hayas completado el formulario, nuestro equipo revisará la información proporcionada y te informaremos si tu proyecto ha sido aprobado o no.
                        Si es aprobado, el equipo de Suan te enviará un contrato en el que se te especificará como continuar el proceso.
                    </p>
                </div>
                {this.state.productOnDraft === '' && <div className={s.formContainercompany}>
                    <h2>Información de Contacto</h2>
                    <form className={s.formcompany}>
                        <fieldset className={s.inputContainer}>
                            <legend>Asociar producto a:</legend>
                            <select placeholder='' onChange={this.handleOnSelectCompany} value={this.state.selectedCompany}>
                                <option value='no company' >-</option>
                                {this.state.empresas.map(empresa => <option key={empresa} value={empresa}>{empresa}</option>)}
                                <option value='nueva empresa'>Nueva empresa</option>
                                <option value='persona natural'>Persona natural</option>
                            </select>
                        </fieldset>
                    </form>
                </div>}
                {this.state.mostrarFormInfodeEmpresa ?
                    <CompanyInformation
                        productID={this.state.CRUD_Product.id} handleOnChangeInputFormCompany={this.handleOnChangeInputFormCompany}
                        company={this.state.company} selectedCompany={this.state.selectedCompany}
                        handleSetStateCompany={this.handleSetStateCompany} companyerrors={this.state.companyerrors}
                        renderModalInformation={this.state.renderModalInformation}
                        onHideModalInformation={this.onHideModalInformation}
                        handleCRUDCompany={this.handleCRUDCompany}
                    /> : ''}
                <div className={s.formContainer}>
                    <h2>Información de proyecto*</h2>
                    <form className={s.formInputs1}>
                        <fieldset className={s.inputContainer}>
                            <legend>
                                Título del proyecto*
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>No se acepta números</span>
                                </div>
                            </legend>
                            <input type="text"
                                name='CRUD_ProductName'
                                value={CRUD_Product.name}
                                onChange={(e) => this.handleOnChangeInputForm(e)} placeholder='Título' />
                            <span style={{ color: 'red', fontSize: '.6em' }}>{this.state.errors.title}</span>
                        </fieldset>
                        <fieldset className={s.inputContainer}>
                            <legend>
                                Token name*
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>Nombre que va a tener el token de su proyecto en la blockchain.Mayúsculas. Máximo 32 caracteres</span>
                                </div>
                            </legend>
                            <input type="text"
                                name='productFeature_GLOBAL_TOKEN_NAME'
                                value={productFeature.GLOBAL_TOKEN_NAME}
                                onChange={(e) => this.handleOnChangeInputForm(e)} />
                            <span style={{ color: 'red', fontSize: '.6em' }}>{this.state.errors.GLOBAL_TOKEN_NAME}</span>
                        </fieldset>
                        <fieldset className={s.inputContainer}>
                            <legend>
                                Tamaño del predio(Has)*
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>Número de hectáreas. Sólo números. Se aceptan decimales. Separación de parte entera y decimal con "."(punto).</span>
                                </div>
                            </legend>
                            <input type="text"
                                name='productFeature_ha_tot'
                                value={productFeature.ha_tot}
                                onChange={(e) => this.handleOnChangeInputForm(e)}
                                placeholder='Número de hectáreas' />
                            <span style={{ color: 'red', fontSize: '.6em' }}>{this.state.errors.ha_tot}</span>
                        </fieldset>
                    </form>
                    <form className={s.formInputs1}>
                        <fieldset className={s.inputContainer}>

                            <legend>
                                Ubicación*
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>Ej: Bogotá, Cundinamarca, Colombia</span>
                                </div>
                            </legend>
                            <input type="text"
                                name='productFeature_C_ubicacion'
                                value={productFeature.C_ubicacion}
                                onChange={(e) => this.handleOnChangeInputForm(e)}
                                placeholder='Ciudad, Departamento, País' />
                            <span style={{ color: 'red', fontSize: '.6em' }}>{this.state.errors.C_ubicacion}</span>
                        </fieldset>
                        <fieldset className={s.inputContainer}>
                            <legend>
                                Coordenadas*
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>Las coordenadas deben ir en orden "latitud, longitud". Si el número contiene parte decimal esta deben ir precedida por ".". Las coordenadas deben ir separadas por "," Ej: -34.23553, -2.43256</span>
                                </div>
                            </legend>
                            <input type='text' placeholder='lat, lng. Ej: 4.710990, -74.072037' name='productFeature_coord' value={productFeature.coordenadas} onChange={(e) => this.handleOnChangeInputForm(e)} />
                            <span style={{ color: 'red', fontSize: '.6em' }}>{this.state.errors.coordenadas}</span>
                        </fieldset>
                        <fieldset className={s.inputContainer}>
                            <legend>
                                Fecha de inscripción*
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>Seleccione una fecha</span>
                                </div>
                            </legend>
                            <input type='date' placeholder='Fecha' name='productFeature_fecha' value={productFeature.fecha_inscripcion} onChange={(e) => this.handleOnChangeInputForm(e)} />
                        </fieldset>
                    </form>
                    <form className={s.formInputs3}>
                        <fieldset className={s.inputContainer}>
                            <legend>
                                Periodo de permanencia* 
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>Sólo números. Años aproximado</span>
                                </div>
                            </legend>
                            <textarea
                                name='productFeature_periodo_permanencia'
                                value={productFeature.periodo_permanencia}
                                placeholder='Proyección de tiempo del proyecto en años'
                                onChange={(e) => this.handleOnChangeInputForm(e)} />
                            <span style={{ color: 'red', fontSize: '.6em' }}>{this.state.errors.periodo_permanencia}</span>
                        </fieldset>
                    </form>
                    
                    <form className={s.formInputs2}>
                        <fieldset className={s.inputContainer}>
                            <legend>
                                Descripción
                                <div className={s["tooltip-text"]}>
                                    <InfoCircle className={s.infoCircle} />
                                    <span className={s["tooltip"]}>Introduzca una descripción del proyecto</span>
                                </div>
                            </legend>
                            <textarea
                                name='CRUD_ProductDescription'
                                value={CRUD_Product.description}
                                placeholder='Es importante que nos proporcione la mayor cantidad de información posible. En caso de ser necesaria mayor información se le solicitará después de crear la solicitud.'
                                onChange={(e) => this.handleOnChangeInputForm(e)} />
                        </fieldset>
                        <fieldset className={s.inputContainer}>
                            <legend>Imágenes </legend>
                            <DragAreaJustImages
                                idFile={this.state.productOnDraft.images?.items?.length > 0? this.state.productOnDraft.images.items[0].id: ''}
                                selectImage={this.selectImage}
                                cleanDragArea={this.cleanDragAreaJustImages}
                            />
                        </fieldset>
                    </form>
                    <div className={s.selectTypeProyect}>
                        <Button
                            className={s.buttonSelectProyectCategory}
                            id="PROYECTO_PLANTACIONES"
                            label="Proyecto Plantaciones"
                            activeButton={this.state.activeButton}
                            handleButtonClick={this.handleButtonClick}
                        />
                        <Button
                            className={s.buttonSelectProyectCategory}
                            id="REDD+"
                            label="Proyecto REDD"
                            activeButton={this.state.activeButton}
                            handleButtonClick={this.handleButtonClick}
                        />
                    </div>
                    {this.state.activeButton === 'FORMULARIO POSTULACION PREDIOS'?
                    <FromPlantaciones 
                        selectImage={this.selectImage}
                        cleanDragArea={this.cleanDragArea}
                        productFeature = {this.state.productFeature}
                        handleOnChangeInputForm={this.handleOnChangeInputForm}
                    />
                    :
                    this.state.activeButton === 'REDD+'?
                    <FormRedd
                        cleanDragArea={this.cleanDragArea}
                        selectImage={this.selectImage}
                        productFeature = {this.state.productFeature}
                        handleOnChangeInputForm={this.handleOnChangeInputForm}
                    />
                    :
                    ''
                    }
                    {this.state.loading && this.state.activeButton? <button className={s.solicitudButtonDisabled} disabled>CREANDO</button> :
                        this.state.activeButton? <button className={s.solicitudButton} onClick={() => this.checkFormStatus()}>CREAR SOLICITUD</button>: ''}

                </div>
                
                <TyC
                    renderModalTyC={this.state.renderModalTyC}
                    onHideModalTyC={this.onHideModalTyC}
                    handleCRUDProduct={this.handleCRUDProduct}
                />
                {this.state.renderGuardarParcialmente && 
                    <GuardarParcialmente 
                        renderGuardarParcialmente={this.state.renderGuardarParcialmente}
                        onHideModalGuardarP={this.onHideModalGuardarP}    
                        handleCRUDProduct={this.handleCRUDProduct}
                        loading={this.state.loading}
                        />
                }
                {this.state.renderModalProductOnDraft && this.state.productOnDraft !== '' &&
                    <ProductOnDraft 
                        renderModalProductOnDraft={this.state.renderModalProductOnDraft}
                        productOnDraft={this.state.productOnDraft}
                        fillFormWithProductOnDraft={this.fillFormWithProductOnDraft}
                        onHideModalProductOnDraft={this.onHideModalProductOnDraft}    
                        />
                }
                {CRUD_Product.name && this.state.activeButton && this.state.productOnDraft === '' &&
                    <button className={s.saveButton} onClick={()=> this.setState({renderGuardarParcialmente: true})}>Guardar</button>}
            </div>
        )
    }
}

export default NewProduct

