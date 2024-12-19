import {
  parseSerializedKoboData,
  convertAWSDatetimeToDate,
  getElapsedTime,
  capitalizeWords,
  getActualPeriod,
  getElapsedDays,
} from "./utils";
import WebAppConfig from "components/common/_conf/WebAppConfig";

export const marketplaceURLMapper = {
  suan: {
    INTERNAL: "https://internal.d2h2yvb6fy5h0q.amplifyapp.com/",
    TEST: "https://test-marketplace.suan.global/",
    PROD: "https://marketplace.suan.global/",
  },
  cauca: {
    INTERNAL: "https://internal.d3g6351f8sugd6.amplifyapp.com/",
    TEST: "https://test-marketplace-cauca.suan.global/",
    PROD: "https://marketplace-cauca.suan.global/",
  },
};

export const mapGeoData = (validatorDocuments) => {
  const extensionesPermitidas = [".kml", ".kmz"];

  const archivosFiltrados = validatorDocuments.filter((archivo) => {
    const filePath = archivo.filePathS3;
    const extension = filePath.slice(filePath.lastIndexOf("."));

    return extensionesPermitidas.includes(extension);
  });

  return archivosFiltrados;
};

const validateFinatialInfoIsComplete = async () => {};

export const formatArea = (area) => {
  return parseFloat(area).toLocaleString("es-ES") + " m2";
};

const mapProjectVerifiers = async (data) => {
  // const verifiablePF = data.productFeatures.items.filter(
  //   (pf) => pf.feature.isVerifable === true
  // );
  // let projectVerifiers = [];
  // verifiablePF.forEach((pf) => {
  //   pf.verifications.items.forEach((vf) => {
  //     projectVerifiers.push(vf.userVerifierID);
  //   });
  // });

  console.log(data.userProducts);

  const projectVerifiers = data.userProducts.items
    .filter((up) => up.user?.role === "validator")
    .map((userProduct) => {
      return userProduct.user.id;
    });

  return projectVerifiers;
};

const mapProductFeatures = (productFeatures) => {
  return productFeatures.map((pf) => {
    return {
      id: pf.id,
      featureID: pf.featureID,
      value: pf.value,
    };
  });
};

const mapProjectVerifiersNames = (data) => {
  const projectVerifiersNames = data.userProducts.items
    .filter((up) => up.user?.role === "validator")
    .map((userProduct) => {
      return userProduct.user.name;
    });

  return projectVerifiersNames;
};

const mapVerificationsData = async (verifications) => {
  const verificationData = verifications.map(async (verification) => {
    return {
      id: verification.id,
      verifierID: verification.userVerifierID || "",
      verifierName: verification.userVerifier?.name || "",
      postulantName: verification.userVerified?.name || "",
      postulantID: verification.userVerifiedID || "",
      messages: await Promise.all(
        verification.verificationComments.items
          .sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          })
          .map(async (msg) => {
            return {
              ...msg,
              userName: await capitalizeWords(
                msg.isCommentByVerifier
                  ? verification.userVerifier?.name
                  : verification.userVerified?.name
              ),
              createdAt: await convertAWSDatetimeToDate(msg.createdAt),
              elapsedTime: await getElapsedTime(msg.createdAt),
            };
          })
      ),
    };
  });

  // Esperar a que todas las promesas se resuelvan y devolver la primera
  const resolvedVerificationData = await Promise.all(verificationData);

  return resolvedVerificationData[0];
};
const mapDocumentsDataFromProperty = async (data, ownersData) => {
  const PFNameMapper = {
    B_owner_certificado: "Certificado de tradición",
    C_plano_predio: "Plano del predio",
  };
  const verifiablePF = data.propertyFeatures.items.filter(
    (pf) => pf.feature.isVerifable === true
  );
  console.log(verifiablePF, "verifiablePF");
  const documentsPromises = verifiablePF.map((pf) =>
    pf.documents.items
      .filter((document) => document.status !== "validatorFile")
      .map(async (document) => {
        const ownerName =
          ownersData.find((owner) => owner.documentID === document.id)?.name ||
          null;
        return {
          id: document.id,
          pfID: pf.id,
          title: `${PFNameMapper[pf.feature.name]} ${
            ownerName ? `(${ownerName})` : ""
          }`,
          url: document.url,
          signed: document.signed,
          signedHash: document.signedHash,
          isUploadedToBlockChain: document.isUploadedToBlockChain,
          isApproved: document.isApproved,
          verification: await mapVerificationsData(pf.verifications.items),
          updatedAt: await convertAWSDatetimeToDate(pf.updatedAt),
          status: document.status,
        };
      })
  );
  console.log("documentsPromises", documentsPromises);
  const documents = await Promise.all(documentsPromises.flat());
  return documents;
};

