import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';
import betoNoResults from '../../assets//images/betoNoResults.svg';

import './PageNotFound.scss';

export const PageNotFound = () => {
    return (
        <Container className='d-flex flex-column align-items-center text-center my-auto'>
            <h1>Página en construcción</h1>
            <Image className='logo' src={betoNoResults} alt='Page not found'/>
            <Link className='btn btn-orange btn-large text-white mb-3' to='/'>
                Ir a inicio
            </Link>
        </Container>
    )
}
