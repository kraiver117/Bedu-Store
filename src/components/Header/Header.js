import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown, Badge } from 'react-bootstrap';
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
import { Link, useLocation, NavLink } from 'react-router-dom';
import './Header.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { searchProducts } from '../../actions/productActions';
import qs from "qs";

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
    const { pathname,search } = useLocation();
    const [searchValue, setSearchValue] = useState('');

    const { category = '' } = qs.parse(search, {
        ignoreQueryPrefix: true
    });

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
        <Navbar className='p-navbar navbar-background-color' expand="lg">
            <LinkContainer to='/'>
                <Navbar.Brand className="navbar-title">Bedu Store</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="search-container py-2 my-md-0">
                    <SearchInput 
                        value={ searchValue } 
                        onChange={ setSearchValue } 
                        onSubmit={ searchProduct } 
                    />
                </Nav>
                <div className="d-flex flex-row  align-items-center justify-content-around">
                    <Link className='text-dark mx-lg-4' to='/cart'>
                        {
                            cartItems.length > 0 && <Badge className='bg-color-orange text-white' pill>{cartItems.length}</Badge>
                        }
                        <FaShoppingCart size={20}/>    
                    </Link>
                    { 
                        !userInfo 
                        ? <div className="d-flex align-items-center">
                            <NavLink activeClassName='border-bottom-orange' to='/login' acti className="pr-2 border-right text-dark font-weight-bolder my-2 my-lg-0">
                                Iniciar sesión
                            </NavLink>
                            <NavLink activeClassName='border-bottom-orange' to='/register' className="pl-2 text-dark font-weight-bolder my-2 my-lg-0">
                                Registrarse
                            </NavLink>
                        </div>
                        : <div className="navbar-right d-flex justify-content-around align-items-center">
                            <NavDropdown 
                                id="user-dropdown" 
                                title={userInfo 
                                    ? <span className='text-dark font-weight-bolder'>
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
                    }
                </div>
            </Navbar.Collapse>
        </Navbar>
        {
            (pathname.includes('/store') || pathname === '/' || pathname.includes('/search')) && (
                <div className="bg-light px-0">
                    <div className="row justify-content-center row-cols-12 py-2 mx-auto products-category">
                        {
                            categories.map((categoryProduct, index) => (
                                <div className="text-center font-weight-bolder mx-2" key={index}>
                                    <NavLink activeClassName={categoryProduct === category && 'border-bottom-orange'} to={`/store?category=${categoryProduct}`} className="text-dark">
                                        {categoryProduct}   
                                    </NavLink>
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