const mapDocumentsData = async (data, ownersData) => {
  const PFNameMapper = {
    B_owner_certificado: "Certificado de tradición",
    C_plano_predio: "Plano del predio",
  };
  const verifiablePF = data.productFeatures.items.filter(
    (pf) => pf.feature.isVerifable === true
  );
  console.log(verifiablePF, "verifiablePF");
  const documentsPromises = verifiablePF.map((pf) =>
    pf.documents.items
      .filter((document) => document.status !== "validatorFile")
      .map(async (document) => {
        const ownerName =
          ownersData.find((owner) => owner.documentID === document.id)?.name ||
          null;
        return {
          id: document.id,
          pfID: pf.id,
          title: `${PFNameMapper[pf.feature.name]} ${
            ownerName ? `(${ownerName})` : ""
          }`,
          url: document.url,
          signed: document.signed,
          signedHash: document.signedHash,
          isUploadedToBlockChain: document.isUploadedToBlockChain,
          isApproved: document.isApproved,
          verification: await mapVerificationsData(pf.verifications.items),
          updatedAt: await convertAWSDatetimeToDate(pf.updatedAt),
          status: document.status,
        };
      })
  );
  console.log("documentsPromises", documentsPromises);
  const documents = await Promise.all(documentsPromises.flat());
  return documents;
};
const mapPropertyDocumentsData = async (data) => {
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

      // Ahora usamos Promise.all para manejar las promesas dentro del map
      const mappedDocs = await Promise.all(
        docsFiltered.map(async (document) => {
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
            verification: await mapVerificationsData(pf.verifications.items),
            updatedAt: convertAWSDatetimeToDate(pf.updatedAt),
            status: document.status,
          };
        })
      );

      // Agregamos los documentos mapeados al array final
      arrayDocs.push(...mappedDocs);
    }
  }
  console.log(arrayDocs, "arrayDocs 230");
  return arrayDocs;
};
const mapLocationData = async (location) => {
  if (!location) {
    return {
      lat: "",
      lng: "",
      alt: "",
      pres: "",
    };
  }

  const [lat, lng, alt, pres] = location.split(" ").map(parseFloat);

  return {
    lat: isNaN(lat) ? "" : lat,
    lng: isNaN(lng) ? "" : lng,
    alt: isNaN(alt) ? "" : alt,
    pres: isNaN(pres) ? "" : pres,
  };
};

const mapStatus = async (obj) => {
  const mapper = {
    draft: "En borrador",
    verified: "Verificado",
    on_verification: "En verificación",
    in_blockchain: "En blockchain",
    in_equilibrium: "En equilibrio",
    Prefactibilidad: "En Prefactibilidad",
    Factibilidad: "En Factibilidad",
    "Documento de diseño del proyecto": "En diseño de documento del proyecto",
    "Validación externa": "En validación externa",
    "Registro del proyecto": "Registrado",
  };

  //return mapper[obj] || false;
  return obj;
};

const mapCategory = async (obj) => {
  const mapper = {
    PROYECTO_PLANTACIONES: "PROYECTO_PLANTACIONES",
    "REDD+": "REDD+",
    MIXTO: "MIXTO",
  };

  return mapper[obj] || false;
};

const mapUseTypes = async (types) => {
  const mapper = {
    potreros: "Potreros",
    plantaciones_forestales1: "Plantaciones Forestales 1",
    plantaciones_forestales2: "Plantaciones Forestales 2",
    plantaciones_forestales3: "Plantaciones Forestales 3",
    frutales1: "Frutales 1",
    frutales2: "Frutales 2",
    otros: "Otros",
  };

  if (Array.isArray(types)) {
    const mappedData = types.map((type) => mapper[type]);
    return mappedData;
  }

  return false;
};

const mapTrueOrFalseAnswers = (answer) => {
  const mapper = {
    yes: "yes",
    no: "no",
  };

  return mapper[answer] || false;
};

const mapTemporalOrPermanent = (answer) => {
  const mapper = {
    temporal: "temporal",
    permanente: "permanente",
  };

  return mapper[answer] || false;
};

