import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export const ProductCard = ({ product }) => {
    return (
        <Card className='my-3 mx-2 p-2 rounded'>
            <Card.Header>
                <Link to={`/product/${1}`}>
                    <Card.Img src={product.image} variant='top' className="bg-black-gradient p-1"/>
                </Link>
            </Card.Header>
            <Card.Body>
                <Card.Title as='h4'>
                    <strong>{product.name}</strong>
                </Card.Title>
                <Card.Text as='p' style={{marginBottom: 2}}>
                    Precio
                </Card.Text>
                <Card.Text as='h5' className='secondary-color'>
                    
                    ${product.price}
                </Card.Text>
                <Card.Text as='p'>
                    {product.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <LinkContainer to=''>
                    <Card.Link className='font-weight-bold text-dark'>
                        COMPRAR
                    </Card.Link>
                </LinkContainer>
                <LinkContainer to=''>
                    <Card.Link className='secondary-color font-weight-bold'>
                        VER
                    </Card.Link>
                </LinkContainer>
            </Card.Footer>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.object
}


