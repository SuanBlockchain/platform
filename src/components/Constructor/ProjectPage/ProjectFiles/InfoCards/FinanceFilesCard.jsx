import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { API, graphqlOperation } from "aws-amplify";
import { createProductFeature, updateProductFeature } from "graphql/mutations";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import { validateProjectFeatures } from "./validateProjectFeatures";
import { useAuth } from "context/AuthContext";
import { CheckIcon } from "components/common/icons/CheckIcon";
import { PlusIcon } from "components/common/icons/PlusIcon";
import { TrashIcon } from "components/common/icons/TrashIcon";
import { EditIcon } from "components/common/icons/EditIcon";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
import { notify } from "utilities/notify";
import { marketplaceURLMapper } from "../../mappers";

export default function FinanceCard({ visible }) {
  const { user } = useAuth();

  const { projectData, fetchProjectData } = useProjectData();
  const [validadorShow, setValidadorShow] = useState(true);
  const dataToken =
    projectData.projectFinancialInfo.tokenAmountDistribution
      .tokenAmountDistribution;
  const dataCash = projectData.projectFinancialInfo.cashFlowResume;
  const dataRevenues = projectData.projectFinancialInfo.revenuesByProduct;
  const dataIndicador = projectData.projectFinancialInfo.financialIndicators;
  const isValid = validateProjectFeatures(projectData.projectFeatures);
  const [globalOwnerAcceptsPfID, setGlobalOwnerAcceptsPfID] = useState(null);
  const [isAccepted, setIsAccepted] = useState(false);

  const handleBotoncheckpostulant = async () => {
    if (globalOwnerAcceptsPfID) {
      const updatedProductFeature = {
        id: globalOwnerAcceptsPfID,
        value: "true",
      };
      await API.graphql(
        graphqlOperation(updateProductFeature, { input: updatedProductFeature })
      );
    } else {
      const newProductFeature = {
        productID: projectData.projectInfo.id,
        featureID: "GLOBAL_OWNER_ACCEPTS_CONDITIONS",
        value: "true",
      };

      const response = await API.graphql(
        graphqlOperation(createProductFeature, {
          input: newProductFeature,
        })
      );
      setGlobalOwnerAcceptsPfID(response.data.createProductFeature.id)
    }
    setValidadorShow(false);

    await fetchProjectData();
  };
  useEffect(() => {

    const pf = projectData.projectFeatures.find(
      (item) => item.featureID === "GLOBAL_OWNER_ACCEPTS_CONDITIONS"
    );
    if (pf) {
      const pfID = pf.id;
      const pfValue = pf.value;

      setGlobalOwnerAcceptsPfID(pfID);
      setIsAccepted(pfValue === "true" ? true : false);
    }
  }, []);

  return (
    visible &&
    (isValid && validadorShow ? (
      <>
        {user?.id && projectData.projectPostulant?.id.includes(user.id) && (
          <div className="row p-3 m-2 confirmacion_finan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
            </svg>
            Por favor, verifica cuidadosamente los siguientes indicadores
            financieros. Estas serán las tendencias y la evolución que tendrá el
            proyecto, según nuestros expertos. Debes estar de acuerdo con esto
            para que tu proyecto sea publicado en nuestro Marketplace.<br></br>
            <br></br>
            <span className="text-center">
              Confirmo que leí y estoy deacuerdo con los indicadores presentados
              por SUAN.{" "}
            </span>
            <br></br>
            <button
              className="w-2/6 p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                handleBotoncheckpostulant();
              }}
            >
              Aceptar información financiera
            </button>
          </div>
        )}
        <div className="container">
          <div className="row">
            <DistributionToken infoTable={dataToken} />
            <CashProducts infoTable={dataCash.cashFlowResume.flujos_de_caja} />
            <IndicatorsProducts infoTable={dataIndicador.financialIndicators} />
            <RevenuesProducts infoTable={dataRevenues.revenuesByProduct} />
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="container">
          {isAccepted && (
            <div className="row accept">
              <CheckIcon className="col col-1" />
              <p className="col col-11">
                La información financiera ya fue leída y aceptada correctamente
              </p>
            </div>
          )}
          <div className="row">
            {user?.id &&
              projectData.projectPostulant?.id.includes(user.id) &&
              isAccepted && (
                <ClaimTokens
                  tokenName={projectData.projectInfo?.token.name}
                  ownerTokensAmount={
                    projectData.projectInfo?.token.amountDistribution.owner
                  }
                  marketplaceID={projectData.projectInfo.marketplaceID}
                />
              )}
            <DistributionToken infoTable={dataToken} />
            <CashProducts infoTable={dataCash.cashFlowResume.flujos_de_caja} />
            <IndicatorsProducts infoTable={dataIndicador.financialIndicators} />
            <RevenuesProducts infoTable={dataRevenues.revenuesByProduct} />
          </div>
        </div>
      </>
    ))
  );
}

