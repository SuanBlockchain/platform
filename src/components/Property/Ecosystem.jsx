import React, { useEffect, useState } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { createPropertyFeature, updatePropertyFeature } from "graphql/mutations";
import { useAuth } from "context/AuthContext";
import { usePropertyData } from "context/PropertyDataContext";
import Card from "components/common/Card";
import FormGroup from "components/common/FormGroup";
import { notify } from "utilities/notify";

export default function Ecosystem(props) {
  const { className, autorizedUser, setHasUnsavedChanges , handleFieldChange} = props;
  const { propertyData } = usePropertyData();
  const { user } = useAuth();

  const [formData, setFormData] = useState([{}]);
  const [executedOnce, setExecutedOnce] = useState(false);
  const [nacimientoPfID, setNacimientoPfID] = useState(null);
  const [changedFields, setChangedFields] = useState({});


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
    if (propertyData && propertyData.propertyFeatures && user && !executedOnce) {
      const pfIDNacimiento =
        propertyData.propertyFeatures.filter((item) => {
          return item.featureID === "F_nacimiento_agua";
        })[0]?.id || null;
      setNacimientoPfID(pfIDNacimiento);

      setFormData((prevState) => ({
        ...prevState,
        F_nacimiento_agua: propertyData.projectEcosystem?.waterSprings.exist,
        F_nacimiento_agua_quantity:
          propertyData.projectEcosystem?.waterSprings.quantity,
        F_agua_concede: propertyData.projectEcosystem?.concessions.exist,
        F_agua_concede_entity: propertyData.projectEcosystem?.concessions.entity,
        F_amenazas_defo_desc:
          propertyData.projectEcosystem?.deforestationThreats,
        F_conservacion_desc: propertyData.projectEcosystem?.conservationProjects,
        F_especies_fauna: propertyData.projectEcosystem?.diversity.fauna,
        F_especies_mamiferos: propertyData.projectEcosystem?.diversity.mammals,
        F_especies_aves: propertyData.projectEcosystem?.diversity.birds,
        F_especies_flora: propertyData.projectEcosystem?.diversity.flora,
      }));
      setExecutedOnce(true);
    }
  }, [propertyData, user]);

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

    setChangedFields((prev) => ({
      ...prev,
      [name]: true, // ✅ Marcar campo como cambiado
    }));
    handleFieldChange(name, true);
    setHasUnsavedChanges(true); 
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
        const updatedPropertyFeature = {
          id: nacimientoPfID,
          value: `[${values.join(", ")}]`,
        };
        console.log("newPropertyFeature:", updatedPropertyFeature);
        await API.graphql(
          graphqlOperation(updatePropertyFeature, {
            input: updatedPropertyFeature,
          })
        );
      } else {
        const newPropertyFeature = {
          featureID: "F_nacimiento_agua",
          propertyID: propertyData.propertyInfo.id,
          value: `[${values.join(", ")}]`,
        };
        console.log("newPropertyFeature:", newPropertyFeature);
        const response = await API.graphql(
          graphqlOperation(createPropertyFeature, { input: newPropertyFeature })
        );
        setNacimientoPfID(response.data.createPropertyFeature.id);
      }
    }
    setChangedFields({});
    Object.keys(changedFields).forEach((key) => handleFieldChange(key, false));
    setHasUnsavedChanges(false);
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
              className={`border rounded-md p-1 ${
                changedFields["F_nacimiento_agua"] ? "border-red-500 bg-red-100" : ""
              }`}
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
                className={`border rounded-md p-1 ${
                  changedFields["F_nacimiento_agua_quantity"] ? "border-red-500 bg-red-100" : ""
                }`}
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
              className={`border rounded-md p-1 ${
                changedFields["F_agua_concede"] ? "border-red-500 bg-red-100" : ""
              }`}
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
                className={`border rounded-md p-1 ${
                  changedFields["F_agua_concede_entity"] ? "border-red-500 bg-red-100" : ""
                }`}
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
              className={`border rounded-md p-1 ${
                changedFields["F_amenazas_defo_desc"] ? "border-red-500 bg-red-100" : ""
              }`}
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
              className={`border rounded-md p-1 ${
                changedFields["F_conservacion_desc"] ? "border-red-500 bg-red-100" : ""
              }`}
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
              className={`border rounded-md p-1 ${
                changedFields["F_especies_fauna"] ? "border-red-500 bg-red-100" : ""
              }`}
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
              className={`border rounded-md p-1 ${
                changedFields["F_especies_mamiferos"] ? "border-red-500 bg-red-100" : ""
              }`}
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
              className={`border rounded-md p-1 ${
                changedFields["F_especies_aves"] ? "border-red-500 bg-red-100" : ""
              }`}
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
              className={`border rounded-md p-1 ${
                changedFields["F_especies_flora"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
        </div>
        {autorizedUser && (
          <div className="d-flex justify-content-center">
            <button
              className="p-2 text-white bg-green-700 rounded-md"
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
