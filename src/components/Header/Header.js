import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown, Badge, Container, FormControl, Button, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { 
    BsPeopleCircle, 
    BsPersonFill, 
    BsHouseDoorFill, 
    BsPeopleFill, 
    BsBoxArrowRight, 
    BsReverseLayoutTextSidebarReverse, 
    BsInboxFill,
    BsSearch
} from 'react-icons/bs';
import { logout } from '../../actions/userActions';
import { Link } from 'react-router-dom';
import './Header.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { searchProducts } from '../../actions/productActions';
import { useLocation } from 'react-router-dom';

export const Header = () => {
    const location = useLocation();
    
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const logoutHandler = () => {
        dispatch(logout());
    }

    const searchProduct = (keyword) => {
        dispatch(searchProducts(keyword));
    }

    return (
        <div className="navbar-fixed">
        <Navbar className='p-navbar' bg="white" expand="lg">
            <LinkContainer to='/'>
                <Navbar.Brand className="navbar-title">Bedu Store</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="w-80 py-2 my-md-0">
                    <SearchInput 
                        value={ searchValue } 
                        onChange={ setSearchValue } 
                        onSubmit={ searchProduct } 
                    />
                </Nav>
                <div className="d-flex justify-content-around">
                    <Link className='text-dark mx-4' to='/cart'>
                        {
                            cartItems.length > 0 && <Badge className='bg-color-orange text-white' pill>{cartItems.length}</Badge>
                        }
                        <FaShoppingCart size={20}/>    
                    </Link>
                    { 
                     !userInfo ?
                        <div>
                        <Link to='/login' className="pr-2 border-right text-dark font-weight-bolder">
                            Iniciar sesión
                        </Link>
                        <Link to='/register' className="ml-2 text-dark font-weight-bolder">
                            Registrarse
                        </Link>
                        </div>
                        : ''
                    }
                </div>
                {
                    userInfo ? 
                    <div className="navbar-right d-flex justify-content-around align-items-center">
                    <NavDropdown 
                        id="user-dropdown" 
                        title={userInfo 
                            ? <span className='text-dark'>
                                {userInfo.fullName}
                            </span> 
                            : <>
                                <BsPeopleCircle className='secondary-color mr-1' size={20}/>
                                <span className='text-dark'>
                                    Iniciar Sesión
                                </span>
                            </>
                        }
                    >
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
                                                            <LinkContainer to='/admin/orderslist'>
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
                    : ''
                }
            </Navbar.Collapse>
        </Navbar>
        <div className="bg-light px-0">
            <div className="row row-cols-4 py-2 mx-auto products-category">
                <div className="text-center font-weight-bolder">
                    <Link to='/store?category=Todas' className="text-dark">
                        Todas   
                    </Link>
                </div>
                <div className="text-center font-weight-bolder">
                    <Link to='/store?category=Playera' className="text-dark">
                        Playera
                    </Link>
                </div>
                <div className="text-center font-weight-bolder">
                    <Link to='/store?category=Mochila' className="text-dark">
                        Mochila
                    </Link>
                </div>
                <div className="text-center font-weight-bolder">
                    <Link to='/store?category=Taza' className="text-dark">
                        Taza
                    </Link>
                </div>
            </div>
        </div>
      </div>
    );
};
