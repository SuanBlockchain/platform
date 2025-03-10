import React, { Component } from 'react'
// Bootstrap
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
// Import React Bootstrap Icons
import { ListTask } from 'react-bootstrap-icons'

// Import images
import LOGO from '../../common/_images/suan_logo.png'

export default class HeaderNavbar extends Component {

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
            <>
                <Navbar style={{backgroundColor: '#fff'}} fixed="top">
                    <Container>
                        <Nav className="me-auto">
                            <Nav.Link href="/">
                                <img src={LOGO}
                                    width="80"
                                    height="auto"
                                    className="d-inline-block align-top"
                                    alt="BBT"/>
                            </Nav.Link>
                            <Nav.Link onClick={(e) => this.handleChangeNavBar('investor_documents', e)}>
                                Documents
                            </Nav.Link>
                            <Nav.Link onClick={(e) => this.handleChangeNavBar('products_buyed', e)}>
                                Products
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link style={{fontWeight: '700', color: '#FE4849'}}>{role? role: ''}</Nav.Link>
                            <button onClick={(e) => this.handleSignOut()}>Sign Out</button>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        )
    }
}
