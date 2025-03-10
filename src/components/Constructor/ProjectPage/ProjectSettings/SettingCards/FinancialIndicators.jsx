import React, { useEffect, useState } from "react"
import { API, graphqlOperation } from "aws-amplify"
import TableEdit from "components/common/TableEdit"
import Card from "../../../../common/Card"
import { useProjectData } from "../../../../../context/ProjectDataContext"
import {
  createProductFeature,
  updateProductFeature,
} from "../../../../../graphql/mutations"
import { notify } from "../../../../../utilities/notify"

export default function FinancialIndicators(props) {
  const { className, title, fID, financialInfoType, canEdit, columns } = props

  const { projectData, handleUpdateContextProjectTokenData } = useProjectData()
  const [revenuesByProduct, setRevenuesByProduct] = useState([])
  const [pfID, setPfID] = useState(null)
  const [executedOnce, setExecutedOnce] = useState(false);

  useEffect(() => {
      if(projectData.projectFinancialInfo[financialInfoType] && !executedOnce){
        setPfID(projectData.projectFinancialInfo[financialInfoType][`${financialInfoType}ID`] || null)
        setRevenuesByProduct(projectData.projectFinancialInfo[financialInfoType][financialInfoType] || [])
        setExecutedOnce(true);
      }

  }, [projectData])

  const handleChangeInputValue = async (e) => {
    const { name, value } = e.target
    if (name.includes("input-")) {
        const [_, column, indexRow] = name.split("-")
      setRevenuesByProduct((prevState) =>
        prevState.map((item, index) =>
          index === parseInt(indexRow)
            ? { ...item, [column]: value }
            : item
        )
      )
    }
  }

  const handleEditValue = async (indexToStartEditing) => {
    const isEditingSomeHistoryData = revenuesByProduct.some(
      (obj) => obj.editing === true
    )
    if (!isEditingSomeHistoryData) {
      setRevenuesByProduct((prevState) =>
        prevState.map((item, index) =>
          index === indexToStartEditing ? { ...item, editing: true } : item
        )
      )
    } else {
      notify({
        msg: "Termina la edición antes de realizar una nueva",
        type: "error",
      })
    }
  }

  const handleSaveHistoricalData = async (indexToSave) => {
    let error = false
    let isAlreadyExistingPeriod = false
    const newPeriod = revenuesByProduct[indexToSave].CONCEPTO
    if(projectData.projectFinancialInfo.revenuesByProduct.revenuesByProduct.length > 0){
        isAlreadyExistingPeriod = projectData.projectFinancialInfo.revenuesByProduct.revenuesByProduct.some((hd, index) => hd.CONCEPTO === newPeriod && index !== indexToSave)
    }
    
    if(isAlreadyExistingPeriod) {
      notify({
        msg: "El periodo que intentas guardar ya esta definido",
        type: "error",
      })
      return
    }
    let revenueByProductToUpload = revenuesByProduct.map(rbp =>{return{CONCEPTO: rbp.CONCEPTO, VALOR: rbp.VALOR}})
    if (
        revenuesByProduct[indexToSave].CONCEPTO &&
        revenuesByProduct[indexToSave].VALOR
    ) {
      setRevenuesByProduct((prevState) =>
        prevState
          .map((item, index) =>
            index === indexToSave ? { ...item, editing: false } : item
          )
          .sort((a, b) => a.period - b.period)
      )
      if (pfID) {
        let tempProductFeature = {
          id: pfID,
          value: JSON.stringify(revenueByProductToUpload),
        }
        const response = await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempProductFeature })
        )

        if (!response.data.updateProductFeature) error = true
      } else {
        let tempProductFeature = {
          value: JSON.stringify(revenueByProductToUpload),
          isToBlockChain: false,
          isOnMainCard: false,
          productID: projectData.projectInfo.id,
          featureID: fID,
        }

        API.graphql(
          graphqlOperation(createProductFeature, { input: tempProductFeature })
        )
        .then(response => setPfID(response.data.createProductFeature.id))
        .catch(err => error = true)


      }
    } else {
      notify({
        msg: "Completa todos los campos antes de guardar",
        type: "error",
      })
      return
    }

    if (!error) {
      notify({
        msg: "Datos historicos guardados exitosamente",
        type: "success",
      })
    }
  }

  const handleDeleteHistoricalData = async (indexToDelete) => {
    let error = false

    const tempRevenuesByProduct = revenuesByProduct.filter(
      (_, index) => index !== indexToDelete
    )

    const updatedRevenuesByProduct = tempRevenuesByProduct.map((item) => {
    const { editing, ...rest } = item
    return rest
  })
    setRevenuesByProduct(tempRevenuesByProduct)

    if (pfID) {
      let tempProductFeature = {
        id: pfID,
        value: JSON.stringify(updatedRevenuesByProduct),
      }
      const response = await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      )
  
      if (!response.data.updateProductFeature) error = true
    }
  
  
    if (!error) {
      notify({
        msg: "Valores borrados exitosamente",
        type: "success",
      })
    }
  }

  const handleAddCashFlow = async () => {
    let isEditingSomeHistoryData = false
    if(revenuesByProduct.length > 0){
        isEditingSomeHistoryData = revenuesByProduct.some(
            (tokenHD) => tokenHD.editing === true
          )
    }
    if (!isEditingSomeHistoryData) {
      setRevenuesByProduct((prevState) => {
        return [
          ...prevState,
          {
            CONCEPTO: "",
            VALOR: "",
            editing: true,
          },
        ]
      })
    } else {
      notify({
        msg: "Guarda primero los datos antes de agregar una nueva fila",
        type: "error",
      })
    }
  }

  return (
    <>
      <Card className={className}>
        <Card.Header title={title} sep={true} />
        <Card.Body>
          <p className="mb-3">{title}</p>
          <div>
            <TableEdit canEdit={canEdit} columns={['CONCEPTO', 'VALOR']} infoTable={revenuesByProduct} handleEditValue={handleEditValue} handleChangeInputValue={handleChangeInputValue} handleAddCashFlow={handleAddCashFlow} handleSaveHistoricalData={handleSaveHistoricalData} handleDeleteHistoricalData={handleDeleteHistoricalData}/>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
