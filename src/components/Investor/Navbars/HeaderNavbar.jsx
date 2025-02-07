import React, { Component } from "react";
// Bootstrap
import { Container, Nav, Navbar } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import s from "./HeaderNavbar.module.css";
// Import images
import TerrasachaLogo from "../../common/TerrasachaLogo";
import { Auth } from "aws-amplify";

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleChangeNavBar = this.handleChangeNavBar.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  componentDidMount(){
    Auth.currentAuthenticatedUser().then(data => this.setState({user: data})).catch(err => console.log(err))
  }
  async handleChangeNavBar(pRequest) {
    console.log("handleChangeNavBar: ", pRequest);
    this.props.changeHeaderNavBarRequest(pRequest);
  }

  async handleSignOut() {
    this.props.logOut();
  }

  findLastAuthUserKey() {
    for (let key in localStorage) {
      if (
        key.includes("CognitoIdentityServiceProvider") &&
        key.includes(".LastAuthUser")
      ) {
        const userlog = localStorage[key];
        return userlog;
      }
    }
    return null;
  }

  render() {
    let role = this.state.user?.attributes['custom:role'] || ''
    let userlog = this.state.user?.username || ''
    return (
      <>
        <Navbar key="sm" bg="light" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand href="/" style={{ marginLeft: "2%" }}>
              <TerrasachaLogo className={"w-48 h-auto"} />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Offcanvas placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <a href="/">
                    <TerrasachaLogo className={"w-48 h-auto"} />
                  </a>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                ></Nav>
                <Nav>
                  <Nav className={s.navGroup}>
                    <Nav.Link
                      href="#profile"
                      onClick={(e) =>
                        this.props.changeHeaderNavBarRequest(
                          "product_documents"
                        )
                      }
                    >
                    
                    </Nav.Link>
                    {localStorage.getItem("role") ? (
                      <div className="flex">
                        <button
                          className={s.signing}
                          onClick={() => this.handleSignOut()}
                        >
                          Desconectar
                        </button>
                        <button className="role flex flex-col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="#fff"
                          >
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                          </svg>
                          {userlog}
                          <br></br>
                          <p className="role_btn">
                            {role === "validator"
                              ? "Consultor"
                              : role === "constructor"
                              ? "Propietario"
                              : role === "analyst"
                              ? "Analista"
                              : role}
                          </p>
                        </button>
                      </div>
                    ) : (
                      <button
                        className={s.signing}
                        onClick={() => (window.location.href = "/login")}
                      >
                        Ingresar
                      </button>
                    )}
                  </Nav>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </>
    );
  }
}
