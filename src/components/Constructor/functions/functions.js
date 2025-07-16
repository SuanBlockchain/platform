import { deleteProduct, deleteProductFeature, deleteImage, deleteDocument, deleteVerification, deleteUserProduct, updateProduct, createImage, updateProductFeature, createDocument } from "../../../graphql/mutations"
import { API, graphqlOperation, Storage} from "aws-amplify"
import URL from '../../common/_conf/URLS3';
const getProductQuery = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      images {
        items {
          id
        }
      }
      productFeatures {
        items {
          id
          documents {
            items {
              id
            }
          }
          verifications {
            items {
              id
            }
          }
        }
      }
      userProducts {
        items {
          id
        }
      }
    }
  }
`;
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
/* export const getFeatureJustTemplate = `
  query GetFeature($id: ID!) {
    getFeature(id: $id) {
      id
      isTemplate
    }
  }
` */
async function handleFiles(e, productID) {
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

}
export function validarString(str, regex) {
    if (!regex.test(str)) {
        return 'Caracteres no permitidos'
    }
    return ''
  }
async function handleDocuments(e , productFeatureID, userID) {
      try {
          let imageId = ''
          const { target: { files } } = e;
          const [file,] = files || [];
          if (!file) {
              return
          }
          let fileNameSplitByDotfileArray = file.name.split('.')
          imageId = fileNameSplitByDotfileArray[0].replaceAll(' ', '_').replaceAll('-', '_')
          // Getting extension
          let imageExtension = fileNameSplitByDotfileArray[fileNameSplitByDotfileArray.length - 1]
          let imageName = `${productFeatureID}_${imageId}.${imageExtension}`

          Storage.put(imageName, file, {
              level: "public",
              contentType: '*/*',
          }).then(async (data)=>{

              const newDocPayLoad = {
                  id: `${productFeatureID}_${imageId}`,
                  productFeatureID: productFeatureID,
                  userID: userID,
                  data: JSON.stringify({empty: ''}),
                  timeStamp: Date.now(),
                  url: encodeURI(`${URL}${data.key}`),
                  signed: '',
                  signedHash: '',
                  isApproved: false,
                  status: 'pending',
                  isUploadedToBlockChain: false,
              }
              await API.graphql(graphqlOperation(createDocument, { input: newDocPayLoad })).then(()=> console.log('documento creado'))
          })
          
      } catch (error) {
          console.log(error)
    }

}
export async function deleteAllProduct(productID){
    const result = await API.graphql(graphqlOperation(getProductQuery, { id: productID }))
    const product = result.data.getProduct
    const imagesToDelete = product.images.items.map(image => image.id)
    const productFeaturesToDelete = product.productFeatures.items.map(pf => pf.id)
    const userProductsToDelete = product.userProducts.items.map(up => up.id)
    const documentsToDelete = []
    const verificationsToDelete = []
    product.productFeatures.items.map(pf =>{
        pf.documents.items.length > 0 && pf.documents.items.map(doc => documentsToDelete.push(doc.id))
        pf.verifications.items.length > 0 && pf.verifications.items.map(ver => verificationsToDelete.push(ver.id))
        return 0
    })
    try {
        const productToDeletePromise = API.graphql(graphqlOperation(deleteProduct,{input:{id: productID}})) 
        const userProductsToDeletePromises = userProductsToDelete.map(up => API.graphql(graphqlOperation(deleteUserProduct,{input:{id: up}})))
        const imagesToDeletePromises = imagesToDelete.map(img => API.graphql(graphqlOperation(deleteImage,{input:{id: img}})))
        const productFeaturesToDeletePromises = productFeaturesToDelete.map(pf => API.graphql(graphqlOperation(deleteProductFeature,{input:{id: pf}})))
        const documentsToDeletePromises = documentsToDelete.map(doc => API.graphql(graphqlOperation(deleteDocument, {input:{id: doc}})))
        const verificationsToDeletePromises = verificationsToDelete.map(ver => API.graphql(graphqlOperation(deleteVerification, {input:{id: ver}})))

        const allPromises = [productToDeletePromise, ...userProductsToDeletePromises, ...imagesToDeletePromises,
                                ...productFeaturesToDeletePromises, ...documentsToDeletePromises, ...verificationsToDeletePromises];
            
        await Promise.all(allPromises);
    } catch (error) {
        console.log(error)
    } 
}
export async function fillForm(product, userID){
    let tempState = {
      CRUD_Product: {
          id: product.id,
          name: product.name,
          description: product.description,
          status: product.status,
          order: 0,
          categoryID: '',
          images: product.images.items,
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
          ubicacion: '',
          coordenadas: '',
          periodo_permanencia: '',
          token_name: '',
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
          ubicacion: '',
          coordenadas: '',
          periodo_permanencia: '',
          token_name: ''
      },
      renderModalInformation: false,
      renderModalProductOnDraft: false,
      renderGuardarParcialmente: false,
      activeButton: '',
      renderModalTyC: false,
      mostrarFormInfodeEmpresa: false,
      productOnDraft: product,
      empresas: [],
      files: [],
      imageToUpload: '',
      isImageUploadingFile: false,
      loading: false,
      selectedCategory: null,
      selectedCompany: '',
  }
    
    let reddOrPP = []
    let pfs = []
    let selectedCompany 
    product.productFeatures.items.map(pf =>{
      if (pf.featureID.includes('redd' || 'PP')) return reddOrPP.push(pf)
      if (pf.featureID.includes(`${userID}`)) return selectedCompany = pf.featureID
      return pfs.push(pf)
    })
    if(reddOrPP[0].featureID.includes('redd')){
      tempState.activeButton = 'REDD+'
      reddOrPP.map(redd => tempState.productFeature.redd[redd.featureID] = redd.documents.items.length > 0? redd.documents.items[0].id : redd.value)
    }
    if(reddOrPP[0].featureID.includes('PP')){
      tempState.activeButton = 'PROYECTO_PLANTACIONES'
      reddOrPP.map(PP => tempState.productFeature.PP[PP.featureID] = PP.documents.items.length > 0? PP.documents.items[0].id : PP.value)
    }
    pfs.map(pf => tempState.productFeature[pf.featureID] = pf.value)
    //aqui me fijo a que empresa/persona esta asociado el producto
    let partesAEliminar = [`${userID}_`, "_name"];
    let resultado = selectedCompany;

    partesAEliminar.forEach(parte => {
      let expresionRegular = new RegExp(parte, "g");
      resultado = resultado.replace(expresionRegular, "");
    });
    tempState.selectedCompany = resultado
    //fecha
    const fecha = new Date(parseInt(tempState.productFeature.fecha_inscripcion))
    const year = fecha.getFullYear()
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0')
    const day = fecha.getDate().toString().padStart(2, '0')
    const fechaFormateada = `${year}-${month}-${day}`

    tempState.productFeature.fecha_inscripcion = fechaFormateada
    //hasta aqui
    return tempState
}
export async function updateProyectForm(productOnDraft, state, userID){
  //Info proyecto
  let tempUpdateProduct = {
            id: productOnDraft.id,
            name: state.CRUD_Product.name,
            description: state.CRUD_Product.description,
            status: 'on_verification',
            categoryID: state.activeButton
        }

  await API.graphql(graphqlOperation(updateProduct , { input: tempUpdateProduct }))
  //Info image
  if(state.imageToUpload !== ''){
    handleFiles(state.imageToUpload, productOnDraft.id)
    productOnDraft.images?.items?.length > 0 && await API.graphql(graphqlOperation(deleteImage , {input:{id: productOnDraft.images.items[0].id}}))

  }
  //Info ProductFeatures comunes a todos los proyectos
  let productFeatures = ['ha_tot','ubicacion','fecha_inscripcion','coordenadas','periodo_permanencia','token_name']
  productFeatures.map(async (pfeature) =>{
    let productFeatureID
    if(state.productFeature[pfeature] !== productOnDraft.productFeatures[pfeature]){
      let filterpf = { productID: { eq : productOnDraft.id }, featureID: { eq: pfeature }};
      let result = await API.graphql({ query: listProductFeaturesUpdate, variables: { filter: filterpf }})
        productFeatureID = result.data.listProductFeatures.items[0].id
      await API.graphql(graphqlOperation(updateProductFeature, { input: { id: productFeatureID, value: state.productFeature[pfeature]}}))
    }
    /* let createVerification = await API.graphql(graphqlOperation(getFeatureJustTemplate, { id: pfeature }))
    if(createVerification.data.getFeature.isTemplate){
      await API.graphql(graphqlOperation(createVerification, { input: { userVerifierID: 'ef21568e-027c-4aaf-8cf4-b1bbce19110b', userVerifiedID: userID, productFeatureID: productFeatureID} }))
    } */
  })
  //Info producFeatures REDD o PP
  state.activeButton === 'REDD+' && Object.entries(state.productFeature.redd).map(async ([key, value]) => {
    let pfrProductOnDraft = productOnDraft.productFeatures.items.filter(pf => pf.featureID === key )
    if(typeof value === 'string' && value !== pfrProductOnDraft[0].value) return  await API.graphql(graphqlOperation(updateProductFeature, { input: { id: pfrProductOnDraft[0].id, value: value}}))
    if(typeof value !== 'string'){
      pfrProductOnDraft[0].documents.items.length > 0 && await API.graphql(graphqlOperation(deleteDocument, { input: { id: pfrProductOnDraft[0].documents.items[0].id}})).then(()=> console.log('doc deleted', pfrProductOnDraft[0].documents.items[0].id))
      await handleDocuments(value, pfrProductOnDraft[0].id, userID)
    } 
    /* let createVerification = await API.graphql(graphqlOperation(getFeatureJustTemplate, { id: key }))
    if(createVerification.data.getFeature.isTemplate){
      await API.graphql(graphqlOperation(createVerification, { input: { userVerifierID: 'ef21568e-027c-4aaf-8cf4-b1bbce19110b', userVerifiedID: userID, productFeatureID: pfrProductOnDraft[0].id} }))
    } */
    
  });
  state.activeButton === 'PROYECTO_PLANTACIONES' && Object.entries(state.productFeature.PP).map(async ([key, value]) => {
    let pfPPProductOnDraft = productOnDraft.productFeatures.items.filter(pf => pf.featureID === key )
    if(typeof value === 'string' && value !== pfPPProductOnDraft[0].value && pfPPProductOnDraft[0].documents?.items?.length < 1){
      await API.graphql(graphqlOperation(updateProductFeature, { input: { id: pfPPProductOnDraft[0].id, value: value}}))
    } 
    if(typeof value !== 'string'){
      pfPPProductOnDraft[0].documents.items.length > 0 && await API.graphql(graphqlOperation(deleteDocument, { input: { id: pfPPProductOnDraft[0].documents.items[0].id}}))
      await handleDocuments(value, pfPPProductOnDraft[0].id, userID)
    } 
    /* let createVerification = await API.graphql(graphqlOperation(getFeatureJustTemplate, { id: key }))
    if(createVerification.data.getFeature.isTemplate){
      await API.graphql(graphqlOperation(createVerification, { input: { userVerifierID: 'ef21568e-027c-4aaf-8cf4-b1bbce19110b', userVerifiedID: userID, productFeatureID: pfPPProductOnDraft[0].id} }))
    } */
  });
}