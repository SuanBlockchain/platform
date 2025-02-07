import React, { useState } from "react";
import Card from "components/common/Card";
import { Button, Form, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { SaveDiskIcon } from "components/common/icons/SaveDiskIcon";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "utilities/notify";

const satelliteOptions = ['LC08', 'LC09'];
const yearOptions = Array.from({ length: new Date().getFullYear() - 2016 }, (_, i) => (2017 + i).toString());
const monthOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const initialState = {
  projectID: '',
  cedula_catastral: '',
  img_anterior: {
    satellite: 'LC08',
    year_selected: '2014',
    month_initial: '01',
    month_final: '12',
    nubosidad_maxima: 100,
  },
  img_posterior: {
    satellite: 'S2',
    year_selected: '2022',
    month_initial: '01',
    month_final: '12',
    nubosidad_maxima: 40,
  }
}

export default function ConsultOraculo() {
  const [formData, setFormData] = useState(initialState);
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImgAnteriorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      img_anterior: {
        ...prevData.img_anterior,
        [name]: value,
      },
    }));
  };

  const handleImgPosteriorChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      img_posterior: {
        ...prevData.img_posterior,
        [name]: value,
      },
    }));
  };

  const notify = (text, method) => {
    toast[method](text, { //method: success, error
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = `https://oraculo.terrasacha.com/api/v1/consulta-proyecto?projectID=${formData.projectID}&cedula_catastral=${formData.cedula_catastral}&img_anterior.satellite=${formData.img_anterior.satellite}
    &img_anterior.year_selected=${formData.img_anterior.year_selected}&img_anterior.month_initial=${formData.img_anterior.month_initial}&img_anterior.month_final=${formData.img_anterior.month_final}
    &img_anterior.nubosidad_maxima=${formData.img_anterior.nubosidad_maxima}&img_posterior.satellite=${formData.img_posterior.satellite}&img_posterior.year_selected=${formData.img_posterior.year_selected}
    &img_posterior.month_initial=${formData.img_posterior.month_initial}&img_posterior.month_final=${formData.img_posterior.month_final}&img_posterior.nubosidad_maxima=${formData.img_posterior.nubosidad_maxima}`;


    try {
      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({})
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
      notify('Enviado con exito', 'success');
  } catch (error) {
      console.error('Error:', error);
      notify('Fallo el envio de la informacion', 'error');
  } finally {
      setLoading(false);
  }
  };

  console.log("Sending cedula_catastral:", formData.cedula_catastral);


  return (
    <Card>
      <Card.Header title="Análisis Comparativo de Áreas" sep={true} />
      <Card.Body>
        <div className="d-flex justify-content-center align-items-center mb-24">
          <div className="d-flex flex-column w-100 align-items-center gap-4">
              <Form onSubmit={handleSubmit} className="w-100">
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="formProjectID">
                        <Form.Label>Project ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="projectID"
                            value={formData.projectID}
                            onChange={handleInputChange}
                            required
                        />
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="formCedulaCatastral">
                    <Form.Label>Cédula Catastral</Form.Label>
                    <Form.Control
                        type="text"
                        name="cedula_catastral"
                        value={formData.cedula_catastral}
                        onChange={handleInputChange}
                    />
                    </Form.Group>
                    </Col>
                </Row>
                <h5>Imagen Anterior</h5>
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="formSatelliteAnterior">
                          <Form.Label>Satélite</Form.Label>
                          <Form.Select
                              name="satellite"
                              value={formData.img_anterior.satellite}
                              onChange={handleImgAnteriorChange}
                          >
                              {satelliteOptions.map(option => (
                                  <option key={option} value={option}>{option}</option>
                              ))}
                          </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formNubosidadMaximaAnterior">
                        <Form.Label>Nubosidad Máxima</Form.Label>
                        <Form.Control
                            type="number"
                            name="nubosidad_maxima"
                            value={formData.img_anterior.nubosidad_maxima}
                            onChange={handleImgAnteriorChange}
                        />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <Form.Group controlId="formYearSelectedAnterior">
                    <Form.Label>Año Seleccionado</Form.Label>
                        <Form.Select
                            name="year_selected"
                            value={formData.img_anterior.year_selected}
                            onChange={handleImgAnteriorChange}
                        >
                            {yearOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formMonthInitialAnterior">
                      <Form.Label>Mes Inicial</Form.Label>
                        <Form.Select
                            name="month_initial"
                            value={formData.img_anterior.month_initial}
                            onChange={handleImgAnteriorChange}
                        >
                            {monthOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formMonthFinalAnterior">
                      <Form.Label>Mes Final</Form.Label>
                        <Form.Select
                            name="month_final"
                            value={formData.img_anterior.month_final}
                            onChange={handleImgAnteriorChange}
                        >
                            {monthOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <h5 className="mt-4">Imagen Posterior</h5>
                <Row className="mt-4">
                    <Col>
                        <Form.Group controlId="formSatellitePosterior">
                          <Form.Label>Satélite</Form.Label>
                          <Form.Select
                              name="satellite"
                              value={formData.img_posterior.satellite}
                              onChange={handleImgPosteriorChange}
                          >
                              {satelliteOptions.map(option => (
                                  <option key={option} value={option}>{option}</option>
                              ))}
                          </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formNubosidadMaximaPosterior">
                        <Form.Label>Nubosidad Máxima</Form.Label>
                        <Form.Control
                            type="number"
                            name="nubosidad_maxima"
                            value={formData.img_posterior.nubosidad_maxima}
                            onChange={handleImgPosteriorChange}
                        />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <Form.Group controlId="formYearSelectedPosterior">
                    <Form.Label>Año Seleccionado</Form.Label>
                        <Form.Select
                            name="year_selected"
                            value={formData.img_posterior.year_selected}
                            onChange={handleImgPosteriorChange}
                        >
                            {yearOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formMonthInitialPosterior">
                      <Form.Label>Mes Inicial</Form.Label>
                        <Form.Select
                            name="month_initial"
                            value={formData.img_posterior.month_initial}
                            onChange={handleImgPosteriorChange}
                        >
                            {monthOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formMonthFinalPosterior">
                      <Form.Label>Mes Final</Form.Label>
                        <Form.Select
                            name="month_final"
                            value={formData.img_posterior.month_final}
                            onChange={handleImgPosteriorChange}
                        >
                            {monthOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Button type="submit" disabled={loading} className="mt-8 d-flex gap-x-3 border-1 border-dark" style={{backgroundColor: "#6e6c35"}}>
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <SaveDiskIcon />
                  )}
                  Enviar Consulta
                </Button>
              </Form>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
