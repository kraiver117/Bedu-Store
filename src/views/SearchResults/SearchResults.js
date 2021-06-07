import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '../../components/Loader/Loader';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Message } from '../../components/Alert/Alert';
import { PaginationComponent as Pagination } from '../../components/Pagination/PaginationComponent';
import { searchProducts } from '../../actions/productActions';

export const SearchResults = ({ match, history }) => {
    const dispatch = useDispatch();
    const keyword = match.params.keyword || '';
    const pageNumber = match.params.pageNumber || 1;

    const searchedProducts = useSelector(state => state.searchProducts);
    const { products = [], pages, page, loading } = searchedProducts;

    useEffect(() => {
        dispatch(searchProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <Container className='my-4'>
            <Row className='justify-content-center my-4'>
                { loading ? <Loader /> : products.length === 0 ? <Message variant='danger'>{`No se encontraron coincidencias con "${keyword}"`}</Message> : 
                    products.map((product, index) => (
                        <Col md={4} key={index}>
                            <ProductCard product={product} />
                        </Col>
                    ))
                }
            </Row>
            <Pagination page={page} totalPages={ pages } center history={ history } keyword={ keyword } />
        </Container>
    )
}
