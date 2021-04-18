import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Header.scss';

export const Header = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand className="navbar-title" href="#home">Bedu Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Nav.Link className="navbar-links" href="#home">Home</Nav.Link>
                        <Nav.Link className="navbar-links" href="#link">Productos</Nav.Link>
                        <Nav.Link className="navbar-links" href="#contact">Contacto</Nav.Link>
                        
                    </Nav>
                    {/* <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    </Form> */}
                    <div className="navbar-right d-flex justify-content-around align-items-center">
                        <img
                                alt=""
                                src="/SearchIcon.png"
                                width="30"
                                height="30"
                                className="navbar-icon"
                            />
                        <img
                                alt=""
                                src="/ShoppingCartIcon.png"
                                width="30"
                                height="30"
                                className="navbar-icon"
                            />
                    <NavDropdown 
                                title={
                                    <img
                                    alt=""
                                    src="/profile.png"
                                    width="30"
                                    height="30"
                                    />
                                } 
                                alignRight
                                id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1" className="d-flex justify-content-start align-items-center">
                            <img
                                alt=""
                                src="/home.png"
                                width="30"
                                height="30"
                                className="navbar-icon"
                            />
                                Home
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2" className="d-flex justify-content-start align-items-center">
                            <img
                                alt=""
                                src="/person.png"
                                width="30"
                                height="30"
                                className="navbar-icon"
                            />
                                Iniciar sesión
                            </NavDropdown.Item>
                    </NavDropdown>
                    </div>
                    
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
