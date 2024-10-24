import React, { useEffect, useState, useRef } from "react";
import { useProjectData } from "../../../../context/ProjectDataContext";
import AWS from 'aws-sdk';
import Card from "components/common/Card";
import { Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
import { XIcon } from "components/common/icons/XIcon";
import { notify } from "utilities/notify";
import BarGraphComponent from "./BarGraphComponent";
import ConsultOraculo from "./ConsultOraculo";

const API_URL = process.env.REACT_APP_API_URL_INTERNAL;
const API_KEY = process.env.REACT_APP_API_KEY_INTERNAL;

export default function ProjectAnalysis({ visible }) {
  const { projectData } = useProjectData();
  const [comparativeAnalysis, setComparativeAnalysis] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const inputFileRef = useRef(null);
  const [filter, setFilter] = useState("notVerified");
  const [selectedData, setSelectedData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    handleComparativeAreaAnalysis();
  }, []);

  const handleSelectProject = (data) => {
    setSelectedData(data);
    setShowResults(true);
  };

  const getDataFromAppSync = async () => {
    const query = `
      query MyQuery {
        listConsultaApi {
          rawConsulta
          resultados
          cedulaCatastral
          id
          imgAnteriorBandas
          imgAnteriorMesFinal
          imgAnteriorMesInicial
          imgAnteriorNombreImg
          imgAnteriorNubosidadMaxima
          imgAnteriorSatellite
          imgAnteriorYear
          imgPosteriorBandas
          imgPosteriorMesFinal
          imgPosteriorMesInicial
          imgPosteriorNombreImg
          imgPosteriorNubosidadMaxima
          imgPosteriorSatellite
          imgPosteriorYear
          proyectoID
          createdAt
          verificado
        }
      }
    `;
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({ query }),
      });
      const responseData = await response.json();
      if (responseData.data && responseData.data.listConsultaApi) {
        console.log("Data from AppSync:", responseData.data.listConsultaApi);
        setComparativeAnalysis(responseData.data.listConsultaApi);
        return responseData.data.listConsultaApi;
      } else {
        throw new Error('No data returned or listConsultaApi is null');
      }
    } catch (error) {
      console.error("Error fetching data from AppSync:", error);
      return null;
    }
  };
  
  const handleViewResults = (data) => {
    setSelectedData(data);
  };

  const handleComparativeAreaAnalysis = async () => {
    try {
      const data = await getDataFromAppSync();
      if (data) {
        setComparativeAnalysis(data);
      }
    } catch (error) {
      console.error("Error al obtener el análisis comparativo:", error);
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

    const formData = new FormData();
    formData.append("folder_name", projectData.projectInfo.id);
    formData.append("file", file);

    const url = "https://3x52k6rtsg.execute-api.us-east-1.amazonaws.com/v4/upload";
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log("FormData for upload:", formData);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Upload response data:", data);
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
      console.error("Error al enviar la solicitud de carga:", error);
    }
    handleClearFile();
    setUploadingFile(false);
  };

  if (!visible) return null;

  const toggleShowResults = () => {
    console.log("Antes del cambio: showResults es", showResults);
    setShowResults(!showResults); // Alternar el estado entre true y false
    console.log("Después del cambio: showResults debería cambiar");
  };
  
  return (
    <>
    {console.log("showResults:", showResults)}
      {visible && (
        <div className="container-fluid">
          {selectedData ? (
            // Se muestra el BarGraphComponent si hay datos seleccionados
            <BarGraphComponent infoBarGraph={selectedData} toggleShowResults={toggleShowResults} setSelectedData={setSelectedData} />
          ) : (
            // Se muestra la lista de proyectos si no hay datos seleccionados
            <div className="row row-cols-1 g-4">
              <div className="col-12">
                <ConsultOraculo />
              </div>
              <div className="col-12">
                <Card>
                  <Card.Header title="Análisis Comparativo de Áreas" sep={true} />
                  <Card.Body>
                    <div className="text-center mb-3">
                      <h5>Filtrar Consultas</h5>
                      <Button
                        variant={filter === "notVerified" ? "primary" : "outline-primary"}
                        onClick={() => setFilter("notVerified")}
                        className="mx-2"
                      >
                        No Verificadas
                      </Button>
                      <Button
                        variant={filter === "verified" ? "success" : "outline-success"}
                        onClick={() => setFilter("verified")}
                        className="mx-2"
                      >
                        Verificadas
                      </Button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-24">
                      <div className="d-flex flex-column w-100 align-items-center gap-4">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Projecto ID</th>
                              <th>Cédula Catastral</th>
                              <th>Fecha de Consulta</th>
                              <th>Estado</th>
                              {filter === 'verified' && <th>Acción</th>} {/* Solo se muestra si el filtro de verificados está activo */}
                            </tr>
                          </thead>
                          <tbody>
                            {comparativeAnalysis
                              .filter(item => item.proyectoID === projectData.projectInfo.id)
                              .filter(item => filter === 'all' || (filter === 'verified' && item.verificado) || (filter === 'notVerified' && !item.verificado))
                              .map((item, index) => (
                                <tr key={index}>
                                  <td>{item.proyectoID}</td>
                                  <td>{item.cedulaCatastral}</td>
                                  <td>{new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}</td>
                                  <td>{item.verificado ? 'Verificado' : 'No Verificado'}</td>
                                  {item.verificado && filter === 'verified' && (
                                    <td>
                                      <Button variant="success" onClick={() => handleSelectProject(item)}>
                                        Ver Resultados
                                      </Button>
                                    </td>
                                  )}
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
  
  
}
