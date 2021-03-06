import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  listProductsWithQuery } from '../../actions/productActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import { PaginationComponent as Pagination } from '../../components/Pagination/PaginationComponent';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import qs from "qs";

export const ProductsStore = ({ match, location }) => {
    const dispatch = useDispatch();
    let pageNumber = Number(match.params.page) || 1;
    const { category = '' } = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    
    const productListState = useSelector(state => state.productsListWithQuery);
    const { products = [], loading, error, totalPages } = productListState;

    useEffect(() => {
        if(!category || category === 'Todas'){
            dispatch(listProductsWithQuery('', pageNumber, 3));
        } else {
            dispatch(listProductsWithQuery(category, pageNumber, 3));
        }

    }, [dispatch, pageNumber, category]);

    // const handleFilterCategory = (category) => {
    //     pageNumber = 1;
    //     dispatch(listProductsWithQuery(category, pageNumber, 3));
    // }

    return (
        <Container className='my-4'>
            {/* <Row className='justify-content-center'>
                {
                    categories.map((category, index) => (
                        <Button
                            key={index}
                            type='button'
                            className='btn-orange mx-3'
                            onClick={() => handleFilterCategory(category)}
                        >
                            { category }
                        </Button>
                    ))
                }
            </Row> */}
            <Row className='justify-content-center my-4'>
                { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
                    products.map((product, index) => (
                        <Col md={4} key={index}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                }
            </Row>
            <Pagination page={pageNumber} totalPages={ totalPages } category={category} center />
        </Container>
    );
}
