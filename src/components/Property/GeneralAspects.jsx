import React, { useEffect, useState } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { createPropertyFeature, updatePropertyFeature } from "graphql/mutations";
import { useAuth } from "context/AuthContext";
import { usePropertyData } from "context/PropertyDataContext";
import { notify } from "utilities/notify";
import Card from "components/common/Card";
import FormGroup from "components/common/FormGroup";

export default function GeneralAspects(props) {
  const { className, autorizedUser, setHasUnsavedChanges, handleFieldChange,updateFormCompletion  } = props;
  const { propertyData } = usePropertyData();
  const { user } = useAuth();

  const [formData, setFormData] = useState([{}]);
  const [executedOnce, setExecutedOnce] = useState(false);
  const [habitaPfID, setHabitaPfID] = useState(null);
  const [changedFields, setChangedFields] = useState({});

  const productFeaturesGroup = [
    "G_habita_predio",
    "G_Temporal_permanente",
    "G_habita_years",
    "G_viviendas_number",
    "G_familias",
    "G_familias_miembros",
    "G_vias_state",
    "G_distancia_predio_municipal",
    "G_transport_mean",
    "G_caminos_existence",
    "G_risks_erosion_derrumbe",
  ];

  const checkFormCompletion = () => {
    // ✅ Se considera completado si al menos un campo tiene datos
    const hasAnyData = Object.values(formData).some((value) => value !== "" && value !== undefined);
    updateFormCompletion("generalAspects", hasAnyData);
  };
  

  useEffect(() => {
    if (propertyData && propertyData.propertyFeatures && user && !executedOnce) {
      const pfIDHabita =
        propertyData.propertyFeatures.filter((item) => {
          return item.featureID === "G_habita_predio";
        })[0]?.id || null;
      setHabitaPfID(pfIDHabita);

      setFormData((prevState) => ({
        ...prevState,
        G_habita_predio:
          propertyData.projectGeneralAspects?.postulant.livesOnProperty,
        G_Temporal_permanente:
          propertyData.projectGeneralAspects?.postulant.typeOfStay,
        G_habita_years:
          propertyData.projectGeneralAspects?.postulant.timeLivingOnProperty,
        G_viviendas_number: propertyData.projectGeneralAspects?.households,
        G_familias: propertyData.projectGeneralAspects?.familiesNumber,
        G_familias_miembros:
          propertyData.projectGeneralAspects?.membersPerFamily,
        G_vias_state: propertyData.projectGeneralAspects?.roadsStatus,
        G_distancia_predio_municipal:
          propertyData.projectGeneralAspects?.municipalDistance,
        G_transport_mean: propertyData.projectGeneralAspects?.conveyance,
        G_caminos_existence:
          propertyData.projectGeneralAspects?.neighborhoodRoads,
        G_risks_erosion_derrumbe:
          propertyData.projectGeneralAspects?.collapseRisk,
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
      [name]: true,
    }));
  
    handleFieldChange(name, true);
    setHasUnsavedChanges(true);
    checkFormCompletion();
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
      if (habitaPfID) {
        const updatedPropertyFeature = {
          id: habitaPfID,
          value: `[${values.join(", ")}]`,
        };
        await API.graphql(
          graphqlOperation(updatePropertyFeature, {
            input: updatedPropertyFeature,
          })
        );
      } else {
        const newPropertyFeature = {
          featureID: "G_habita_predio",
          propertyID: propertyData.propertyInfo.id,
          value: `[${values.join(", ")}]`,
        };
        const response = await API.graphql(
          graphqlOperation(createPropertyFeature, { input: newPropertyFeature })
        );
        setHabitaPfID(response.data.createPropertyFeature.id);
      }
    }
    updateFormCompletion("generalAspects", true);
    setChangedFields({});
    Object.keys(changedFields).forEach((key) => handleFieldChange(key, false));
    setHasUnsavedChanges(false);
    notify({ msg: "Información actualizada", type: "success" });
    checkFormCompletion();
  };

  return (
    <Card className={className}>
      <Card.Header title="Aspectos generales del predio" sep={true} />
      <Card.Body>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              label="¿Usted habita el predio?"
              inputType="radio"
              optionList={[
                { label: "Si", value: "yes" },
                { label: "No", value: "no" },
              ]}
              optionCheckedList={formData.G_habita_predio}
              inputName="G_habita_predio"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_habita_predio"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              label="¿Existen caminos vecinales o servidumbres de paso a otras fincas?"
              inputType="radio"
              optionList={[
                { label: "Si", value: "yes" },
                { label: "No", value: "no" },
              ]}
              optionCheckedList={formData.G_caminos_existence}
              inputName="G_caminos_existence"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_caminos_existence"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          {formData.G_habita_predio === "yes" && (
            <div className="col">
              <FormGroup
                disabled={!autorizedUser}
                label="¿Usted habita el predio de manera temporal o permanente?"
                inputType="radio"
                optionList={[
                  { label: "Temporal", value: "temporal" },
                  { label: "Permanente", value: "permanente" },
                ]}
                optionCheckedList={formData.G_Temporal_permanente}
                inputName="G_Temporal_permanente"
                onChangeInputValue={(e) => handleChangeInputValue(e)}
                className={`border rounded-md p-1 ${
                  changedFields["G_Temporal_permanente"] ? "border-red-500 bg-red-100" : ""
                }`}
              />
            </div>
          )}
          {formData.G_Temporal_permanente === "permanente" && (
            <div className="col">
              <FormGroup
                disabled={!autorizedUser}
                label="¿Desde hace cuántos años ha estado habitando el predio?"
                inputType="text"
                inputValue={formData.G_habita_years}
                inputName="G_habita_years"
                onChangeInputValue={(e) => handleChangeInputValue(e)}
                className={`border rounded-md p-1 ${
                  changedFields["G_habita_years"] ? "border-red-500 bg-red-100" : ""
                }`}
              />
            </div>
          )}
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="text"
              label="¿Cuántas viviendas hay en el predio(s)?"
              inputValue={formData.G_viviendas_number}
              inputName="G_viviendas_number"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_viviendas_number"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="text"
              label="¿Cuántas familas?"
              inputValue={formData.G_familias}
              inputName="G_familias"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_familias"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          {parseInt(propertyData.projectGeneralAspects?.membersPerFamily) >
            0 && (
            <div className="col">
              <FormGroup
                disabled={!autorizedUser}
                inputType="text"
                label="¿En promedio, cuántos miembros en cada familia?"
                inputValue={formData.G_familias_miembros}
                inputName="G_familias_miembros"
                onChangeInputValue={(e) => handleChangeInputValue(e)}
                className={`border rounded-md p-1 ${
                  changedFields["G_familias_miembros"] ? "border-red-500 bg-red-100" : ""
                }`}
              />
            </div>
          )}
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="text"
              label="¿Cuál es el estado de las vías de ingreso a su propiedad?"
              inputValue={formData.G_vias_state}
              inputName="G_vias_state"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_vias_state"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="text"
              label="¿Cuál es la distancia en kilómetros entre el predio y la cabecera municipal?"
              inputValue={formData.G_distancia_predio_municipal}
              inputName="G_distancia_predio_municipal"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_distancia_predio_municipal"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="text"
              label="¿Qué medio de transporte utiliza?"
              inputValue={formData.G_transport_mean}
              inputName="G_transport_mean"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_transport_mean"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          <div className="col-12 col-lg-12">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿En su predio existen riesgos de erosión o derrumbes?"
              inputValue={formData.G_risks_erosion_derrumbe}
              inputName="G_risks_erosion_derrumbe"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["G_risks_erosion_derrumbe"] ? "border-red-500 bg-red-100" : ""
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
