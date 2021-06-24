import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Rating } from '../Rating/Rating';
import './ProductCard.scss';

export const ProductCard = ({ product }) => {
    return (
        <Card className='my-3 mx-2 p-2 rounded'>
            <Card.Header>
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant='top' />
                </Link>
            </Card.Header>
            <Card.Body>
                <Card.Title as='h5'>
                    <strong>{product.name}</strong>
                </Card.Title>
                <div className='d-flex'>
                    <Rating value={product.rating} display='block' />
                    <p className='text-muted p-0 m-0 ml-1'>{`(${product.rating.toFixed(1)})`}</p>
                </div>
                <Card.Text className='orange-color font-weight-bold' style={{margin: '5px 0px', fontSize: 17}}>
                    ${product.price}
                </Card.Text>
                <Card.Text className='card-description'>
                    {product.description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <LinkContainer to={`/cart/${product._id}`}>
                    <Card.Link className='font-weight-bold text-dark'>
                        COMPRAR
                    </Card.Link>
                </LinkContainer>
                <LinkContainer to={`/product/${product._id}`}>
                    <Card.Link className='secondary-color font-weight-bold' >
                        VER
                    </Card.Link>
                </LinkContainer>
            </Card.Footer>
        </Card>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        rating: PropTypes.number,
        countInStock: PropTypes.number,
        image: PropTypes.string,
        description: PropTypes.string
    })
}


