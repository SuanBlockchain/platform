import React, { useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { API, graphqlOperation } from "aws-amplify";
import { createPropertyFeature, updatePropertyFeature } from "graphql/mutations";
import { usePropertyData } from "context/PropertyDataContext";
import Card from "components/common/Card";
import { notify } from "utilities/notify";
import FormGroup from "components/common/FormGroup";

export default function UseRestrictions(props) {
  const { className, autorizedUser, setHasUnsavedChanges, handleFieldChange } = props;
  const { propertyData, refresh } = usePropertyData();
  const { user } = useAuth();

  const [formData, setFormData] = useState({});
  const [executedOnce, setExecutedOnce] = useState(false);
  const [resDescPfID, setResDescPfID] = useState(null);
  const [resOtherPfID, setResOtherPfID] = useState(null);
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    if (propertyData && propertyData.propertyFeatures && user && !executedOnce) {
      const pfIDResDesc = propertyData.propertyFeatures.find(
        (item) => item.featureID === "E_restriccion_desc"
      )?.id || null;
      setResDescPfID(pfIDResDesc);

      const pfIDResOther = propertyData.propertyFeatures.find(
        (item) => item.featureID === "E_resctriccion_other"
      )?.id || null;
      setResOtherPfID(pfIDResOther);

      setFormData({
        projectRestrictionsDesc: propertyData.projectRestrictions?.desc || "",
        projectRestrictionsOther: propertyData.projectRestrictions?.other || "",
      });

      setChangedFields({}); // Inicializa sin cambios
      setExecutedOnce(true);
    }
  }, [propertyData, user]);

  const handleChangeInputValue = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Marcar el campo como cambiado
    setChangedFields((prev) => ({
      ...prev,
      [name]: value !== propertyData.projectRestrictions?.[name.replace("projectRestrictions", "").toLowerCase()],
    }));

    handleFieldChange(name, true);
    setHasUnsavedChanges(true);
  };

  const handleSaveBtn = async () => {
    try {
      let updates = [];

      if (changedFields["projectRestrictionsDesc"]) {
        const featureID = "E_restriccion_desc";
        const featureValue = formData.projectRestrictionsDesc;

        if (resDescPfID) {
          updates.push(
            API.graphql(
              graphqlOperation(updatePropertyFeature, {
                input: { id: resDescPfID, value: featureValue },
              })
            )
          );
        } else {
          updates.push(
            API.graphql(
              graphqlOperation(createPropertyFeature, {
                input: {
                  propertyID: propertyData.propertyInfo.id,
                  featureID,
                  value: featureValue,
                },
              })
            ).then((response) => setResDescPfID(response.data.createPropertyFeature.id))
          );
        }
      }

      if (changedFields["projectRestrictionsOther"]) {
        const featureID = "E_resctriccion_other";
        const featureValue = formData.projectRestrictionsOther;

        if (resOtherPfID) {
          updates.push(
            API.graphql(
              graphqlOperation(updatePropertyFeature, {
                input: { id: resOtherPfID, value: featureValue },
              })
            )
          );
        } else {
          updates.push(
            API.graphql(
              graphqlOperation(createPropertyFeature, {
                input: {
                  propertyID: propertyData.propertyInfo.id,
                  featureID,
                  value: featureValue,
                },
              })
            ).then((response) => setResOtherPfID(response.data.createPropertyFeature.id))
          );
        }
      }

      await Promise.all(updates);

      // Limpiar los cambios después de guardar
      setChangedFields({});
      handleFieldChange("projectRestrictionsDesc", false);
      handleFieldChange("projectRestrictionsOther", false);

      notify({ msg: "Información actualizada", type: "success" });
      setHasUnsavedChanges(false);
      refresh();
    } catch (error) {
      console.error("Error al guardar:", error);
      notify({ msg: "Error al guardar la información", type: "error" });
    }
  };

  return (
    <Card className={className}>
      <Card.Header title="Limitaciones de uso de suelo" sep={true} />
      <Card.Body>
        <div className="row row-cols-1">
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="Restricción de uso por encontrarse inmerso en áreas de protección declaradas como parques, zonas de reserva, otros"
              inputName="projectRestrictionsDesc"
              inputValue={formData.projectRestrictionsDesc}
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["projectRestrictionsDesc"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="Otros limitantes"
              inputName="projectRestrictionsOther"
              inputValue={formData.projectRestrictionsOther}
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              className={`border rounded-md p-1 ${
                changedFields["projectRestrictionsOther"] ? "border-red-500 bg-red-100" : ""
              }`}
            />
          </div>
        </div>

        {/* Botón único para guardar todos los cambios */}
        {autorizedUser && (
          <div className="d-flex justify-content-center mt-3">
            <button
              className="p-2 text-white bg-green-700 rounded-md"
              onClick={handleSaveBtn}
              disabled={!Object.values(changedFields).some((changed) => changed)} // Se desactiva si no hay cambios
            >
              Guardar
            </button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
