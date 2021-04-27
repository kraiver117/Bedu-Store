import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Image, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProductDetails } from '../../actions/productActions';
import { Message } from '../../components/Alert/Alert';
import { CardsCarousel } from '../../components/CardsCarousel/CardsCarousel';
import { Loader } from '../../components/Loader/Loader';

export const ProductDetails = ({ match }) => {
    const [qty, setQty] = useState(0);

    const productId = match.params.id;
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(productId));
        window.scrollTo(0,0);
    }, [dispatch, productId]);

    return (
        <Container>
            <Link className='btn btn-light my-4' to='/'>
                Regresar
            </Link>
            { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
                (
                    <>
                        <Row className='my-1'>
                            <Col md={5} className='text-center'>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h5>{product.name}</h5>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <span className='secondary-color font-weight-bold'> Descripción: </span>{product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                <span className='secondary-color font-weight-bold'> Precio: </span>
                                                </Col>
                                                <Col>
                                                    <strong>
                                                        ${product.price}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <span className='secondary-color font-weight-bold'> Status: </span>
                                                </Col>
                                                <Col>
                                                    <strong>
                                                        {product.inStock > 0 ? 'Disponible' : 'No disponible'}
                                                    </strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.inStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <span className='secondary-color font-weight-bold'> Cantidad: </span>
                                                    </Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product.inStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Button
                                                className='btn-orange btn-block'
                                                type='button'
                                                disabled={product.inStock === 0}
                                            >
                                                Agregar al carrito
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </>
                )
            }
            <CardsCarousel title='También te podría interesar' />
        </Container>
    )
}
