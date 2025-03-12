import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import TableEdit from "components/common/TableEdit";
import Card from "../../../../common/Card";
import FormGroup from "../../../../common/FormGroup";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import {
  createProductFeature,
  updateProductFeature,
} from "../../../../../graphql/mutations";
import { notify } from "../../../../../utilities/notify";

export default function CashFlowSettings(props) {
  const { className, canEdit } = props;

  const { projectData, fetchProjectData } = useProjectData();
  const [cashFlowResume, setCashFlowResume] = useState([]);
  const [excelData, setExcelData] = useState("");
  const [pfID, setPfID] = useState(null);
  useEffect(() => {
    if (projectData) {
      if (
        projectData.projectFinancialInfo.cashFlowResume.cashFlowResumeID ||
        null
      ) {
        setPfID(
          projectData.projectFinancialInfo.cashFlowResume.cashFlowResumeID || []
        );
        setCashFlowResume(
          projectData.projectFinancialInfo.cashFlowResume.cashFlowResume
            .flujos_de_caja || []
        );
      }
    }
  }, [projectData]);

  const parseExcelData = (excelData) => {
    const lines = excelData.split("\t");
    const data = [];

    let currentYear = null;
    let resultado_anual = null;
    let resultado_acumulado = null;

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("AÑO ")) {
        if (currentYear !== null) {
          data.push({
            año: currentYear,
            resultado_anual: resultado_anual,
            resultado_acumulado: resultado_acumulado,
          });
        }
        currentYear = trimmedLine.replace("AÑO ", "");
        resultado_anual = null;
        resultado_acumulado = null;
      } else {
        if (resultado_anual === null) {
          resultado_anual = trimmedLine;
        } else if (resultado_acumulado === null) {
          resultado_acumulado = trimmedLine;
        }
      }
    });

    if (
      currentYear !== null &&
      resultado_anual !== null &&
      resultado_acumulado !== null
    ) {
      data.push({
        año: currentYear,
        resultado_anual: resultado_anual,
        resultado_acumulado: resultado_acumulado,
      });
    }

    return data;
  };

  const handlePasteFromExcel = () => {
    const parsedData = parseExcelData(excelData);
    if (isValidParsedData(parsedData)) {
      setCashFlowResume(parsedData);
      handleSaveBtn(parsedData);
    } else {
    }
  };
  const isValidParsedData = (data) => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item === "object" &&
          item.hasOwnProperty("año") &&
          item.hasOwnProperty("resultado_anual") &&
          item.hasOwnProperty("resultado_acumulado") &&
          typeof item.año === "string"
      )
    );
  };
  const handleSaveBtn = async (data) => {
    let error = false;
    if (pfID) {
      let tempProductFeature = {
        id: pfID,
        value: JSON.stringify({ flujos_de_caja: data ? data : cashFlowResume }),
      };
      const response = await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      );
      if (!response.data.updateProductFeature) error = true;
    } else {
      let tempProductFeature = {
        value: JSON.stringify({ flujos_de_caja: cashFlowResume }),
        isToBlockChain: false,
        isOnMainCard: false,
        productID: projectData.projectInfo.id,
        featureID: "GLOBAL_RESUMEN_FLUJO_DE_CAJA",
      };

      const response = await API.graphql(
        graphqlOperation(createProductFeature, { input: tempProductFeature })
      )
      
      if (!response.data.createProductFeature) error = true;
    }

    await fetchProjectData();

    if (error) {
      notify({
        msg: "Ups!, parece que algo ha fallado",
        type: "error",
      });
    }
    if (!error) {
      notify({
        msg: "Datos historicos guardados exitosamente",
        type: "success",
      });
    }
    setExcelData("");
  };

  const handleChangeInputValue = async (e) => {
    const { name, value } = e.target;
    if (name === "Excel") {
      setExcelData(value);
      return;
    }

    if (name.includes("input-")) {
      const [_, column, indexRow] = name.split("-");
      setCashFlowResume((prevState) =>
        prevState.map((item, index) =>
          index === parseInt(indexRow) ? { ...item, [column]: value } : item
        )
      );
    }
  };

  const handleEditValue = async (indexToStartEditing) => {
    const isEditingSomeHistoryData = cashFlowResume.some(
      (obj) => obj.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setCashFlowResume((prevState) =>
        prevState.map((item, index) =>
          index === indexToStartEditing ? { ...item, editing: true } : item
        )
      );
    } else {
      notify({
        msg: "Termina la edición antes de realizar una nueva",
        type: "error",
      });
    }
  };

  const handleSaveHistoricalData = async (indexToSave) => {
    let error = false;
    let isAlreadyExistingPeriod = false;
    const newPeriod = cashFlowResume[indexToSave].año;
    // const count = projectData.projectInfo.token.historicalData.reduce((acc, hd) => (hd.period === tokenHistoricalData[indexToSave].period ? acc + 1 : acc), 0);
    if (
      projectData.projectFinancialInfo.cashFlowResume.cashFlowResume.length > 0
    ) {
      isAlreadyExistingPeriod =
        projectData.projectFinancialInfo.cashFlowResume.cashFlowResume.flujos_de_caja.some(
          (hd, index) => hd.año === newPeriod && index !== indexToSave
        );
    }

    if (isAlreadyExistingPeriod) {
      notify({
        msg: "El periodo que intentas guardar ya esta definido",
        type: "error",
      });
      return;
    }
    let cashFlowResumeToUpload = cashFlowResume.map((cfr) => {
      return {
        año: cfr.año,
        resultado_acumulado: cfr.resultado_acumulado,
        resultado_anual: cfr.resultado_anual,
      };
    });
    if (
      cashFlowResume[indexToSave].año &&
      cashFlowResume[indexToSave].resultado_anual &&
      cashFlowResume[indexToSave].resultado_acumulado
    ) {
      setCashFlowResume((prevState) =>
        prevState
          .map((item, index) =>
            index === indexToSave ? { ...item, editing: false } : item
          )
          .sort((a, b) => a.period - b.period)
      );
      if (pfID) {
        let tempProductFeature = {
          id: pfID,
          value: JSON.stringify({ flujos_de_caja: cashFlowResumeToUpload }),
        };
        const response = await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempProductFeature })
        );

        if (!response.data.updateProductFeature) error = true;
      } else {
        let tempProductFeature = {
          value: JSON.stringify({ flujos_de_caja: cashFlowResumeToUpload }),
          isToBlockChain: false,
          isOnMainCard: false,
          productID: projectData.projectInfo.id,
          featureID: "GLOBAL_RESUMEN_FLUJO_DE_CAJA",
        };

        API.graphql(
          graphqlOperation(createProductFeature, { input: tempProductFeature })
        )
          .then((response) => setPfID(response.data.createProductFeature.id))
          .catch((err) => (error = true));
      }

      await fetchProjectData();
    } else {
      notify({
        msg: "Completa todos los campos antes de guardar",
        type: "error",
      });
      return;
    }

    if (!error) {
      notify({
        msg: "Datos historicos guardados exitosamente",
        type: "success",
      });
    }
  };

  const handleDeleteHistoricalData = async (indexToDelete) => {
    let error = false;

    const tempCashFlowResume = cashFlowResume.filter(
      (_, index) => index !== indexToDelete
    );
    setCashFlowResume(tempCashFlowResume);

    if (pfID) {
      let tempProductFeature = {
        id: pfID,
        value: JSON.stringify({ flujos_de_caja: tempCashFlowResume }),
      };
      const response = await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      );

      if (!response.data.updateProductFeature) error = true;

      await fetchProjectData();
    }

    if (!error) {
      notify({
        msg: "Valores borrados exitosamente",
        type: "success",
      });
    }
  };

  const handleAddCashFlow = async () => {
    let isEditingSomeHistoryData = false;
    if (cashFlowResume.length > 0) {
      isEditingSomeHistoryData = cashFlowResume.some(
        (tokenHD) => tokenHD.editing === true
      );
    }
    if (!isEditingSomeHistoryData) {
      setCashFlowResume((prevState) => {
        return [
          ...prevState,
          {
            año: "0",
            resultado_acumulado: "0",
            resultado_anual: "0",
            editing: true,
          },
        ];
      });
    } else {
      notify({
        msg: "Guarda primero los datos antes de agregar una nueva fila",
        type: "error",
      });
    }
  };

  return (
    <>
      <Card className={className}>
        <Card.Header title="Flujo de caja del proyecto" sep={true} />
        <Card.Body>
          <FormGroup
            type="flex"
            placeholder="Paste Excel data here..."
            inputType="text"
            inputSize="md"
            label="Excel data"
            inputName="Excel"
            inputValue={excelData}
            disabled={canEdit}
            saveBtnDisabled={canEdit}
            onChangeInputValue={(e) => handleChangeInputValue(e)}
            onClickSaveBtn={() => handlePasteFromExcel()}
          />
          <p className="mb-3">Flujo de caja del proyecto</p>
          <div>
            <TableEdit
              canEdit={canEdit}
              columns={["año", "resultado_anual", "resultado_acumulado"]}
              infoTable={cashFlowResume}
              handleEditValue={handleEditValue}
              handleChangeInputValue={handleChangeInputValue}
              handleAddCashFlow={handleAddCashFlow}
              handleSaveHistoricalData={handleSaveHistoricalData}
              handleDeleteHistoricalData={handleDeleteHistoricalData}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
