import React, { useEffect, useState, useRef } from "react";
import { useProjectData } from "../../../../context/ProjectDataContext";
import Card from "components/common/Card";
import { getPolygonByCadastralNumber } from "services/getPolygonByCadastralNumber";
import { getPredialDataByCadastralNumber } from "services/getPredialDataByCadastralNumber";
import { getPredialData2ByCadastralNumber } from "services/getPredialData2ByCadastralNumber";
import { Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
import { XIcon } from "components/common/icons/XIcon";
import { notify } from "utilities/notify";
import BarGraphComponent from "./BarGraphComponent";
import ConsultOraculo from "./ConsultOraculo";
export default function ProjectAnalysis({ visible }) {
  const { projectData } = useProjectData();
  const [comparativeAnalysis, setComparativeAnalysis] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const inputFileRef = useRef(null);

  useEffect(() => {
    handleComparativeAreaAnalysis();
  }, []);

  const getPolygonGeoJson = async () => {
    const cadastralNumbersArray =
      projectData.projectCadastralRecords.cadastralRecords.map(
        (item) => item.cadastralNumber
      );

    if (cadastralNumbersArray.length > 0) {
      let polygonGeoJson = await getPolygonByCadastralNumber(
        cadastralNumbersArray
      ); // Llamada a la función getData
      const predialData = await getPredialDataByCadastralNumber(
        cadastralNumbersArray
      ); // Llamada a la función getData
      const predialData2 = await getPredialData2ByCadastralNumber(
        cadastralNumbersArray
      ); // Llamada a la función getData

      if (polygonGeoJson) {
        polygonGeoJson.features = polygonGeoJson.features.map(
          (feature, index) => {
            return {
              ...feature,
              properties: {
                ...feature.properties,
                ...predialData[feature.properties.CODIGO],
                ...predialData2[feature.properties.CODIGO],
              },
            };
          }
        );
      }

      return polygonGeoJson;
    }

    alert(
      "No hay datos disponibles para descargar (El proyecto no tiene información predial asociada)"
    );
    return null;
  };

  // const handleDownloadGeoJsonButton = async () => {
  //   const geoJsonPolygonsObject = await getPolygonGeoJson();
  //   if (geoJsonPolygonsObject) {
  //     const finalObject = {
  //       projectID: projectData.projectInfo.id,
  //       geoJson: geoJsonPolygonsObject,
  //     };
  //     generateJSONFile(finalObject, projectData.projectInfo.id);
  //   }
  // };

  const handleDownloadGeoJsonButton = async () => {
    const geoJsonPolygonsObject = await getPolygonGeoJson();
    if (geoJsonPolygonsObject) {
      console.log("geoJsonPolygonsObject", geoJsonPolygonsObject);

      // const modifiedObject = {
      //   type: "string",
      //   features: [geoJsonPolygonsObject],
      // };

      const modifiedObject = geoJsonPolygonsObject;

      const endpoint =
        "https://oraculo.terrasacha.com/api/v1/consulta-proyecto";

      const idProyecto = projectData.projectInfo.id;
      const url = `${endpoint}?id_proyecto=${idProyecto}`;
      const request = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedObject),
      });

      const response = await request.json();

      if (response) {
        console.log("JSON enviado exitosamente");
      } else {
        console.error("Error al enviar JSON:");
      }
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleClearFile = () => {
    setFile(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = null;
    }
  };
  const handleAddFileChange = async () => {
    setUploadingFile(true);
    if (!file) {
      notify({
        msg: "No se ha seleccionado ningún archivo.",
        type: "error",
      });
      return;
    }

    const formData = new FormData(); // Crear un objeto FormData para enviar los datos

    formData.append("folder_name", projectData.projectInfo.id); // Añadir el nombre de la carpeta
    formData.append("file", file); // Añadir el archivo seleccionado

    const url =
      "https://3x52k6rtsg.execute-api.us-east-1.amazonaws.com/v4/upload";
    const apiKey = "ZDkguG9HwA5bAwAMQISGy1lukLsB9xA72vuzBFFB";
    console.log(formData);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: formData,
      });

      const data = await response.json();
      switch (data.statusCode) {
        case 400:
          notify({
            msg: data.body,
            type: "error",
          });
          break;
        case 200:
          notify({
            msg: data.body,
            type: "success",
          });
          await handleComparativeAreaAnalysis();
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
    handleClearFile();
    setUploadingFile(false);
  };

  const handleComparativeAreaAnalysis = async () => {
    try {
      console.log(projectData.projectInfo.id, "projectData.projectInfo.id");
      const response = await fetch(
        `${process.env.REACT_APP_URL_BUCKET}/public/${projectData.projectInfo.id}/data/area_analysis.json`
      );
      const data = await response.json();
      console.log(data, "handleComparativeAreaAnalysis");
      return setComparativeAnalysis(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {visible && (
        <div className="row row-cols-1 g-4 mb-5">
          <div className="col-12">
            <ConsultOraculo />
          </div>
          <div className="col-12">
            <Card>
              <Card.Header title="Analisis" sep={true} />
              <Card.Body>
                <div className="d-flex align-items-center">
                  <p className="mb-0 me-4">Descargar datos de poligonos:</p>
                  <Button className="bg-[#6e6c35] border-1 border-dark" style={{backgroundColor: "#6e6c35"}} onClick={handleDownloadGeoJsonButton}>
                    JSON File
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12">
            <Card>
              <Card.Header title="Análisis Comparativo de Áreas" sep={true} />
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center mb-24">
                  <div className="d-flex flex-column w-100 align-items-center gap-4">
                    {comparativeAnalysis ? (
                      <>
                        <h4>Evolución de áreas</h4>
                        <BarGraphComponent
                          infoBarGraph={comparativeAnalysis.graphJSON_barras}
                        />
                        {/* <h4 className="pt-4">
                          Diagrama de Sankey - Cambios en Vegetación
                        </h4>
                        <SankeyGraphComponent
                          infoSankeyGraph={comparativeAnalysis.graphJSON_sankey}
                        /> */}
                      </>
                    ) : (
                      <div className="d-flex align-items-center w-100">
                        <Form.Group controlId="formFile" className="mb-3">
                          <Form.Label>
                            Agregar información de comparación de areas
                          </Form.Label>
                          <div className="d-flex">
                            <Form.Control
                              type="file"
                              size="md"
                              ref={inputFileRef}
                              style={{ marginRight: ".7rem" }}
                              onChange={handleFileChange}
                            />
                            <Button
                              className="bg-[#6e6c35] border-1 border-dark" style={{backgroundColor: "#6e6c35", marginRight: ".7rem"}}
                              disabled={!file}
                              onClick={() => handleAddFileChange()}
                            >
                              {!uploadingFile ? (
                                <SaveDiskIcon />
                              ) : (
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  role="status"
                                ></Spinner>
                              )}
                            </Button>
                            {file && !uploadingFile && (
                              <Button
                                variant="danger"
                                onClick={() => handleClearFile()}
                              >
                                <XIcon />
                              </Button>
                            )}
                          </div>
                        </Form.Group>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
