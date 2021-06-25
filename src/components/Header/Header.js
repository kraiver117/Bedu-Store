import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown, Badge} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { 
    BsPeopleCircle, 
    BsPersonFill, 
    BsHouseDoorFill, 
    BsPeopleFill, 
    BsBoxArrowRight, 
    BsReverseLayoutTextSidebarReverse, 
    BsInboxFill
} from 'react-icons/bs';
import { logout } from '../../actions/userActions';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { searchProducts } from '../../actions/productActions';

const categories = [
    "Todas",
    "Playera",
    "Mochila",
    "Taza",
    "Gorra",
    "Hoddie",
    "Libreta"
]

export const Header = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();
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
                <div className="d-flex flex-column align-items-start flex-lg-row justify-content-around align-items-lg-center">
                    <Link className='text-dark mx-lg-4' to='/cart'>
                        {
                            cartItems.length > 0 && <Badge className='bg-color-orange text-white' pill>{cartItems.length}</Badge>
                        }
                        <FaShoppingCart size={20}/>    
                    </Link>
                    { 
                     !userInfo &&
                        <div className="d-flex align-items-center">
                            <Link to='/login' className="pr-2 border-right text-dark font-weight-bolder my-2 my-lg-0">
                                Iniciar sesión
                            </Link>
                            <Link to='/register' className="pl-2 text-dark font-weight-bolder my-2 my-lg-0">
                                Registrarse
                            </Link>
                        </div>
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
        {
            (pathname.includes('/store') || pathname === '/') && (
                <div className="bg-light px-0">
                    <div className="row row-cols-12 py-2 mx-auto products-category">
                        {
                            categories.map((category, index) => (
                                <div className="text-center font-weight-bolder mx-2" key={index}>
                                    <Link to={`/store?category=${category}`} className="text-dark">
                                        {category}   
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
      </div>
    );
};
