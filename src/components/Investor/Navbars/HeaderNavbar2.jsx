import React, { Component } from 'react'
// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import s from './HeaderNavbar2.module.css'

// Import images
import LOGO from '../../common/_images/suan_logo.png'

export default class HeaderNavbar2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleChangeNavBar = this.handleChangeNavBar.bind(this)
        this.handleSignOut = this.handleSignOut.bind(this)
    }
    
    async handleChangeNavBar(pRequest) {
        this.props.changeHeaderNavBarRequest(pRequest)
    }

    async handleSignOut() {
        this.props.handleSignOut()
    }

    render() {
        let role = localStorage.getItem('role')
        return (
        <Navbar key='sm' bg="light" expand='lg' fixed="top">
            <Container fluid>
                <Navbar.Brand href="/" style={{marginLeft: '2%'}}>
                <img src={LOGO} 
                height="40"
                width="auto"
                className="d-inline-block align-top"
                alt="ATP"
                />
                </Navbar.Brand>
                <Navbar.Toggle  />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-$'sm'`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-$'sm'`}
                    placement="end"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-$'sm'`}>
                            <a href='/'><img src={LOGO} 
                                width="40"
                                height="auto"
                                className="d-inline-block align-top"
                                alt="ATP"
                            /></a>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                        </Nav>
                        <Nav>
                            <Nav className={s.navGroup}>
                                {/* <Nav.Link href="#profile" onClick={(e) => this.props.changeHeaderNavBarRequest('investor_profile')}>Profile</Nav.Link>
                                <Nav.Link href="#documents" onClick={(e) => this.props.changeHeaderNavBarRequest('investor_documents')}>Documents</Nav.Link>
                                <Nav.Link href="#products" onClick={(e) => this.props.changeHeaderNavBarRequest('products_buyed')}>Products</Nav.Link> */}
                                {/* <Nav.Link href="#upload_product" onClick={(e) => this.props.changeHeaderNavBarRequest('edit_info')}>Edit Info</Nav.Link> */}
                                <Nav.Link  onClick={() => window.location.href="/creating_wallet"}>¿Cómo crear tu billetera?</Nav.Link>
                                {localStorage.getItem('role')?
                                <button className={s.signing} onClick={() => this.handleSignOut()}>Desconectar</button>:
                                <button className={s.signing} onClick={() => window.location.href="/login"}>Ingresar</button>
                                }
                            </Nav>

                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
               
        )
    }
}
