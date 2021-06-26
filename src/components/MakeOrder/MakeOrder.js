import React, { useEffect } from 'react';
import { Button, Col, Container, ListGroup, Row, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutSteps } from '../CheckoutSteps/CheckoutSteps';
import { Message } from '../Alert/Alert';

import './MakeOrder.scss';
import { Link } from 'react-router-dom';
import { createOrder } from '../../actions/orderActions';

export const MakeOrder = ({ history }) => {
   const dispatch = useDispatch();

   const cart = useSelector(state => state.cart);

   const orderCreate = useSelector(state => state.orderCreate);
   const { order, success, error } = orderCreate;


   cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
   cart.shippingPrice = 150;
   cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2);

   useEffect(() => {
      if (success) {
         history.push(`/order/${order._id}`);
      }
      // eslint-disable-next-line
   }, [history, success]);

   const placeOrderHandler = () => {
      dispatch(createOrder({
         orderItems: cart.cartItems,
         shippingAddress: cart.shippingAddress,
         paymentMethod: cart.paymentMethod,
         itemsPrice: cart.itemsPrice,
         shippingPrice: cart.shippingPrice,
         totalPrice: cart.totalPrice
      }));
   }
   
   return (
      <Container>
         <CheckoutSteps step1 step2 step3 step4 />
         <Row>
            <Col md={8}>
               <ListGroup variant='flush'>
                  <ListGroup.Item>
                     <h2> Dirección </h2>
                     <span className = "orange_text"><strong>Dirección: </strong></span> 
                        {cart.shippingAddress.address}{' '}
                        {cart.shippingAddress.city}{' '}
                        {cart.shippingAddress.postalCode}{' '}  
                        {cart.shippingAddress.country} 
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2> Método de pago </h2>
                     <span className = "orange_text"><strong>
                        Método:
                     </strong> </span>
                     {' '}{cart.paymentMethod}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     <h2> Productos </h2>
                     <div className="makeorder-products d-flex align-items-center">
                        {
                           cart.cartItems.length === 0 
                              ? <Message>Tu carrito de compras esta vacío</Message>
                              : <ListGroup variant='flush'>
                                 {
                                    cart.cartItems.map((item, index) => (
                                       <ListGroup.Item key={index}>
                                          <Row>
                                             <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                             </Col>
                                             <Col>
                                                <Link className='text-dark' to={`/product/${item.product}`}>
                                                   {item.name}
                                                </Link>
                                             </Col>
                                             <Col md={4}>
                                                <p className="total"> {item.qty} x {item.price} = <span>${item.qty * item.price}</span></p>
                                             </Col>
                                          </Row>
                                       </ListGroup.Item>
                                    ))
                                 }
                              </ListGroup>
                        }
                     </div>
                  </ListGroup.Item>
               </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup>
                     <ListGroup.Item>
                        <h2>Resumen de pedido</h2>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col> <span className = "orange_text"> <strong>Productos</strong></span></Col>
                           <Col>${cart.itemsPrice.toFixed(2)}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col> <span className = "orange_text"> <strong>Envío</strong></span></Col>
                           <Col>${cart.shippingPrice.toFixed(2)}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Row>
                           <Col> <span className = "orange_text"> <strong>Total</strong></span></Col>
                           <Col>${cart.totalPrice}</Col>
                        </Row>
                     </ListGroup.Item>
                     <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <Button 
                           block
                           className="btn-orange" 
                           onClick={placeOrderHandler}
                        >
                           Realizar pedido
                        </Button>
                     </ListGroup.Item>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </Container>
   )
}
