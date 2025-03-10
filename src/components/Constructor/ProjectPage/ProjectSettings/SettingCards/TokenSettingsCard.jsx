import React, { useEffect, useState } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";

import Card from "../../../../common/Card";
import FormGroup from "../../../../common/FormGroup";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import {
  createProductFeature,
  updateProductFeature,
} from "../../../../../graphql/mutations";
import { notify } from "../../../../../utilities/notify";
import { TrashIcon } from "components/common/icons/TrashIcon";
import { PlusIcon } from "components/common/icons/PlusIcon";
import { EditIcon } from "components/common/icons/EditIcon";
import { XIcon } from "components/common/icons/XIcon";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";

const regex = /^(0| |)$/;
export default function TokenSettingsCard(props) {
  const { className, canEdit } = props;
  const { projectData, fetchProjectData } = useProjectData();

  const [tokenName, setTokenName] = useState("");
  const [tokenCurrency, setTokenCurrency] = useState("");
  const [tokenCurrencyPfID, setTokenCurrencyPfID] = useState(null);
  const [totalTokenAmountPfID, setTotalTokenAmountPfID] = useState(null);

  const [userID, setUserID] = useState("");

  const [isDisabledTokenName, setIsDisabledTokenName] = useState(false);
  const [tokenHistoricalData, setTokenHistoricalData] = useState([{}]);
  const [editTokenHistoricalData, setEditTokenHistoricalData] = useState(false);
  const [tokenHistoricalDataPfID, setTokenHistoricalDataPfID] = useState([]);

  const totalTokensPF = JSON.parse(
    projectData.projectFeatures.find(
      (item) => item.featureID === "GLOBAL_TOKEN_HISTORICAL_DATA"
    )?.value || "[]"
  );

  const totalTokens = totalTokensPF.reduce(
    (sum, item) => sum + parseInt(item.amount) /* + parseInt(item.correction) */,
    0
  );

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      if (data) return setUserID(data.attributes.sub);
    });
  }, []);

  useEffect(() => {
    if (projectData) {
      if (projectData.projectInfo.token.transactionsNumber !== 0) {
        setIsDisabledTokenName(true);
      }
      setTokenName(projectData.projectInfo.token.name);
      setTotalTokenAmountPfID(
        projectData.projectInfo.token.pfIDs.pfTotalTokenAmountID
      );
      setTokenCurrency(projectData.projectInfo.token.currency);
      setTokenCurrencyPfID(
        projectData.projectInfo.token.pfIDs.pfTokenCurrencyID
      );

      const sortedHistoricalData = [
        ...projectData.projectInfo.token.historicalData,
      ].sort((a, b) => a.period - b.period);
      setTokenHistoricalData(sortedHistoricalData);
      setTokenHistoricalDataPfID(
        projectData.projectInfo?.token.pfIDs.pfTokenHistoricalDataID
      );
    }
  }, []);

  function getImportantValues(tokenHistoricalDataFixed) {
    return tokenHistoricalDataFixed.map((tokenData) => {
      return {
        period: tokenData.period,
        date: tokenData.date,
        price: parseFloat(tokenData.price),
        amount: parseInt(tokenData.amount),
      };
    });
  }

  const handleSetTotalTokenAmountFeature = async (value) => {
    if (totalTokenAmountPfID) {
      let tempProductFeature = {
        id: totalTokenAmountPfID,
        value: value,
      };
      await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      );
    } else {
      let tempProductFeature = {
        value: value,
        isToBlockChain: false,
        isOnMainCard: false,
        productID: projectData.projectInfo.id,
        featureID: "GLOBAL_TOKEN_TOTAL_AMOUNT",
      };

      const response = await API.graphql(
        graphqlOperation(createProductFeature, { input: tempProductFeature })
      );

      setTotalTokenAmountPfID(response.data.createProductFeature.id);
    }
  };

  const handleSaveBtn = async (toSave) => {
    let error = false;
    if (toSave === "tokenName") {
      if (projectData.projectInfo.token.pfIDs.pfTokenNameID) {
        let tempProductFeature = {
          id: projectData.projectInfo.token.pfIDs.pfTokenNameID,
          value: tokenName,
        };
        const response = await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempProductFeature })
        );

        if (!response.data.updateProductFeature) error = true;
      } else {
        let tempProductFeature = {
          value: tokenName,
          isToBlockChain: false,
          isOnMainCard: false,
          productID: projectData.projectInfo.id,
          featureID: "GLOBAL_TOKEN_NAME",
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, { input: tempProductFeature })
        );

        if (!response.data.createProductFeature) error = true;
      }
      await fetchProjectData();

      if (!error) {
        notify({
          msg: "El nombre del token ha sido modificado exitosamente",
          type: "success",
        });
      }
    }

    if (toSave === "tokenCurrency") {
      if (tokenCurrencyPfID) {
        let tempProductFeature = {
          id: tokenCurrencyPfID,
          value: tokenCurrency,
        };
        const response = await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempProductFeature })
        );

        if (!response.data.updateProductFeature) error = true;
      } else {
        let tempProductFeature = {
          value: tokenCurrency,
          isToBlockChain: false,
          isOnMainCard: false,
          productID: projectData.projectInfo.id,
          featureID: "GLOBAL_TOKEN_CURRENCY",
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, { input: tempProductFeature })
        );
        setTokenCurrencyPfID(response.data.createProductFeature.id);

        if (!response.data.createProductFeature) error = true;
      }
      await fetchProjectData();

      if (!error) {
        notify({
          msg: "La divisa de comercialización ha sido modificada exitosamente",
          type: "success",
        });
      }
    }

    if (error) {
      notify({
        msg: "Ups!, parece que algo ha fallado",
        type: "error",
      });
    }
  };

  const handleChangeInputValue = async (e) => {
    const { name, value } = e.target;
    if (name === "tokenName") {
      setTokenName(value);
      return;
    }
    if (name === "tokenCurrency") {
      setTokenCurrency(value);
      return;
    }

    if (name.includes("token_")) {
      const [_, tokenHistoryFeature, tokenHistoryIndex] = name.split("_");

      setTokenHistoricalData((prevState) =>
        prevState.map((item, index) =>
          index === parseInt(tokenHistoryIndex)
            ? { ...item, [tokenHistoryFeature]: value }
            : item
        )
      );
    }
  };

  const handleEditHistoricalData = async (indexToStartEditing) => {
    const isEditingSomeHistoryData = tokenHistoricalData.some(
      (tokenHD) => tokenHD.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setTokenHistoricalData((prevState) =>
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
    const newPeriod = tokenHistoricalData[indexToSave].period;
    // const count = projectData.projectInfo.token.historicalData.reduce((acc, hd) => (hd.period === tokenHistoricalData[indexToSave].period ? acc + 1 : acc), 0);
    const isAlreadyExistingPeriod =
      projectData.projectInfo.token.historicalData.some(
        (hd, index) => hd.period === newPeriod && index !== indexToSave
      );

    if (isAlreadyExistingPeriod) {
      notify({
        msg: "El periodo que intentas guardar ya esta definido",
        type: "error",
      });
      return;
    }

    if (
      tokenHistoricalData[indexToSave].period &&
      tokenHistoricalData[indexToSave].date &&
      tokenHistoricalData[indexToSave].amount &&
      tokenHistoricalData[indexToSave].price
    ) {
      if (tokenHistoricalData[indexToSave].period <= 0) {
        notify({
          msg: "Ingresa un periodo mayor a 0",
          type: "error",
        });
        return;
      }

      setTokenHistoricalData((prevState) =>
        prevState
          .map((item, index) =>
            index === indexToSave ? { ...item, editing: false } : item
          )
          .sort((a, b) => a.period - b.period)
      );

      if (tokenHistoricalDataPfID) {
        let tempProductFeature = {
          id: tokenHistoricalDataPfID,
          value: JSON.stringify(getImportantValues(tokenHistoricalData)),
        };
        const response = await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempProductFeature })
        );

        if (!response.data.updateProductFeature) error = true;
      } else {
        let tempProductFeature = {
          value: JSON.stringify(getImportantValues(tokenHistoricalData)),
          isToBlockChain: false,
          isOnMainCard: false,
          productID: projectData.projectInfo.id,
          featureID: "GLOBAL_TOKEN_HISTORICAL_DATA",
        };
        const response = await API.graphql(
          graphqlOperation(createProductFeature, { input: tempProductFeature })
        );

        setTokenHistoricalDataPfID(response.data.createProductFeature.id);

        if (!response.data.createProductFeature) error = true;
      }

      const totalTokenDistribution = tokenHistoricalData.reduce(
        (sum, item) => sum + parseInt(item.amount),
        0
      );
      await handleSetTotalTokenAmountFeature(totalTokenDistribution);
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

    const tempTokenHistoricalData = tokenHistoricalData.filter(
      (_, index) => index !== indexToDelete
    );
    setTokenHistoricalData(tempTokenHistoricalData);

    /* if (tokenHistoricalDataPfID) {
      let tempProductFeature = {
        id: tokenHistoricalDataPfID,
        value: JSON.stringify(getImportantValues(tempTokenHistoricalData)),
      };
      const response = await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      );

      if (!response.data.updateProductFeature) error = true;
    } else {
      let tempProductFeature = {
        value: JSON.stringify(getImportantValues(tempTokenHistoricalData)),
        isToBlockChain: false,
        isOnMainCard: false,
        productID: projectData.projectInfo.id,
        featureID: "GLOBAL_TOKEN_HISTORICAL_DATA",
      };
      const response = await API.graphql(
        graphqlOperation(createProductFeature, { input: tempProductFeature })
      );

      setTokenHistoricalDataPfID(response.data.createProductFeature.id);

      if (!response.data.createProductFeature) error = true;
    }

    const totalTokenDistribution = tempTokenHistoricalData.reduce(
      (sum, item) => sum + parseInt(item.amount),
      0
    );
    await handleSetTotalTokenAmountFeature(totalTokenDistribution);
    await fetchProjectData();

    if (!error) {
      notify({
        msg: "Valores borrados exitosamente",
        type: "success",
      });
    } */
  };
  const saveHistoricalData = async () => {
    let error = false;
    let checkTableData = checksumHistoricalData(tokenHistoricalData);

    if (!checkTableData) {
      notify({
        msg: "error al validar los datos",
        type: "error",
      });
      return;
    }
    const dataToSave = prepareHistoricalData(tokenHistoricalData);
    if (tokenHistoricalDataPfID) {
      let tempProductFeature = {
        id: tokenHistoricalDataPfID,
        value: JSON.stringify(dataToSave),
      };
      const response = await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      );

      if (!response.data.updateProductFeature) error = true;
    } else {
      let tempProductFeature = {
        value: JSON.stringify(dataToSave),
        isToBlockChain: false,
        isOnMainCard: false,
        productID: projectData.projectInfo.id,
        featureID: "GLOBAL_TOKEN_HISTORICAL_DATA",
      };
      const response = await API.graphql(
        graphqlOperation(createProductFeature, { input: tempProductFeature })
      );

      setTokenHistoricalDataPfID(response.data.createProductFeature.id);

      if (!response.data.createProductFeature) error = true;
    }

    const totalTokenDistribution = tokenHistoricalData.reduce(
      (sum, item) => sum + parseInt(item.amount),
      0
    );
    notify({
      msg: "Información del histórico del token guardada correctamente.",
      type: "success",
    });
    setEditTokenHistoricalData(false);
    await handleSetTotalTokenAmountFeature(totalTokenDistribution);
    await fetchProjectData();
  };

  const checksumHistoricalData = (data) => {
    let orderData = data.every((obj, index, array) => {
      if (index === 0) return true;

      const completeFields =
        obj.hasOwnProperty("period") &&
        obj.hasOwnProperty("date") &&
        obj.hasOwnProperty("price") &&
        obj.hasOwnProperty("amount");
      if (!completeFields) return false;

      const actualDate = new Date(obj.date);
      const beforeDate = new Date(array[index - 1].date);

      return (
        obj.period > array[index - 1].period &&
        actualDate > beforeDate &&
        obj.price >= 1 &&
        obj.amount >= 1
      );
    });

    if (orderData) {
      return true;
    }
    return false;
  };
  const prepareHistoricalData = (data) => {
    let date = Date.now();
    let dataToSend = data;
    return dataToSend;
  };
  const handleAddNewPeriodToHistoricalData = async () => {
    if (tokenHistoricalData.length > 0) {
      return setTokenHistoricalData((prevState) => {
        return [
          ...prevState,
          {
            period: parseInt(prevState[prevState.length - 1].period) + 1 || 1,
            correction: 0,
            date: "",
            price: "",
            amount: "",
            tir: "",
            investment: "",
          },
        ];
      });
    }
    return setTokenHistoricalData([
      {
        period: 1,
        correction: 0,
        date: "",
        price: "",
        amount: "",
        tir: "",
        investment: "",
      },
    ]);
  };
  const checkEndDate = (data) =>{
    const currentDate = new Date();
    const dataDate = new Date(data.date);
    return currentDate <= dataDate
  }
  return (
    <>
      <Card className={className}>
        <Card.Header title="Configuración del Token" sep={true} />
        <Card.Body>
{/*           <FormGroup
            disabled={isDisabledTokenName}
            type="flex"
            inputType="text"
            inputSize="md"
            label="Nombre del token"
            inputName="tokenName"
            inputValue={tokenName}
            saveBtnDisabled={
              projectData.projectInfo?.token.name === tokenName ? true : false
            }
            onChangeInputValue={(e) => handleChangeInputValue(e)}
            onClickSaveBtn={() => handleSaveBtn("tokenName")}
          /> */}
          <FormGroup
            disabled={canEdit}
            type="flex"
            label="Divisa de comercialización"
            inputType="select"
            inputSize="md"
            inputName="tokenCurrency"
            optionList={[
              { value: "COP", label: "COP" },
              { value: "USD", label: "USD" },
            ]}
            inputValue={tokenCurrency}
            saveBtnDisabled={
              projectData.projectInfo?.token.currency === tokenCurrency
                ? true
                : false
            }
            onChangeInputValue={(e) => handleChangeInputValue(e)}
            onClickSaveBtn={() => handleSaveBtn("tokenCurrency")}
          />
          <div className="mb-3 mt-3 pt-3 border-top d-flex justify-content-between">
            <p>Histórico del token</p>
            <div>
              {editTokenHistoricalData ? (
                <button
                  className={`${
                    /* canEdit || projectData.isFinancialFreeze
                      ? "bg-red-400"
                      : */ "bg-red-600 hover:bg-red-700"
                  } p-2 text-white  rounded-md ml-2 `}
                 /*  disabled={canEdit || projectData.isFinancialFreeze} */
                  onClick={() => setEditTokenHistoricalData(false)}
                >
                  <XIcon />
                </button>
              ) : (
                <button
                  className={`${
                    /* canEdit || projectData.isFinancialFreeze
                      ? "bg-[#f8d771]"
                      :  */"bg-yellow-500 hover:bg-yellow-600"
                  } p-2 text-white  rounded-md  `}
                  /* disabled={canEdit || projectData.isFinancialFreeze} */
                  onClick={() => setEditTokenHistoricalData(true)}
                >
                  <EditIcon />
                </button>
              )}
              <button
                className={`p-2 text-white bg-[#6e6c35] border-1 border-dark rounded-md  hover:bg-green-800 ml-2`}
                disabled={!editTokenHistoricalData}
                onClick={() => saveHistoricalData()}
              >
                <SaveDiskIcon />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
  <table className="w-full">
    <thead className="text-center">
      <tr>
        <th style={{ width: "80px" }}>Periodo</th>
        <th style={{ width: "100px" }}>Fecha de cierre</th>
        <th style={{ width: "100px" }}>Volumen inicial(tCO2eq)</th>
        <th style={{ width: "100px" }}>Corrección volumen</th>
        {!editTokenHistoricalData && (
          <th style={{ width: "100px" }}>Redimible</th>
        )}
        <th style={{ width: "100px" }}>Precio</th>
        <th style={{ width: "100px" }}>TIR</th>
        <th style={{ width: "100px" }}>Inversión</th>
        {editTokenHistoricalData && (
          <th style={{ width: "100px" }}></th>
        )}
      </tr>
    </thead>
    <tbody className="align-middle">
      {tokenHistoricalData.map((data, index) => {
        return (
          <tr
            key={index}
            className="text-center border-t-[1px]"
            style={{ height: "3rem" }}
          >
            {editTokenHistoricalData ? (
              <>
                <td>
                  <input
                    type="number"
                    value={tokenHistoricalData[index].period}
                    disabled={canEdit || projectData.isFinancialFreeze}
                    className="text-center p-2 border rounded-md"
                    name={`token_period_${index}`}
                    onChange={(e) => handleChangeInputValue(e)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={data.date}
                    disabled={canEdit || projectData.isFinancialFreeze}
                    className="text-center p-2 border rounded-md"
                    name={`token_date_${index}`}
                    onChange={(e) => handleChangeInputValue(e)}
                  />
                </td>
                <td>
                  <input
                    size="sm"
                    type="number"
                    value={data.amount}
                    disabled={canEdit || projectData.isFinancialFreeze}
                    className="text-center p-2 border rounded-md"
                    name={`token_amount_${index}`}
                    onChange={(e) => handleChangeInputValue(e)}
                  />
                </td>
                <td>
                  <input
                    size="sm"
                    type="number"
                    value={data.correction}
                    disabled={checkEndDate(data) && regex.test(String(data.correction))}
                    className="text-center p-2 border rounded-md"
                    name={`token_correction_${index}`}
                    onChange={(e) => handleChangeInputValue(e)}
                  />
                </td>
                <td>
                  <input
                    size="sm"
                    type="number"
                    value={data.price}
                    disabled={canEdit || projectData.isFinancialFreeze}
                    className="text-center p-2 border rounded-md"
                    name={`token_price_${index}`}
                    onChange={(e) => handleChangeInputValue(e)}
                  />
                </td>
                <td>
                  <input
                    size="sm"
                    type="number"
                    value={data.tir}
                    disabled={canEdit || projectData.isFinancialFreeze}
                    className="text-center p-2 border rounded-md"
                    name={`token_tir_${index}`}
                    onChange={(e) => handleChangeInputValue(e)}
                  />
                </td>
                <td>
                  <input
                    size="sm"
                    type="number"
                    value={data.investment}
                    disabled={canEdit || projectData.isFinancialFreeze}
                    className="text-center p-2 border rounded-md"
                    name={`token_investment_${index}`}
                    onChange={(e) => handleChangeInputValue(e)}
                  />
                </td>
                <td>
                  <button
                    disabled={canEdit || projectData.isFinancialFreeze}
                    className={`${
                      canEdit || projectData.isFinancialFreeze
                        ? "bg-red-400"
                        : "bg-red-600 hover:bg-red-700"
                    } p-2 text-white  rounded-md ml-2 `}
                    onClick={() => handleDeleteHistoricalData(index)}
                  >
                    <XIcon />
                  </button>
                </td>
              </>
            ) : (
              <>
                <td>{data.period}</td>
                <td>{data.date}</td>
                <td>{data.amount}</td>
                <td>
                  {regex.test(String(data.correction))
                    ? "Sin corrección"
                    : data.correction > 0
                    ? `+${data.correction}`
                    : data.correction}
                </td>
                <td className="font-weight-bold">
                  {parseInt(data.amount) + (parseInt(data.correction) || 0)}
                </td>
                <td>{data.price}</td>
                <td>{data.tir}</td>
                <td>{data.investment}</td>
              </>
            )}
          </tr>
        );
      })}
      <tr>
        <td colSpan={8}>
          <div className="d-flex">
            <button
              className={`${
                canEdit || !editTokenHistoricalData
                  ? "bg-gray-300"
                  : "bg-gray-400 hover:bg-gray-500"
              } text-white p-2  rounded-md w-full flex justify-center `}
              disabled={canEdit || !editTokenHistoricalData}
              onClick={() => handleAddNewPeriodToHistoricalData()}
            >
              <PlusIcon></PlusIcon>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

          <p className="mb-0">
            Volumen total de Tokens:{" "}
            {parseFloat(totalTokens).toLocaleString("es-ES")}
          </p>
          {/* <div className="border p-3">
            <p className="mb-3 text-center">Distribución volumen de tokens</p>
            <p>
              Al tratarse de unidades de tokens, los valores de la distribución
              deben ser enteros y no decimales. Adicionalmente, la suma de estos
              valores debe ser exactamente igual a la cantidad total de tokens
              del proyecto.
            </p>

                      
            <FormGroup
              disabled={canEdit}
              type="flex"
              inputType="number"
              inputSize="md"
              label={`Inversionista (Tokens)`}
              inputName="investor"
              inputValue={tokenDistributionForm.investor}
              saveBtnVisible={false}
              onChangeInputValue={(e) => handleChangeInputValueForm(e)}
            />
            <FormGroup
              disabled={canEdit}
              type="flex"
              inputType="number"
              inputSize="md"
              label={`Propietario (Tokens)`}
              inputName="owner"
              inputValue={tokenDistributionForm.owner}
              saveBtnVisible={false}
              onChangeInputValue={(e) => handleChangeInputValueForm(e)}
            />
            <FormGroup
              disabled={canEdit}
              type="flex"
              inputType="number"
              inputSize="md"
              label={`SUAN (Tokens)`}
              inputName="suan"
              inputValue={tokenDistributionForm.suan}
              saveBtnVisible={false}
              onChangeInputValue={(e) => handleChangeInputValueForm(e)}
            />
            <FormGroup
              disabled={canEdit}
              type="flex"
              inputType="number"
              inputSize="md"
              label={`Comunidad (Tokens)`}
              inputName="comunity"
              inputValue={tokenDistributionForm.comunity}
              saveBtnVisible={false}
              onChangeInputValue={(e) => handleChangeInputValueForm(e)}
            />
            <FormGroup
              disabled={canEdit}
              type="flex"
              inputType="number"
              inputSize="md"
              label={`Buffer (Tokens)`}
              inputName="buffer"
              inputValue={tokenDistributionForm.buffer}
              saveBtnVisible={false}
              onChangeInputValue={(e) => handleChangeInputValueForm(e)}
            />
            <div className="border p-3 mx-auto my-3" style={{width: "300px"}}>
                <div className="d-flex justify-content-center mb-3">Resumen</div>
                <div>
                  <ul>
                    <li>Inversionista: {(totalTokenAmount * tokenDistributionForm.investor) / 100 || 0} Tokens</li>
                    <li>Propietario: {(totalTokenAmount * tokenDistributionForm.owner) / 100  || 0} Tokens</li>
                    <li>SUAN: {(totalTokenAmount * tokenDistributionForm.suan) / 100  || 0} Tokens</li>
                    <li>Comunidad: {(totalTokenAmount * tokenDistributionForm.comunity) / 100  || 0} Tokens</li>
                    <li>Buffer: {(totalTokenAmount * tokenDistributionForm.buffer) / 100  || 0} Tokens</li>
                  </ul>
                </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                disabled={canEdit}
                onClick={() => handleSaveBtn("tokenDistributionForm")}
                variant="success"
              >
                Guardar
              </Button>
            </div>
          </div> */}
        </Card.Body>
      </Card>
    </>
  );
}
