import React, { useEffect, useState } from "react";

import Card from "../../../../common/Card";
import FormGroup from "../../../../common/FormGroup";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import { API, graphqlOperation } from "aws-amplify";
import { createProductFeature, updateProductFeature } from "graphql/mutations";
import { useAuth } from "context/AuthContext";
import { notify } from "../../../../../utilities/notify";

export default function EcosystemInfoCard(props) {
  const { className, autorizedUser } = props;
  const { projectData } = useProjectData();
  const { user } = useAuth();

  const [formData, setFormData] = useState([{}]);
  const [executedOnce, setExecutedOnce] = useState(false);
  const [nacimientoPfID, setNacimientoPfID] = useState(null);

  const productFeaturesGroup = [
    "F_nacimiento_agua",
    "F_nacimiento_agua_quantity",
    "F_agua_concede",
    "F_agua_concede_entity",
    "F_amenazas_defo_desc",
    "F_conservacion_desc",
    "F_especies_fauna",
    "F_especies_mamiferos",
    "F_especies_aves",
    "F_especies_flora",
  ];

  useEffect(() => {
    if (projectData && projectData.projectFeatures && user && !executedOnce) {
      const pfIDNacimiento =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "F_nacimiento_agua";
        })[0]?.id || null;
      setNacimientoPfID(pfIDNacimiento);

      setFormData((prevState) => ({
        ...prevState,
        F_nacimiento_agua: projectData.projectEcosystem?.waterSprings.exist,
        F_nacimiento_agua_quantity:
          projectData.projectEcosystem?.waterSprings.quantity,
        F_agua_concede: projectData.projectEcosystem?.concessions.exist,
        F_agua_concede_entity: projectData.projectEcosystem?.concessions.entity,
        F_amenazas_defo_desc:
          projectData.projectEcosystem?.deforestationThreats,
        F_conservacion_desc: projectData.projectEcosystem?.conservationProjects,
        F_especies_fauna: projectData.projectEcosystem?.diversity.fauna,
        F_especies_mamiferos: projectData.projectEcosystem?.diversity.mammals,
        F_especies_aves: projectData.projectEcosystem?.diversity.birds,
        F_especies_flora: projectData.projectEcosystem?.diversity.flora,
      }));
      setExecutedOnce(true);
    }
  }, [projectData, user]);

  const handleChangeInputValue = async (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (type === "checkbox") {
        if (!Array.isArray(updatedFormData[name])) {
          updatedFormData[name] = [];
        }

        if (checked && !updatedFormData[name].includes(value)) {
          updatedFormData[name].push(value);
        } else if (!checked) {
          updatedFormData[name] = updatedFormData[name].filter(
            (val) => val !== value
          );
        }
      } else if (type === "radio" && checked) {
        updatedFormData[name] = value;
      } else {
        updatedFormData[name] = value;
      }

      return updatedFormData;
    });
  };

  const handleSaveBtn = async () => {
    // Construir product feature
    const values = [];
    for (let i = 0; i < productFeaturesGroup.length; i++) {
      const feature = productFeaturesGroup[i];

      const valueSegment = Array.isArray(formData[feature])
        ? formData[feature].join("|")
        : formData[feature];
      const segment = `{${feature}=${valueSegment}}`;
      valueSegment !== "" && valueSegment.length > 0 && values.push(segment);
    }

    if (values.length > 0) {
      if (nacimientoPfID) {
        const updatedProductFeature = {
          id: nacimientoPfID,
          value: `[${values.join(", ")}]`,
        };
        console.log("newProductFeature:", updatedProductFeature);
        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          featureID: "F_nacimiento_agua",
          productID: projectData.projectInfo.id,
          value: `[${values.join(", ")}]`,
        };
        console.log("newProductFeature:", newProductFeature);
        const response = await API.graphql(
          graphqlOperation(createProductFeature, { input: newProductFeature })
        );
        setNacimientoPfID(response.data.createProductFeature.id);
      }
    }

    notify({ msg: "Información actualizada", type: "success" });
  };

  return (
    <Card className={className}>
      <Card.Header title="Aspectos generales del ecosistema" sep={true} />
      <Card.Body>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              label="¿Existen Nacimientos de agua?"
              inputType="radio"
              optionList={[
                { label: "Si", value: "yes" },
                { label: "No", value: "no" },
              ]}
              optionCheckedList={formData.F_nacimiento_agua}
              inputName="F_nacimiento_agua"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
          {formData.F_nacimiento_agua === "yes" && (
            <div className="col">
              <FormGroup
                disabled={!autorizedUser}
                inputType="text"
                label="¿Cuántos nacimientos de agua existen?"
                inputValue={formData.F_nacimiento_agua_quantity}
                inputName="F_nacimiento_agua_quantity"
                onChangeInputValue={(e) => handleChangeInputValue(e)}
              />
            </div>
          )}
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              label="¿Existen concesiones de agua?"
              inputType="radio"
              optionList={[
                { label: "Si", value: "yes" },
                { label: "No", value: "no" },
              ]}
              optionCheckedList={formData.F_agua_concede}
              inputName="F_agua_concede"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
          {formData.F_agua_concede === "yes" && (
            <div className="col">
              <FormGroup
                disabled={!autorizedUser}
                inputType="text"
                label="Quien concede el agua"
                inputValue={formData.F_agua_concede_entity}
                inputName="F_agua_concede_entity"
                onChangeInputValue={(e) => handleChangeInputValue(e)}
              />
            </div>
          )}
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Qué amenazas de deforestación existen al interior del predio(s) y/o a los alrededores?"
              inputValue={formData.F_amenazas_defo_desc}
              inputName="F_amenazas_defo_desc"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Existe algún proyecto de conservación en su predio?"
              inputValue={formData.F_conservacion_desc}
              inputName="F_conservacion_desc"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Cuenta con especies de fauna de importancia?"
              inputValue={formData.F_especies_fauna}
              inputName="F_especies_fauna"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Cuenta con caracterización de especies de mamiferos?"
              inputValue={formData.F_especies_mamiferos}
              inputName="F_especies_mamiferos"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Cuenta con caracterización de especies de aves?"
              inputValue={formData.F_especies_aves}
              inputName="F_especies_aves"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Cuenta con caracterización de especies de flora?"
              inputValue={formData.F_especies_flora}
              inputName="F_especies_flora"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
          </div>
        </div>
        {autorizedUser && (
          <div className="d-flex justify-content-center">
            <button
              className="p-2 text-white bg-[#6e6c35] border-1 border-dark rounded-md"
              onClick={() => handleSaveBtn()}
              variant="success"
            >
              Guardar
            </button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
