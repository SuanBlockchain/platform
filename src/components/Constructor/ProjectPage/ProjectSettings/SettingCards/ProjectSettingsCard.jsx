import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import Card from "../../../../common/Card";
import FormGroup from "../../../../common/FormGroup";

import { useProjectData } from "../../../../../context/ProjectDataContext";
import { updateProduct } from "../../../../../graphql/mutations";
import { notify } from "../../../../../utilities/notify";

const listMarketplacess = /* GraphQL */ `
  query ListMarketplaces {
    listMarketplaces {
      items {
        id
        name
      }
    }
  }
`;

export default function ProjectSettingsCard({ className }) {
  const { projectData, fetchProjectData } = useProjectData();
  const [projectIsActive, setProjectIsActive] = useState(false);
  const [projectStatus, setProjectStatus] = useState("");
  const [projectShowOn, setProjectShowOn] = useState("");
  const [projectReadyToPublish, setProjectReadyToPublish] = useState(false);
  const [listMarketplaces, setListMarketplaces] = useState([]);

  useEffect(() => {
    const loadMarketplaces = async () => {
      const response = await API.graphql(graphqlOperation(listMarketplacess));
      setListMarketplaces(response.data.listMarketplaces.items);
    };
    loadMarketplaces();
  }, []);

  useEffect(() => {
    if (projectData) {
      const projectReadyToPublishData =
        projectData.projectFeatures.find(
          (item) => item.featureID === "GLOBAL_OWNER_ACCEPTS_CONDITIONS"
        )?.value || "false";

      setProjectReadyToPublish(JSON.parse(projectReadyToPublishData));
      setProjectIsActive(projectData.projectInfo.isActive);
      setProjectStatus(projectData.projectInfo.status);
      setProjectShowOn(projectData.projectInfo.showOn);
    }
  }, [projectData]);

  const handleSaveChanges = async () => {
    const updatedProduct = {
      id: projectData.projectInfo.id,
      isActive: projectIsActive,
      status: projectStatus,
      marketplaceID: projectShowOn,
    };
    await API.graphql(graphqlOperation(updateProduct, { input: updatedProduct }));
    await fetchProjectData();
    notify({ msg: "La configuración del proyecto ha sido actualizada", type: "success" });
  };

  return (
    <Card className={className}>
      <Card.Header title="Configuración del Proyecto" sep={true} />
      <Card.Body>
        <FormGroup
          label="Estado del proyecto"
          inputType="select"
          inputSize="md"
          optionList={[
            { value: "Prefactibilidad", label: "Prefactibilidad" },
            { value: "Factibilidad", label: "Factibilidad" },
            { value: "Documento de diseño del proyecto", label: "Documento de diseño del proyecto" },
            { value: "Validación externa", label: "Validación externa" },
            { value: "Registro del proyecto", label: "Registro del proyecto" },
          ]}
          inputValue={projectStatus}
          onChangeInputValue={(e) => setProjectStatus(e.target.value)}
        />
        <FormGroup
          label="El proyecto debe mostrarse en: "
          inputType="select"
          inputSize="md"
          optionList={listMarketplaces.map((marketplace) => ({
            value: marketplace.id,
            label: marketplace.name,
          }))}
          inputValue={projectShowOn}
          onChangeInputValue={(e) => setProjectShowOn(e.target.value)}
        />
        <FormGroup
          disabled={!projectReadyToPublish}
          label="Proyecto visible en Marketplace"
          inputType="switch"
          checked={projectIsActive}
          onChangeInputValue={() => setProjectIsActive(!projectIsActive)}
        />
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="btn btn-primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
