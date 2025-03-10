import React, { Component, useState } from "react";

// Bootstrap
import { Carousel } from "react-bootstrap";
// GraphQL
import { API, Auth, graphqlOperation } from "aws-amplify";
import { listProducts } from "../../../graphql/queries";
// Util
import WebAppConfig from "../../common/_conf/WebAppConfig";
// Components
import HeaderNavbar from "../Navbars/HeaderNavbar";
import Products from "../Products";
import s from "./LandingPage.module.css";
import ProductCard from "../../productCard/ProductCard";
import marketImage from "../_images/projecto.png";
import drones from "../_images/drone-con-camara.png";
import blockchain from "../_images/cadena-de-bloques.png";
import plataforma from "../_images/diseno-de-respuesta.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DropDownProjects from "components/common/DropDownProjects";
import NewHeaderNavbar from "components/common/NewHeaderNavbar";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsLanding: [],
      productsImagesIsOnCarousel: [],
      userLogged: false
    }
    this.logOut = this.logOut.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  componentDidMount = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ userLogged: { username: user.username, role: user.attributes["custom:role"] } })
    } catch (error) {

    }
    //await this.loadProducts()
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    if (this.state.userLogged && this.state.userLogged.role === 'constructor') return window.location.href = '/new_campaign'
    this.setState({ show: true });
  }

  async loadProducts() {
    const limit = 6;
    const query = `query ListProducts($limit: Int) {
      listProducts(limit: $limit) {
        items {
          id
          name
          description
          isActive
          order
          status
          categoryID
          category {
            id
            name
            isSelected
            createdAt
            updatedAt
          }
          images {
            nextToken
            items {
              id
              imageURL
              carouselDescription
              carouselLabel
              format
              isOnCarousel
              isActive
              imageURLToDisplay
              title
              productID
              order
            }
          }
          productFeatures {
            items {
              id
              isToBlockChain
              value
              productID
              feature {
                id
                name
                isTemplate
                description
                featureType {
                  name
                  id
                  description
                }
                unitOfMeasure {
                  engineeringUnit
                  id
                }
              }
              productFeatureResults {
                items {
                  id
                  isActive
                  result {
                    id
                    value
                    formula {
                      id
                      equation
                    }
                  }
                }
              }
            }
          }
          userProducts {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken 
      }
    }`;

    const listProductsResult = await API.graphql(graphqlOperation(query));
    /* let tempProductsImagesIsOnCarousel = this.state.productsImagesIsOnCarousel */
    let tempListProductsResult = listProductsResult.data.listProducts.items.map(
      (product) => {
        return product;
      }
    );
    tempListProductsResult.sort((a, b) => (a.order > b.order ? 1 : -1));
    let productsLanding = [];
    tempListProductsResult.map((product) => {
      if (
        product.images.items.length > 0 &&
        product.productFeatures.items.length > 0 &&
        product.status !== "draft" &&
        product.status !== "rejected"
      )
        productsLanding.push(product);
    });
    this.setState({
      productsLanding:
        productsLanding /* , productsImagesIsOnCarousel: tempProductsImagesIsOnCarousel */,
    });
  }
  async logOut() {
    await Auth.signOut();
    window.location.href = "/";
    localStorage.removeItem("role");
  }

  render() {
    const urlS3Image = WebAppConfig.url_s3_public_images;
    return (
      <div style={{ minHeight: "100vh" }}>

        {/* <HeaderNavbar logOut={this.logOut}></HeaderNavbar> */}
        <NewHeaderNavbar/>
        {/*         <Carousel>
        {this.state.productsImagesIsOnCarousel.map((image, idx) => (
            <Carousel.Item key={idx}>
                <img
                className="d-block w-100"
                src={urlS3Image+image.imageURL}
                alt="First slide"
                />
                <Carousel.Caption>
                <h3>{image.carouselLabel}</h3>
                <p>{image.carouselDescription}</p>
                </Carousel.Caption>
                </Carousel.Item>
        ))}
        </Carousel> */}
        <div className={s.container}>
          <h1 className='fade-in fade-in-title p-2 mx-2'>
            Aceleramos la transición hacia un<br></br>
            mundo de
            <strong> carbono neutral</strong>
          </h1>
          <p className='fade-in fade-in-paragraph p-2 mx-2 w-1/2'>
            Una <strong>plataforma</strong> para <strong>invertir</strong> en<br></br> <strong>activos ambientales</strong> en desarrollo ,<br></br>
            fácil, rápido y seguro.
          </p>
          <div className='fade-in fade-in-row row'>
            <div className='col p-2 mx-3'>
            <Button 
  style={{ backgroundColor: "#6B8E0F", color: "white", border: "none" }} 
  onClick={this.handleShow}
>
                Tengo un proyecto
              </Button>
              <DropDownProjects style={{width:"100vw"}}/>
              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <div className="row">
                    <div className="">
                      <Modal.Title className="text-center fw-bolder w-full">
                        ¿CÓMO POSTULAR MI PROYECTO?
                      </Modal.Title>
                    </div>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <ol>
                    <li>
                      Da Click en Registrarme y completa tus datos, escoge en
                      rol <strong>Propietario</strong>
                    </li>
                    <li>Ve a Perfil y luego a postular proyecto</li>
                    <li>Completa la información de tu proyecto</li>
                    <li>
                      Tu proyecto será revisado y complementado por nuestros
                      Consultores
                    </li>
                    <li>
                      Revisa la información adicional y aceptala, para que quede
                      publicado en el Marketplace
                    </li>
                  </ol>
                </Modal.Body>
                <Modal.Footer>
                  <a className='m-2 fondo-azul btn m-auto d-block' href='/login' >Registrarme</a>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div className={`${s.block} container`}>
          <div className="row m-sm-4 p-sm-2">
            <div className="col-sm-6">
              <div className={s.titleContainerProducts}>
                <h2 className="text-[#1C3541] text-4xl py-4">REDUCIMOS EL CO2</h2>
                <p className="px-2">
                  Adquiere la capacidad de <strong>neutralizar carbono</strong>,
                  respalda la agricultura regenerativa y genera un impacto en el
                  que puedas confiar plenamente. 
                </p>
                <p className="px-2 mb-3">Cada Tonelada está respaldada
                  por <strong>tecnología Blockchain</strong>, y se entrega con
                  un certificado que ofrece una transparencia total sobre el
                  proyecto específico de eliminación de carbono.</p>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-4">
  <img
    src={marketImage}
    alt="imagen plataforma"
    className="img-fluid rounded img-market"
    style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "8px" }}
  />
