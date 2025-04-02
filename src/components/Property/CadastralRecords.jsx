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
  createVerification,
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
import { CloudUpload, Eye, EyeSlash } from "react-bootstrap-icons";
import { MessagesIcon } from "components/common/icons/MessagesIcon";
import MessagesHistoryCard from "components/Constructor/ProjectPage/ProjectFiles/InfoCards/MessagesHistoryCard";
import { getDocument } from "graphql/queries";
import { useProjectData } from "context/ProjectDataContext";

export default function CadastralRecords(props) {
  const { className, autorizedUser, tooltip, setTotalArea, totalArea,setHasUnsavedChanges, handleFieldChange, updateFormCompletion   } = props;
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
  const isOwner = propertyData.propertyCampaign.userId === user.id;
  const { handleUpdateContextFileVerification } = useProjectData();
  const [isLoading, setIsLoading] = useState(false);

  const checkFormCompletion = () => {
    if (multipleData.length > 0) {
      updateFormCompletion(true); // 🔹 Se marca como completado si hay al menos un registro
    }
  };
  


  useEffect(() => {
    if (propertyData && propertyData.projectCadastralRecords) {
      const fetchDocumentsVisibility = async () => {
        try {
          // Mapeamos los datos y consultamos la API para obtener la visibilidad correcta
          const updatedRecords = await Promise.all(
            propertyData.projectCadastralRecords.cadastralRecords.map(async (cadastralData) => {
              if (!cadastralData.documentID) {
                return { ...cadastralData, visible: false, editing: false }; // Si no tiene documento, ocultarlo por defecto
              }
  
              try {
                const response = await API.graphql(
                  graphqlOperation(getDocument, { id: cadastralData.documentID })
                );
                const documentData = response.data.getDocument;
  
                return {
                  ...cadastralData,
                  visible: documentData?.visible ?? false, // Si `visible` no existe, usar `false`
                  editing: false,
                };
              } catch (error) {
                console.error(`❌ Error obteniendo documento ${cadastralData.documentID}:`, error);
                return { ...cadastralData, visible: false, editing: false };
              }
            })
          );
  
          // ✅ Se actualizan los estados necesarios
          setMultipleData(updatedRecords);
          setCadastralDataPfID(propertyData.projectCadastralRecords.cadastralDataPfID);
          setAreaDataPfID(propertyData.projectCadastralRecords.totalAreaPfID);
  
        } catch (error) {
          console.error("❌ Error general en fetchDocumentsVisibility:", error);
        }
      };
  
      fetchDocumentsVisibility();
    }
    }, [propertyData]);
  
  useEffect(() => {
    if (multipleData.length > 0) {
      checkFormCompletion();
    }
  }, [multipleData]);
  

  useEffect(() => {
    async function updatePredialData() {
      const cadastralNumbersArray = multipleData.map((item) =>
        item.cadastralNumber.trim()
      );
      // Información predial
      const predialData = await getPredialDataByCadastralNumber(
        cadastralNumbersArray
      ); // Llamada a la función getData
     
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
    checkFormCompletion();
    setChangedFields((prev) => ({
      ...prev,
      [`certificate_${indexToSaveFile}`]: true,
    }));
  };

 const deleteFileFromS3AndDB = async (documentID) => {
    if (!documentID) {
        console.warn("⚠️ No se proporcionó documentID para eliminar.");
        return;
    }

    console.log("🗑️ Eliminando archivo y referencias para documentID:", documentID);

    const documentToDelete = propertyData.projectFiles.find(item => item.id === documentID);

    if (!documentToDelete) {
        console.warn("⚠️ Documento no encontrado en projectFiles.");
        return;
    }

    // Extraer nombre del archivo de la URL
    const getFilePathRegex = /\/public\/(.+)$/;
    const fileToDeleteName = decodeURIComponent(documentToDelete.url.match(getFilePathRegex)?.[1] || "");

    if (fileToDeleteName) {
        try {
            await Storage.remove(fileToDeleteName);
            console.log("✅ Archivo eliminado de S3:", fileToDeleteName);
        } catch (error) {
            console.error("❌ Error eliminando el archivo en S3:", error);
        }
    }

    // 🟢 Eliminar el Product Feature asociado al documento
    if (documentToDelete.pfID) {
        try {
            const pfToDelete = { id: documentToDelete.pfID };
            await API.graphql(graphqlOperation(deleteProductFeature, { input: pfToDelete }));
            console.log("✅ Product Feature eliminado correctamente:", documentToDelete.pfID);
        } catch (error) {
            console.error("❌ Error eliminando Product Feature:", error);
        }
    }

    // 🟢 Eliminar el documento de la base de datos
    try {
        const docToDelete = { id: documentToDelete.id };
        await API.graphql(graphqlOperation(deleteDocument, { input: docToDelete }));
        console.log("🗑️ Documento eliminado correctamente de la base de datos:", documentID);
    } catch (error) {
        console.error("❌ Error eliminando el documento de la base de datos:", error);
    }
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
      checkFormCompletion();
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

        if (oldDocument) {
            try {
                await deleteFileFromS3AndDB(documentID);
            } catch (error) {
                console.error("❌ Error eliminando el archivo anterior:", error);
            }

            const command = new PutObjectCommand({
              Bucket: bucketName,
              Key: urlPath,
              Body: fileToSave,
              ContentType: fileToSave.type,
          });
  
          try {
              await s3Client.send(command);
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
        const createPropertyFeatureResponse = await API.graphql(
            graphqlOperation(createPropertyFeature, { input: newPropertyFeature })
        );

            // 📌 Crear un nuevo documento en la base de datos, ya que el anterior fue eliminado
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

    } else {
        // 🚀 Subir archivo a S3 para un nuevo documento
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: urlPath,
            Body: fileToSave,
            ContentType: fileToSave.type,
        });

        try {
            await s3Client.send(command);
        } catch (error) {
            console.error(error);
            notify({
                msg: "Ups!, parece que algo ha fallado al intentar subir el archivo",
                type: "error",
            });
            return;
        }

        // 📌 Crear un nuevo Property Feature
        const newPropertyFeature = {
            featureID: "B_owner_certificado",
            propertyID: propertyData.propertyInfo.id,
            value: fileToSave.name,
        };
        const createPropertyFeatureResponse = await API.graphql(
            graphqlOperation(createPropertyFeature, { input: newPropertyFeature })
        );

        // 📌 Crear un nuevo documento en la base de datos
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
    setIsLoading(true);
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
      updateFormCompletion(true);
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
    setIsLoading(false);
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
    if (!documentID) {
      return <span className="text-gray-500">Sin archivo</span>;
    }
  
    // Verificar si `projectFiles` está disponible
    const document = propertyData?.projectFiles?.find(
      (item) => item.id === documentID
    );
  
    if (!document) {
      return <span className="text-gray-500">Documento no encontrado</span>;
    }

    const cadastralRecord = multipleData.find((item) => item.documentID === documentID);
  
    // Determinar visibilidad y permisos
    const isOwner = propertyData?.projectPostulant?.id === user?.id;
    const isCampaignOwner = propertyData?.propertyCampaign?.userId === user?.id;
    const hasFullAccess = isOwner || isCampaignOwner; // Solo dueños pueden verlo siempre
    const isVisible = cadastralRecord.visible ?? false; // Si `visible` es `undefined`, se asume `false`
    const isDisabled = !hasFullAccess && !isVisible; // Si no es dueño y el documento está oculto, se deshabilita
  
    return (
      <button
        onClick={() => handleOpenObject(s3Client, bucketName, document?.url)}
        disabled={isDisabled } // Se desactiva si no está autorizado o el documento está oculto
        className={`px-4 py-2 rounded-md transition duration-200 ${
          isDisabled 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isDisabled ? "🔒 No Disponible" : "📄 Ver Archivo"}
      </button>
    );
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

  


  const toggleVisibility = async (documentID, currentVisibility) => {
    try {
      
  
      const updatedDocument = {
        id: documentID,
        visible: !currentVisibility,
      };
  
      const response = await API.graphql(graphqlOperation(updateDocument, { input: updatedDocument }));
  
      if (response.data?.updateDocument) {
        setMultipleData((prevData) =>
          prevData.map((item) =>
            item.documentID === documentID ? { ...item, visible: !currentVisibility } : item
          )
        );
  
        notify({ msg: `El documento ahora es ${!currentVisibility ? "visible" : "no visible"}`, type: "success" });
      } else {
        console.error("⚠️ No se pudo actualizar la visibilidad en la API.");
      }
    } catch (error) {
      notify({ msg: "Hubo un error al cambiar la visibilidad del documento.", type: "error" });
    }
  };
  
  const checkAndCreateVerification = async (index, type) => {
    const typeVerification = {
      productFeature: "productFeatureID",
      propertyFeature: "propertyFeatureID",
    };
  
    // Obtener el archivo según el tipo
    const file = typeVerification[type] === "propertyFeatureID" 
      ? propertyData.projectFiles[index] 
      : propertyData.projectPropertyFiles[index];

      if (!file) {
        console.log("No se encontró el archivo, mostrando la notificación...");
        notify({
          msg: "No hay documentos que comentar.",
          type: "error",
        });
        return; // Salir de la función si no se encuentra el archivo
      }
  
    // Si el archivo no tiene verificación, creamos una nueva
    if (!file.verification) {
      const newVerification = {
        [typeVerification[type]]: file.pfID,
        userVerifierID: user.id,
        userVerifiedID: type === "productFeature" 
          ? propertyData.projectPostulant.id 
          : file.userID,
      };
  
      try {
        // Crear la verificación en la base de datos
        const createVerificationResult = await API.graphql(
          graphqlOperation(createVerification, { input: newVerification })
        );
  
        const verification = createVerificationResult.data.createVerification;
  
        // Asignamos la verificación creada al archivo
        file.verification = verification;
  
        // Creamos el objeto de verificación para el contexto
        const localVerification = {
          id: verification.id,
          messages: [],
          postulantID: propertyData.projectPostulant.id,
          postulantName: propertyData.projectPostulant.name,
          verifierID: user.id,
          verifierName: user.name,
        };
  
        // Actualizar el archivo en el contexto global
        await handleUpdateContextFileVerification(index, localVerification);
  
      } catch (error) {
        console.error("❌ Error al crear la verificación:", error);
      }
    } else {
      console.log("📌 Verificación ya existe:", file.verification);
    }
  };
  
  const handleButtonClick = async (index, type) => {
    // Primero, llama a la función para verificar y crear la verificación si no existe
    await checkAndCreateVerification(index, type);
  
    // Luego, llama a la función para mostrar los mensajes
    handleMessageButtonClick(index, type);
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
                   {/*
                <th className="px-4 py-2 border border-gray-300 min-w-[180px]">
                  Certificado de tradición
                </th>
                */}
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
                      {/*
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
                      */}

                      <td className="p-2 border border-gray-300">{renderPredioNameByCadastralNumber(data.cadastralNumber)}</td>
                      <td className="p-2 border border-gray-300">{renderAreaByCadastralNumber(data.cadastralNumber)}</td>
                      <td className="p-2 border border-gray-300 flex justify-end gap-2">
                        <button className="p-2 text-white rounded bg-green-600"  disabled={isLoading} onClick={() => handleSaveHistoricalData(index)}>
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
                     {/* <td className="p-2 border border-gray-300">{renderFileLinkByDocumentID(data.documentID, data.visible ?? true)}</td>*/}
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
                          {/* 
                          <button
    disabled={!autorizedUser}
    className="px-2 py-1 text-blue-500 rounded-md border-[1px] border-blue-500 hover:bg-blue-500 hover:text-white disabled:opacity-50 disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
    onClick={() => handleButtonClick(index, "propertyFeature")} 
  >
    <MessagesIcon />
  </button>
  */}
  {isOwner && (
  <button
    onClick={() => toggleVisibility(data.documentID, data.visible)}
    disabled={!autorizedUser}
    className={`p-2 rounded text-white transition duration-200 ${
      !autorizedUser
        ? "bg-gray-300 text-gray-500 cursor-not-allowed" // 🔒 Estilo gris cuando está deshabilitado
        : data.visible
        ? "bg-gray-500 hover:bg-gray-700"
        : "bg-green-500 hover:bg-green-700"
    }`}
    title={data.visible ? "Ocultar Documento" : "Hacer Visible"}
  >
   {data.visible ? <Eye size={20} /> : <EyeSlash size={20} />}
  </button>
)}

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
