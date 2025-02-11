import React, { useEffect, useState } from "react";

import Card from "../../../../common/Card";
import { SaveDiskIcon } from "../../../../common/icons/SaveDiskIcon";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import { notify } from "../../../../../utilities/notify";
import { Form, Button } from "react-bootstrap";
import { createProductFeature } from "graphql/mutations";
import { updateProductFeature } from "graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

export default function DescriptionValidator(props) {
  const { className, canEdit } = props;

  const { projectData, fetchProjectData } = useProjectData();
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDescriptionID, setProjectDescriptionID] = useState("");

  useEffect(() => {
    if (projectData) {
      setProjectDescription(
        projectData.projectVerifierInfo.verifierDescription
      );
      setProjectDescriptionID(
        projectData.projectVerifierInfo.verifierDescriptionID
      );
    }
  }, [projectData]);
  const handleOnChange = (e) => {
    setProjectDescription(e.target.value);
  };

  async function saveVerifierDescription() {
    try {
      if (projectDescriptionID) {
        let tempInput = {
          id: projectDescriptionID,
          value: projectDescription,
        };
        await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempInput })
        );
        notifyFunction("Descripción del proyecto actualizada", "success");
      } else {
        let tempInput = {
          value: projectDescription,
          featureID: "GLOBAL_VERIFIER_DESCRIPTION",
          productID: projectData.projectInfo.id,
        };
        let result = await API.graphql(
          graphqlOperation(createProductFeature, { input: tempInput })
        );
        setProjectDescriptionID(result.data.createProductFeature.id);
        notifyFunction("Descripción del proyecto guardada", "success");
      }
      await fetchProjectData();
    } catch (error) {
      notifyFunction("Error al guardar la descripción del proyecto", "error");
    }
  }
  async function notifyFunction(msg, type) {
    notify({
      msg: msg,
      type: type,
    });
  }

  return (
    <Card className={className}>
      <Card.Header title="Descripción detallada del proyecto" sep={true} />
      <Card.Body>
        <textarea
          className={`border w-full p-2 rounded-md ${canEdit && "bg-gray-200"}`}
          style={{ minHeight: "10rem", maxHeight: "20rem", resize: "none" }}
          value={projectDescription}
          disabled={canEdit}
          onChange={handleOnChange}
        />
        <div className="d-flex justify-content-end mt-3">
          <button
            className="p-2 rounded-md text-white bg-[#6e6c35] border-1 border-dark"
            disabled={
              projectDescription.length === 0 ||
              projectDescription ===
                projectData.projectVerifierInfo.verifierDescription ||
              canEdit
            }
            onClick={() => saveVerifierDescription()}
          >
            <SaveDiskIcon />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}
