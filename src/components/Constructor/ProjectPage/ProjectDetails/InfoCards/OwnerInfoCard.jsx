import React, { useEffect, useRef, useState } from "react";

import Card from "../../../../common/Card";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import { TrashIcon } from "components/common/icons/TrashIcon";
import { Button, Form, Table } from "react-bootstrap";
import { EditIcon } from "components/common/icons/EditIcon";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
import { PlusIcon } from "components/common/icons/PlusIcon";
import { notify } from "../../../../../utilities/notify";
import { API, Storage, graphqlOperation } from "aws-amplify";
import {
  createDocument,
  createProductFeature,
  deleteDocument,
  deleteProductFeature,
  deleteVerification,
  deleteVerificationComment,
  updateDocument,
  updateProductFeature,
} from "graphql/mutations";
import Swal from "sweetalert2";
import WebAppConfig from "components/common/_conf/WebAppConfig";
import { useAuth } from "context/AuthContext";
import { fetchProjectDataByProjectID } from "../../api";

export default function OwnerInfoCard(props) {
  const { className, autorizedUser, setProgressChange, tooltip } = props;
  const { projectData, handleUpdateContextProjectFile, handleUpdateContextProjectOwners, handleSetContextProjectFile } = useProjectData();
  const { user } = useAuth();

  const fileInputRef = useRef(null);

  const [tokenHistoricalData, setTokenHistoricalData] = useState([]);
  const [executedOnce, setExecutedOnce] = useState(false);
  const [projectOwnersPfID, setProjectOwnersPfID] = useState(null);

  useEffect(() => {
    if (projectData && projectData.projectOwners) {
      let ownersData =
        [...(projectData.projectOwners.owners)].map((ownerData) => {
          return {
            ...ownerData,
            editing: false,
          };
        }) || [];

      setProjectOwnersPfID(projectData.projectOwners.pfID);
      setTokenHistoricalData(ownersData);
    }
  }, [projectData]);

  const handleUploadButton = (index) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Este archivo será cargado y enviado a validación!",
      showCancelButton: true,
      confirmButtonText: "Cargar archivo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fileInputRef.current.click();
      }
    });
  };

  const handleFileChange = (e, indexToSaveFile) => {
    setTokenHistoricalData((prevState) =>
      prevState.map((item, index) =>
        index === indexToSaveFile
          ? { ...item, certificate: e.target.files[0] }
          : item
      )
    );
  };

  const handleEditHistoricalData = async (indexToStartEditing) => {
    const isEditingSomeHistoryData = tokenHistoricalData.some(
      (ownerData) => ownerData.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setTokenHistoricalData((prevState) =>
        prevState.map((item, index) =>
          index === indexToStartEditing ? { ...item, editing: true } : item
        )
      );
    } else {
      notify({
        msg: "Termina la edición antes de realizar una nueva",
        type: "error",
      });
    }
  };

  const handleChangeInputValue = async (e) => {
    const { name, value } = e.target;

    if (name.includes("owner_")) {
      const [_, tokenHistoryFeature, tokenHistoryIndex] = name.split("_");

      setTokenHistoricalData((prevState) =>
        prevState.map((item, index) =>
          index === parseInt(tokenHistoryIndex)
            ? { ...item, [tokenHistoryFeature]: value }
            : item
        )
      );
    }
  };

  const handleAddNewPeriodToHistoricalData = async () => {
    const isEditingSomeHistoryData = tokenHistoricalData.some(
      (ownerData) => ownerData.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setTokenHistoricalData((prevState) => {
        return [
          ...prevState,
          {
            name: "",
            docNumber: "",
            docType: "",
            certificate: null,
            editing: true,
          },
        ];
      });
    } else {
      notify({
        msg: "Guarda primero los datos antes de agregar una nueva fila",
        type: "error",
      });
    }
  };

  function getImportantValues(ownersDataFixed) {
    return ownersDataFixed.map((ownerData) => {
      return {
        name: ownerData.name.toUpperCase(),
        docType: ownerData.docType,
        docNumber: ownerData.docNumber,
        documentID: ownerData.documentID,
      };
    });
  }

  const formatFileName = (fileName) => {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const formattedFilename = fileName
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_");
    const filenameWithoutAccents = removeAccents(formattedFilename);
    return encodeURIComponent(filenameWithoutAccents);
  };

  const saveFileOnDB = async (fileToSave, documentID = null) => {
    let docID = documentID;
    const urlPath = `${
      projectData.projectInfo.id
    }/archivos_postulante/certificados_tradicion/${formatFileName(
      fileToSave.name
    )}`;

    if (documentID) {
      const oldDocument = projectData.projectFiles.find(
        (item) => item.id === documentID
      );
      // Si toca actualizar
      const getFilePathRegex = /\/public\/(.+)$/;

      // Eliminar archivo viejo de S3
      const fileToDeleteName = decodeURIComponent(
        oldDocument.url.match(getFilePathRegex)[1]
      );
      try {
        await Storage.remove(fileToDeleteName);
      } catch (error) {
        console.error("Error removing the file:", error);
      }

      //  Cargar archivo nuevo a S3
      try {
        const uploadImageResult = await Storage.put(urlPath, fileToSave, {
          level: "public",
          contentType: "*/*",
        });

      } catch (error) {
        notify({
          msg: "Ups!, parece que algo ha fallado al intentar subir el archivo",
          type: "error",
        });
        return;
      }

      // Actualizar base de datos (Product Feature y Documento)
      const updatedProductFeature = {
        id: oldDocument.pfID,
        value: fileToSave.name,
      };
      await API.graphql(
        graphqlOperation(updateProductFeature, { input: updatedProductFeature })
      );

      const updatedDocument = {
        id: oldDocument.id,
        timeStamp: Date.now(),
        status: "pending",
        isApproved: false,
        isUploadedToBlockChain: false,
        url: WebAppConfig.url_s3_public_images + urlPath,
      };

      await API.graphql(
        graphqlOperation(updateDocument, { input: updatedDocument })
      );
    } else {
      // Crear pf y document
      try {
        const uploadImageResult = await Storage.put(urlPath, fileToSave, {
          level: "public",
          contentType: "*/*",
        });


      } catch (error) {
        notify({
          msg: "Ups!, parece que algo ha fallado al intentar subir el archivo",
          type: "error",
        });
        return;
      }

      const newProductFeature = {
        featureID: "B_owner_certificado",
        productID: projectData.projectInfo.id,
        value: fileToSave.name,
      };

      const createProductFeatureResponse = await API.graphql(
        graphqlOperation(createProductFeature, { input: newProductFeature })
      );

      const newDocument = {
        productFeatureID:
          createProductFeatureResponse.data.createProductFeature.id,
        userID: user.id,
        timeStamp: Date.now(),
        status: "pending",
        isApproved: false,
        isUploadedToBlockChain: false,
        url: WebAppConfig.url_s3_public_images + urlPath,
      };

      const createDocumentResponse = await API.graphql(
        graphqlOperation(createDocument, { input: newDocument })
      );

      docID = createDocumentResponse.data.createDocument.id;
    }
    return docID;
  };

  const handleSaveHistoricalData = async (indexToSave) => {
    let error = false;
    const newDocNumber = tokenHistoricalData[indexToSave].docNumber;
    // const count = projectData.projectInfo.token.historicalData.reduce((acc, hd) => (hd.period === tokenHistoricalData[indexToSave].period ? acc + 1 : acc), 0);
    const isAlreadyExistingDocNumber =
      projectData.projectInfo.token.historicalData.some(
        (hd, index) => hd.docNumber === newDocNumber && index !== indexToSave
      );

    if (isAlreadyExistingDocNumber) {
      notify({
        msg: "El periodo que intentas guardar ya esta definido",
        type: "error",
      });
      return;
    }

    const certificate = tokenHistoricalData[indexToSave].certificate;

    if (
      tokenHistoricalData[indexToSave].name &&
      tokenHistoricalData[indexToSave].docType &&
      tokenHistoricalData[indexToSave].docNumber &&
      (certificate || tokenHistoricalData[indexToSave].documentID)
    ) {
      let documentID = tokenHistoricalData[indexToSave].documentID;
      let docID = null;
      if (certificate) {
        docID = await saveFileOnDB(
          certificate,
          documentID !== undefined ? documentID : null
        );
        setTokenHistoricalData((prevState) =>
          prevState.map((item, index) =>
            index === indexToSave
              ? {
                  ...item,
                  documentID: docID,
                  editing: false,
                  updatedAt: Date.now(),
                }
              : item
          )
        );
      } else {
        setTokenHistoricalData((prevState) =>
          prevState.map((item, index) =>
            index === indexToSave
              ? {
                  ...item,
                  editing: false,
                  updatedAt: Date.now(),
                }
              : item
          )
        );
      }

      let tempTokenHD = tokenHistoricalData;
      let tempTokenHistoricalData;

      if (certificate) {
        tempTokenHistoricalData = tempTokenHD.map((item, index) =>
          index === indexToSave
            ? {
                ...item,
                documentID: docID,
                editing: false,
                updatedAt: Date.now(),
              }
            : item
        );
      } else {
        tempTokenHistoricalData = tempTokenHD.map((item, index) =>
          index === indexToSave
            ? {
                ...item,
                editing: false,
                updatedAt: Date.now(),
              }
            : item
        );
      }

      if (projectOwnersPfID) {
        let tempProductFeature = {
          id: projectOwnersPfID,
          value: JSON.stringify(getImportantValues(tempTokenHistoricalData)),
        };
        const response = await API.graphql(
          graphqlOperation(updateProductFeature, { input: tempProductFeature })
        );

        if (!response.data.updateProductFeature) error = true;
      } else {
        let tempProductFeature = {
          value: JSON.stringify(getImportantValues(tempTokenHistoricalData)),
          isToBlockChain: false,
          isOnMainCard: false,
          productID: projectData.projectInfo.id,
          featureID: "B_owners",
        };
        const response = await API.graphql(
          graphqlOperation(createProductFeature, { input: tempProductFeature })
        );

        setProjectOwnersPfID(response.data.createProductFeature.id);

        if (!response.data.createProductFeature) error = true;
      }

      const updatedProjectData = await fetchProjectDataByProjectID(
        projectData.projectInfo.id
      );

      const mappedDocument = updatedProjectData.projectFiles.find(
        (item) => item.id === docID
      );
      const projectOwnersData = updatedProjectData.projectOwners

      await handleUpdateContextProjectFile(docID, mappedDocument);
      await handleUpdateContextProjectOwners(projectOwnersData)
    } else {
      notify({
        msg: "Completa todos los campos antes de guardar",
        type: "error",
      });
      return;
    }

    if (!error) {
      setProgressChange(true);
      notify({
        msg: "Propietarios guardados exitosamente",
        type: "success",
      });
    }
  };

  const handleDeleteHistoricalData = async (indexToDelete) => {
    let error = false;

    const documentToDelete = projectData.projectFiles.find(
      (item) => item.id === tokenHistoricalData[indexToDelete].documentID
    );

    if (documentToDelete) {
      // Borrar de S3
      const getFilePathRegex = /\/public\/(.+)$/;

      const fileToDeleteName = decodeURIComponent(
        documentToDelete.url.match(getFilePathRegex)[1]
      );
      try {
        await Storage.remove(fileToDeleteName);
      } catch (error) {
        console.error("Error removing the file:", error);
      }

      // Borrar product feature del documento
      const pfToDelete = {
        id: documentToDelete.pfID,
      };
      await API.graphql(
        graphqlOperation(deleteProductFeature, { input: pfToDelete })
      );

      // Borrar documento
      const docToDelete = {
        id: documentToDelete.id,
      };
      await API.graphql(
        graphqlOperation(deleteDocument, { input: docToDelete })
      );

      if (documentToDelete.verification) {
        // Borrar verification (si existe)
        const verificationToDelete = {
          id: documentToDelete.verification.id,
        };
        await API.graphql(
          graphqlOperation(deleteVerification, { input: verificationToDelete })
        );

        // Borrar verification comments (si existe)
        if (documentToDelete.verification.messages.length > 0) {
          documentToDelete.verification.messages.forEach(async (item) => {
            const verificationCommentToDelete = {
              id: item.id,
            };
            await API.graphql(
              graphqlOperation(deleteVerificationComment, {
                input: verificationCommentToDelete,
              })
            );
          });
        }
      }
    }

    // Actualizar tokenHistoricalData
    const tempTokenHistoricalData = tokenHistoricalData.filter(
      (_, index) => index !== indexToDelete
    );
    setTokenHistoricalData(tempTokenHistoricalData);

    if (projectOwnersPfID) {
      let tempProductFeature = {
        id: projectOwnersPfID,
        value: JSON.stringify(getImportantValues(tempTokenHistoricalData)),
      };
      const response = await API.graphql(
        graphqlOperation(updateProductFeature, { input: tempProductFeature })
      );

      if (!response.data.updateProductFeature) error = true;
    } else {
      let tempProductFeature = {
        value: JSON.stringify(getImportantValues(tempTokenHistoricalData)),
        isToBlockChain: false,
        isOnMainCard: false,
        productID: projectData.projectInfo.id,
        featureID: "B_owners",
      };
      const response = await API.graphql(
        graphqlOperation(createProductFeature, { input: tempProductFeature })
      );
      setProjectOwnersPfID(response.data.createProductFeature.id);

      if (!response.data.createProductFeature) error = true;
    }

    const updatedProjectData = await fetchProjectDataByProjectID(
      projectData.projectInfo.id
    );

    const projectOwnersData = updatedProjectData.projectOwners

    await handleUpdateContextProjectOwners(projectOwnersData)
    await handleSetContextProjectFile(updatedProjectData.projectFiles)

    if (!error) {
      setProgressChange(true);
      notify({
        msg: "Valores borrados exitosamente",
        type: "success",
      });
    }
  };

  const renderFileLinkByDocumentID = (documentID) => {
    if (documentID) {
      const document = projectData.projectFiles.find(
        (item) => item.id === documentID
      );
      return (
        <a href={document?.url} target="_blank" rel="noreferrer">
          Archivo
        </a>
      );
    } else {
      return "Sin archivo";
    }
  };

  return (
    <Card className={className}>
      <Card.Header
        title="Información de titulares"
        sep={true}
        tooltip={tooltip}
      />
      <Card.Body>
        {/* <div className="row">
          <div className="col-12 col-md-6">
            <FormGroup
              disabled
              label="Nombre del titular"
              inputValue={projectData.projectOwner?.name}
            />
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                <FormGroup
                  disabled
                  label="Tipo de documento"
                  inputType="radio"
                  optionList={[
                    { label: "CC", value: "CC" },
                    { label: "NIT", value: "NIT" },
                  ]}
                  optionCheckedList={projectData.projectOwner?.docType}
                />
              </div>
              <div className="col-6">
                <FormGroup
                  disabled
                  label="Número de identificación"
                  inputValue={projectData.projectOwner?.docNumber}
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className="row">
          <Table responsive>
            <thead className="text-center">
              <tr>
                <th style={{ width: "300px" }}>Nombre</th>
                <th style={{ width: "120px" }}>Tipo Documento</th>
                <th style={{ width: "120px" }}>Numero Documento</th>
                <th style={{ width: "120px" }}>Certificado de tradición</th>
                <th style={{ width: "120px" }}></th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {tokenHistoricalData.map((data, index) => {
                return (
                  <tr key={index} className="text-center">
                    {data.editing ? (
                      <>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={data.name}
                            className="text-center"
                            name={`owner_name_${index}`}
                            onChange={(e) => handleChangeInputValue(e)}
                          />
                        </td>
                        <td>
                          <Form.Select
                            size="sm"
                            type="text"
                            value={data.docType}
                            className="text-center"
                            name={`owner_docType_${index}`}
                            onChange={(e) => handleChangeInputValue(e)}
                          >
                            <option disabled value=""></option>
                            <option value="cc">CC</option>
                            <option value="nit">NIT</option>
                          </Form.Select>
                        </td>
                        <td>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={data.docNumber}
                            className="text-center"
                            name={`owner_docNumber_${index}`}
                            onChange={(e) => handleChangeInputValue(e)}
                          />
                        </td>
                        <td>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => handleFileChange(e, index)}
                          />
                          <Button onClick={handleUploadButton} size="sm">
                            {data.certificate || data.documentID !== undefined
                              ? "Actualizar"
                              : "Cargar"}
                          </Button>
                        </td>
                        <td className="text-end">
                          <Button
                            size="sm"
                            variant="success"
                            className="m-1"
                            onClick={() => handleSaveHistoricalData(index)}
                          >
                            <SaveDiskIcon />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            className="m-1"
                            onClick={() => handleDeleteHistoricalData(index)}
                          >
                            <TrashIcon />
                          </Button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{data.name?.toUpperCase()}</td>
                        <td>{data.docType?.toUpperCase()}</td>
                        <td>{data.docNumber}</td>
                        <td>{renderFileLinkByDocumentID(data.documentID)}</td>
                        <td className="text-end">
                          <Button
                            size="sm"
                            variant="warning"
                            className="m-1"
                            disabled={!autorizedUser}
                            onClick={() => handleEditHistoricalData(index)}
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            className="m-1"
                            disabled={!autorizedUser}
                            onClick={() => handleDeleteHistoricalData(index)}
                          >
                            <TrashIcon />
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
              <tr>
                <td colSpan={5}>
                  <div className="d-flex">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-100"
                      disabled={!autorizedUser}
                      onClick={() => handleAddNewPeriodToHistoricalData()}
                    >
                      <PlusIcon></PlusIcon>
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
