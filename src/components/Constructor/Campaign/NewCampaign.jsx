import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Card from "components/common/Card";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";
import { createCampaign, updateCampaign } from "graphql/customMutations";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { Auth } from "aws-amplify";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { createProduct, createUserProduct } from "graphql/mutations";
const initialForm = {
  name: "",
  userID: "",
  description: "",
  initialDate: "",
  endDate: "",
  available: true,
  images: JSON.stringify([]),
};

export default function NewCampaign() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const userID = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((data) => {
      userID.current = data.attributes.sub;
    }).catch((error) => {
      navigate('/')
    });

  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre de la campaña es obligatorio.";
    } else if (formData.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
    } else if (formData.description.length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres.";
    }

    if (!formData.initialDate) {
      newErrors.initialDate = "La fecha inicial es obligatoria.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "La fecha de finalización es obligatoria.";
    } else if (formData.initialDate && formData.endDate < formData.initialDate) {
      newErrors.endDate =
        "La fecha de finalización no puede ser anterior a la fecha inicial.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    // Manejo especial para el campo 'images'
    if (name === "images") {
      setImages(Array.from(files)); // Guardar los archivos seleccionados en un estado independiente
    } else {
      // Actualizar el estado del formulario para otros campos
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  
    // Validación en tiempo real: Eliminar errores del campo si se corrige
    if (showErrors) {
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
  
        if (name === "name" && value.trim()) {
          if (value.length < 3) {
            updatedErrors.name = "El nombre debe tener al menos 3 caracteres.";
          } else {
            delete updatedErrors.name;
          }
        }
  
        if (name === "description" && value.trim()) {
          if (value.length < 10) {
            updatedErrors.description =
              "La descripción debe tener al menos 10 caracteres.";
          } else {
            delete updatedErrors.description;
          }
        }
  
        if (name === "initialDate" && value) {
          delete updatedErrors.initialDate;
        }
  
        if (name === "endDate" && value) {
          if (formData.initialDate && value < formData.initialDate) {
            updatedErrors.endDate =
              "La fecha de finalización no puede ser anterior a la fecha inicial.";
          } else {
            delete updatedErrors.endDate;
          }
        }
  
        return updatedErrors;
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true); // Mostrar errores solo al intentar enviar
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    formData.userID = userID.current;
    const duplicates = await checkDuplicateCampaignName(formData.name);
  if (duplicates.length > 0) {
    toast.error("El nombre de la campaña ya existe. Elige otro.");
    setLoading(false);
    return;
  }

    const timestampData = {
      ...formData,
      initialDate: formData.initialDate
        ? Math.floor(new Date(formData.initialDate).getTime() / 1000)
        : "",
      endDate: formData.endDate
        ? Math.floor(new Date(formData.endDate).getTime() / 1000)
        : "",
    };

    try {
      const result = await API.graphql(
        graphqlOperation(createCampaign, { input: timestampData })
      );
      const campaignId = result.data.createCampaign.id;
      const campaignName = formData.name;

      const result2 = await API.graphql(
        graphqlOperation(createProduct, {
          input: {
            name: `Proyecto - ${campaignName}`,
            description: "",
            isActive: false,
            categoryID: "MIXTO",
            isActiveOnPlatform: true,
            campaignID: campaignId
          },
        })
      );
      const productId = result2.data.createProduct.id;

      let imageUrls = [];
      if (images.length > 0) {
        for (let image of images) {
          const fileName = `campaign/${campaignId}-campaign/${image.name}`;
          await Storage.put(fileName, image, {
            contentType: image.type,
          });

          const imageUrlObj = `${
            process.env.REACT_APP_URL_BUCKET
          }/public/campaign/${campaignId}-campaign/${encodeURIComponent(
            image.name
          )}`;
          imageUrls.push(imageUrlObj);
        }
      }

      if (imageUrls.length > 0) {
        await API.graphql(
          graphqlOperation(updateCampaign, {
            input: {
              id: campaignId,
              images: JSON.stringify(imageUrls),
            },
          })
        );
      }
      await API.graphql(graphqlOperation(createUserProduct, { input:{
        userID: userID.current,
        productID: productId
      }}))
      toast.success("Campaña creada con éxito", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/campaign/${campaignId}`);
    } catch (error) {
      console.error("Error al crear la campaña o subir imágenes:", error);
      toast.error("Hubo un error al crear la campaña");
    } finally {
      setLoading(false);
    }
  };

  const checkDuplicateCampaignName = async (name) => {
    const query = `
      query CheckDuplicateCampaign($filter: ModelCampaignFilterInput) {
        listCampaigns(filter: $filter) {
          items {
            id
            name
          }
        }
      }
    `;
  
    try {
      const result = await API.graphql(
        graphqlOperation(query, {
          filter: {
            name: { eq: name },
          },
        })
      );
      return result.data.listCampaigns.items;
    } catch (error) {
      console.error("Error verificando duplicados:", error);
      return [];
    }
  };
  

  return (
    <div className="container-sm">
      <div className="mb-24">
        <NewHeaderNavbar />
      </div>
      <Card className="p-8">
        <Card.Body>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <h2 className="text-center mb-4">Nueva Campaña</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="pb-4" controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ingrese el nombre de la campaña"
                    isInvalid={showErrors && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="pb-4" controlId="description">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ingrese una descripción"
                    className="h-28"
                    isInvalid={showErrors && errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="pb-4" controlId="initialDate">
                  <Form.Label>Fecha inicial</Form.Label>
                  <Form.Control
                    type="date"
                    name="initialDate"
                    value={formData.initialDate}
                    onChange={handleChange}
                    isInvalid={showErrors && errors.initialDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.initialDate}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="pb-4" controlId="endDate">
                  <Form.Label>Fecha de finalización</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    isInvalid={showErrors && errors.endDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.endDate}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="pb-4" controlId="images">
                  <Form.Label>Imágenes</Form.Label>
                  <Form.Control
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 mt-3">
                  {loading ? <Spinner animation="border" size="sm" /> : "Crear"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
}
