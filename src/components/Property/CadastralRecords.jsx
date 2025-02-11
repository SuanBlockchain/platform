import React, { useEffect, useRef, useState } from "react";

import { TrashIcon } from "components/common/icons/TrashIcon";
import { EditIcon } from "components/common/icons/EditIcon";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
import { PlusIcon } from "components/common/icons/PlusIcon";
import { API, Storage, graphqlOperation } from "aws-amplify";
import { handleOpenObject } from "utilities/s3clientcommands";
import { v4 as uuidv4 } from 'uuid';

// s3Client
import { useS3Client } from "context/s3ClientContext";
import { PutObjectCommand } from "@aws-sdk/client-s3";
// s3Client
import Swal from "sweetalert2";
import {
  createDocument,
  createPropertyFeature,
  updateDocument,
  deleteProductFeature,
  deleteDocument,
  updatePropertyFeature,
  createVerificationComment,
} from "graphql/mutations";
import { useAuth } from "context/AuthContext";
import WebAppConfig from "components/common/_conf/WebAppConfig";
import { XIcon } from "components/common/icons/XIcon";
import { CheckIcon } from "components/common/icons/CheckIcon";
import { getPredialDataByCadastralNumber } from "services/getPredialDataByCadastralNumber";
import { usePropertyData } from "context/PropertyDataContext";
import { notify } from "utilities/notify";
import { fetchPropertyDataByPropertyID } from "components/Constructor/ProjectPage/api";
import Card from "components/common/Card";
import { CloudUpload, Eye } from "react-bootstrap-icons";
import { MessagesIcon } from "components/common/icons/MessagesIcon";
import MessagesHistoryCard from "components/Constructor/ProjectPage/ProjectFiles/InfoCards/MessagesHistoryCard";

