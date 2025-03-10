import React, { useEffect, useState } from "react";

import { API, graphqlOperation } from "aws-amplify";
import { createPropertyFeature, updatePropertyFeature } from "graphql/mutations";
import { useAuth } from "context/AuthContext";
import { usePropertyData } from "context/PropertyDataContext";
import { notify } from "utilities/notify";
import Card from "components/common/Card";
import FormGroup from "components/common/FormGroup";

export default function Relations(props) {
  const { className, autorizedUser, setHasUnsavedChanges, handleFieldChange  } = props;
  const { propertyData, refresh } = usePropertyData();
  const { user } = useAuth();

  const [formData, setFormData] = useState([{}]);
  const [executedOnce, setExecutedOnce] = useState(false);
  const [asistenciaPfID, setAsistenciaPfID] = useState(null);
  const [aliadosPfID, setAliadosPfID] = useState(null);
  const [grupoPfID, setGrupoPfID] = useState(null);
   const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    if (propertyData && propertyData.propertyFeatures && user && !executedOnce) {
      const pfIDAsistencia =
        propertyData.propertyFeatures.filter((item) => {
          return item.featureID === "H_asistance_desc";
        })[0]?.id || null;
      setAsistenciaPfID(pfIDAsistencia);

      const pfIDAliados =
        propertyData.propertyFeatures.filter((item) => {
          return item.featureID === "H_aliados_estrategicos_desc";
        })[0]?.id || null;
      setAliadosPfID(pfIDAliados);

      const pfIDGrupo =
        propertyData.propertyFeatures.filter((item) => {
          return item.featureID === "H_grupo_comunitario_desc";
        })[0]?.id || null;
      setGrupoPfID(pfIDGrupo);

      setFormData((prevState) => ({
        ...prevState,
        projectRelationsTechnicalAssitance:
          propertyData.projectRelations?.technicalAssistance,
        projectRelationsStrategicAllies:
          propertyData.projectRelations?.strategicAllies,
        projectRelationsCommunityGroups:
          propertyData.projectRelations?.communityGroups,
      }));
      setExecutedOnce(true);
    }
  }, [propertyData, user]);

  const handleChangeInputValue = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    setChangedFields((prev) => {
      const newChangedFields = { ...prev, [name]: true };
      return newChangedFields;
    });
  
    setHasUnsavedChanges(true);
    handleFieldChange(name, true);
  };
  

  const handleSaveBtn = async () => {
  try {
    const updates = [
      {
        id: asistenciaPfID,
        featureID: "H_asistance_desc",
        value: formData.projectRelationsTechnicalAssitance,
        setID: setAsistenciaPfID,
      },
      {
        id: aliadosPfID,
        featureID: "H_aliados_estrategicos_desc",
        value: formData.projectRelationsStrategicAllies,
        setID: setAliadosPfID,
      },
      {
        id: grupoPfID,
        featureID: "H_grupo_comunitario_desc",
        value: formData.projectRelationsCommunityGroups,
        setID: setGrupoPfID,
      },
    ];

    // Recorremos cada campo y actualizamos o creamos el registro según corresponda
    for (const update of updates) {
      if (update.value) {
        if (update.id) {
          await API.graphql(
            graphqlOperation(updatePropertyFeature, {
              input: { id: update.id, value: update.value },
            })
          );
        } else {
          const response = await API.graphql(
            graphqlOperation(createPropertyFeature, {
              input: {
                propertyID: propertyData.propertyInfo.id,
                featureID: update.featureID,
                value: update.value,
              },
            })
          );
          update.setID(response.data.createPropertyFeature.id);
        }
      }
    }
    setChangedFields({});
    Object.keys(changedFields).forEach((key) => handleFieldChange(key, false));
    setHasUnsavedChanges(false);
    notify({ msg: "Información actualizada", type: "success" });
    refresh();
  } catch (error) {
    console.error("Error al guardar:", error);
    notify({ msg: "Error al guardar la información", type: "error" });
  }
};


  return (
    <Card className={className}>
      <Card.Header
        title="Relaciones con entidades y aliados estratégicos"
        sep={true}
      />
      <Card.Body>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col-12 col-lg-12">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Recibe asistencia técnica en el predio?"
              inputName="projectRelationsTechnicalAssitance"
              inputValue={formData.projectRelationsTechnicalAssitance}
              saveBtnDisabled={
                propertyData.projectRelations?.technicalAssistance ===
                formData.projectRelationsTechnicalAssitance
                  ? true
                  : false
              }
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              onClickSaveBtn={() =>
                handleSaveBtn("projectRelationsTechnicalAssitance")
              }
              className={`border rounded-md p-1 ${
                changedFields["projectRelationsTechnicalAssitance"] ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            />
          </div>
          <div className="col-12 col-lg-12">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Cuenta con aliados estratégicos?"
              inputName="projectRelationsStrategicAllies"
              inputValue={formData.projectRelationsStrategicAllies}
              saveBtnDisabled={
                propertyData.projectRelations?.strategicAllies ===
                formData.projectRelationsStrategicAllies
                  ? true
                  : false
              }
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              onClickSaveBtn={() =>
                handleSaveBtn("projectRelationsStrategicAllies")
              }
              className={`border rounded-md p-1 ${
                changedFields["projectRelationsStrategicAllies"] ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            />
          </div>
          <div className="col-12 col-lg-12">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="¿Pertenece a algún grupo comunitario?"
              inputName="projectRelationsCommunityGroups"
              inputValue={formData.projectRelationsCommunityGroups}
              saveBtnDisabled={
                propertyData.projectRelations?.communityGroups ===
                formData.projectRelationsCommunityGroups
                  ? true
                  : false
              }
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              onClickSaveBtn={() =>
                handleSaveBtn("projectRelationsCommunityGroups")
              }
              className={`border rounded-md p-1 ${
                changedFields["projectRelationsCommunityGroups"] ? "border-red-500 bg-red-100" : "border-gray-300"
              }`}
            />
          </div>
        </div>
        {autorizedUser && (
      <div className="d-flex justify-content-center mt-3">
        <button
          className="p-2 text-white bg-green-700 rounded-md"
          onClick={handleSaveBtn}
        >
          Guardar
        </button>
      </div>
    )}
      </Card.Body>
    </Card>
  );
}
