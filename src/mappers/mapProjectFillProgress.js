import { useAuth } from "context/AuthContext";

const calcularPorcentajeTrue = (objeto) => {
  // Obtén las claves del objeto
  const claves = Object.keys(objeto);

  // Filtra las claves que tienen el valor true
  const clavesTrue = claves.filter((clave) => objeto[clave]);

  // Calcula el porcentaje
  const porcentaje = (clavesTrue.length / claves.length) * 100;

  return porcentaje;
};

const getProjectInfoStatus = (data) => {
  let tempStatus = true;

  /* const area =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "D_area";
    })[0]?.value || null;
  const vereda =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_vereda";
    })[0]?.value || null;
  const municipio =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_municipio";
    })[0]?.value || null; */
  // const planoPredio =
  //   data.productFeatures.items.filter((item) => {
  //     return item.featureID === "C_plano_predio";
  //   })[0]?.value || null;

  if (!data.name) tempStatus = false;
  if (!data.description) tempStatus = false;
  if (!data.categoryID) tempStatus = false;
  /* if (!area) tempStatus = false;
  if (!vereda) tempStatus = false;
  if (!municipio) tempStatus = false; */
  // if (!planoPredio) tempStatus = false;

  return tempStatus;
};

const getGeodataInfoStatus = (data) => {
  let tempStatus = true;

  /* const coordenadas =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "C_ubicacion";
    })[0]?.value || null;

  if (!coordenadas) tempStatus = false; */

  return tempStatus;
};

const getPredialInfoStatus = (data) => {
  let tempStatus = true;

  /* const predialData = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_predio_ficha_catastral";
    })[0]?.value || "[]"
  );

  if (Object.keys(predialData).length === 0) tempStatus = false;
 */
  return tempStatus;

}

const getOwnersInfoStatus = (data) => {
  let tempStatus = true;

  const ownersData = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "B_owners";
    })[0]?.value || "[]"
  );

  if (Object.keys(ownersData).length === 0) tempStatus = false;

  return tempStatus;
};

const getActualUseInfoStatus = (data) => {
  let tempStatus = true;

  const projectUses =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "D_actual_use";
    })[0]?.value || null;

  if (!projectUses) tempStatus = false;

  return tempStatus;
};

const getLimitationsInfoStatus = (data) => {
  let tempStatus = true;

  const restrictionsDesc =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "E_restriccion_desc";
    })[0]?.value || null;

  const restrictionsOther =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "E_resctriccion_other";
    })[0]?.value || null;

  if (!restrictionsDesc) tempStatus = false;
  if (!restrictionsOther) tempStatus = false;

  return tempStatus;
};

const getEcosystemInfoStatus = (data) => {
  let tempStatus = true;

  const projectEcosystem =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "F_nacimiento_agua";
    })[0]?.value || null;

  if (!projectEcosystem) tempStatus = false;

  return tempStatus;
};

const getGeneralInfoStatus = (data) => {
  let tempStatus = true;

  const propertyGeneralAspects =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "G_habita_predio";
    })[0]?.value || null;

  if (!propertyGeneralAspects) tempStatus = false;

  return tempStatus;
};

const getRelationsInfoStatus = (data) => {
  let tempStatus = true;

  const technicalAssistance =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "H_asistance_desc";
    })[0]?.value || null;

  const strategicAllies =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "H_aliados_estrategicos_desc";
    })[0]?.value || null;

  const communityGroups =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "H_grupo_comunitario_desc";
    })[0]?.value || null;

  if (!technicalAssistance) tempStatus = false;
  if (!strategicAllies) tempStatus = false;
  if (!communityGroups) tempStatus = false;

  return tempStatus;
};

const getFinancialInfoStatus = (data) => {
  let tempStatus = true;

  const financialConditions =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS";
    })[0]?.value || null;

  if (financialConditions !== "true") tempStatus = false;

  return tempStatus;
};

const getTechnicalInfoStatus = (data) => {
  let tempStatus = true;

  const technicalConditions =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS";
    })[0]?.value || null;

  if (technicalConditions !== "true") tempStatus = false;

  return tempStatus;
};

