import React, { Component } from "react";
// Bootstrap
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
// Import React Bootstrap Icons
/* import { Filter, InfoCircle } from 'react-bootstrap-icons' */
// import { InfoCircle, Rulers, Printer, Filter, Percent, ListTask } from 'react-bootstrap-icons'

// Import images
import LOGO from "../../common/_images/suan_logo.png";
import TerrasachaLogo from "components/common/TerrasachaLogo";

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changeHeaderNavBarRequest =
      this.props.changeHeaderNavBarRequest.bind(this);
    this.handleSignOut = this.props.handleSignOut.bind(this);
    this.handleChangeObjectElement = this.handleChangeObjectElement.bind(this);
  }

  async handleChangeObjectElement() {
    this.props.handleSignOut();
  }

  handleOnChangeInputForm = async (event) => {
    if (event.target.name === "desiredSubscriptionTopic") {
      await this.setState({ desiredSubscriptionTopic: event.target.value });
    }
    if (event.target.name === "desiredPublishTopic") {
      await this.setState({ desiredPublishTopic: event.target.value });
    }
  };
  // RENDER
  render() {
    let { isActualUserLogged } = this.props;
    let role = localStorage.getItem("role");
    const renderNavBar = () => {
      if (isActualUserLogged) {
        return (
          <Navbar className="bg-[#ecd798]" fixed="top">
            <Container>
              <Navbar.Brand href="/">
                <a href="/">
                  <TerrasachaLogo className={"w-48 h-auto"} />
                </a>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0 space-x-3"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <a
                    href="#products"
                    className="text-[#6e6c35] font-bold"
                    onClick={(e) =>
                      this.changeHeaderNavBarRequest("products", e)
                    }
                  >
                    Proyectos
                  </a>
                  {/* 
                  <Nav.Link
                    href="#documents"
                    onClick={(e) =>
                      this.changeHeaderNavBarRequest("documents", e)
                    }
                  >
                    Documentos
                  </Nav.Link>

                  <Nav.Link
                    href="#formulas"
                    onClick={(e) =>
                      this.changeHeaderNavBarRequest("formulas", e)
                    }
                  >
                    E Fórmulas
                  </Nav.Link>

                  <Nav.Link
                    href="#results"
                    onClick={(e) =>
                      this.changeHeaderNavBarRequest("results", e)
                    }
                  >
                    Resultados
                  </Nav.Link> */}
                  <a
                    className="text-[#6e6c35] font-bold"
                    href="#categorys"
                    onClick={(e) =>
                      this.changeHeaderNavBarRequest("categorys", e)
                    }
                  >
                    Categorías
                  </a>
                  <a
                    className="text-[#6e6c35] font-bold"
                    href="#items"
                    onClick={(e) => this.changeHeaderNavBarRequest("items", e)}
                  >
                    Items de proyectos
                  </a>
                  <a
                    className="text-[#6e6c35] font-bold"
                    href="#features"
                    onClick={(e) =>
                      this.changeHeaderNavBarRequest("features", e)
                    }
                  >
                    Características
                  </a>

                  <a
                    className="text-[#6e6c35] font-bold"
                    href="#uom"
                    onClick={(e) => this.changeHeaderNavBarRequest("uom", e)}
                  >
                    UOM
                  </a>
                </Nav>
                <Nav>
                  <div class="font-bold text-[#FE4849] border-4 border-[#FE4849] px-4 py-1 mr-4">
                    {process.env.REACT_APP_ENV}
                  </div>
                  <div style={{ fontWeight: "700", color: "#FE4849", padding: '.2rem 2rem' }}>
                  {role === "admon" ? "Administrador" : role || ""}
                  </div>
                  <Dropdown align={"end"}>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-basic"
                      style={{ margin: "0 2rem" }}
                    >
                      Más acciones
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {/* <Dropdown.Item href="/new_project">Crear proyecto</Dropdown.Item> */}
                      <Dropdown.Item
                        href="#assign_pf"
                        onClick={(e) =>
                          this.changeHeaderNavBarRequest("assign_pf", e)
                        }
                      >
                        Asignar Consultores
                      </Dropdown.Item>
                      <Dropdown.Item
                      href="#assign_analyst"
                      onClick={(e) => this.changeHeaderNavBarRequest("assign_analyst", e)}
                      >
                      Asignar Analista
                        </Dropdown.Item>

                      <Dropdown.Item
                        href="#validators"
                        onClick={(e) =>
                          this.changeHeaderNavBarRequest("validators", e)
                        }
                      >
                        Consultores
                      </Dropdown.Item>
                      {/* Nueva entrada para Analistas */}
                      <Dropdown.Item
                        href="#analysts"
                        onClick={(e) =>
                          this.changeHeaderNavBarRequest("analysts", e)
                        }
                      >
                        Analistas
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#marketplace_admin"
                        onClick={(e) =>
                          this.changeHeaderNavBarRequest("marketplace_admin", e)
                        }
                      >
                        Crear marketplace admin
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#apps_status"
                        onClick={(e) =>
                          this.changeHeaderNavBarRequest("apps_status", e)
                        }
                      >
                         Estado de las aplicaciones
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={(e) => this.handleChangeObjectElement()}>
                      Cerrar sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        );
      }
    };

    // RENDER
    return <>{renderNavBar()}</>;
  }
}