export default function CadastralRecords(props) {
  const { className, autorizedUser, tooltip, setTotalArea, totalArea,setHasUnsavedChanges, handleFieldChange   } = props;
  const { propertyData, refresh } = usePropertyData();
  const { user } = useAuth();
  const { s3Client, bucketName } = useS3Client();
  const fileInputRef = useRef(null);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const [multipleData, setMultipleData] = useState([]);
  const [executedOnce, setExecutedOnce] = useState(false);
  const [cadastralData, setCadastralDataPfID] = useState(null);
  const [areaDataPfID, setAreaDataPfID] = useState(null);
  const [predialFetchedData, setPredialFetchedData] = useState({});
  const [changedFields, setChangedFields] = useState({});
  const [isMessageCardActive, setIsMessageCardActive] = useState(false);
  const [selectedVerificationId, setSelectedVerificationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isFileVerifier, setIsFileVerifier] = useState(false);
  const [isDocApproved, setIsDocApproved] = useState(false);

  useEffect(() => {
    if (propertyData && propertyData.projectCadastralRecords) {
      let ownersData =
        [...propertyData.projectCadastralRecords.cadastralRecords].map(
          (cadastralData) => {
            return {
              ...cadastralData,
              editing: false,
            };
          }
        ) || [];

      setCadastralDataPfID(
        propertyData.projectCadastralRecords.cadastralDataPfID
      );
      setAreaDataPfID(propertyData.projectCadastralRecords.totalAreaPfID);

      setMultipleData(ownersData);
    }
  }, [propertyData]);

  useEffect(() => {
    async function updatePredialData() {
      const cadastralNumbersArray = multipleData.map((item) =>
        item.cadastralNumber.trim()
      );
      // Información predial
      const predialData = await getPredialDataByCadastralNumber(
        cadastralNumbersArray
      ); // Llamada a la función getData
      console.log("predialData", predialData);
      setPredialFetchedData(predialData);

      // Área total del predio
      let suma = 0;

      for (const key in predialData) {
        if (predialData.hasOwnProperty(key)) {
          const elemento = predialData[key];
          suma += elemento.AREA_TERRENO;
        }
      }
      setTotalArea(suma);
    }

    if (multipleData.length > 0 && !executedOnce) {
      updatePredialData();
      setExecutedOnce(true);
    }
    if (multipleData.length > 0 && executedOnce) {
      const obj = multipleData.filter((data) => data.editing === true)[0];
      console.log(obj);

      if (obj) {
        let cadastralNumberLength = obj.cadastralNumber.length;
        if (cadastralNumberLength === 20 || cadastralNumberLength === 30) {
          updatePredialData();
        }
      }
    }
  }, [multipleData]);

  const handleMessageButtonClick = async (fileIndex, type) => {
    const file = propertyData.projectFiles.find((doc) => doc.id === multipleData[fileIndex].documentID);
  
    if (!file || !file.verification) {
      notify({ msg: "Este archivo no tiene verificación asociada.", type: "warning" });
      return;
    }
  
    setIsMessageCardActive(true);
    setSelectedVerificationId(file.verification.id);
    setIsDocApproved(file.isApproved || false);
    setIsFileVerifier(user.role === "validator" || user.role === "constructor");
    setMessages(file.verification.messages || []);
  };

  const handleSendMessageButtonClick = async () => {
    const localMessage = {
      id: uuidv4(),
      comment: newMessage,
      createdAt: new Date().toISOString(),
      isCommentByVerifier: user.role === "validator" || user.role === "constructor",
      userName: user.name,
      elapsedTime: "Hace un momento",
    };
  
    const updatedMessages = [...messages, localMessage];
    setMessages(updatedMessages);
  
    const newVerificationComment = {
      verificationID: selectedVerificationId,
      comment: newMessage,
      isCommentByVerifier: user.role === "validator" || user.role === "constructor",
    };
  
    await API.graphql(
      graphqlOperation(createVerificationComment, { input: newVerificationComment })
    );
  
    setNewMessage("");
  };
  

  const handleFileChange = (e, indexToSaveFile) => {
    setMultipleData((prevState) =>
      prevState.map((item, index) =>
        index === indexToSaveFile
          ? { ...item, certificate: e.target.files[0] }
          : item
      )
    );
    setHasUnsavedChanges(true);
    setChangedFields((prev) => ({
      ...prev,
      [`certificate_${indexToSaveFile}`]: true,
    }));
  };

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

  const handleEditHistoricalData = async (indexToStartEditing) => {
    const isEditingSomeHistoryData = multipleData.some(
      (cadastralData) => cadastralData.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setMultipleData((prevState) =>
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

    if (name.includes("cadastraldata_")) {
      const [_, multipleDataFeature, multipleDataIndex] = name.split("_");

      setMultipleData((prevState) =>
        prevState.map((item, index) =>
          index === parseInt(multipleDataIndex)
            ? { ...item, [multipleDataFeature]: value }
            : item
        )
      );
      setHasUnsavedChanges(true);
      handleFieldChange(name, value);
       // ✅ Marcar el campo como modificado
    setChangedFields((prev) => ({
      ...prev,
      [`${multipleDataFeature}_${multipleDataIndex}`]: true,
    }));
    }
  };

  const handleAddNewPeriodToHistoricalData = async () => {
    const isEditingSomeHistoryData = multipleData.some(
      (cadastralData) => cadastralData.editing === true
    );
    if (!isEditingSomeHistoryData) {
      setMultipleData((prevState) => {
        return [
          ...prevState,
          {
            name: "",
            cadastralNumber: "",
            certificate: null,
            editing: true,
          },
        ];
      });
      setHasUnsavedChanges(true); 
    } else {
      notify({
        msg: "Guarda primero los datos antes de agregar una nueva fila",
        type: "error",
      });
    }
  };

  function getImportantValues(cadastralDataFixed) {
    return cadastralDataFixed.map((cadastralData) => {
      return {
        cadastralNumber: cadastralData.cadastralNumber.trim(),
        documentID: cadastralData.documentID,
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
    const urlPath = `public/campaign/${
      propertyData.propertyInfo.campaignID
    }-campaign/properties/${
      propertyData.propertyInfo.id
    }-property/other/archivos_postulante/certificados_tradicion/${formatFileName(
      fileToSave.name
    )}`;

    if (documentID) {
      const oldDocument = propertyData.projectFiles.find(
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

        console.log("Archivo seleccionado:", fileToSave);
        console.log("Archivo subido:", uploadImageResult);
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
      console.log("updatedProductFeature:", updatedProductFeature);
      await API.graphql(
        graphqlOperation(updatePropertyFeature, {
          input: updatedProductFeature,
        })
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
      console.log(s3Client, "s3client 284");
      console.log(urlPath, "urlPath cadastral 284");
      console.log(fileToSave, "fileToSave cadastral 285");

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: urlPath,
        Body: fileToSave,
        ContentType: fileToSave.type,
      });
      

      try {
        const uploadImageResult = await s3Client.send(command);
        console.log(uploadImageResult, "uploadImageResult");
        /* const uploadImageResult = await Storage.put(urlPath, fileToSave, {
        }); */

        console.log("Archivo seleccionado:", fileToSave);
        console.log("Archivo subido:", uploadImageResult);
      } catch (error) {
        console.error(error);
        notify({
          msg: "Ups!, parece que algo ha fallado al intentar subir el archivo",
          type: "error",
        });
        return;
      }

      const newPropertyFeature = {
        featureID: "B_owner_certificado",
        propertyID: propertyData.propertyInfo.id,
        value: fileToSave.name,
      };
      console.log("newPropertyFeature:", newPropertyFeature);
      const createPropertyFeatureResponse = await API.graphql(
        graphqlOperation(createPropertyFeature, { input: newPropertyFeature })
      );

      const newDocument = {
        propertyFeatureID:
          createPropertyFeatureResponse.data.createPropertyFeature.id,
        userID: user.id,
        timeStamp: Date.now(),
        status: "pending",
        isApproved: false,
        isUploadedToBlockChain: false,
        url: WebAppConfig.url_s3_images + urlPath,
      };

      const createDocumentResponse = await API.graphql(
        graphqlOperation(createDocument, { input: newDocument })
      );

      docID = createDocumentResponse.data.createDocument.id;
    }
    return docID;
  };

  // Crear una función que actualice el area

  const handleSaveHistoricalData = async (indexToSave) => {
    if (!predialFetchedData[multipleData[indexToSave].cadastralNumber]) {
      notify({
        msg: "Ingresa un identificador catastral valido",
        type: "error",
      });
      return;
    }
    let error = false;
    const newCadastralNumber = multipleData[indexToSave].cadastralNumber;
    const certificate = multipleData[indexToSave].certificate;
    // const count = propertyData.propertyInfo.token.historicalData.reduce((acc, hd) => (hd.period === multipleData[indexToSave].period ? acc + 1 : acc), 0);
    const isAlreadyExistingCadastralNumber =
      propertyData.projectCadastralRecords.cadastralRecords.some(
        (cd, index) =>
          cd.cadastralNumber === newCadastralNumber && index !== indexToSave
      );

    if (isAlreadyExistingCadastralNumber) {
      notify({
        msg: "El periodo que intentas guardar ya esta definido",
        type: "error",
      });
      return;
    }

    if (multipleData[indexToSave].cadastralNumber) {
      let documentID = multipleData[indexToSave].documentID;
      let docID = null;
      if (certificate) {
        console.log(
          "certificate 371",

          certificate,
          documentID
        );
        docID = await saveFileOnDB(
          certificate,
          documentID !== undefined ? documentID : null
        );
        setMultipleData((prevState) =>
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
        setMultipleData((prevState) =>
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

      let tempMD = multipleData;
      let tempMultipleData;

      if (certificate) {
        tempMultipleData = tempMD.map((item, index) =>
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
        tempMultipleData = tempMD.map((item, index) =>
          index === indexToSave
            ? {
                ...item,
                editing: false,
                updatedAt: Date.now(),
              }
            : item
        );
      }

      setMultipleData((prevState) =>
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

      if (areaDataPfID) {
        let tempPropertyFeature = {
          id: areaDataPfID,
          value: totalArea,
        };
        const response = await API.graphql(
          graphqlOperation(updatePropertyFeature, {
            input: tempPropertyFeature,
          })
        );

        if (!response.data.updatePropertyFeature) error = true;
      } else {
        let tempPropertyFeature = {
          value: totalArea,
          isToBlockChain: false,
          isOnMainCard: false,
          propertyID: propertyData.propertyInfo.id,
          featureID: "D_area",
        };
        const response = await API.graphql(
          graphqlOperation(createPropertyFeature, {
            input: tempPropertyFeature,
          })
        );

        setAreaDataPfID(response.data.createPropertyFeature.id);

        if (!response.data.createPropertyFeature) error = true;
      }

      if (cadastralData) {
        let tempPropertyFeature = {
          id: cadastralData,
          value: JSON.stringify(getImportantValues(tempMultipleData)),
        };
        const response = await API.graphql(
          graphqlOperation(updatePropertyFeature, {
            input: tempPropertyFeature,
          })
        );

        if (!response.data.updatePropertyFeature) error = true;
      } else {
        let tempPropertyFeature = {
          value: JSON.stringify(getImportantValues(tempMultipleData)),
          isToBlockChain: false,
          isOnMainCard: false,
          propertyID: propertyData.propertyInfo.id,
          featureID: "A_predio_ficha_catastral",
        };

        const response = await API.graphql(
          graphqlOperation(createPropertyFeature, {
            input: tempPropertyFeature,
          })
        );

        setCadastralDataPfID(response.data.createPropertyFeature.id);

        if (!response.data.createPropertyFeature) error = true;
      }

      /* const updatedPropertyData = await fetchPropertyDataByPropertyID(
        propertyData.propertyInfo.id
      );

      const mappedDocument = updatedPropertyData.projectFiles.find(
        (item) => item.id === docID
      );

      const projectCadastralRecordsData =
        updatedPropertyData.projectCadastralRecords; */
        setChangedFields((prev) => {
          const updatedFields = { ...prev };
          delete updatedFields[`cadastralNumber_${indexToSave}`];
          return updatedFields;
        });
        setHasUnsavedChanges(false);

      refresh();
    } else {
      notify({
        msg: "Completa todos los campos antes de guardar",
        type: "error",
      });
      return;
    }

    if (!error) {
      notify({
        msg: "Propietarios guardados exitosamente",
        type: "success",
      });
    }
  };

  const handleDeleteHistoricalData = async (indexToDelete) => {
    setDeletingIndex(indexToDelete); // Deshabilita el botón de eliminar mientras se procesa
    let error = false;
  
    try {
      // 🛑 Verificar que el índice no sea inválido antes de proceder
      if (indexToDelete < 0 || indexToDelete >= multipleData.length) {
        console.error("Índice fuera de rango:", indexToDelete);
        notify({ msg: "Error al eliminar: índice inválido.", type: "error" });
        return;
      }
  
      const documentToDelete = propertyData.projectFiles.find(
        (item) => item.id === multipleData[indexToDelete]?.documentID
      );
  
      console.log("documentToDelete", documentToDelete);
  
      if (documentToDelete) {
        // Extraer nombre del archivo de la URL
        const getFilePathRegex = /\/public\/(.+)$/;
        const fileToDeleteName = decodeURIComponent(
          documentToDelete.url.match(getFilePathRegex)?.[1] || ""
        );
  
        if (fileToDeleteName) {
          try {
            await Storage.remove(fileToDeleteName);
          } catch (error) {
            console.error("Error eliminando el archivo en S3:", error);
          }
        }
  
        // Eliminar Product Feature asociado al documento
        if (documentToDelete.pfID) {
          const pfToDelete = { id: documentToDelete.pfID };
          await API.graphql(graphqlOperation(deleteProductFeature, { input: pfToDelete }));
        }
  
        // Eliminar el documento de la base de datos
        const docToDelete = { id: documentToDelete.id };
        await API.graphql(graphqlOperation(deleteDocument, { input: docToDelete }));
      }
  
      // Filtrar el elemento eliminado
      let tempMultipleData = multipleData.filter((_, idx) => idx !== indexToDelete);
  
      // ✅ Si no quedan más elementos, asegurarse de actualizar el estado a `[]`
      setMultipleData(tempMultipleData.length > 0 ? tempMultipleData : []);
  
      // 🏗️ Actualizar el área total si es necesario
      const cadastralNumber = multipleData[indexToDelete]?.cadastralNumber;
      if (areaDataPfID && cadastralNumber && cadastralNumber in predialFetchedData) {
        const tempPropertyFeature = {
          id: areaDataPfID,
          value: totalArea - (predialFetchedData[cadastralNumber]?.AREA_TERRENO || 0),
        };
        const response = await API.graphql(graphqlOperation(updatePropertyFeature, { input: tempPropertyFeature }));
        if (!response.data.updatePropertyFeature) error = true;
      }
  
      // 🏗️ Actualizar datos catastrales si es necesario
      if (cadastralData) {
        const tempPropertyFeature = {
          id: cadastralData,
          value: JSON.stringify(getImportantValues(tempMultipleData)),
        };
        const response = await API.graphql(graphqlOperation(updatePropertyFeature, { input: tempPropertyFeature }));
        if (!response.data.updatePropertyFeature) error = true;
      } else {
        const tempPropertyFeature = {
          value: JSON.stringify(getImportantValues(tempMultipleData)),
          isToBlockChain: false,
          isOnMainCard: false,
          propertyID: propertyData.propertyInfo.id,
          featureID: "A_predio_ficha_catastral",
        };
        const response = await API.graphql(graphqlOperation(createPropertyFeature, { input: tempPropertyFeature }));
        setCadastralDataPfID(response.data.createPropertyFeature.id);
        if (!response.data.createPropertyFeature) error = true;
      }
  
      refresh();
  
      if (!error) {
        notify({ msg: "Valores borrados exitosamente", type: "success" });
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      notify({ msg: "Error al eliminar el registro", type: "error" });
    } finally {
      setDeletingIndex(null); // Habilita nuevamente el botón después de finalizar
    }
  };
  

const renderFileLinkByDocumentID = (documentID) => {
  if (documentID) {
    const document = propertyData.projectFiles.find(
      (item) => item.id === documentID
    );

    return (
      <button
        onClick={() => handleOpenObject(s3Client, bucketName, document?.url)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        📄 Ver Archivo
      </button>
    );
  }  else {
      return "Sin archivo";
    }
  };



  const renderAreaByCadastralNumber = (cadastralNumber) => {
    const cadNum = cadastralNumber.trim();
    if (cadNum in predialFetchedData) {
      return (
        parseFloat(predialFetchedData[cadNum].area).toLocaleString("es-ES") +
        " m2"
      );
    } else {
      return "...";
    }
  };

  const renderPredioNameByCadastralNumber = (cadastralNumber) => {
    const cadNum = cadastralNumber.trim();
    if (cadNum in predialFetchedData) {
      return predialFetchedData[cadNum].predio;
    } else {
      return "...";
    }
  };

  return (
    <Card className={className}>
      <Card.Header title="Información predial" sep={true} tooltip={tooltip} />
      <Card.Body>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-xs md:text-sm lg:text-base">
              <tr>
                <th className="px-4 py-2 border border-gray-300 min-w-[200px]">
                  Identificador catastral
                </th>
                <th className="px-4 py-2 border border-gray-300 min-w-[180px]">
                  Certificado de tradición
                </th>
                <th className="px-4 py-2 border border-gray-300 min-w-[200px]">
                  Nombre de predio
                </th>
                <th className="px-4 py-2 border border-gray-300 min-w-[120px]">
                  Área
                </th>
                <th className="px-4 py-2 border border-gray-300 min-w-[100px]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-xs md:text-sm lg:text-base">
              {multipleData.map((data, index) => (
                <tr key={index} className="border-b border-gray-300 text-center">
                  {data.editing ? (
                    <>
                      {/* ✅ Ahora es un input editable cuando está en modo edición */}
                      <td className="p-2 border border-gray-300">
                        <input
                          type="text"
                          className={`w-full text-center p-1 border rounded-md ${
                            changedFields[`cadastralNumber_${index}`] ? "border-red-500 bg-red-100" : ""
                          }`}
                          value={data.cadastralNumber}
                          onChange={(e) => handleChangeInputValue(e, index)}
                          name={`cadastraldata_cadastralNumber_${index}`}
                        />
                      </td>
                      <td className={`p-2 border border-gray-300 ${changedFields[`certificate_${index}`] ? "border-red-500 bg-red-100" : ""}`}>
  <div className="relative">
    <input
      type="file"
      ref={fileInputRef}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      onChange={(e) => handleFileChange(e, index)}
    />
    <button
      className={`px-3 py-1 text-white rounded ${
        changedFields[`certificate_${index}`] ? "bg-red-500" : "bg-blue-500"
      }`}
      onClick={(e) => handleUploadButton(e, index)}
    >
      {data.certificate || data.documentID !== undefined ? "Actualizar" : "Cargar"}
    </button>
  </div>
</td>


                      <td className="p-2 border border-gray-300">{renderPredioNameByCadastralNumber(data.cadastralNumber)}</td>
                      <td className="p-2 border border-gray-300">{renderAreaByCadastralNumber(data.cadastralNumber)}</td>
                      <td className="p-2 border border-gray-300 flex justify-end gap-2">
                        <button className="p-2 text-white rounded bg-green-600" onClick={() => handleSaveHistoricalData(index)}>
                          <SaveDiskIcon />
                        </button>
                        <button className="p-2 text-white rounded bg-red-500" onClick={() => handleDeleteHistoricalData(index)}>
                          <TrashIcon />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2 border border-gray-300">{data.cadastralNumber}</td>
                      <td className="p-2 border border-gray-300">{renderFileLinkByDocumentID(data.documentID)}</td>
                      <td className="p-2 border border-gray-300">{renderPredioNameByCadastralNumber(data.cadastralNumber)}</td>
                      <td className="p-2 border border-gray-300">{renderAreaByCadastralNumber(data.cadastralNumber)}</td>
                      <td className="p-2 border border-gray-300 flex justify-end gap-2">
                        <button className="p-2 text-white rounded bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!autorizedUser}
                          onClick={() => handleEditHistoricalData(index)}>
                          <EditIcon />
                        </button>
                        <button className="p-2 text-white rounded bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!autorizedUser}
                          onClick={() => handleDeleteHistoricalData(index)}>
                          <TrashIcon />
                        </button>
                        <button
  disabled={!autorizedUser}
  className="px-2 py-1 text-blue-500 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white"
  onClick={() => handleMessageButtonClick(index, 'propertyFeature')}
>
  <MessagesIcon />
</button>

                      </td>
                    </>
                  )}
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="p-2">
                  <div className="flex">
                    <button className="p-2 w-full text-white rounded bg-gray-600 flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!autorizedUser || multipleData.some(item => item.editing) || deletingIndex !== null}
                      onClick={handleAddNewPeriodToHistoricalData}>
                      <PlusIcon />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card.Body>
      {isMessageCardActive && (
  <div className="col">
    <MessagesHistoryCard
      className="scale-up-ver-top"
      messages={messages}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      handleSendMessageButtonClick={handleSendMessageButtonClick}
      isFileVerifier={isFileVerifier}
      isDocApproved={isDocApproved}
    />
  </div>
)}

    </Card>
  );
  
}
