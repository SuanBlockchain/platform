import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import { useEffect, useState } from "react";
import useXLSXForm from "hooks/useXLSXForm";
import { API, Storage, graphqlOperation } from "aws-amplify";
import {
  createDocument,
  createProduct,
  createProductFeature,
  createUserProduct,
} from "graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "context/AuthContext";
import WebAppConfig from "components/common/_conf/WebAppConfig";
import DynamicForm from "components/DynamicForm/DynamicForm";
import { makeFolderOnS3 } from "utilities/makeFolderOnS3";

export default function NewProject() {
  const formURL = `${process.env.REACT_APP_URL_BUCKET}/public/XLSForms/FORMULARIO+POSTULACION+PREDIOS+-+SIMPLIFICADO.xlsx`;
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [formDataErrors, setFormDataErrors] = useState({});

  useEffect(() => {
    if (user && user.email !== "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        A_postulante_email: user.email,
      }));
    }
  }, [user]);

  const createProductFeatures = async (productID) => {
    const promises = [];

    const productFeaturesToCreate = [
      "A_postulante_doctype",
      // "A_matricula",
      // "B_owner_id", // Eliminar
      // "D_area",
      "A_postulante_id",
      "A_postulante_email",
      // "A_vereda",
      "C_ubicacion",
      // "A_ficha_catastral",
      // "B_owner_doctype", // Eliminar
      // "A_municipio",
      // "B_owner", // Eliminar
      "A_postulante_name",
      // "E_restriccion_desc",
      // "E_resctriccion_other",
      // "H_asistance_desc",
      // "H_aliados_estrategicos_desc",
      // "H_grupo_comunitario_desc",
    ];

    const productFeaturesGroupsToCreate1 = [
      //   "D_actual_use",
      //   "D_area_potrero",
      //   "D_especie_plantaciones1",
      //   "D_ha_plantaciones1",
      //   "D_especie_plantaciones2",
      //   "D_ha_plantaciones2",
      //   "D_especie_plantaciones3",
      //   "D_ha_plantaciones3",
      //   "D_especie_frutales1",
      //   "D_ha_frutales1",
      //   "D_especie_frutales2",
      //   "D_ha_frutales2",
      //   "D_especie_otros",
      //   "D_ha_otros",
      //   "D_replace_use",
      //   "D_replace_potrero_use",
      //   "D_replace_ha_potrero_use",
      //   "D_replace_plantaciones1_use",
      //   "D_replace_ha_plantaciones1_use",
      //   "D_replace_plantaciones2_use",
      //   "D_replace_ha_plantaciones2_use",
      //   "D_replace_plantaciones3_use",
      //   "D_replace_ha_plantaciones3_use",
      //   "D_replace_frutales1_use",
      //   "D_replace_ha_frutales1_use",
      //   "D_replace_frutales2_use",
      //   "D_replace_ha_frutales2_use",
      //   "D_replace_otros_use",
      //   "D_replace_ha_otros_use",
    ]; // storage on D_actual_use
    const productFeaturesGroupsToCreate2 = [
      //   "G_habita_predio",
      //   "G_Temporal_permanente",
      //   "G_habita_years",
      //   "G_viviendas_number",
      //   "G_familias",
      //   "G_familias_miembros",
      //   "G_vias_state",
      //   "G_distancia_predio_municipal",
      //   "G_transport_mean",
      //   "G_caminos_existence",
      //   "G_risks_erosion_derrumbe",
    ]; // storage on G_habita_predio
    const productFeaturesGroupsToCreate3 = [
      //   "F_nacimiento_agua",
      //   "F_nacimiento_agua_quantity",
      //   "F_agua_concede",
      //   "F_agua_concede_entity",
      //   "F_amenazas_defo_desc",
      //   "F_conservacion_desc",
      //   "F_especies_fauna",
      //   "F_especies_mamiferos",
      //   "F_especies_aves",
      //   "F_especies_flora",
    ]; // storage on F_nacimiento_agua
    const productFeaturesWithFilesToCreate = [
      // "B_owner_certificado",
      "C_plano_predio",
    ];

    // Validadores por defecto
    //let tempUserProduct;
    // Moxie
    /* tempUserProduct = {
      productID: productID,
      userID: "c48814e8-1091-70ff-212b-58b68b42687f",
    };
    promises.push(
      API.graphql(
        graphqlOperation(createUserProduct, { input: tempUserProduct })
      )
    ); */

    /*
    // Sebastian Azcona
    tempUserProduct = {
      productID: productID,
      userID: "cf7e52c6-5f1a-482f-b7a5-0ec8a4bac38c",
    };
    promises.push(
      API.graphql(
        graphqlOperation(createUserProduct, { input: tempUserProduct })
      )
    );
    // Carlos Soto
    tempUserProduct = {
      productID: productID,
      userID: "7c77daea-73f5-4653-8bdd-2769ce60f037",
    };
    promises.push(
      API.graphql(
        graphqlOperation(createUserProduct, { input: tempUserProduct })
      )
    ); */

    // Creación de pf Token Name GLOBAL_TOKEN_NAME
    const newProductFeatureTokenName = {
      featureID: "GLOBAL_TOKEN_NAME",
      productID: productID,
      value: `SUAN-${productID.split("-")[4].toUpperCase()}`,
    };
    console.log("newProductFeature:", newProductFeatureTokenName);
    promises.push(
      API.graphql(
        graphqlOperation(createProductFeature, {
          input: newProductFeatureTokenName,
        })
      )
    );

    // Creación de pf Token Name GLOBAL_PROJECT_VALIDATOR_FILES
    const newProductFeatureGlobalProjectValidatorFiles = {
      featureID: "GLOBAL_PROJECT_VALIDATOR_FILES",
      productID: productID,
      value: "",
    };
    console.log(
      "newProductFeature:",
      newProductFeatureGlobalProjectValidatorFiles
    );
    promises.push(
      API.graphql(
        graphqlOperation(createProductFeature, {
          input: newProductFeatureGlobalProjectValidatorFiles,
        })
      )
    );

    // Creación de GLOBAL_OWNER_ACCEPTS_CONDITIONS
    const newProductFeatureGlobalOwnerAcceptsConditions = {
      featureID: "GLOBAL_OWNER_ACCEPTS_CONDITIONS",
      productID: productID,
      value: "false",
    };
    console.log(
      "newProductFeature:",
      newProductFeatureGlobalOwnerAcceptsConditions
    );
    promises.push(
      API.graphql(
        graphqlOperation(createProductFeature, {
          input: newProductFeatureGlobalOwnerAcceptsConditions,
        })
      )
    );

    // Creación de GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS
    const newProductFeatureGlobalValidatorSetFinantialConditions = {
      featureID: "GLOBAL_VALIDATOR_SET_FINANCIAL_CONDITIONS",
      productID: productID,
      value: "false",
    };
    console.log(
      "newProductFeature:",
      newProductFeatureGlobalValidatorSetFinantialConditions
    );
    promises.push(
      API.graphql(
        graphqlOperation(createProductFeature, {
          input: newProductFeatureGlobalValidatorSetFinantialConditions,
        })
      )
    );

    // Creación de GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS
    const newProductFeatureGlobalValidatorSetThecnicalConditions = {
      featureID: "GLOBAL_VALIDATOR_SET_TECHNICAL_CONDITIONS",
      productID: productID,
      value: "false",
    };
    console.log(
      "newProductFeature:",
      newProductFeatureGlobalValidatorSetThecnicalConditions
    );
    promises.push(
      API.graphql(
        graphqlOperation(createProductFeature, {
          input: newProductFeatureGlobalValidatorSetThecnicalConditions,
        })
      )
    );

    // Creación de pf Owners
    // const owners = JSON.stringify([{
    //   name: formData["B_owner"].toUpperCase(),
    //   docType: formData["B_owner_doctype"],
    //   docNumber: formData["B_owner_id"],
    // }])
    // const newProductFeatureOwners = {
    //   featureID: "B_owners",
    //   productID: productID,
    //   value: owners,
    // };
    // console.log("newProductFeature:", newProductFeatureOwners);
    // await API.graphql(
    //   graphqlOperation(createProductFeature, {
    //     input: newProductFeatureOwners,
    //   })
    // );

    // Creación de pf normales
    for (let i = 0; i < productFeaturesToCreate.length; i++) {
      const feature = productFeaturesToCreate[i];
      let value;

      if (feature === "C_ubicacion") {
        value =
          Array.isArray(formData[feature]) && formData[feature].length > 0
            ? `${formData[feature][0]?.lat}, ${formData[feature][0]?.lng} 0 0`
            : "";
      } else {
        value = Array.isArray(formData[feature])
          ? formData[feature].join("|")
          : formData[feature];
      }
      if (value !== "" && value.length > 0) {
        const newProductFeature = {
          featureID: feature,
          productID: productID,
          value: value,
        };
        console.log("newProductFeature:", newProductFeature);
        promises.push(
          API.graphql(
            graphqlOperation(createProductFeature, {
              input: newProductFeature,
            })
          )
        );
      }
    }

    let newProductFeature;

    // Creación de pf con grupos 1
    let values = [];
    for (let i = 0; i < productFeaturesGroupsToCreate1.length; i++) {
      const feature = productFeaturesGroupsToCreate1[i];

      const valueSegment = Array.isArray(formData[feature])
        ? formData[feature].join("|")
        : formData[feature];
      const segment = `{${feature}=${valueSegment}}`;
      valueSegment !== "" && valueSegment.length > 0 && values.push(segment);
    }
    if (values.length > 0) {
      newProductFeature = {
        featureID: "D_actual_use",
        productID: productID,
        value: `[${values.join(", ")}]`,
      };
      console.log("newProductFeature:", newProductFeature);
      promises.push(
        API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        )
      );
    }

    // Creación de pf con grupos 2
    values = [];
    for (let i = 0; i < productFeaturesGroupsToCreate2.length; i++) {
      const feature = productFeaturesGroupsToCreate2[i];

      const valueSegment = Array.isArray(formData[feature])
        ? formData[feature].join("|")
        : formData[feature];
      const segment = `{${feature}=${valueSegment}}`;
      valueSegment !== "" && valueSegment.length > 0 && values.push(segment);
    }
    if (values.length > 0) {
      newProductFeature = {
        featureID: "G_habita_predio",
        productID: productID,
        value: `[${values.join(", ")}]`,
      };
      console.log("newProductFeature:", newProductFeature);
      promises.push(
        API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        )
      );
    }

    // Creación de pf con grupos 3
    values = [];
    for (let i = 0; i < productFeaturesGroupsToCreate3.length; i++) {
      const feature = productFeaturesGroupsToCreate3[i];

      const valueSegment = Array.isArray(formData[feature])
        ? formData[feature].join("|")
        : formData[feature];
      const segment = `{${feature}=${valueSegment}}`;
      valueSegment !== "" && valueSegment.length > 0 && values.push(segment);
    }
    if (values.length > 0) {
      newProductFeature = {
        featureID: "F_nacimiento_agua",
        productID: productID,
        value: `[${values.join(", ")}]`,
      };
      console.log("newProductFeature:", newProductFeature);
      promises.push(
        API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        )
      );
    }

    await Promise.all(promises);

    // Creación de pf con archivos
    for (let i = 0; i < productFeaturesWithFilesToCreate.length; i++) {
      const feature = productFeaturesWithFilesToCreate[i];
      const file = formData[feature];

      const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };

      const formatFileName = (fileName) => {
        const formattedFilename = fileName
          .toLowerCase()
          .trim()
          .replaceAll(" ", "_");
        const filenameWithoutAccents = removeAccents(formattedFilename);
        return encodeURIComponent(filenameWithoutAccents);
      };

      if (file !== undefined && file !== "") {
        const urlPath = `${productID}/${formatFileName(file.name)}`;
        try {
          const uploadImageResult = await Storage.put(urlPath, file, {
            level: "public",
            contentType: "*/*",
          });

          console.log("Archivo seleccionado:", file);
          console.log("Archivo subido:", uploadImageResult);
        } catch (error) {
          console.log("Error al subir el archivo:", error);
        }

        const newProductFeature = {
          featureID: feature,
          productID: productID,
          value: file.name,
        };
        console.log("newProductFeature:", newProductFeature);
        const createProductFeatureResponse = await API.graphql(
          graphqlOperation(createProductFeature, { input: newProductFeature })
        );

        const newDocument = {
          productFeatureID:
            createProductFeatureResponse.data.createProductFeature.id,
          userID: user.id,
          timeStamp: Date.now(),
          status: "pending",
          isApproved: false,
          isUploadedToBlockChain: false,
          url: WebAppConfig.url_s3_public_images + urlPath,
        };

        await API.graphql(
          graphqlOperation(createDocument, { input: newDocument })
        );
      }
    }

    // Creación de carpetas base
    /* await Promise.all([
      makeFolderOnS3(`${productID}/Técnica/`),
      makeFolderOnS3(`${productID}/Financiera/`),
    ]); */
  };

  const handleSubmit = async () => {
    const productID = uuidv4();
    // Subir datos a la base de datos con API de graphql
    const newProduct = {
      id: productID,
      name: formData["A_asset_names"],
      description: formData["A_description"],
      isActive: false,
      isActiveOnPlatform: true,
      status: "Prefactibilidad",
      categoryID: formData["A_category"],
      order: 0,
    };
    console.log("newProduct:", newProduct);
    await API.graphql(graphqlOperation(createProduct, { input: newProduct }));

    const newUserProduct = {
      productID: productID,
      userID: user.id,
    };
    await API.graphql(
      graphqlOperation(createUserProduct, { input: newUserProduct })
    );

    await createProductFeatures(productID);

    return (window.location.href = `/project/${productID}`);
  };

  return (
    <div>
      <div
        className="container-sm "
        style={{ paddingTop: 60, minHeight: "100vh" }}
      >
        <div className="mb-5">
          <NewHeaderNavbar></NewHeaderNavbar>
        </div>
        <section className="mb-5">
          <h2>Creación de un nuevo proyecto</h2>
          <p>
            Para crear un proyecto en nuestra plataforma, es necesario que
            completes el siguiente formulario. Es importante que ingreses toda
            la información requerida de manera precisa y detallada para que
            podamos evaluar tu solicitud.
          </p>
          <p>
            Una vez que hayas completado el formulario, nuestro equipo revisará
            la información proporcionada y te informaremos si tu proyecto ha
            sido aprobado o no. Si es aprobado, el equipo de Suan te enviará un
            contrato en el que se te especificará como continuar el proceso.
          </p>
        </section>
        <DynamicForm
          XLSFormURL={formURL}
          formData={formData}
          setFormData={setFormData}
          formDataErrors={formDataErrors}
          setFormDataErrors={setFormDataErrors}
          handleSubmit={handleSubmit}
          submitBtnLabel="Postular este proyecto"
        />
      </div>
    </div>
  );
}