const mapProjectGeneralAspects = (data) => {
  let parsedData = "";
  if (data) {
    parsedData = parseSerializedKoboData(data);
  }

  return {
    postulant: {
      livesOnProperty: mapTrueOrFalseAnswers(parsedData?.G_habita_predio) || "",
      timeLivingOnProperty: parsedData?.G_habita_years || "",
      typeOfStay:
        mapTemporalOrPermanent(parsedData?.G_Temporal_permanente) || "",
    },
    households: parsedData?.G_viviendas_number || "",
    familiesNumber: parsedData?.G_familias || "",
    membersPerFamily: parsedData?.G_familias_miembros || "",
    roadsStatus: parsedData?.G_vias_state || "",
    municipalDistance: parsedData?.G_distancia_predio_municipal || "",
    conveyance: parsedData?.G_transport_mean || "",
    neighborhoodRoads:
      mapTrueOrFalseAnswers(parsedData?.G_caminos_existence) || "",
    collapseRisk: parsedData?.G_risks_erosion_derrumbe || "",
  };
};

const mapProjectEcosystems = (data) => {
  let parsedData = "";
  if (data) {
    parsedData = parseSerializedKoboData(data);
  }

  return {
    waterSprings: {
      exist: mapTrueOrFalseAnswers(parsedData?.F_nacimiento_agua) || "",
      quantity: parsedData?.F_nacimiento_agua_quantity || "",
    },
    concessions: {
      exist: mapTrueOrFalseAnswers(parsedData?.F_agua_concede) || "",
      entity: parsedData?.F_agua_concede_entity || "",
    },
    deforestationThreats: parsedData?.F_amenazas_defo_desc || "",
    conservationProjects: parsedData?.F_conservacion_desc || "",
    diversity: {
      fauna: parsedData?.F_especies_fauna || "",
      flora: parsedData?.F_especies_flora || "",
      mammals: parsedData?.F_especies_mamiferos || "",
      birds: parsedData?.F_especies_aves || "",
    },
  };
};

const mapProjectUses = (data) => {
  let parsedData = "";
  if (data) {
    parsedData = parseSerializedKoboData(data);
  }

  return {
    actualUse: {
      types: parsedData?.D_actual_use || [],
      potreros: {
        ha: parsedData?.D_area_potrero || "",
      },
      plantacionesForestales1: {
        especie: parsedData?.D_especie_plantaciones1 || "",
        ha: parsedData?.D_ha_plantaciones1 || "",
      },
      plantacionesForestales2: {
        especie: parsedData?.D_especie_plantaciones2 || "",
        ha: parsedData?.D_ha_plantaciones2 || "",
      },
      plantacionesForestales3: {
        especie: parsedData?.D_especie_plantaciones3 || "",
        ha: parsedData?.D_ha_plantaciones3 || "",
      },
      frutales1: {
        especie: parsedData?.D_especie_frutales1 || "",
        ha: parsedData?.D_ha_frutales1 || "",
      },
      frutales2: {
        especie: parsedData?.D_especie_frutales2 || "",
        ha: parsedData?.D_ha_frutales2 || "",
      },
      otros: {
        especie: parsedData?.D_especie_otros || "",
        ha: parsedData?.D_ha_otros || "",
      },
    },
    replaceUse: {
      types: parsedData?.D_replace_use || [],
      potreros: {
        newUse: parsedData?.D_replace_potrero_use || "",
        ha: parsedData?.D_replace_ha_potrero_use || "",
      },
      plantacionesForestales1: {
        newUse: parsedData?.D_replace_plantaciones1_use || "",
        ha: parsedData?.D_replace_ha_plantaciones1_use || "",
      },
      plantacionesForestales2: {
        newUse: parsedData?.D_replace_plantaciones2_use || "",
        ha: parsedData?.D_replace_ha_plantaciones2_use || "",
      },
      plantacionesForestales3: {
        newUse: parsedData?.D_replace_plantaciones3_use || "",
        ha: parsedData?.D_replace_ha_plantaciones3_use || "",
      },
      frutales1: {
        newUse: parsedData?.D_replace_frutales1_use || "",
        ha: parsedData?.D_replace_ha_frutales1_use || "",
      },
      frutales2: {
        newUse: parsedData?.D_replace_frutales2_use || "",
        ha: parsedData?.D_replace_ha_frutales2_use || "",
      },
      otros: {
        newUse: parsedData?.D_replace_otros_use || "",
        ha: parsedData?.D_replace_ha_otros_use || "",
      },
    },
  };
};

