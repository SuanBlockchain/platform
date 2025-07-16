import React, { useEffect, useState, useCallback } from "react";
import { API, graphqlOperation } from "aws-amplify";
import TokenDistributionTable from "./TokenDistributionTable";
import Card from "../../../../common/Card";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import {
  createProductFeature,
  updateProductFeature,
} from "../../../../../graphql/mutations";
import { notify } from "../../../../../utilities/notify";
import useFetchPropertiesProject from "hooks/useFetchPropertiesProject";
import { getAreaFromPf } from "../../mappers";

export default function TokenDistributionInputTable(props) {
  const { className, title, fID, financialInfoType, canEdit, conceptOptions } =
    props;

  const { projectData, fetchProjectData } = useProjectData();
  const { properties } = useFetchPropertiesProject();
  const [revenuesByProduct, setRevenuesByProduct] = useState([]);
  const [pfID, setPfID] = useState(null);
  const [tokensAvailableDistribution, setTokensAvailableDistribution] =
    useState(0);

  const totalTokensPF = JSON.parse(
    projectData.projectFeatures.find(
      (item) => item.featureID === "GLOBAL_TOKEN_HISTORICAL_DATA"
    )?.value || "[]"
  );
  const totalTokens = totalTokensPF.reduce(
    (sum, item) => sum + parseInt(item.amount) + parseInt(item.correction),
    0
  );

  const distributedTokensPF = JSON.parse(
    projectData.projectFeatures.find(
      (item) => item.featureID === "GLOBAL_TOKEN_AMOUNT_DISTRIBUTION"
    )?.value || "[]"
  );

  const totalDistributedTokens = distributedTokensPF.reduce(
    (sum, item) => sum + parseInt(item.CANTIDAD),
    0
  );

  useEffect(() => {
    const currentDistributed = revenuesByProduct.reduce(
      (sum, item) => sum + (parseInt(item.TOKENS, 10) || 0),
      0
    );
    setTokensAvailableDistribution(totalTokens - currentDistributed);
  }, [revenuesByProduct, totalTokens]);

  useEffect(() => {
    if (projectData.projectFinancialInfo[financialInfoType]) {
      setPfID(
        projectData.projectFinancialInfo[financialInfoType][
          `${financialInfoType}ID`
        ] || null
      );
      const rawData =
        projectData.projectFinancialInfo[financialInfoType][
          financialInfoType
        ] || [];
      setRevenuesByProduct(
        rawData.map((item) => {
          const newItem = {
            STAKEHOLDER: item.CONCEPTO,
            TOKENS: item.CANTIDAD,
          };
          if (item.CONCEPTO === 'PROPIETARIO') {
            const savedDistribution = item.propertyDistribution;
            if (savedDistribution && savedDistribution.length > 0) {
              newItem.propertyDistribution = savedDistribution;
            } else {
              const totalArea = properties.reduce((sum, p) => sum + parseFloat(getAreaFromPf(p) || 0), 0);
              newItem.propertyDistribution = properties.map(p => {
                const area = parseFloat(getAreaFromPf(p) || 0);
                const percentage = totalArea > 0 ? ((area / totalArea) * 100).toFixed(2) : '0.00';
                return {
                  propertyId: p.id,
                  name: p.name,
                  percentage: percentage,
                  tokens: (parseFloat(percentage) / 100) * (parseFloat(item.CANTIDAD) || 0)
                };
              });
            }
          }
          return newItem;
        })
      );
    }
  }, [projectData, properties]);

  const handleChangeInputValue = async (e) => {
    const { name, value } = e.target;
    if (name.includes("input-")) {
      const [_, column, indexRow] = name.split("-");
      setRevenuesByProduct((prevState) =>
        prevState.map((item, index) => {
          if (index === parseInt(indexRow)) {
            const updatedItem = { ...item, [column]: value };
            if (column === 'STAKEHOLDER') {
              if (value === 'PROPIETARIO') {
                const totalArea = properties.reduce((sum, p) => sum + parseFloat(getAreaFromPf(p) || 0), 0);
                const tokensValue = parseFloat(item.TOKENS) || 0;
                updatedItem.propertyDistribution = properties.map(p => {
                    const area = parseFloat(getAreaFromPf(p) || 0);
                    const percentage = totalArea > 0 ? ((area / totalArea) * 100).toFixed(2) : '0.00';
                    return {
                        propertyId: p.id,
                        name: p.name,
                        percentage: percentage,
                        tokens: (parseFloat(percentage) / 100) * tokensValue
                    };
                });
              } else {
                delete updatedItem.propertyDistribution;
              }
            } else if (column === 'TOKENS' && item.STAKEHOLDER === 'PROPIETARIO' && updatedItem.propertyDistribution) {
                const newTokensValue = parseFloat(value) || 0;
                updatedItem.propertyDistribution = updatedItem.propertyDistribution.map(dist => ({
                    ...dist,
                    tokens: (parseFloat(dist.percentage) / 100) * newTokensValue
                }));
            }
            return updatedItem;
          }
          return item;
        })
      );
    }
  };

  const handleEditValue = async (indexToStartEditing) => {
    const isEditingSomeHistoryData = revenuesByProduct.some(
      (obj) => obj.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setRevenuesByProduct((prevState) =>
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
    const newPeriod = revenuesByProduct[indexToSave].CONCEPTO;
    if (
      projectData.projectFinancialInfo.revenuesByProduct.revenuesByProduct
        .length > 0
    ) {
      isAlreadyExistingPeriod =
        projectData.projectFinancialInfo.revenuesByProduct.revenuesByProduct.some(
          (hd, index) => hd.CONCEPTO === newPeriod && index !== indexToSave
        );
    }

    if (isAlreadyExistingPeriod) {
      notify({
        msg: "El periodo que intentas guardar ya esta definido",
        type: "error",
      });
      return;
    }
    let revenueByProductToUpload = revenuesByProduct.map((rbp) => {
      const { STAKEHOLDER, TOKENS } = rbp;
      return {
        CONCEPTO: STAKEHOLDER,
        CANTIDAD: TOKENS,
      };
    });
    if (
      revenuesByProduct[indexToSave].CONCEPTO &&
      revenuesByProduct[indexToSave].CANTIDAD
    ) {
      const updatedTotalDistributedTokensAmount = revenuesByProduct.reduce(
        (sum, item) => sum + parseInt(item.CANTIDAD),
        0
      );

      if (parseInt(totalTokens) < updatedTotalDistributedTokensAmount) {
        notify({
          msg: "La suma de los tokens distribuidos no concuerda con el volumen de tokens",
          type: "error",
        });
        return;
      }
      setRevenuesByProduct((prevState) =>
        prevState
          .map((item, index) =>
            index === indexToSave ? { ...item, editing: false } : item
          )
          .sort((a, b) => a.period - b.period)
      );
      if (pfID) {
        let tempProductFeature = {
          id: pfID,
          value: JSON.stringify(revenueByProductToUpload),
        };
        const response = await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempProductFeature })
        );

        if (!response.data.updateProductFeature) error = true;
      } else {
        let tempProductFeature = {
          value: JSON.stringify(revenueByProductToUpload),
          isToBlockChain: false,
          isOnMainCard: false,
          productID: projectData.projectInfo.id,
          featureID: fID,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, { input: tempProductFeature })
        );

        if (!response.data.createProductFeature) error = true;
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
    setRevenuesByProduct((prevState) => prevState.filter((_, index) => index !== indexToDelete));
  };

  const handleAddCashFlow = async () => {
    setRevenuesByProduct((prevState) => [
      ...prevState,
      {
        STAKEHOLDER: "",
        TOKENS: "0",
      },
    ]);
  };

  const handleSaveAll = async () => {
    let error = false;
    // Validar que no haya conceptos vacíos
    if (revenuesByProduct.some(row => !row.STAKEHOLDER || row.STAKEHOLDER === "")) {
      notify({
        msg: "No puedes guardar si algún concepto está vacío.",
        type: "error",
      });
      return false;
    }

    // Validar que no haya conceptos duplicados
    const concepts = revenuesByProduct.map(row => row.STAKEHOLDER).filter(Boolean);
    const hasDuplicateConcept = new Set(concepts).size !== concepts.length;
    if (hasDuplicateConcept) {
      notify({
        msg: "No puedes guardar stakeholders duplicados.",
        type: "error",
      });
      return false;
    }

    // Validar suma de tokens
    const updatedTotalDistributedTokensAmount = revenuesByProduct.reduce(
      (sum, item) => sum + parseInt(item.TOKENS),
      0
    );
    if (parseInt(totalTokens) < updatedTotalDistributedTokensAmount) {
      notify({
        msg: "La suma de los tokens distribuidos no concuerda con el volumen de tokens",
        type: "error",
      });
      return false;
    }
    // Guardar toda la tabla (crear o actualizar el productFeature)
    let revenueByProductToUpload = revenuesByProduct.map((rbp) => {
      const itemToUpload = {
        CONCEPTO: rbp.STAKEHOLDER,
        CANTIDAD: rbp.TOKENS,
      };
      if (rbp.STAKEHOLDER === 'PROPIETARIO') {
        itemToUpload.propertyDistribution = rbp.propertyDistribution || [];
      }
      return itemToUpload;
    });
    const existingFeature = projectData.projectFeatures.find(
      (item) => item.featureID === "GLOBAL_TOKEN_AMOUNT_DISTRIBUTION"
    );
    if (existingFeature) {
      let tempProductFeature = {
        id: existingFeature.id,
        value: JSON.stringify(revenueByProductToUpload),
      };
      const response = await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      );
      if (!response.data.updateProductFeature) error = true;
    } else {
      let tempProductFeature = {
        value: JSON.stringify(revenueByProductToUpload),
        isToBlockChain: false,
        isOnMainCard: false,
        productID: projectData.projectInfo.id,
        featureID: "GLOBAL_TOKEN_AMOUNT_DISTRIBUTION",
      };
      const response = await API.graphql(
        graphqlOperation(createProductFeature, { input: tempProductFeature })
      );
      if (!response.data.createProductFeature) error = true;
    }
    await fetchProjectData();
    if (!error) {
      notify({
        msg: "Distribución de tokens guardada exitosamente",
        type: "success",
      });
      return true
    }
  };

  const handleOwnerDistributionChange = (rowIndex, newDistribution) => {
    setRevenuesByProduct(prevState =>
      prevState.map((row, index) => {
        if (index === rowIndex) {
          const totalOwnerTokens = parseFloat(row.TOKENS) || 0;
          const totalPercentage = newDistribution.reduce((sum, owner) => sum + (parseFloat(owner.percentage) || 0), 0);
          if (totalPercentage > 100) {
            notify({
              msg: "El porcentaje total de propietarios no puede exceder el 100%",
              type: "error",
            });
            return row; // No actualizar si excede
          }
          return { ...row, ownerDistribution: newDistribution };
        }
        return row;
      })
    );
  };

  const handlePropertyDistributionChange = useCallback((rowIndex, newDistribution) => {
    setRevenuesByProduct(prevState =>
      prevState.map((row, index) => {
        if (index === rowIndex) {
          return { ...row, propertyDistribution: newDistribution };
        }
        return row;
      })
    );
  }, []);

  return (
    <>
      <Card className={className}>
        <Card.Header title={title} sep={true} />
        <Card.Body>
          <p className="mb-3">{title}</p>
          <div>
            <p>
              Tokens disponibles para distribución:{" "}
              {parseFloat(tokensAvailableDistribution).toLocaleString("es-ES")}
            </p>
            <TokenDistributionTable
              canEdit={canEdit}
              conceptOptions={conceptOptions}
              columns={["STAKEHOLDER", "TOKENS"]}
              infoTable={revenuesByProduct}
              handleEditValue={handleEditValue}
              handleChangeInputValue={handleChangeInputValue}
              handleAddCashFlow={handleAddCashFlow}
              handleDeleteHistoricalData={handleDeleteHistoricalData}
              handleSaveAll={handleSaveAll}
              properties={properties}
              handlePropertyDistributionChange={handlePropertyDistributionChange}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
