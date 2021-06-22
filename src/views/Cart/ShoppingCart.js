import React, { useEffect } from 'react';
import { Col, Container, ListGroup, Row, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsTrashFill } from 'react-icons/bs';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { Message } from '../../components/Alert/Alert';


export const ShoppingCart = ({ match, location, history }) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch =useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems} = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFormCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=address');
    }

    return (
        <Container className='my-4'>
            <Row>
                <Col md={8}>
                    <h3 className='text-center'>Carrito de compras</h3>
                    { cartItems.length === 0
                        ?
                            <Message variant='primary'>
                                Tu carrito de compras está vacío. <Link to='/'>Ir a tienda</Link>
                            </Message>
                        :
                            (<ListGroup variant='flush'>
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item.product}>
                                        <Row className='d-flex align-items-center justify-content-center'>
                                            <Col xs={12} md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col xs={12} md={3} className='text-center'>
                                                <Link className='text-dark' to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col xs={3} md={2}>
                                                ${item.price.toFixed(2)}
                                            </Col>
                                            <Col xs={5} md={3}>
                                                <Form.Control 
                                                    as='select' 
                                                    value={item.qty} 
                                                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >
                                                    {[...Array(item.inStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col xs={3} md={2}>
                                                <Button type='button' className='bg-color-orange' variant='light' onClick={() => removeFormCartHandler(item.product)}>
                                                        <BsTrashFill color='#fff' />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>)
                    }
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>
                                    Subtotal de productos ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                </h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-orange btn-block'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    Proceder al pago
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