</div>

          </div>
        </div>
        <div className={`container-fluid bg-porque p-5`} id="porque">
          <div className={`${s.block}`}>
            <div className="row m-4 p-2">
              <h2 className="text-center">¿POR QUÉ TERRASACHA?</h2>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <svg
                    className="m-auto d-block"
                    xmlns="http://www.w3.org/2000/svg"
                    height="124"
                    viewBox="0 -960 960 960"
                    width="124"
                    fill="#6B8E0F"
                  >
                    <path d="M80-160v-120h80v-440q0-33 23.5-56.5T240-800h600v80H240v440h240v120H80Zm520 0q-17 0-28.5-11.5T560-200v-400q0-17 11.5-28.5T600-640h240q17 0 28.5 11.5T880-600v400q0 17-11.5 28.5T840-160H600Zm40-120h160v-280H640v280Zm0 0h160-160Z" />
                  </svg>
                  <h4 className="text-center titulo-azul">Tecnología</h4>
                  <p>
                    Nuestra plataforma se apalanca en tecnología blockchain para
                    lograr total transparencia en los proyectos
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <div>
                  <svg
                    className="m-auto d-block"
                    xmlns="http://www.w3.org/2000/svg"
                    height="124"
                    viewBox="0 -960 960 960"
                    width="124"
                    fill="#6B8E0F"
                  >
                    <path d="M480-80 120-280v-400l360-200 360 200v400L480-80ZM364-590q23-24 53-37t63-13q33 0 63 13t53 37l120-67-236-131-236 131 120 67Zm76 396v-131q-54-14-87-57t-33-98q0-11 1-20.5t4-19.5l-125-70v263l240 133Zm40-206q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm40 206 240-133v-263l-125 70q3 10 4 19.5t1 20.5q0 55-33 98t-87 57v131Z" />
                  </svg>
                  <h4 className="text-center titulo-azul">Confianza</h4>
                  <p>
                    Tus inversiones se verán reflejadas en tokens que con el
                    tiempo aumentarán su valor
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <div>
                  <svg
                    className="m-auto d-block"
                    xmlns="http://www.w3.org/2000/svg"
                    height="124"
                    viewBox="0 -960 960 960"
                    width="124"
                    fill="#6B8E0F"
                  >
                    <path d="M280-80v-160H0l154-240H80l280-400 120 172 120-172 280 400h-74l154 240H680v160H520v-160h-80v160H280Zm389-240h145L659-560h67L600-740l-71 101 111 159h-74l103 160Zm-523 0h428L419-560h67L360-740 234-560h67L146-320Zm0 0h155-67 252-67 155-428Zm523 0H566h74-111 197-67 155-145Zm-149 80h160-160Zm201 0Z" />
                  </svg>
                  <h4 className="text-center titulo-azul">Compromiso</h4>
                  <p>Estamos comprometidos 100% con el medio ambiente</p>
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <div>
                  <svg
                    className="m-auto d-block"
                    xmlns="http://www.w3.org/2000/svg"
                    height="124"
                    viewBox="0 -960 960 960"
                    width="124"
                    fill="#6B8E0F"
                  >
                    <path d="M480-100q-79 0-148-30t-120.5-81.5Q160-263 130-332t-30-148q0-79 30-148t81.5-120.5Q263-800 332-830t148-30v-100l160 160-160 160v-100q-108 0-184 76t-76 184q0 66 30.5 122.5T332-266q16-28 47.5-47.5T452-338q-3-21-8-42t-12-39q-11 9-24 14t-28 5q-33 0-56.5-23.5T300-480v-40q0-17-5.5-32T280-580q50-1 89 9 34 9 62 29.5t29 61.5q0 9-1.5 16.5T453-448q-13-10-26-18t-27-14q17 13 39 40t41 64q20-49 50-96.5t70-87.5q-23 16-44 34t-41 38q-7-11-11-24.5t-4-27.5q0-42 29-71t71-29h40q23 0 38-6t25-14q11-9 17-20 4 67-7 120-9 45-34 82.5T600-440q-15 0-28.5-4T547-455q-7 19-16 50.5T517-337q38 7 67 26t44 45q51-35 81.5-91T740-480h120q0 79-30 148t-81.5 120.5Q697-160 628-130t-148 30Z" />
                  </svg>
                  <h4 className="text-center titulo-azul">Experiencia</h4>
                  <p>
                    Contamos con un equipo de expertos que se asegurarán de
                    completar y calificar cada proyecto.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className={`container-fluid bg-tecnologia p-5`} id="tecnologia">
          <div className="">
            <div className="row m-4 p-2">
              <h2 className="text-center titulo-landing">NUESTRA TECNOLOGÍA</h2>
            </div>
            <div className={``}>
            <div className={`${s.block} flex flex-col sm:flex-row py-6`}>
                <div className="col mb-4 sm:mb-0">
                  <img
                    src={blockchain}
                    alt="drones"
                    className="iconstech"
                    width="124"
                  />
                </div>
                <div className="col">
                  <h4 className="">BLOCKCHAIN</h4>
                  <p>
                    Revolucionamos los mercados de carbono al hacer públicas e inmutables todas las transacciones, estableciendo un estándar inigualable de transparencia. Cada proceso de eliminación de carbono se origina, rastrea y completa en la cadena de bloques.
                  </p>
                </div>
              </div>

              <hr></hr>

             <div className={`${s.block} flex flex-col-reverse sm:flex-row py-6`}>
                <div className="col">
                  <h4 className="">DRONES</h4>
                  <p>
                    Utilizamos drones para la revisión de los terrenos y emitir
                    los resultados de la reducción de CO2
                  </p>
                </div>
                <div className="col">
                  <img
                    src={drones}
                    alt="drones"
                    className="iconstech"
                    width="124"
                  />
                </div>
              </div>
              <hr />
              <div className={`${s.block} flex flex-col sm:flex-row py-6`}>
                <div className="col">
                  <img
                    src={plataforma}
                    alt="drones"
                    className="iconstech"
                    width="124"
                  />
                </div>
                <div className="col">
                  <h4 className="">PLATAFORMA TERRASACHA</h4>
                  <p>
                    Ten control total de tus proyectos y de tus inversiones
                    desde nuestra plataforma, conecta facilmente tu wallet con
                    nosotros y obten tus tokens de manera inmediata.
                  </p>
                </div>
              </div>

            </div>
          </div>
          <div className='container-fluid fondo-azul p-5 my-24'>
          <div className='row'>
            <div className='col'>
              <h2 className='text-center'>SE PARTE DE NOSOTROS</h2>
            </div>
            <div className='col'>
              <div className="flex flex-col sm:flex-row">
                <DropDownProjects className="btn-cta mb-2 sm:mb-0" variant={'transparent'}/>
                <button className="btn-cta sm:ml-2" onClick={this.handleShow}>
                  Tengo un proyecto
                </button>
              </div>
            </div>
          </div>

          </div>
          <div className="w-full">
            <h2 className="p-4 text-nowrap">¿Quieres conocer más?</h2>
            <div className="row">
              <div className="col-12 sm:col-6">
                <a
                  className="m-auto d-block btn-landing text-center mb-2 sm:mb-0"
                  href="https://terrasacha.gitbook.io/terrasacha/readme/guia-de-usuario"
                  target="_blank"
                  rel="noreferrer"
                >
                  ¿Como entrar?
                </a>
              </div>
              <div className="col-12 sm:col-6">
                <a
                  className="m-auto d-block btn-landing text-center sm:ml-2"
                  href="https://terrasacha.gitbook.io/terrasacha"
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentación técnica
                </a>
              </div>
            </div>
          </div>


          <div className={s.containerFeaturedProducts}>
            {this.state.productsLanding.map((product) => (
              <ProductCard
                product={product}
                urlS3Image={urlS3Image}
                key={product.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
