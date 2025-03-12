import React, { useEffect, useRef, useState } from "react";

import Card from "../../../../common/Card";
import FormGroup from "../../../../common/FormGroup";
import { useProjectData } from "../../../../../context/ProjectDataContext";
import { API, Storage, graphqlOperation } from "aws-amplify";
import {
  createDocument,
  createProductFeature,
  deleteDocument,
  deleteProductFeature,
  updateProduct,
  updateProductFeature,
} from "graphql/mutations";
import { useAuth } from "context/AuthContext";
import { notify } from "../../../../../utilities/notify";
import useCategories from "hooks/useCategories";
import Swal from "sweetalert2";
import WebAppConfig from "components/common/_conf/WebAppConfig";
import { fetchProjectDataByProjectID } from "../../api";
import { XIcon } from "components/common/icons/XIcon";
import { useS3Client } from "context/s3ClientContext";
import { deleteFile, handleOpenObject, uploadFile } from "utilities/s3clientcommands";
import { formatArea } from "../../mappers";
import useFetchPropertiesProject from "hooks/useFetchPropertiesProject";

export default function ProjectInfoCard(props) {
  const { className, autorizedUser, setProgressChange, tooltip } =
    props;
  const {
    projectData,
    handleUpdateContextProjectInfo,
    handleUpdateContextProjectInfoLocation,
    handleSetContextProjectFile,
    refresh,
  } = useProjectData();
  const { properties } = useFetchPropertiesProject();
  const {s3Client, bucketName } = useS3Client();
  const { user } = useAuth();
  const { categoryList } = useCategories();

  const [formData, setFormData] = useState({});
  const [executedOnce, setExecutedOnce] = useState(false);
  const [areaPfID, setAreaPfID] = useState(null);
  const [veredaPfID, setVeredaPfID] = useState(null);
  const [municipioPfID, setMunicipioPfID] = useState(null);
  const [matriculaPfID, setMatriculaPfID] = useState(null);
  const [fichaPfID, setFichaPfID] = useState(null);
  const [planosPredio, setPlanosPredio] = useState([]);
  const [modifiedFields, setModifiedFields] = useState(new Set());
  const [totalArea, setTotalArea] = useState(0);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (
      projectData.projectInfo &&
      projectData.projectFeatures &&
      user &&
      !executedOnce
    ) {
      const pfIDArea =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "D_area";
        })[0]?.id || null;
      setAreaPfID(pfIDArea);

      const pfIDVereda =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "A_vereda";
        })[0]?.id || null;
      setVeredaPfID(pfIDVereda);

        const pfIDMunicipio =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "A_municipio";
        })[0]?.id || null;
      setMunicipioPfID(pfIDMunicipio);

      const pfIDMatricula =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "A_matricula";
        })[0]?.id || null;
      setMatriculaPfID(pfIDMatricula);

      const pfIDFicha =
        projectData.projectFeatures.filter((item) => {
          return item.featureID === "A_ficha_catastral";
        })[0]?.id || null;
      setFichaPfID(pfIDFicha);

      let pfIDPlanos = projectData.projectFeatures
        .filter((item) => {
          return item.featureID === "C_plano_predio";
        })
        .map((pf) => {
          return pf.id;
        });
      let planosPredioFiles = projectData.projectFiles
        .filter((item) => pfIDPlanos.includes(item.pfID))
        .map((file) => {
          const urlObj = new URL(file.url);
          const pathname = decodeURIComponent(urlObj.pathname);
          const pathParts = pathname.split("/");
          const nombreArchivo = pathParts.pop();

          return {
            id: file.id,
            pfId: file.pfID,
            nombre: nombreArchivo,
            url: file.url,
          };
        });

      setPlanosPredio(planosPredioFiles);

      setFormData((prevState) => ({
        ...prevState,
        projectInfoTitle: projectData.projectInfo?.title,
        projectInfoArea: projectData.projectInfo?.area,
        projectInfoDescription: projectData.projectInfo?.description,
        projectInfoCategory: projectData.projectInfo?.category,
        projectInfoLocationVereda: projectData.projectInfo?.location.vereda,
        projectInfoLocationMunicipio:
          projectData.projectInfo?.location.municipio,
        projectInfoLocationMatricula:
          projectData.projectInfo?.location.matricula,
        projectInfoLocationFichaCatrastral:
          projectData.projectInfo?.location.fichaCatrastal,
      }));
      setExecutedOnce(true);
    }
  }, [projectData, user]);

  const getAreaFromPf = (property) => {
    const area =
      property.propertyFeatures?.items?.find((item) => item.featureID === "D_area")?.value || "0";
    return parseFloat(area);
  };

  useEffect(() => {
    if (properties.length > 0) {
      console.log("📌 Propiedades obtenidas en ProjectInfoCard:", properties);
      const total = properties.reduce((sum, property) => sum + getAreaFromPf(property), 0);
      console.log("✅ Área total calculada en ProjectInfoCard:", total);
      setTotalArea(total);
    }
  }, [properties]);
  

  const getPlanosPredios = async (data) => {
    let pfIDPlanos = data.projectFeatures
      .filter((item) => {
        return item.featureID === "C_plano_predio";
      })
      .map((pf) => {
        return pf.id;
      });
    let planosPredioFiles = data.projectFiles
      .filter((item) => pfIDPlanos.includes(item.pfID))
      .map((file) => {
        const urlObj = new URL(file.url);
        const pathname = decodeURIComponent(urlObj.pathname);
        const pathParts = pathname.split("/");
        const nombreArchivo = pathParts.pop();

        return {
          id: file.id,
          pfId: file.pfID,
          nombre: nombreArchivo,
          url: file.url,
        };
      });
    return planosPredioFiles;
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

  const formatFileName = (fileName) => {
    const removeAccents = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
    const formattedFilename = fileName
      .toLowerCase()
      .trim()
      .replaceAll(" ", "_")
      .replaceAll("-", "_");
    const filenameWithoutAccents = removeAccents(formattedFilename);
    return encodeURIComponent(filenameWithoutAccents);
  };

  const handleDeleteFile = async (file) => {
    // Eliminar S3
    const getFilePathRegex = /\/projects\/(.+)$/;
    let fileToDeleteName = decodeURIComponent(
      file.url.match(getFilePathRegex)[1]
    );
    fileToDeleteName = 'projects/' + fileToDeleteName
    try {
      await deleteFile(s3Client, bucketName, fileToDeleteName)
    } catch (error) {
      console.error("Error removing the file:", error);
    }

    // Eliminar product feature
    const productFeatureToDelete = {
      id: file.pfId,
    };
    await API.graphql(
      graphqlOperation(deleteProductFeature, { input: productFeatureToDelete })
    );

    // Eliminar document
    const documentToDelete = {
      id: file.id,
    };
    await API.graphql(
      graphqlOperation(deleteDocument, { input: documentToDelete })
    );
    const updatedProjectData = await fetchProjectDataByProjectID(
      projectData.projectInfo.id
    );

    const updatedProjectDataFiles = updatedProjectData.projectFiles;
    await handleSetContextProjectFile(updatedProjectDataFiles);
    const planosPredios = await getPlanosPredios(updatedProjectData);
    setPlanosPredio(planosPredios);
  };

  const saveFileOnDB = async (filesToSave) => {
    for (var i = 0; i < filesToSave.length; i++) {
      const urlPath = `projects/${
        projectData.projectInfo.id
      }/other/archivos_postulante/planos_predio/${formatFileName(
        filesToSave[i].name
      )}`;
      try {
        uploadFile(s3Client, bucketName, urlPath, filesToSave[i])
      } catch (error) {
        notify({
          msg:
            "Ups!, parece que algo ha fallado al intentar subir el archivo" +
            error,
          type: "error",
        });
        return;
      }

      const newProductFeature = {
        featureID: "C_plano_predio",
        productID: projectData.projectInfo.id,
        value: filesToSave[i].name,
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
        url: WebAppConfig.url_s3_images + urlPath,
      };

      await API.graphql(
        graphqlOperation(createDocument, { input: newDocument })
      );
    }
    const updatedProjectData = await fetchProjectDataByProjectID(
      projectData.projectInfo.id
    );

    const updatedProjectDataFiles = updatedProjectData.projectFiles;
    await handleSetContextProjectFile(updatedProjectDataFiles);

    const planosPredios = await getPlanosPredios(updatedProjectData);
    setPlanosPredio(planosPredios);

    notify({
      msg: "Archivo subido correctamente.",
      type: "success",
    });
  };

  const handleChangeInputValue = async (e) => {
    const { name, value, files } = e.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    setModifiedFields((prevFields) => new Set(prevFields).add(name));
  
    if (name === "projectInfoLocationFile" && files) {
      await saveFileOnDB(files);
    }
  };

  const handleSaveBtn = async () => {
    if (modifiedFields.size === 0) {
      notify({ msg: "No hay cambios para guardar", type: "info" });
      return;
    }
  
    let error = false;
  
    for (let field of modifiedFields) {
      try {
        if (field === "projectInfoTitle") {
          const updatedProduct = { id: projectData.projectInfo.id, name: formData.projectInfoTitle };
          await API.graphql(graphqlOperation(updateProduct, { input: updatedProduct }));
          handleUpdateContextProjectInfo({ title: formData.projectInfoTitle });
        }
  
        if (field === "projectInfoDescription") {
          const updatedProduct = { id: projectData.projectInfo.id, description: formData.projectInfoDescription };
          await API.graphql(graphqlOperation(updateProduct, { input: updatedProduct }));
          handleUpdateContextProjectInfo({ description: formData.projectInfoDescription });
        }
  
        if (field === "projectInfoCategory") {
          const updatedProduct = { id: projectData.projectInfo.id, categoryID: formData.projectInfoCategory };
          await API.graphql(graphqlOperation(updateProduct, { input: updatedProduct }));
          handleUpdateContextProjectInfo({ category: formData.projectInfoCategory });
        }
  
        if (field === "projectInfoArea") {
          if (areaPfID) {
            const updatedProductFeature = { id: areaPfID, value: formData.projectInfoArea };
            await API.graphql(graphqlOperation(updateProductFeature, { input: updatedProductFeature }));
          } else {
            const newProductFeature = { productID: projectData.projectInfo.id, featureID: "D_area", value: formData.projectInfoArea };
            const response = await API.graphql(graphqlOperation(createProductFeature, { input: newProductFeature }));
            setAreaPfID(response.data.createProductFeature.id);
          }
          handleUpdateContextProjectInfo({ area: formData.projectInfoArea });
        }
  
      } catch (error) {
        console.error(`Error al actualizar ${field}:`, error);
        notify({ msg: `Error al actualizar ${field}`, type: "error" });
        error = true;
      }
    }
  
    if (!error) {
      notify({ msg: "Información actualizada con éxito", type: "success" });
      setModifiedFields(new Set()); // Limpiar los campos modificados
    }
  };
  
  return (
    <Card className={className}>
      <Card.Header title="Información del proyecto" sep={true} tooltip={tooltip} />
      <Card.Body>
        <div className="row">
          {/* Nombre del proyecto */}
          <div className="col-12">
            <FormGroup
              disabled={!autorizedUser}
              label="Nombre del proyecto"
              inputName="projectInfoTitle"
              inputValue={formData.projectInfoTitle}
              onChangeInputValue={handleChangeInputValue}
            />
          </div>
  
          {/* Área total */}
          <div className="col-12">
            <div className="mb-3">
              <div className="grid grid-cols-12 gap-4">
                <label className="col-span-5">Área total (m²)</label>
                <div className="col-span-5">{formatArea(totalArea)}</div>
              </div>
            </div>
          </div>
  
          {/* Descripción */}
          <div className="col-12">
            <FormGroup
              disabled={!autorizedUser}
              inputType="textarea"
              label="Descripción"
              inputName="projectInfoDescription"
              inputValue={formData.projectInfoDescription}
              onChangeInputValue={handleChangeInputValue}
            />
          </div>
  
          {/* Categoría del proyecto */}
          <div className="col-12">
            <FormGroup
              disabled={!autorizedUser}
              label="Categoría del proyecto"
              inputType="radio"
              optionList={categoryList.map((category) => ({
                label: category,
                value: category,
              }))}
              optionCheckedList={formData.projectInfoCategory}
              inputName="projectInfoCategory"
              onChangeInputValue={handleChangeInputValue}
            />
          </div>
  
          {/* Botón de Guardar */}
          {autorizedUser && (
            <div className="col-12 text-center mt-4">
              <button
                className="px-6 py-2 bg-[#6e6c35] text-white rounded-md hover:bg-green-700 transition-all duration-300"
                onClick={handleSaveBtn}
                disabled={modifiedFields.size === 0} // Deshabilitar si no hay cambios
              >
                Guardar Cambios
              </button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
  
  
}
