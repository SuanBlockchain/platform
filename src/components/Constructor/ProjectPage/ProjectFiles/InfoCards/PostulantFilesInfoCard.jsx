import React, { useState } from "react";

import { API, graphqlOperation, Storage } from "aws-amplify";
import Card from "../../../../common/Card";
import Spinner from "react-bootstrap/Spinner";
import { DownloadIcon } from "../../../../common/icons/DownloadIcon";
import { MessagesIcon } from "../../../../common/icons/MessagesIcon";
import { CheckIcon } from "../../../../common/icons/CheckIcon";
import { XIcon } from "../../../../common/icons/XIcon";
import {
  createVerification,
  updateDocument,
} from "../../../../../graphql/mutations";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import { useAuth } from "../../../../../context/AuthContext";
import { notify } from "../../../../../utilities/notify";
import { handleOpenObject, uploadFile } from "utilities/s3clientcommands";
import { useS3Client } from "context/s3ClientContext";
export default function PostulantFilesInfoCard(props) {
  const {
    className,
    projectFiles,
    propertyFiles,
    handleMessageButtonClick,
    setIsDocApproved,
    isVerifier,
    isPostulant,
    handleSendMessage,
  } = props;
  const [isValidating, setIsValidating] = useState(false);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const {
    handleUpdateContextDocumentStatus,
    handleUpdateContextFileVerification,
    projectData,
  } = useProjectData();
  const { s3Client, bucketName } = useS3Client();
  const { user } = useAuth();

  const fileInputRef = React.createRef();

  const handleUpdateDocumentStatus = async (fileIndex, docId, status, type) => {
    const typeVerification = {
      productFeature: 'productFeatureID',
      propertyFeature: 'propertyFeatureID'
    }
    const file = typeVerification[type] === 'productFeatureID' ? projectData.projectFiles[fileIndex] : projectData.projectPropertyFiles[fileIndex]
    let verificationId;
    console.log(file, 'file verification')
    if (!file.verification) {
      const newVerification = {
        [typeVerification[type]]: file.pfID,
        userVerifierID: user.id,
        userVerifiedID: type=== 'productFeature'?  projectData.projectPostulant.id: file.userID,
      };

      console.log(newVerification, 'newVerification');

      const createVerificationResult = await API.graphql(
        graphqlOperation(createVerification, {
          input: newVerification,
        })
      );

      const verification = createVerificationResult.data.createVerification;
      verificationId = verification.id;
      const localVerification = {
        id: verificationId,
        messages: [],
        postulantID: projectData.projectPostulant.id,
        postulantName: projectData.projectPostulant.name,
        verifierID: user.id,
        verifierName: user.name,
      };
      await handleUpdateContextFileVerification(fileIndex, localVerification);
    } else {
      verificationId = file.verification.id;
      if (file.verification.verifierID !== user.id) {
        notify({
          msg: "El archivo ya esta siendo validado por otro verificador",
          type: "error",
        });
        return;
      }
    }

    // En caso de que el proyecto no tenga ningun verificador, se actualiza el estado del proyecto a En Verificación
    // const isProjectOnVerification = projectData.projectFiles.filter(
    //   (proyectFile) => proyectFile.verification !== undefined
    // );
    // if (isProjectOnVerification.length === 0) {
    //   console.log("entro a actualizar a on_verification")
    //   await handleUpdateContextProjectInfo({ status: "En verificación" });

    //   await API.graphql(
    //     graphqlOperation(updateProduct, {
    //       input: {
    //         id: projectData.projectInfo.id,
    //         status: "on_verification",
    //       },
    //     })
    //   );
    // }

    // Actualización de estado de documento
    const updateDocumentStatus = {
      id: docId,
      isApproved: status,
      status: status ? "accepted" : "denied",
    };
    try {
      await API.graphql(
        graphqlOperation(updateDocument, {
          input: updateDocumentStatus,
        })
      );

      await handleUpdateContextDocumentStatus(fileIndex, {
        isApproved: status,
        status: status ? "accepted" : "denied",
      });
      setIsValidating(false);
      setIsDocApproved(status);

      if (status) {
        await handleSendMessage("Tú archivo fue aceptado", verificationId);
        notify({
          msg: "El archivo fue aceptado",
          type: "success",
        });
      } else {
        await handleSendMessage(
          "Tú archivo fue rechazado",
          verificationId
        );
        notify({
          msg: "El archivo fue rechazado",
          type: "success",
        });
      }
    } catch (error) {
      notify({
        msg: "Ups!, parece que algo ha fallado",
        type: "error",
      });
      return;
    }

    // En caso de que todos los documentos sean aprobados, se actualiza el estado del proyecto a Verificado
    // const approvedDocuments = projectData.projectFiles.filter(projectFile => projectFile.isApproved === true)
    // if(projectData.projectFiles.length === approvedDocuments.length + status ? 1 : 0) {
    //   console.log("entro a actualizar verified")
    //   await handleUpdateContextProjectInfo({ status: "Verificado" });

    //   await API.graphql(
    //     graphqlOperation(updateProduct, {
    //       input: {
    //         id: projectData.projectInfo.id,
    //         status: "verified",
    //       },
    //     })
    //   );
    // }
  };

  const handleUpdateDocumentFile = async (e, fileIndex, file) => {
    setIsLoadingDoc(true);

    const newFile = e.target.files[0];

    const getFilePathRegex = /\/projects\/(.+)$/;

    const verificationId = file.verification.id;

    if (newFile) {
      let fileToDeleteName = decodeURIComponent(
        file.url.match(getFilePathRegex)[1]
      );
      fileToDeleteName = "projects/" + fileToDeleteName
      console.log(fileToDeleteName, 'fileToDeleteName')
      try {
        await uploadFile(s3Client, bucketName, fileToDeleteName, file)
        console.log("Archivo seleccionado:", newFile);
      } catch (error) {
        notify({
          msg: "Ups!, parece que algo ha fallado al intentar subir el archivo",
          type: "error",
        });
        setIsLoadingDoc(false);
        return;
      }

      const tempUpdatedDocument = {
        id: file.id,
        isApproved: false,
        status: "pending",
        timeStamp: Date.now(),
      };
      try {
        await API.graphql(
          graphqlOperation(updateDocument, { input: tempUpdatedDocument })
        );
      } catch (error) {
        notify({
          msg: "Ups!, parece que algo ha fallado al intentar subir el archivo",
          type: "error",
        });
        setIsLoadingDoc(false);
        return;
      }

      await handleUpdateContextDocumentStatus(fileIndex, {
        isApproved: false,
        status: "pending",
      });

      // Agregar comentario al componente de Messages
      await handleSendMessage(
        "Se ha subido un nuevo archivo, por favor verifícalo",
        verificationId
      );

      notify({
        msg: "Archivo subido y enviado a validación exitosamente",
        type: "success",
      });
    }

    e.target.value = "";
    setIsLoadingDoc(false);
  };

  const handleUploadDocumentButtonClick = async () => {
    fileInputRef.current.click();
  };

const getValidationRender = (file, fileIndex, type) => {


  const statusMap = {
    pending: "Pendiente",
    accepted: "Aceptado",
    denied: "Comentado",
  };

  // Si el estado es "Comentado" (denied), mostrarlo normalmente y permitir hacer clic para aprobar
  if (file.status === "denied" && isVerifier) {
    return (
      <>
        <span
          className="text-gray-600 font-medium cursor-pointer hover:underline"
          onClick={() => setShowApprovalModal(true)}
        >
          {statusMap[file.status]}
        </span>

        {/* Modal de confirmación */}
        {showApprovalModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-4 rounded-md shadow-lg">
              <p className="text-lg font-semibold">¿Quieres aprobar este documento?</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-3 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
                  onClick={() => {
                    handleUpdateDocumentStatus(fileIndex, file.id, true, type);
                    setShowApprovalModal(false);
                  }}
                >
                  Sí, aprobar
                </button>
                <button
                  className="px-3 py-1 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                  onClick={() => setShowApprovalModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Si el estado es "Pendiente", permitir la verificación normal
  if (file.status === "pending" && isVerifier) {
    if (isValidating) {
      return (
        <>
          <button
            className="px-2 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
            onClick={() =>
              handleUpdateDocumentStatus(fileIndex, file.id, true, type)
            }
          >
            <CheckIcon />
          </button>
          <button
            className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={() =>
              handleUpdateDocumentStatus(fileIndex, file.id, false, type)
            }
          >
            <XIcon />
          </button>
        </>
      );
    } else {
      return (
        <button
          className="px-2 py-1 text-blue-500 rounded-md border border-blue-500 hover:bg-blue-500 hover:text-white"
          onClick={() => setIsValidating(true)}
        >
          Verificar
        </button>
      );
    }
  }

  // Para otros estados, solo mostrar el estado normalmente
  return <span className="text-gray-600 font-medium">{statusMap[file.status]}</span>;
};

  return (
    <div>
      {/* <Card className={`${className} mb-4`}>
        <Card.Header title="Documentos del postulante" sep="true" />
        <Card.Body>
          {projectFiles && projectFiles.length > 0 ? (
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Ultima actualización</th>
                  <th>Estado Validación</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {projectFiles?.map((file, fileIndex) => {
                  return (
                    <tr
                      key={file.id}
                      className="border-b-2"
                      style={{ height: "4rem" }}
                    >
                      <td>{file.title}</td>
                      <td>{file.updatedAt}</td>
                      <td>{getValidationRender(file, fileIndex, 'productFeature')}</td>
                      <td className="text-end flex justify-end items-center h-[4rem] gap-x-2">
                        {isPostulant && file.status === "denied" && (
                          <>
                            <input
                              type="file"
                              style={{ display: "none" }}
                              ref={fileInputRef}
                              onChange={(e) =>
                                handleUpdateDocumentFile(e, fileIndex, file)
                              }
                            />
                            <button
                              className="px-2 py-1 text-blue-500 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white"
                              onClick={() => handleUploadDocumentButtonClick()}
                            >
                              {isLoadingDoc ? (
                                <Spinner size="sm" className="p-2"></Spinner>
                              ) : (
                                "Actualizar documentación"
                              )}
                            </button>
                          </>
                        )}
                          <button className="px-2 py-1 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => handleOpenObject(s3Client, bucketName, file.url)}>
                            <DownloadIcon />
                          </button>
                        {file.verification && (
                          <button
                            className="px-2 py-1 text-blue-500 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white"
                            onClick={() => handleMessageButtonClick(fileIndex, 'productFeature')}
                          >
                            <MessagesIcon />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            "No se han subido archivos para validación"
          )}

        </Card.Body>
      </Card> */}
      <Card className={className}>
        <Card.Header title="Documentos de los predios" sep="true" />
        <Card.Body>
        {propertyFiles && propertyFiles.length > 0 ? (
          <table className="w-full text-center">
            <thead>
              <tr>
                <th>Predio</th>
                <th>Tipo</th>
                <th>Ultima actualización</th>
                <th>Estado Validación</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {propertyFiles?.map((file, fileIndex) => {
                return (
                  <tr
                    key={file.id}
                    className="border-b-2"
                    style={{ height: "4rem" }}
                  >
                    <td>{file.property.name}</td>
                    <td>{file.title}</td>
                    <td>{file.updatedAt}</td>
                    <td>{getValidationRender(file, fileIndex, 'propertyFeature')}</td>
                    <td className="text-end flex justify-end items-center h-[4rem] gap-x-2">
                      {isPostulant && file.status === "denied" && (
                        <>
                          <input
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={(e) =>
                              handleUpdateDocumentFile(e, fileIndex, file)
                            }
                          />
                          <button
                            className="px-2 py-1 text-blue-500 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white"
                            onClick={() => handleUploadDocumentButtonClick()}
                          >
                            {isLoadingDoc ? (
                              <Spinner size="sm" className="p-2"></Spinner>
                            ) : (
                              "Actualizar documentación"
                            )}
                          </button>
                        </>
                      )}
                        <button className="px-2 py-1 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white" onClick={() => handleOpenObject(s3Client, bucketName, file.url)}>
                          <DownloadIcon />
                        </button>
                        <button
                          className="px-2 py-1 text-blue-500 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white"
                          onClick={() => handleMessageButtonClick(fileIndex, 'propertyFeature')}
                        >
                          <MessagesIcon />
                        </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          "No se han subido archivos para validación"
        )}

        </Card.Body>
      </Card>
    </div>
  );
}