function ClaimTokens({ ownerTokensAmount, tokenName, marketplaceID }) {
  const [tokenToAdressData, setTokenToAdressData] = useState([]);
  const [tokensAvaiableAmount, setTokensAvaiableAmount] = useState(0);

  useEffect(() => {
    const consumed = tokenToAdressData.reduce(
      (acumulador, objeto) => acumulador + (parseInt(objeto.amount) || 0),
      0
    );
    const available = parseInt(ownerTokensAmount) - consumed;
    setTokensAvaiableAmount(available);
  }, [tokenToAdressData]);

  const handleChangeInputValue = async (e) => {
    const { name, value } = e.target;

    if (name.includes("dist_")) {
      const [_, tokenHistoryFeature, tokenHistoryIndex] = name.split("_");

      setTokenToAdressData((prevState) =>
        prevState.map((item, index) =>
          index === parseInt(tokenHistoryIndex)
            ? { ...item, [tokenHistoryFeature]: value }
            : item
        )
      );
    }
  };

  const handleEditData = async (indexToStartEditing) => {
    const isEditingSomeHistoryData = tokenToAdressData.some(
      (ownerData) => ownerData.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setTokenToAdressData((prevState) =>
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

  const handleAddNewData = async () => {
    const isEditingSomeHistoryData = tokenToAdressData.some(
      (ownerData) => ownerData.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setTokenToAdressData((prevState) => {
        return [
          ...prevState,
          {
            address: "",
            amount: "",
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

  const handleSaveData = async (indexToSave) => {
    if (parseInt(tokenToAdressData[indexToSave].amount) <= 0) {
      notify({
        msg: "Ingrese una cantidad valida",
        type: "error",
      });
      return;
    }
    if (tokensAvaiableAmount < 0) {
      notify({
        msg: "La cantidad de tokens escogida no esta disponible",
        type: "error",
      });
      return;
    }
    if (
      tokenToAdressData[indexToSave].address &&
      tokenToAdressData[indexToSave].amount
    ) {
      setTokenToAdressData((prevState) =>
        prevState.map((item, index) =>
          index === indexToSave
            ? {
                ...item,
                editing: false,
              }
            : item
        )
      );
    } else {
      notify({
        msg: "Completa todos los campos antes de guardar",
        type: "error",
      });
      return;
    }
  };

  const handleDeleteData = async (indexToDelete) => {
    const tempTokenToAdressData = tokenToAdressData.filter(
      (_, index) => index !== indexToDelete
    );
    setTokenToAdressData(tempTokenToAdressData);
  };

  function getImportantValues(data) {
    return data.map((obj) => {
      return {
        address: obj.address,
        amount: obj.amount,
      };
    });
  }

  const handleSendData = async () => {
    const data = {
      tokenName: tokenName,
      tokenSending: getImportantValues(tokenToAdressData),
    };
  };

  return (
    <div className="box-postulant p-3">
      <strong className="mb-3 text-bold text-danger">¡Importante!</strong>
      <p>
        Una vez que haya aceptado las condiciones del proyecto, es crucial que
        se dirija al Marketplace y acceda con su usuario y contraseña. Si aún no
        dispone de una billetera, podrá crearla fácilmente mediante este
        proceso. Recuerde que esta billetera es esencial para recibir los tokens
        del proyecto al que ha postulado. Por favor, siga las instrucciones
        detalladas en el Marketplace para garantizar una participación exitosa y
        asegurarse de recibir sus tokens correctamente.
      </p>
      <div className="d-flex justify-content-center">
        <a
          href={`${marketplaceURLMapper[marketplaceID || 'suan'][process.env.REACT_APP_ENV]}auth/login`} //remove ${process.env.REACT_APP_URL_MARKETPLACE}
          target="_blank"
          rel="noreferrer"
          className="btn btn-warning"
        >
          Ir al Marketplace
        </a>
      </div>
      {/* <p>
        Ir a{" "}
        <a
          href="https://marketplace.suan.global/generate-wallet"
          target="_blank"
          rel="noreferrer"
        >
          Marketplace.
        </a>
      </p> */}
      {/* <Table responsive>
        <thead className="text-center">
          <tr>
            <th style={{ width: "300px" }}>Dirección de billetera</th>
            <th style={{ width: "120px" }}>Cantidad</th>
            <th style={{ width: "120px" }}></th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {tokenToAdressData.map((data, index) => {
            return (
              <tr key={index} className="text-center">
                {data.editing ? (
                  <>
                    <td>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={data.address}
                        className="text-center"
                        name={`dist_address_${index}`}
                        onChange={(e) => handleChangeInputValue(e)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        size="sm"
                        type="number"
                        value={data.amount}
                        className="text-center"
                        name={`dist_amount_${index}`}
                        onChange={(e) => handleChangeInputValue(e)}
                      />
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="success"
                        className="m-1"
                        onClick={() => handleSaveData(index)}
                      >
                        <SaveDiskIcon />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        className="m-1"
                        onClick={() => handleDeleteData(index)}
                      >
                        <TrashIcon />
                      </Button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{data.address}</td>
                    <td>{data.amount}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="warning"
                        className="m-1"
                        onClick={() => handleEditData(index)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        className="m-1"
                        onClick={() => handleDeleteData(index)}
                      >
                        <TrashIcon />
                      </Button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
          <tr>
            <td colSpan={5}>
              <div className="d-flex">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-100"
                  onClick={() => handleAddNewData()}
                >
                  <PlusIcon></PlusIcon>
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <p className="text-center mt-2 mb-4">
        Tokens por distribuir:{" "}
        {tokensAvaiableAmount >= 0 ? tokensAvaiableAmount : 0}
      </p>
      <div className="d-flex justify-content-center">
        <Button variant="success" onClick={() => handleSendData()}>
          Enviar tokens
        </Button>
      </div> */}
    </div>
  );
}

function DistributionToken({ infoTable }) {
  const totalOwnerValue = infoTable.reduce(
    (sum, item) => sum + parseInt(item.CANTIDAD),
    0
  );
  if (!infoTable || infoTable.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }


  return (
    <div className="col">
      <div className="row align-items-start ">
        <div className="col p-3 m-2 box-postulant">
          <h5>Distribución de Tokens del proyecto</h5>
          <p className="text-tok-post">
            Los tokens asociados al propietario, se enviarán despues de aprobada
            la información financiera*
          </p>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="distribution">
                {infoTable.map((item, index) => (
                  <th scope="col" className="px-3 py-2" key={index}>
                    {item.CONCEPTO}
                  </th>
                ))}
                {/* {Object.keys(infoTable).map((key) => (
									<th scope="col" className="px-3 py-2" key={key}>
										{key}
									</th>
								))} */}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 distribution">
                {infoTable.map((item, index) => (
                  <td className="px-3 py-2" key={index}>
                    {(
                      (parseInt(item.CANTIDAD) / totalOwnerValue) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <PieChartComponent infoTable={infoTable} />
        </div>
      </div>
    </div>
  );
}
function CashProducts({ infoTable, typeInfo }) {
  if (!infoTable || infoTable.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const columns = ["Año", "Resultado Anual", "Resultado Acumulado", "Unidad"];

  return (
    <div className="col">
      <div className="row align-items-start ">
        <div className="col p-3 m-2 box-postulant">
          <h5>Productos del ciclo del proyecto</h5>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {columns.map((column) => (
                  <th scope="col" className="px-3 py-2" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {infoTable.map((row, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="px-3 py-2">{row.año}</td>
                  <td className="px-3 py-2">{row.resultado_anual}</td>
                  <td className="px-3 py-2">{row.resultado_acumulado}</td>
                  <td className="px-3 py-2">COP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function IndicatorsProducts({ infoTable, typeInfo }) {
  if (!infoTable || infoTable.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const columns = ["Concepto", "Cantidad", "Unidad"];

  return (
    <div className="col p-3 m-2 box-postulant">
      <h5>Indicadores Financieros</h5>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th scope="col" className="px-3 py-2" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {infoTable.map((row, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <td className="px-3 py-2">{row.CONCEPTO}</td>
              <td className="px-3 py-2">{row.CANTIDAD}</td>
              <td className="px-3 py-2">COP</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function RevenuesProducts({ infoTable, typeInfo }) {
  if (!infoTable || infoTable.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const columns = ["Concepto", "Cantidad", "Unidad"];

  return (
    <div className=" col p-3 m-2 box-postulant">
      <h5>Ingresos por productos</h5>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th scope="col" className="px-3 py-2" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {infoTable.map((row, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <td className="px-3 py-2">{row.CONCEPTO}</td>
              <td className="px-3 py-2">{row.CANTIDAD}</td>
              <td className="px-3 py-2">COP</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const PieChartComponent = ({ infoTable }) => {
  const [chartData, setChartData] = useState([]);
  const totalOwnerValue = infoTable.reduce(
    (sum, item) => sum + parseInt(item.CANTIDAD),
    0
  );

  useEffect(() => {
    if (infoTable) {
      const newChartData = infoTable.map((item) => ({
        name: item.CONCEPTO,
        value: +((parseInt(item.CANTIDAD) / totalOwnerValue) * 100).toFixed(1),
      }));
      setChartData(newChartData);
    }
  }, [infoTable]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF1942",
    "#00FF99",
    "#FF6600",
    "#8A2BE2",
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            fill="#8884d8"
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" align="left" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