export const mapProjectData = async (data) => {
  console.log("dataa", data);
  const projectID = data.id;
  const projecIsActive = data.isActive;
  const verifierDescription =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VERIFIER_DESCRIPTION";
    })[0]?.value || "";
  const verifierDescriptionID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VERIFIER_DESCRIPTION";
    })[0]?.id || "";
  const tokenName =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_NAME";
    })[0]?.value || "";
  const tokenCurrency =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_CURRENCY";
    })[0]?.value || "";

  const totalTokensPF = JSON.parse(
    data.productFeatures.items.find(
      (item) => item.featureID === "GLOBAL_TOKEN_HISTORICAL_DATA"
    )?.value || "[]"
  );

  const totalTokens = totalTokensPF.reduce(
    (sum, item) => sum + parseInt(item.amount),
    0
  );

  const distributedTokensPF = JSON.parse(
    data.productFeatures.items.find(
      (item) => item.featureID === "GLOBAL_TOKEN_AMOUNT_DISTRIBUTION"
    )?.value || "[]"
  );

  const totalDistributedTokens = distributedTokensPF.reduce(
    (sum, item) => sum + parseInt(item.CANTIDAD),
    0
  );

  const pfTokenNameID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_NAME";
    })[0]?.id || "";
  const pfTokenCurrencyID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_CURRENCY";
    })[0]?.id || "";

  // const tokenPrice =
  //   data.productFeatures.items.filter((item) => {
  //     return item.featureID === "GLOBAL_TOKEN_PRICE";
  //   })[0]?.value || "0";
  const pfTokenPriceID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_PRICE";
    })[0]?.id || "";

  // const tokenAmount =
  //   data.productFeatures.items.filter((item) => {
  //     return item.featureID === "GLOBAL_AMOUNT_OF_TOKENS";
  //   })[0]?.value || "0";
  const pfTokenAmountID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_AMOUNT_OF_TOKENS";
    })[0]?.id || "";

  // Owners Data
  const pfOwnersDataID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "B_owners";
    })[0]?.id || "";

  const ownersData = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "B_owners";
    })[0]?.value || "[]"
  );

  // Cadsatral Data
  const pfCadastralDataID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_predio_ficha_catastral";
    })[0]?.id || "";

  const cadastralData = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_predio_ficha_catastral";
    })[0]?.value || "[]"
  );

  const pfTotalTokenAmountID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_TOTAL_AMOUNT";
    })[0]?.id || "";

  const pfTokenAmountDistributionID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_AMOUNT_DISTRIBUTION";
    })[0]?.id || "";

  const tokenAmountDistribution = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_AMOUNT_DISTRIBUTION";
    })[0]?.value || "[]"
  );

  const pfTokenHistoricalDataID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_HISTORICAL_DATA";
    })[0]?.id || "";

  const tokenHistoricalData = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_TOKEN_HISTORICAL_DATA";
    })[0]?.value || "[]"
  );

  console.log(tokenHistoricalData, "tokenHistoricalData");
  // const lastTokenHistoricalData =tokenHistoricalData.length > 0 && tokenHistoricalData[tokenHistoricalData.length - 1].periods || []

  const periods = tokenHistoricalData.map((tkhd) => {
    return {
      period: tkhd.period,
      date: new Date(tkhd.date),
      price: tkhd.price,
      amount: tkhd.amount,
    };
  });
  const actualPeriod = getActualPeriod(Date.now(), periods);
  // const totalTokenAmount = periods.reduce(
  //   (total, item) => total + item.amount,
  //   0
  // );

  const pfProjectValidatorDocumentsID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_PROJECT_VALIDATOR_FILES";
    })[0]?.id || "";

  const projectValidatorDocuments = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_PROJECT_VALIDATOR_FILES";
    })[0]?.value || "[]"
  );
  const productsOfCycleProject = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_PRODUCTOS_DEL_CICLO_DE_PROYECTO";
    })[0]?.value || "[]"
  );
  const revenuesByProduct = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_INGRESOS_POR_PRODUCTO";
    })[0]?.value || "[]"
  );
  const cashFlowResume = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_RESUMEN_FLUJO_DE_CAJA";
    })[0]?.value || "[]"
  );
  const financialIndicators = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_INDICADORES_FINANCIEROS";
    })[0]?.value || "[]"
  );
  const financialIndicatorsToken = JSON.parse(
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_INDICADORES_FINANCIEROS_TOKEN";
    })[0]?.value || "[]"
  );
  const productsOfCycleProjectID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_PRODUCTOS_DEL_CICLO_DE_PROYECTO";
    })[0]?.id || null;
  const revenuesByProductID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_INGRESOS_POR_PRODUCTO";
    })[0]?.id || null;
  const cashFlowResumeID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_RESUMEN_FLUJO_DE_CAJA";
    })[0]?.id || null;
  const financialIndicatorsID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_INDICADORES_FINANCIEROS";
    })[0]?.id || null;
  const financialIndicatorsTokenID =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_INDICADORES_FINANCIEROS_TOKEN";
    })[0]?.id || null;

  // A
  const postulantName =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_postulante_name";
    })[0]?.value || "";
  const postulantDocType =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_postulante_doctype";
    })[0]?.value || "";
  const postulantDocNumber =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_postulante_id";
    })[0]?.value || "";
  const postulantEmail =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_postulante_email";
    })[0]?.value || "";
  const vereda =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_vereda";
    })[0]?.value || "";
  const municipio =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_municipio";
    })[0]?.value || "";
  const matricula =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_matricula";
    })[0]?.value || "";
  const fichaCatrastal =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "A_ficha_catastral";
    })[0]?.value || "";

  // B
  const ownerName =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "B_owner";
    })[0]?.value || "";
  const ownerDocType =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "B_owner_doctype";
    })[0]?.value || "";
  const ownerDocNumber =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "B_owner_id";
    })[0]?.value || "";

  // C
  const location =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "C_ubicacion";
    })[0]?.value || "";

  // D
  const area =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "D_area";
    })[0]?.value || "0";
  const projectUses =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "D_actual_use";
    })[0]?.value || "";

  // E
  const restrictionsDesc =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "E_restriccion_desc";
    })[0]?.value || "";

  const restrictionsOther =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "E_resctriccion_other";
    })[0]?.value || "";

  // F
  const projectEcosystem =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "F_nacimiento_agua";
    })[0]?.value || "";

  // G
  const propertyGeneralAspects =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "G_habita_predio";
    })[0]?.value || "";

  // H
  const technicalAssistance =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "H_asistance_desc";
    })[0]?.value || "";

  const strategicAllies =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "H_aliados_estrategicos_desc";
    })[0]?.value || "";

  const communityGroups =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "H_grupo_comunitario_desc";
    })[0]?.value || "";

  const postulantID =
    data.userProducts.items.filter((up) => up.user?.role === "constructor")[0]
      ?.user.id || "";

  // ETADO DE INFORMACIÓN TECNICA Y FINANCIERA
  let isTechnicalComplete = false;
  if (
    verifierDescription !== "" &&
    revenuesByProduct.length > 0 &&
    productsOfCycleProject.length > 0 &&
    financialIndicators.length > 0
  ) {
    isTechnicalComplete = true;
  }

  let isFinancialComplete = false;
  if (
    tokenHistoricalData.length > 0 &&
    tokenCurrency !== "" &&
    totalTokens !== 0 &&
    Object.keys(tokenAmountDistribution).length > 0 &&
    Object.keys(cashFlowResume).length > 0 &&
    financialIndicatorsToken.length > 0 &&
    totalTokens - totalDistributedTokens === 0
  ) {
    isFinancialComplete = true;
  }

  const technicalProgress = {
    verifierDescription: verifierDescription !== "",
    revenuesByProduct: revenuesByProduct.length > 0,
    productsOfCycleProject: productsOfCycleProject.length > 0,
    financialIndicators: financialIndicators.length > 0,
  };

  const financialProgress = {
    tokenHistoricalData: tokenHistoricalData.length > 0,
    tokenCurrency: tokenCurrency !== "",
    totalTokens: totalTokens !== 0,
    tokenAmountDistribution: Object.keys(tokenAmountDistribution).length > 0,
    cashFlowResume: Object.keys(cashFlowResume).length > 0,
    financialIndicators: financialIndicatorsToken.length > 0,
    allTokensDistributed: totalTokens - totalDistributedTokens === 0,
  };

  const isTechnicalFreeze =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS";
    })[0]?.value === "true" || false;

  const isFinancialFreeze =
    data.productFeatures.items.filter((item) => {
      return item.featureID === "GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS";
    })[0]?.value === "true" || false;

  const getCadastralPropertiesNumber = () => {
    const cadastralNumbers = [];
    data.properties?.items.forEach((item) => {
      try {
        const parsedNumbers = JSON.parse(item.cadastralNumber);
        if (Array.isArray(parsedNumbers)) {
          cadastralNumbers.push(...parsedNumbers);
        }
      } catch (e) {}
    });
    console.log(cadastralNumbers, "cadastralNumberscadastralNumbers");
    return cadastralNumbers;
  };

  let totalArea = 0;

  data.properties.items
    .filter((prop) => prop.status === "APPROVED")
    .forEach((item) => {
      if (item.propertyFeatures && item.propertyFeatures.items) {
        item.propertyFeatures.items.forEach((feature) => {
          // Verificamos si el featureID es "D_area"
          if (feature.featureID === "D_area") {
            // Sumamos el área (convertida a número)
            const area = parseFloat(feature.value);
            if (!isNaN(area)) {
              totalArea += area;
            }
          }
        });
      }
    });
  console.log("data.properties.items", data.properties.items);
  console.log("totalArea", totalArea);

  return {
    projectInfo: {
      id: projectID,
      status: await mapStatus(data.status),
      isActive: projecIsActive,
      title: data.name,
      description: data.description,
      category: data.categoryID,
      marketplaceID: data.marketplaceID,
      showOn: data.marketplace?.id || null,
      area: totalArea,
      token: {
        pfIDs: {
          pfTokenNameID: pfTokenNameID,
          pfTokenPriceID: pfTokenPriceID,
          pfTokenAmountID: pfTokenAmountID,
          pfTokenHistoricalDataID: pfTokenHistoricalDataID,
          pfTokenAmountDistributionID: pfTokenAmountDistributionID,
          pfTotalTokenAmountID: pfTotalTokenAmountID,
          pfTokenCurrencyID: pfTokenCurrencyID,
        },
        historicalData: tokenHistoricalData,
        tokenHistoricalData: tokenHistoricalData,
        amountDistribution: tokenAmountDistribution,
        transactionsNumber: data.transactions.items.length,
        name: tokenName,
        currency: tokenCurrency,
        totalTokenAmount: totalTokens,
        actualPeriodTokenPrice: actualPeriod?.price || "",
        priceCurrency: "USD",
        actualPeriodTokenAmount: actualPeriod?.amount || "",
      },
      location: {
        vereda: vereda,
        municipio: municipio,
        matricula: matricula,
        fichaCatrastal: fichaCatrastal,
        coords: await mapLocationData(location),
      },
      verificationLimitDate: data.timeOnVerification,
      createdAt: convertAWSDatetimeToDate(data.createdAt),
      projectAge: getElapsedDays(data.createdAt),
    },
    projectPostulant: {
      id: postulantID,
      name: postulantName,
      docType: postulantDocType.toUpperCase(),
      docNumber: postulantDocNumber,
      email: postulantEmail,
    },
    projectOwner: {
      name: ownerName,
      docType: ownerDocType.toUpperCase(),
      docNumber: ownerDocNumber,
    },
    projectOwners: {
      pfID: pfOwnersDataID,
      owners: ownersData,
    },
    projectCadastralRecords: {
      pfID: pfCadastralDataID,
      cadastralRecords: cadastralData,
    },
    projectUses: mapProjectUses(projectUses),
    projectRestrictions: {
      desc: restrictionsDesc,
      other: restrictionsOther,
    },
    projectEcosystem: mapProjectEcosystems(projectEcosystem),
    projectGeneralAspects: mapProjectGeneralAspects(propertyGeneralAspects),
    projectRelations: {
      technicalAssistance: technicalAssistance,
      strategicAllies: strategicAllies,
      communityGroups: communityGroups,
    },
    projectPropertyFiles: await mapPropertyDocumentsData(data),
    projectFiles: await mapDocumentsData(data, ownersData),
    projectFilesValidators: {
      pfProjectValidatorDocumentsID: pfProjectValidatorDocumentsID,
      projectValidatorDocuments: projectValidatorDocuments,
    },
    projectVerifiers: await mapProjectVerifiers(data),
    projectVerifierNames: mapProjectVerifiersNames(data),
    projectGeoData: mapGeoData(projectValidatorDocuments),
    projectVerifierInfo: {
      verifierDescription: verifierDescription,
      verifierDescriptionID: verifierDescriptionID,
    },
    projectFinancialInfo: {
      revenuesByProduct: { revenuesByProductID, revenuesByProduct },
      productsOfCycleProject: {
        productsOfCycleProjectID,
        productsOfCycleProject,
      },
      cashFlowResume: { cashFlowResumeID, cashFlowResume },
      financialIndicators: { financialIndicatorsID, financialIndicators },
      financialIndicatorsToken: {
        financialIndicatorsTokenID,
        financialIndicatorsToken,
      },
      tokenAmountDistribution: {
        tokenAmountDistributionID: pfTokenAmountDistributionID,
        tokenAmountDistribution,
      },
    },
    projectProperties: {
      cadastralDataProperties: getCadastralPropertiesNumber(),
    },
    projectFeatures: await mapProductFeatures(data.productFeatures.items),
    isTechnicalComplete: isTechnicalComplete,
    financialProgress: financialProgress,
    technicalProgress: technicalProgress,
    isFinancialComplete: isFinancialComplete,
    isTechnicalFreeze: isTechnicalFreeze,
    isFinancialFreeze: isFinancialFreeze,
  };
};

