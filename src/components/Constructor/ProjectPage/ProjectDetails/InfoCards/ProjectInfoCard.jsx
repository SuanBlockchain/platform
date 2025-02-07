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

export default function ProjectInfoCard(props) {
  const { className, autorizedUser, setProgressChange, tooltip, totalArea } =
    props;
  const {
    projectData,
    handleUpdateContextProjectInfo,
    handleUpdateContextProjectInfoLocation,
    handleSetContextProjectFile,
    refresh,
  } = useProjectData();
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
      console.log(projectData);

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
    console.log(file, "file");
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
    console.log("productFeatureToDelete:", productFeatureToDelete);
    await API.graphql(
      graphqlOperation(deleteProductFeature, { input: productFeatureToDelete })
    );

    // Eliminar document
    const documentToDelete = {
      id: file.id,
    };
    console.log("documentToDelete:", documentToDelete);
    await API.graphql(
      graphqlOperation(deleteDocument, { input: documentToDelete })
    );
    const updatedProjectData = await fetchProjectDataByProjectID(
      projectData.projectInfo.id
    );

    const updatedProjectDataFiles = updatedProjectData.projectFiles;
    await handleSetContextProjectFile(updatedProjectDataFiles);
    console.log(updatedProjectDataFiles);
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
      console.log("newProductFeature:", newProductFeature);
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
    if (name === "projectInfoTitle") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoTitle: value,
      }));
      return;
    }
    if (name === "projectInfoArea") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoArea: value,
      }));
      return;
    }
    if (name === "projectInfoDescription") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoDescription: value,
      }));
      return;
    }
    if (name === "projectInfoCategory") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoCategory: value,
      }));
      return;
    }
    if (name === "projectInfoLocationVereda") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoLocationVereda: value,
      }));
      return;
    }
    if (name === "projectInfoLocationMunicipio") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoLocationMunicipio: value,
      }));
      return;
    }
    if (name === "projectInfoLocationMatricula") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoLocationMatricula: value,
      }));
      return;
    }
    if (name === "projectInfoLocationFichaCatrastral") {
      setFormData((prevState) => ({
        ...prevState,
        projectInfoLocationFichaCatrastral: value,
      }));
      return;
    }
    if (name === "projectInfoLocationFile") {
      //const fileToSave = files[0];
      if (files) {
        await saveFileOnDB(files);
      }
      return;
    }
  };

  const handleSaveBtn = async (toSave) => {
    let error = false;

    if (toSave === "projectInfoTitle") {
      const updatedProduct = {
        id: projectData.projectInfo.id,
        name: formData.projectInfoTitle,
      };
      await API.graphql(
        graphqlOperation(updateProduct, {
          input: updatedProduct,
        })
      );
      handleUpdateContextProjectInfo({ title: formData.projectInfoTitle });
    }

    if (toSave === "projectInfoDescription") {
      const updatedProduct = {
        id: projectData.projectInfo.id,
        description: formData.projectInfoDescription,
      };
      await API.graphql(
        graphqlOperation(updateProduct, {
          input: updatedProduct,
        })
      );
      handleUpdateContextProjectInfo({
        description: formData.projectInfoDescription,
      });
    }

    if (toSave === "projectInfoCategory") {
      const updatedProduct = {
        id: projectData.projectInfo.id,
        categoryID: formData.projectInfoCategory,
      };
      await API.graphql(
        graphqlOperation(updateProduct, {
          input: updatedProduct,
        })
      );
      handleUpdateContextProjectInfo({
        category: formData.projectInfoCategory,
      });
    }

    if (toSave === "projectInfoArea") {
      if (areaPfID) {
        const updatedProductFeature = {
          id: areaPfID,
          value: formData.projectInfoArea,
        };
        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          productID: projectData.projectInfo.id,
          featureID: "D_area",
          value: formData.projectInfoArea,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        );
        setAreaPfID(response.data.createProductFeature.id);
      }
      handleUpdateContextProjectInfo({ area: formData.projectInfoArea });
    }

    if (toSave === "projectInfoLocationVereda") {
      if (veredaPfID) {
        const updatedProductFeature = {
          id: veredaPfID,
          value: formData.projectInfoLocationVereda,
        };
        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          productID: projectData.projectInfo.id,
          featureID: "A_vereda",
          value: formData.projectInfoLocationVereda,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        );
        setVeredaPfID(response.data.createProductFeature.id);
      }
      handleUpdateContextProjectInfoLocation({
        vereda: formData.projectInfoLocationVereda,
      });
    }

    if (toSave === "projectInfoLocationMunicipio") {
      if (municipioPfID) {
        const updatedProductFeature = {
          id: municipioPfID,
          value: formData.projectInfoLocationMunicipio,
        };
        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          productID: projectData.projectInfo.id,
          featureID: "A_municipio",
          value: formData.projectInfoLocationMunicipio,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        );
        setMunicipioPfID(response.data.createProductFeature.id);
      }
      handleUpdateContextProjectInfoLocation({
        municipio: formData.projectInfoLocationMunicipio,
      });
    }

    if (toSave === "projectInfoLocationMatricula") {
      if (matriculaPfID) {
        const updatedProductFeature = {
          id: matriculaPfID,
          value: formData.projectInfoLocationMatricula,
        };
        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          productID: projectData.projectInfo.id,
          featureID: "A_matricula",
          value: formData.projectInfoLocationMatricula,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        );
        setMatriculaPfID(response.data.createProductFeature.id);
      }
      handleUpdateContextProjectInfoLocation({
        matricula: formData.projectInfoLocationMatricula,
      });
    }

    if (toSave === "projectInfoLocationFichaCatrastral") {
      if (fichaPfID) {
        const updatedProductFeature = {
          id: fichaPfID,
          value: formData.projectInfoLocationFichaCatrastral,
        };
        await API.graphql(
          graphqlOperation(updateProductFeature, {
            input: updatedProductFeature,
          })
        );
      } else {
        const newProductFeature = {
          productID: projectData.projectInfo.id,
          featureID: "A_ficha_catastral",
          value: formData.projectInfoLocationFichaCatrastral,
        };

        const response = await API.graphql(
          graphqlOperation(createProductFeature, {
            input: newProductFeature,
          })
        );
        setFichaPfID(response.data.createProductFeature.id);
      }
      handleUpdateContextProjectInfoLocation({
        fichaCatrastal: formData.projectInfoLocationFichaCatrastral,
      });
    }

    notify({ msg: "Información actualizada", type: "success" });
  };

  return (
    <Card className={className}>
      <Card.Header
        title="Información del proyecto"
        sep={true}
        tooltip={tooltip}
      />
      <Card.Body>
        <div className="row">
          <div
            className={autorizedUser ? "col-12 col-md-12" : "col-12 col-md-6"}
          >
            <FormGroup
              disabled={!autorizedUser}
              type={autorizedUser && "flex"}
              label="Nombre del proyecto"
              inputName="projectInfoTitle"
              inputValue={formData.projectInfoTitle}
              saveBtnDisabled={
                projectData.projectInfo?.title === formData.projectInfoTitle
                  ? true
                  : false
              }
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              onClickSaveBtn={() => handleSaveBtn("projectInfoTitle")}
            />
          </div>
          <div
            className={autorizedUser ? "col-12 col-md-12" : "col-12 col-md-6"}
          >
            <div className={className + " mb-3"}>
              <div className="grid grid-cols-12 gap-4">
                <label className="col-span-5">Área total (m^2)</label>
                <div className="col-span-5">
                  {formatArea(totalArea)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <FormGroup
              disabled={!autorizedUser}
              type={autorizedUser && "flex"}
              inputType="textarea"
              label="Descripción"
              inputName="projectInfoDescription"
              inputValue={formData.projectInfoDescription}
              saveBtnDisabled={
                projectData.projectInfo?.description ===
                formData.projectInfoDescription
                  ? true
                  : false
              }
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              onClickSaveBtn={() => handleSaveBtn("projectInfoDescription")}
            />
          </div>
          <div
            className={autorizedUser ? "col-12 col-md-12" : "col-12 col-md-6"}
          >
            <FormGroup
              disabled={!autorizedUser}
              type={autorizedUser && "flex"}
              label="Categoria del proyecto"
              inputType="radio"
              optionList={categoryList.map((category) => {
                return {
                  label: category,
                  value: category,
                };
              })}
              optionCheckedList={formData.projectInfoCategory}
              inputName="projectInfoCategory"
              saveBtnDisabled={
                projectData.projectInfo?.category ===
                formData.projectInfoCategory
                  ? true
                  : false
              }
              onChangeInputValue={(e) => handleChangeInputValue(e)}
              onClickSaveBtn={() => handleSaveBtn("projectInfoCategory")}
            />
          </div>
          <div className="col-12">
            <div
              className={
                autorizedUser
                  ? "row row-cols-1"
                  : "row row-cols-1 row-cols-md-2"
              }
            >
              {/* <FormGroup
                disabled={!autorizedUser}
                type={autorizedUser && "flex"}
                label="Vereda al que pertenece el Predio"
                inputName="projectInfoLocationVereda"
                inputValue={formData.projectInfoLocationVereda}
                saveBtnDisabled={
                  projectData.projectInfo?.location.vereda ===
                  formData.projectInfoLocationVereda
                    ? true
                    : false
                }
                onChangeInputValue={(e) => handleChangeInputValue(e)}
                onClickSaveBtn={() =>
                  handleSaveBtn("projectInfoLocationVereda")
                }
              />
              <FormGroup
                disabled={!autorizedUser}
                type={autorizedUser && "flex"}
                label="Municipio al que pertenece el predio"
                inputName="projectInfoLocationMunicipio"
                inputValue={formData.projectInfoLocationMunicipio}
                saveBtnDisabled={
                  projectData.projectInfo?.location.municipio ===
                  formData.projectInfoLocationMunicipio
                    ? true
                    : false
                }
                onChangeInputValue={(e) => handleChangeInputValue(e)}
                onClickSaveBtn={() =>
                  handleSaveBtn("projectInfoLocationMunicipio")
                }
              /> */}
              {/* <div>
                <div className="mb-3">
                  <div className="grid grid-cols-12 gap-4">
                    <label className="col-span-5">
                      Cargue planos del predio (pueden ser a mano alzada)
                    </label>
                    <div className="col-span-5">
                      {planosPredio.length > 0 ? (
                        <>
                          {planosPredio.map((file) => (
                            <div key={file.id} className="mb-2">
                              <button
                                onClick={() => handleDeleteFile(file)}
                                size="sm"
                                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                              >
                                <XIcon />
                              </button>
                              <button
                                onClick={() =>{handleOpenObject(s3Client, bucketName, file.url)}}
                              >
                                {file.nombre}
                              </button>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p className="text-danger">
                          No se han subido planos de predio
                        </p>
                      )}
                      <input
                        type="file"
                        multiple
                        disabled={!autorizedUser}
                        ref={fileInputRef}
                        name="projectInfoLocationFile"
                        onChange={(e) => handleChangeInputValue(e)}
                        hidden
                      />
                      <button
                        disabled={!autorizedUser}
                        onClick={handleUploadButton}
                        className="px-4 py-2 text-white rounded-md hover:bg-blue-600 bg-[#6e6c35] border-1 border-dark"
                      >
                        Cargar nuevo archivo
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
