import React, { useEffect, useState } from "react";

import Card from "../../../../common/Card";
import FormGroup from "../../../../common/FormGroup";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import { useAuth } from "context/AuthContext";
import { API, graphqlOperation } from "aws-amplify";
import { createProductFeature, updateProductFeature } from "graphql/mutations";
import { Button } from "react-bootstrap";
import { notify } from "../../../../../utilities/notify";

export default function ActualUseAndPotentialInfoCard(props) {
  const { className, autorizedUser } = props;
  const { projectData } = useProjectData();
  const { user } = useAuth();

  const [formData, setFormData] = useState({});
  const [executedOnce, setExecutedOnce] = useState(false);
  const [usesPfID, setUsesPfID] = useState(null);

  const productFeaturesGroup = [
    "D_actual_use",
    "D_area_potrero",
    "D_especie_plantaciones1",
    "D_ha_plantaciones1",
    "D_especie_plantaciones2",
    "D_ha_plantaciones2",
    "D_especie_plantaciones3",
    "D_ha_plantaciones3",
    "D_especie_frutales1",
    "D_ha_frutales1",
    "D_especie_frutales2",
    "D_ha_frutales2",
    "D_especie_otros",
    "D_ha_otros",
    "D_replace_use",
    "D_replace_potrero_use",
    "D_replace_ha_potrero_use",
    "D_replace_plantaciones1_use",
    "D_replace_ha_plantaciones1_use",
    "D_replace_plantaciones2_use",
    "D_replace_ha_plantaciones2_use",
    "D_replace_plantaciones3_use",
    "D_replace_ha_plantaciones3_use",
    "D_replace_frutales1_use",
    "D_replace_ha_frutales1_use",
    "D_replace_frutales2_use",
    "D_replace_ha_frutales2_use",
    "D_replace_otros_use",
    "D_replace_ha_otros_use",
  ];

  useEffect(() => {
    if (projectData && projectData.projectFeatures && user && !executedOnce) {
      const pfIDUse =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "D_actual_use";
        })[0]?.id || null;
      setUsesPfID(pfIDUse);

      setFormData((prevState) => ({
        ...prevState,
        D_actual_use: projectData.projectUses?.actualUse.types,
        D_area_potrero: projectData.projectUses?.actualUse.potreros.ha,
        D_especie_plantaciones1:
          projectData.projectUses?.actualUse.plantacionesForestales1.especie,
        D_ha_plantaciones1:
          projectData.projectUses?.actualUse.plantacionesForestales1.ha,
        D_especie_plantaciones2:
          projectData.projectUses?.actualUse.plantacionesForestales2.especie,
        D_ha_plantaciones2:
          projectData.projectUses?.actualUse.plantacionesForestales2.ha,
        D_especie_plantaciones3:
          projectData.projectUses?.actualUse.plantacionesForestales3.especie,
        D_ha_plantaciones3:
          projectData.projectUses?.actualUse.plantacionesForestales3.ha,
        D_especie_frutales1:
          projectData.projectUses?.actualUse.frutales1.especie,
        D_ha_frutales1: projectData.projectUses?.actualUse.frutales1.ha,
        D_especie_frutales2:
          projectData.projectUses?.actualUse.frutales2.especie,
        D_ha_frutales2: projectData.projectUses?.actualUse.frutales2.ha,
        D_especie_otros: projectData.projectUses?.actualUse.otros.especie,
        D_ha_otros: projectData.projectUses?.actualUse.otros.ha,
        D_replace_use: projectData.projectUses?.replaceUse.types,
        D_replace_potrero_use:
          projectData.projectUses?.replaceUse.potreros.newUse,
        D_replace_ha_potrero_use:
          projectData.projectUses?.replaceUse.potreros.ha,
        D_replace_plantaciones1_use:
          projectData.projectUses?.replaceUse.plantacionesForestales1.newUse,
        D_replace_ha_plantaciones1_use:
          projectData.projectUses?.replaceUse.plantacionesForestales1.ha,
        D_replace_plantaciones2_use:
          projectData.projectUses?.replaceUse.plantacionesForestales2.newUse,
        D_replace_ha_plantaciones2_use:
          projectData.projectUses?.replaceUse.plantacionesForestales2.ha,
        D_replace_plantaciones3_use:
          projectData.projectUses?.replaceUse.plantacionesForestales3.newUse,
        D_replace_ha_plantaciones3_use:
          projectData.projectUses?.replaceUse.plantacionesForestales3.ha,
        D_replace_frutales1_use:
          projectData.projectUses?.replaceUse.frutales1.newUse,
        D_replace_ha_frutales1_use:
          projectData.projectUses?.replaceUse.frutales1.ha,
        D_replace_frutales2_use:
          projectData.projectUses?.replaceUse.frutales2.newUse,
        D_replace_ha_frutales2_use:
          projectData.projectUses?.replaceUse.frutales2.ha,
        D_replace_otros_use: projectData.projectUses?.replaceUse.otros.newUse,
        D_replace_ha_otros_use: projectData.projectUses?.replaceUse.otros.ha,
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
      if (usesPfID) {
        const updatedProductFeature = {
          id: usesPfID,
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
          featureID: "D_actual_use",
          productID: projectData.projectInfo.id,
          value: `[${values.join(", ")}]`,
        };
        console.log("newProductFeature:", newProductFeature);
        const response = await API.graphql(
          graphqlOperation(createProductFeature, { input: newProductFeature })
        );
        setUsesPfID(response.data.createProductFeature.id);
      }
    }

    notify({ msg: "Información actualizada", type: "success" });
  };

  return (
    <Card className={className}>
      <Card.Header title="Uso actual y potencial" sep={true} />
      <Card.Body>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              label="Uso actual del suelo del predio"
              inputType="checkbox"
              optionList={[
                { label: "Potreros", value: "potreros" },
                {
                  label: "Plantaciones Forestales 1",
                  value: "plantaciones_forestales1",
                },
                {
                  label: "Plantaciones Forestales 2",
                  value: "plantaciones_forestales2",
                },
                {
                  label: "Plantaciones Forestales 3",
                  value: "plantaciones_forestales3",
                },
                { label: "Frutales 1", value: "frutales1" },
                { label: "Frutales 2", value: "frutales2" },
                { label: "Otros", value: "otros" },
              ]}
              optionCheckedList={formData.D_actual_use}
              inputName="D_actual_use"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />
            {formData?.D_actual_use?.includes("potreros") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Potreros
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de hectáreas"
                    inputValue={formData.D_area_potrero}
                    inputName="D_area_potrero"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_actual_use?.includes("plantaciones_forestales1") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Plantaciones Forestales 1
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Especies"
                    inputValue={formData.D_especie_plantaciones1}
                    inputName="D_especie_plantaciones1"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de hectáreas"
                    inputValue={formData.D_ha_plantaciones1}
                    inputName="D_ha_plantaciones1"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_actual_use?.includes("plantaciones_forestales2") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Plantaciones Forestales 2
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Especies"
                    inputValue={formData.D_especie_plantaciones2}
                    inputName="D_especie_plantaciones2"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de hectáreas"
                    inputValue={formData.D_ha_plantaciones2}
                    inputName="D_ha_plantaciones2"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_actual_use?.includes("plantaciones_forestales3") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Plantaciones Forestales 3
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Especies"
                    inputValue={formData.D_especie_plantaciones3}
                    inputName="D_especie_plantaciones3"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de hectáreas"
                    inputValue={formData.D_ha_plantaciones3}
                    inputName="D_ha_plantaciones3"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_actual_use?.includes("frutales1") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Frutales 1
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Especies"
                    inputValue={formData.D_especie_frutales1}
                    inputName="D_especie_frutales1"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de hectáreas"
                    inputValue={formData.D_ha_frutales1}
                    inputName="D_ha_frutales1"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_actual_use?.includes("frutales2") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Frutales 2
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Especies"
                    inputValue={formData.D_especie_frutales2}
                    inputName="D_especie_frutales2"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de hectáreas"
                    inputValue={formData.D_ha_frutales2}
                    inputName="D_ha_frutales2"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_actual_use?.includes("otros") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Otros
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Especies"
                    inputValue={formData.D_especie_otros}
                    inputName="D_especie_otros"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de hectáreas"
                    inputValue={formData.D_ha_otros}
                    inputName="D_ha_otros"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
          </div>
          <div className="col">
            <FormGroup
              disabled={!autorizedUser}
              label="Usos actuales remplazables"
              inputType="checkbox"
              optionList={[
                { label: "Potreros", value: "potreros" },
                {
                  label: "Plantaciones Forestales 1",
                  value: "plantaciones_forestales1",
                },
                {
                  label: "Plantaciones Forestales 2",
                  value: "plantaciones_forestales2",
                },
                {
                  label: "Plantaciones Forestales 3",
                  value: "plantaciones_forestales3",
                },
                { label: "Frutales 1", value: "frutales1" },
                { label: "Frutales 2", value: "frutales2" },
                { label: "Otros", value: "otros" },
              ]}
              optionCheckedList={formData.D_replace_use}
              inputName="D_replace_use"
              onChangeInputValue={(e) => handleChangeInputValue(e)}
            />

            {formData?.D_replace_use?.includes("potreros") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Potreros
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="¿A qué tipo de Uso de Suelo?"
                    inputValue={formData.D_replace_potrero_use}
                    inputName="D_replace_potrero_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de área a remplazar"
                    inputValue={formData.D_replace_ha_potrero_use}
                    inputName="D_replace_ha_potrero_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_replace_use?.includes("plantaciones_forestales1") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Plantaciones Forestales 1
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="¿A qué tipo de Uso de Suelo?"
                    inputValue={formData.D_replace_plantaciones1_use}
                    inputName="D_replace_plantaciones1_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de área a remplazar"
                    inputValue={formData.D_replace_ha_plantaciones1_use}
                    inputName="D_replace_ha_plantaciones1_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_replace_use?.includes("plantaciones_forestales2") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Plantaciones Forestales 2
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="¿A qué tipo de Uso de Suelo?"
                    inputValue={formData.D_replace_plantaciones2_use}
                    inputName="D_replace_plantaciones2_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de área a remplazar"
                    inputValue={formData.D_replace_ha_plantaciones2_use}
                    inputName="D_replace_ha_plantaciones2_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_replace_use?.includes("plantaciones_forestales3") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Plantaciones Forestales 3
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="¿A qué tipo de Uso de Suelo?"
                    inputValue={formData.D_replace_plantaciones3_use}
                    inputName="D_replace_plantaciones3_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de área a remplazar"
                    inputValue={formData.D_replace_ha_plantaciones3_use}
                    inputName="D_replace_ha_plantaciones3_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_replace_use?.includes("frutales1") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Frutales 1
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="¿A qué tipo de Uso de Suelo?"
                    inputValue={formData.D_replace_frutales1_use}
                    inputName="D_replace_frutales1_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de área a remplazar"
                    inputValue={formData.D_replace_ha_frutales1_use}
                    inputName="D_replace_ha_frutales1_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_replace_use?.includes("frutales2") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Frutales 2
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="¿A qué tipo de Uso de Suelo?"
                    inputValue={formData.D_replace_frutales2_use}
                    inputName="D_replace_frutales2_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de área a remplazar"
                    inputValue={formData.D_replace_ha_frutales2_use}
                    inputName="D_replace_ha_frutales2_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
            {formData?.D_replace_use?.includes("otros") && (
              <Card className="shadow-sm mb-3">
                <header className="d-flex justify-content-center mt-2">
                  Otros
                </header>
                <section className="p-2">
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="¿A qué tipo de Uso de Suelo?"
                    inputValue={formData.D_replace_otros_use}
                    inputName="D_replace_otros_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                  <FormGroup
                    disabled={!autorizedUser}
                    inputType="text"
                    label="Cantidad de área a remplazar"
                    inputValue={formData.D_replace_ha_otros_use}
                    inputName="D_replace_ha_otros_use"
                    onChangeInputValue={(e) => handleChangeInputValue(e)}
                  />
                </section>
              </Card>
            )}
          </div>
        </div>
        {autorizedUser && (
          <div className="d-flex justify-content-center">
            <button
              className="p-2 text-white bg-[#6e6c35] border-1 border-dark rounded-md"
              onClick={() => handleSaveBtn()}
            >
              Guardar
            </button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
