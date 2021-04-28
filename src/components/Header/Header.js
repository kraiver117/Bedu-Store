import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { 
    BsSearch, 
    BsPeopleCircle, 
    BsPersonFill, 
    BsHouseDoorFill, 
    BsPeopleFill, 
    BsBoxArrowRight, 
    BsReverseLayoutTextSidebarReverse, 
    BsInboxFill 
} from 'react-icons/bs';
import { logout } from '../../actions/userActions';
import './Header.scss';

export const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    }

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
                        <BsSearch />
                        <FaShoppingCart  className="mx-4" />
                        <NavDropdown id="user-dropdown" title={userInfo ? userInfo.fullName : <BsPeopleCircle />} alignRight>
                            {
                                userInfo 
                                    ?   <>
                                            <LinkContainer exact to='/'>
                                                <NavDropdown.Item>
                                                    <BsHouseDoorFill className="mr-3" />
                                                    Home
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>
                                                    <BsPersonFill className="mr-3" />
                                                    Perfil
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                                {
                                                    userInfo.role === "admin" 
                                                        &&   <>
                                                                <NavDropdown.Divider />
                                                                <LinkContainer to='/users'>
                                                                    <NavDropdown.Item>
                                                                            <BsPeopleFill className="mr-3" />
                                                                            Usuarios
                                                                    </NavDropdown.Item>
                                                                </LinkContainer>
                                                                <LinkContainer to='/admin/productlist'>
                                                                    <NavDropdown.Item>
                                                                        <BsInboxFill className="mr-3" />
                                                                        Productos
                                                                    </NavDropdown.Item>
                                                                </LinkContainer>
                                                                <LinkContainer to='/orders'>
                                                                    <NavDropdown.Item>
                                                                        <BsReverseLayoutTextSidebarReverse className="mr-3" />
                                                                        Pedidos
                                                                    </NavDropdown.Item>
                                                                </LinkContainer>
                                                            </>
                                                }
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item className="d-flex justify-content-start align-items-center" onClick={logoutHandler}>
                                                <BsBoxArrowRight className="mr-3" />
                                                Cerrar sesión
                                            </NavDropdown.Item>
                                        </>
                                    :   <>
                                            <LinkContainer exact to='/'>
                                                <NavDropdown.Item>
                                                    <BsHouseDoorFill className="mr-3" />
                                                    Home
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to='/login'>
                                                <NavDropdown.Item  className="d-flex justify-content-start align-items-center">
                                                    <BsPersonFill className="mr-3" />
                                                    Iniciar sesión
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                        </>
                            }
                        </NavDropdown>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};
