import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { notify } from "utilities/notify";
import { useProjectData } from "context/ProjectDataContext";
import { API, Storage, graphqlOperation } from "aws-amplify";
import {
  createDocument,
  createProductFeature,
  updateDocument,
  updateProductFeature,
} from "graphql/mutations";
import { useAuth } from "context/AuthContext";
import { Spinner } from "react-bootstrap";
import WebAppConfig from "components/common/_conf/WebAppConfig";

export default function NewValidatorFileModal(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);

  const { projectData, handleUpdateContextProjectFileValidators } = useProjectData();
  const { user } = useAuth();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setSelectedFiles([]);
    setFileNames([]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const names = files.map((file) => "");
    setFileNames(names);
  };

  const handleSetFileName = (e, index) => {
    const updatedFileNames = [...fileNames];
    updatedFileNames[index] = e.target.value;
    setFileNames(updatedFileNames);
  };

  const formatFileName = (fileName) => {
    const formattedFilename = fileName
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_");
    return encodeURIComponent(formattedFilename);
  };

  const uploadFilesToS3 = async (files) => {
    let urls = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      try {
        const urlPath = `${projectData.projectInfo.id}/${formatFileName(
          file.name
        )}`;
        const uploadFileResult = await Storage.put(urlPath, file, {
          level: "public",
          contentType: "*/*",
        });
        urls.push(urlPath);

      } catch (error) {
        console.error("Error al subir el archivo:", error);
        throw new Error("Error al subir el archivo");
      }
    }
    return urls;
  };

  const createDocumentsFromFileURL = async (urls, userID, pfID) => {
    const results = await Promise.all(urls.map(async (filePath, index) => {
      const awsUrlFullPath = WebAppConfig.url_s3_public_images + filePath
      const tempNewDocument = {
        isApproved: true,
        isUploadedToBlockChain: false,
        status: "validatorFile",
        timeStamp: Date.now(),
        url: awsUrlFullPath,
        userID: userID,
        productFeatureID: pfID,
      };
  
      const createDocumentResult = await API.graphql(
        graphqlOperation(createDocument, { input: tempNewDocument })
      );
  
      return {
        id: createDocumentResult.data.createDocument.id,
        docTitle: fileNames[index],
        fileURLS3: awsUrlFullPath,
        filePathS3: filePath,
        createdAt: Date.now(),
      };
    }));
  
    return results;
  };

  const handleSaveChanges = async () => {
    setIsLoadingDoc(true);

    // Crear un objeto FormData para enviar los archivos y sus nombres
    if (fileNames.some((name) => !name || !name.trim())) {
      notify({
        msg: "Por favor, llene todos los campos de nombres.",
        type: "error",
      });
      setIsLoadingDoc(false);
      return;
    }

    // Verificar que los nombres no tengan una extensión
    if (fileNames.some((name) => name.includes("."))) {
      notify({
        msg: "Los nombres de archivo no deben contener una extensión.",
        type: "error",
      });
      setIsLoadingDoc(false);
      return;
    }

    let pfProjectValidatorDocumentsID;

    if (!projectData.projectFilesValidators.pfProjectValidatorDocumentsID) {
      let tempProductFeature = {
        value: "",
        isToBlockChain: false,
        isOnMainCard: false,
        productID: projectData.projectInfo.id,
        featureID: "GLOBAL_PROJECT_VALIDATOR_FILES",
      };
      const createProductFeatureResponse = await API.graphql(
        graphqlOperation(createProductFeature, { input: tempProductFeature })
      );

      pfProjectValidatorDocumentsID =
        createProductFeatureResponse.data.createProductFeature.id;
    } else {
      pfProjectValidatorDocumentsID =
        projectData.projectFilesValidators.pfProjectValidatorDocumentsID;
    }

    const filesS3URL = await uploadFilesToS3(selectedFiles);
    const docData = await createDocumentsFromFileURL(filesS3URL, user.id, pfProjectValidatorDocumentsID);
    const updatedDocsData = [...projectData.projectFilesValidators.projectValidatorDocuments, ...docData]

    await handleUpdateContextProjectFileValidators({projectValidatorDocuments: updatedDocsData})

    let tempProductFeature = {
      id: pfProjectValidatorDocumentsID,
      value: JSON.stringify(updatedDocsData),
    };
    await API.graphql(
      graphqlOperation(updateProductFeature, { input: tempProductFeature })
    );

    setIsLoadingDoc(false);
    closeModal();
  };


  return (
    <div>
      <Button variant="primary" onClick={openModal}>
        Agregar documentación
      </Button>

      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nueva documentación</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            type="file"
            size="sm"
            multiple
            onChange={handleFileChange}
            className="mb-3"
          />
          {selectedFiles.length > 0 && (
            <div className="border">
              <div className="row row-cols-1 p-3 g-2">
                {selectedFiles.map((file, index) => (
                  <div key={index}>
                    <Form.Group controlId={`file${index}`}>
                      <Form.Label>
                        Nombre del archivo #{index + 1} ({file.name})
                      </Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        placeholder="Agrega un nombre significativo para mostrar"
                        value={fileNames[index]}
                        onChange={(e) => handleSetFileName(e, index)}
                      />
                    </Form.Group>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleSaveChanges()}>
            {isLoadingDoc ? (
              <Spinner size="sm" className="p-2"></Spinner>
            ) : (
              "Cargar"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
