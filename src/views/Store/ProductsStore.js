import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import { ProductCard } from '../../components/ProductCard/ProductCard';

export const ProductsStore = () => {
    const dispatch = useDispatch();
    
    const productListState = useSelector(state => state.productsList);
    const { products = [], loading, error } = productListState;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <Container>
            <Row>
                { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                    products.map((product, index) => (
                            <Col md={4} key={index}>
                                <ProductCard product={product} />
                            </Col>
                    ))
                }
            </Row>
        </Container>
    );
}