const getOwnerAcceptsConditionsInfoStatus = (data) => {
  let tempStatus = true;

  const technicalConditions =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_OWNER_ACCEPTS_CONDITIONS";
    })[0]?.value || null;

  if (technicalConditions !== "true") tempStatus = false;

  return tempStatus;
};

const getValidationsCompleteInfoStatus = (data) => {
  let tempStatus = true;
  const PFNameMapper = {
    B_owner_certificado: "Certificado de tradición",
    C_plano_predio: "Plano del predio",
  };

  // Filtrar propiedades que tienen características verificables
  const filterPropertiesWithVerifables = data.properties.items
    .map((item) => {
      const verifiablePF = item.propertyFeatures.items.filter(
        (pf) => pf.feature.isVerifable === true
      );
      item.propertyFeatures.items = verifiablePF;
      return item;
    })
    .filter((item) => item.propertyFeatures.items.length > 0);

  let arrayDocs = [];

  // Usamos un ciclo for...of para manejar las promesas correctamente
  for (const item of filterPropertiesWithVerifables) {
    for (const pf of item.propertyFeatures.items) {
      let docsFiltered = pf.documents.items.filter(
        (document) => document.status !== "validatorFile"
      );

      const mappedDocs =
        docsFiltered.map((document) => {
          return {
            id: document.id,
            pfID: pf.id,
            title: `${PFNameMapper[pf.feature.name]}`,
            url: document.url,
            signed: document.signed,
            signedHash: document.signedHash,
            userID: item.userID,
            isUploadedToBlockChain: document.isUploadedToBlockChain,
            isApproved: document.isApproved,
            property: {
              name: item.name,
              id: item.id,
            },
            status: document.status,
          };
        })

      // Agregamos los documentos mapeados al array final
      arrayDocs.push(...mappedDocs);
    }
  }
  if(arrayDocs.find(item => !item.isApproved)){
    return false
  }else{
    console.log('todos validados')
    return true
  }
};

const getTokenGenesisStatus = (data) => {
  const tokenGenesisStatus = data.tokenGenesis;
  return tokenGenesisStatus;
};

export const mapProjectFillProgress = async (data, userRole) => {
  let sectionsStatus = {
    projectInfo: false,
    geodataInfo: false,
    predialInfo: false,
    //ownersInfo: false,
    financialInfo: false,
    technicalInfo: false,
    validationsComplete: false,
    ownerAcceptsConditions: false,
    tokenGenesis: false,
    projectOnMarketplace: data.isActive
    // actualUseInfo: false,
    // limitationsInfo: false,
    // ecosystemInfo: false,
    // generalInfo: false,
    // relationsInfo: false,
  };

  // Requerimientos postulante
  sectionsStatus.projectInfo = getProjectInfoStatus(data);
  sectionsStatus.geodataInfo = getGeodataInfoStatus(data);
  sectionsStatus.predialInfo = getPredialInfoStatus(data);
  // sectionsStatus.ownersInfo = getOwnersInfoStatus(data);
  sectionsStatus.ownerAcceptsConditions =
    getOwnerAcceptsConditionsInfoStatus(data);

  // Requerimientos equipo SUAN
  sectionsStatus.financialInfo = getFinancialInfoStatus(data);
  sectionsStatus.technicalInfo = getTechnicalInfoStatus(data);
  sectionsStatus.validationsComplete = getValidationsCompleteInfoStatus(data);

  // Token Genesis
  sectionsStatus.tokenGenesis = getTokenGenesisStatus(data);

  // sectionsStatus.actualUseInfo = getActualUseInfoStatus(data);
  // sectionsStatus.limitationsInfo = getLimitationsInfoStatus(data);
  // sectionsStatus.ecosystemInfo = getEcosystemInfoStatus(data);
  // sectionsStatus.generalInfo = getGeneralInfoStatus(data);
  // sectionsStatus.relationsInfo = getRelationsInfoStatus(data);

  return {
    sectionsStatus: sectionsStatus,
    progressValue: calcularPorcentajeTrue(sectionsStatus),
  };
};
