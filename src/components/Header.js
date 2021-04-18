import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <LinkContainer to='/'>
                    <Navbar.Brand className="navbar-title">Bedu Store</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <LinkContainer to='/'>
                            <Nav.Link className="navbar-links">
                                Home
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/products'>
                            <Nav.Link className="navbar-links">
                                Productos
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/contact'>
                            <Nav.Link className="navbar-links">Contacto</Nav.Link>
                        </LinkContainer>
                    </Nav>
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
                            height="35"
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
                            id="basic-nav-dropdown"
                        >
                            <NavDropdown.Item className="d-flex justify-content-start align-items-center">
                                <Link className="text-dark text-decoration-none" to='/'>
                                    <img
                                        alt=""
                                        src="/home.png"
                                        width="30"
                                        height="30"
                                        className="navbar-icon"
                                    />
                                    Home
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item  className="d-flex justify-content-start align-items-center">
                                <Link className="text-dark text-decoration-none" to='/login'>
                                    <img
                                        alt=""
                                        src="/person.png"
                                        width="30"
                                        height="30"
                                        className="navbar-icon"
                                    />
                                    Iniciar sesión
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
