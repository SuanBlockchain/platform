import React, { useState, useEffect } from "react";
import { API, Auth, graphqlOperation } from "aws-amplify";
import s from "../css/ProjectSettings.module.css";
import ProjectSettingsCard from "./SettingCards/ProjectSettingsCard";
import TokenSettingsCard from "./SettingCards/TokenSettingsCard";
import CashFlowSettings from "./SettingCards/CashFlowSettings";
import GenericInputTable from "./SettingCards/GenericInputTable";
import FinancialIndicators from "./SettingCards/FinancialIndicators";
import DescriptionValidator from "./SettingCards/DescriptionValidator";
import { useProjectData } from "context/ProjectDataContext";
import { notify } from "utilities/notify";
import { fetchProjectDataByProjectID } from "../api";
import { createProductFeature, updateProductFeature } from "graphql/mutations";
import useProjectItems from "hooks/useProjectItems";
import TokenDistributionInputTable from "./SettingCards/TokenDistributionInputTable";

export default function ProjectSettings({ visible, campaign }) {
  const [activeSection, setActiveSection] = useState("technical");
  const [validatorSubRole, setValidatorSubRole] = useState("");
  const [finInfoPfID, setFinInfoPfID] = useState(null);
  const [tecInfoPfID, setTecInfoPfID] = useState(null);
  const { projectData, handleUpdateContextProjectData, fetchProjectData } =
    useProjectData();
  const { projectItems } = useProjectItems();

  useEffect(() => {
    const financialInfoPfID =
      projectData.projectFeatures.filter((item) => {
        return item.featureID === "GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS";
      })[0]?.id || null;
    setFinInfoPfID(financialInfoPfID);

    const technicalInfoPfID =
      projectData.projectFeatures.filter((item) => {
        return item.featureID === "GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS";
      })[0]?.id || null;
    setTecInfoPfID(technicalInfoPfID);

    Auth.currentAuthenticatedUser()
      .then((data) => {
        if (data.attributes["custom:subrole"]) {
          setValidatorSubRole(data.attributes["custom:subrole"]);
        } else {
          setValidatorSubRole(undefined);
        }
      })
      .catch((error) => setValidatorSubRole(undefined));
  }, []);
  const checkStakeHolders = (item) => {
    const neededSH = ['BIOC', 'PROPIETARIO', 'BUFFER', 'INVERSIONISTA'];
    const itemConcepts = item.map(i => i.CONCEPTO);
    const allPresent = neededSH.every(sh => itemConcepts.includes(sh));
    return allPresent;
};
  const handleSetValidatorDataComplete = async (item) => {
    const updatedProjectData = await fetchProjectDataByProjectID(
      projectData.projectInfo.id
    );
    const neededStakeHolders = checkStakeHolders(updatedProjectData.projectFinancialInfo.tokenAmountDistribution.tokenAmountDistribution)
    if (item === "technicalInfo") {
      if (!updatedProjectData.isTechnicalComplete) {
        let toFixMessage = "";

        if (!updatedProjectData.technicalProgress.verifierDescription) {
          toFixMessage = "No se ha agregado una descripción del proyecto";
        }

        else if(!updatedProjectData.technicalProgress.revenuesByProduct) {
          toFixMessage = "Aún no se han definido los ingresos por producto";
        }

        else if(!updatedProjectData.technicalProgress.productsOfCycleProject) {
          toFixMessage =
            "Aún no se han definido los productos del ciclo del proyecto";
        }

        else if(!updatedProjectData.technicalProgress.financialIndicators) {
          toFixMessage =
            "Aún no se han definido los indicadores financieros del proyecto";
        }
        notify({
          msg: `Información técnica incompleta. ${toFixMessage}`,
          type: "error",
        });
        return;
      }
      // handleUpdateContextProjectData({ isTechnicalFreeze: true });

      if (tecInfoPfID) {
        const updatedProductFeature = {
          id: tecInfoPfID,
          value: "true",
        };

        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          productID: projectData.projectInfo.id,
          featureID: "GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS",
          value: true,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        );
        setTecInfoPfID(response.data.createProductFeature.id);
      }

      await fetchProjectData();

      notify({
        msg: "Se ha oficializado la información técnica.",
        type: "success",
      });
    }
    if (item === "financialInfo") {
      if (!neededStakeHolders) {
        notify({
          msg: "Es obligatorio distribuir tokens a los siguientes stake holders: BIOC, PROPIETARIO, BUFFER e INVERSIONISTA.",
          type: "error",
        });
        return;
      }
      if (!updatedProjectData.isFinancialComplete) {
        let toFixMessage = "";
        if (!updatedProjectData.financialProgress.tokenHistoricalData) {
          toFixMessage =
            "No han sido definido los valores historicos del token";
        }
        if (!updatedProjectData.financialProgress.tokenCurrency) {
          toFixMessage =
            "No ha sido definida la divisa de comercialización del token";
        }
        if (!updatedProjectData.financialProgress.totalTokens) {
          toFixMessage = "El volumen total de tokens debe ser diferente de 0";
        }
        if (!updatedProjectData.financialProgress.tokenAmountDistribution) {
          toFixMessage = "Aún no se ha definido la distribución de tokens";
        }
        if (!updatedProjectData.financialProgress.cashFlowResume) {
          toFixMessage = "Aún no se ha definido el flujo de caja del proyecto";
        }
        if (!updatedProjectData.financialProgress.financialIndicators) {
          toFixMessage =
            "Aún no se han definido los indicadores financieros del token";
        }
        if (!updatedProjectData.financialProgress.allTokensDistributed) {
          toFixMessage =
            "La cantidad de tokens distribuidos no coincide con el volumen total de tokens";
        }
        notify({
          msg: `Información financiera incompleta. ${toFixMessage}`,
          type: "error",
        });
        return;
      }
      handleUpdateContextProjectData({ isFinancialFreeze: true });

      if (finInfoPfID) {
        const updatedProductFeature = {
          id: finInfoPfID,
          value: "true",
        };

        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          productID: projectData.projectInfo.id,
          featureID: "GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS",
          value: true,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        );

        setFinInfoPfID(response.data.createProductFeature.id);
      }

      await fetchProjectData();

      notify({
        msg: "Se ha oficializado la información financiera.",
        type: "success",
      });
    }
  };
  const checkIfIsEditable = (type) => {
    switch (type) {
      case "technical":
        if (projectData.isTechnicalFreeze) {
          return true;
        } else {
          if (
            validatorSubRole === "fullaccessvalidator" ||
            validatorSubRole === "technical"
          )
            return false;
        }
        break;
      case "financial":
        if (projectData.isFinancialFreeze) {
          return true;
        } else {
          if (
            validatorSubRole === "fullaccessvalidator" ||
            validatorSubRole === "financial"
          )
            return false;
        }
        break;
      default:
        return true;
    }
  };
  return (
    <>
      {visible && (
        <div className="row row-cols-1  g-4">
          <div className="col">
            <ProjectSettingsCard />
          </div>
          <div className={s.selectSettingTypeContainer}>
            <button
              className={`${s.selectSettingType} ${
                activeSection === "technical" ? s.selectSettingTypeActive : ""
              }`}
              onClick={() => setActiveSection("technical")}
            >
              Configuración técnica
            </button>
            <button
              className={`${s.selectSettingType} ${
                activeSection === "financial" ? s.selectSettingTypeActive : ""
              }`}
              onClick={() => setActiveSection("financial")}
            >
              Configuración financiera
            </button>
          </div>
          {activeSection === "technical" && (
            <>
              <div className="col">
                <DescriptionValidator
                  canEdit={checkIfIsEditable("technical")}
                  /* (validatorSubRole === undefined
                  ? false
                  : activeSection !== validatorSubRole) ||
                !projectData.isTechnicalFreeze */
                />
              </div>
              <div className="col">
                <GenericInputTable
                  title={"Ingresos por producto"}
                  fID={"GLOBAL_INGRESOS_POR_PRODUCTO"}
                  financialInfoType={"revenuesByProduct"}
                  canEdit={checkIfIsEditable("technical")}
                  conceptOptions={projectItems["Ingresos por producto"]}
                />
              </div>
              <div className="col">
                <GenericInputTable
                  title={"Productos del ciclo del proyecto"}
                  fID={"GLOBAL_PRODUCTOS_DEL_CICLO_DE_PROYECTO"}
                  financialInfoType={"productsOfCycleProject"}
                  canEdit={checkIfIsEditable("technical")}
                  conceptOptions={
                    projectItems["Productos del ciclo del proyecto"]
                  }
                />
              </div>
              <div className="col">
                <GenericInputTable
                  title={"Indicadores financieros (Proyecto)"}
                  fID={"GLOBAL_INDICADORES_FINANCIEROS"}
                  financialInfoType={"financialIndicators"}
                  canEdit={checkIfIsEditable("technical")}
                  conceptOptions={
                    projectItems["Indicadores financieros (Proyecto)"]
                  }
                />
              </div>
              <div className="d-flex justify-content-center mb-2">
                <button
                  className={`${
                    projectData.isTechnicalFreeze
                      ? "bg-blue-400 p-2 text-white  rounded-md"
                      : "bg-blue-600 p-2 text-white rounded-md"
                  } `}
                  disabled={projectData.isTechnicalFreeze || campaign?.available} 
                  onClick={() =>
                    handleSetValidatorDataComplete("technicalInfo")
                  }
                >
                  Oficializar información técnica
                </button>
              </div>
            </>
          )}
          {activeSection === "financial" && (
            <>
              <div className="col">
                <TokenSettingsCard
                  canEdit={checkIfIsEditable("financial")}
                  /* (validatorSubRole === undefined
                  ? false
                  : activeSection !== validatorSubRole) ||
                projectData.isFinancialFreeze */
                />
              </div>

              <div>
                <TokenDistributionInputTable
                  title={"Distribución volumen de tokens"}
                  fID={"GLOBAL_TOKEN_AMOUNT_DISTRIBUTION"}
                  financialInfoType={"tokenAmountDistribution"}
                  canEdit={checkIfIsEditable("financial")}
                  conceptOptions={
                    projectItems["Distribución volumen de tokens"]
                  }
                />
              </div>
              <div className="col">
                <CashFlowSettings canEdit={checkIfIsEditable("financial")} />
              </div>
              <div className="col">
                <GenericInputTable
                  title={"Indicadores financieros (Token)"}
                  fID={"GLOBAL_INDICADORES_FINANCIEROS_TOKEN"}
                  financialInfoType={"financialIndicatorsToken"}
                  canEdit={checkIfIsEditable("financial")}
                  conceptOptions={
                    projectItems["Indicadores financieros (Token)"]
                  }
                />
              </div>
              <div className="d-flex justify-content-center mb-2">
                <button
                  className={`${
                    projectData.isFinancialFreeze
                      ? "bg-blue-400 p-2 text-white  rounded-md"
                      : "bg-blue-600 p-2 text-white rounded-md"
                  } `}
                  disabled={projectData.isTechnicalFreeze || campaign?.available}
                  onClick={() =>
                    handleSetValidatorDataComplete("financialInfo")
                  }
                >
                  Oficializar información financiera
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
