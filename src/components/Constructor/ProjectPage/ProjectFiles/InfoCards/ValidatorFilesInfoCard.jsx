import React, { useState } from "react";

import { API, graphqlOperation, Storage } from "aws-amplify";
import Card from "../../../../common/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { notify } from "../../../../../utilities/notify";
import NewValidatorFileModal from "components/Modals/NewValidatorFileModal";
import { TrashIcon } from "components/common/icons/TrashIcon";
import { DownloadIcon } from "components/common/icons/DownloadIcon";
import { convertAWSDatetimeToDate } from "../../utils";

import { useProjectData } from "context/ProjectDataContext";
import { deleteDocument, updateProductFeature } from "graphql/mutations";

export default function ValidatorFilesInfoCard(props) {
  const { className, isVerifier, projectValidatorFiles } = props;

  const { projectData, handleUpdateContextProjectFileValidators } =
    useProjectData();

  const handleDeleteVerificatorFile = async (indexToDelete) => {
    const updatedDocsData =
      projectData.projectFilesValidators.projectValidatorDocuments.filter(
        (_, index) => index !== indexToDelete
      );

    await handleUpdateContextProjectFileValidators({
      projectValidatorDocuments: updatedDocsData,
    });

    let docToDelete = {
      id: projectData.projectFilesValidators.projectValidatorDocuments[
        indexToDelete
      ].id,
    };
    await API.graphql(graphqlOperation(deleteDocument, { input: docToDelete }));

    
    let tempProductFeature = {
      id: projectData.projectFilesValidators.pfProjectValidatorDocumentsID,
      value: JSON.stringify(updatedDocsData),
    };
    await API.graphql(
      graphqlOperation(updateProductFeature, { input: tempProductFeature })
    );
  };

  return (
    <Card className={className}>
      <Card.Header title="Documentos del consultor" sep="true" />
      <Card.Body>
        {projectValidatorFiles.length > 0 ? (
          <Table className="text-center" responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Ultima actualización</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {projectValidatorFiles?.map((file, fileIndex) => {
                return (
                  <tr key={file.id}>
                    <td>{file.docTitle}</td>
                    <td>{convertAWSDatetimeToDate(file.createdAt)}</td>
                    <td className="text-end">
                      <a href={file.fileURLS3} target="_blank" rel="noreferrer">
                        <Button
                          className="m-1"
                          size="sm"
                          variant="outline-primary"
                        >
                          <DownloadIcon />
                        </Button>
                      </a>
                      {
                        isVerifier && (
                          <Button
                            className="m-1"
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteVerificatorFile(fileIndex)}
                          >
                            <TrashIcon />
                          </Button>
                        )
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <div className="text-center">
            Aún no se han subido documentos por parte de los Consultores
          </div>
        )}
      </Card.Body>
      {isVerifier && (
        <Card.Footer sep={true}>
          <div className="d-flex justify-content-center">
            <NewValidatorFileModal />
          </div>
        </Card.Footer>
      )}
    </Card>
  );
}