export const mapPropertyData = async (data) => {
  const projectUses =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "D_actual_use";
    })[0]?.value || "";

  const areaPfId =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "D_area";
    })[0]?.id || "";

  const area =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "D_area";
    })[0]?.value || 0;

  // Owners Data
  const pfOwnersDataID =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "B_owners";
    })[0]?.id || "";

  const ownersData = JSON.parse(
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "B_owners";
    })[0]?.value || "[]"
  );

  // E
  const restrictionsDesc =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "E_restriccion_desc";
    })[0]?.value || "";

  const restrictionsOther =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "E_resctriccion_other";
    })[0]?.value || "";

  // F
  const projectEcosystem =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "F_nacimiento_agua";
    })[0]?.value || "";

  // G
  const propertyGeneralAspects =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "G_habita_predio";
    })[0]?.value || "";

  // H
  const technicalAssistance =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "H_asistance_desc";
    })[0]?.value || "";

  const strategicAllies =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "H_aliados_estrategicos_desc";
    })[0]?.value || "";

  const communityGroups =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "H_grupo_comunitario_desc";
    })[0]?.value || "";

  // Cadsatral Data
  const pfCadastralDataID =
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "A_predio_ficha_catastral";
    })[0]?.id || "";

  const cadastralData = JSON.parse(
    data.propertyFeatures.items.filter((item) => {
      return item.featureID === "A_predio_ficha_catastral";
    })[0]?.value || "[]"
  );

  const cadastralNumbers = (
    cadastralData.map((cadObj) => cadObj.cadastralNumber) || []
  ).join(", ");

  const projectVerifiers = data.product.userProducts?.items
    .filter((up) => up.user?.role === "validator")
    .map((userProduct) => {
      return userProduct.user.id;
    });

  console.log("data", data);
  return {
    propertyInfo: {
      id: data.id,
      projectID: data.productID,
      campaignID: data.campaign.id,
      projectAge: getElapsedDays(data.createdAt),
      name: data.name,
      status: data.status,
    },
    propertyCampaign: {
      id: data.campaign.id,
      userId: data.campaign.userID,
    },
    projectPostulant: {
      id: data.userID,
    },
    projectVerifiers: projectVerifiers,
    projectFiles: await mapDocumentsDataFromProperty(data, ownersData),
    propertyUses: mapProjectUses(projectUses),
    projectRestrictions: {
      desc: restrictionsDesc,
      other: restrictionsOther,
    },
    projectEcosystem: mapProjectEcosystems(projectEcosystem),
    projectGeneralAspects: mapProjectGeneralAspects(propertyGeneralAspects),
    projectRelations: {
      technicalAssistance: technicalAssistance,
      strategicAllies: strategicAllies,
      communityGroups: communityGroups,
    },
    propertyFeatures: mapProductFeatures(data.propertyFeatures.items),
    projectCadastralRecords: {
      cadastralDataPfID: pfCadastralDataID,
      totalAreaPfID: areaPfId,
      cadastralRecords: cadastralData,
      cadastralNumbers: cadastralNumbers,
      totalArea: area,
      totalAreaFormatted: formatArea(area),
    },
  };
};
