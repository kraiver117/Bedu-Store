import React, { useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';

import './OrderDetails.scss';

export const OrderDetails = ({ match, history }) => {
   const orderId = match.params.id;

   const dispatch = useDispatch();

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const orderDetails = useSelector(state => state.orderDetails);
   const { loading, error, order } = orderDetails;

   useEffect(() => {
      if (!userInfo) {
         history.push('/login');
      } else {
         dispatch(getOrderDetails(orderId));
      }
   }, [dispatch, history, orderId, userInfo]);

   const successPaymentHandler = (paymentResults) => {
      //TODO: add logic to payment
   }

   const deliverHandler = () => {
      //TODO: add logic to mark as delivered order
   }

   return (
      <Container className='my-4'>
         { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
               <Col md={8}>
                  <ListGroup variant='flush'>
                     <ListGroup.Item>
                        <h1>Pedido {order._id}</h1>
                        <h2>Envío</h2>
                        <p><strong>Nombre:</strong> {order.user.fullName}</p>
                        <p><strong>Email:</strong> {order.user.email}</p>
                        <p><strong>Dirección:</strong> {order.shippingAddress.address}, 
                           {order.shippingAddress.city}, 
                           {order.shippingAddress.postalCode}, 
                           {order.shippingAddress.country}
                        </p>
                        {
                           order.isDelivered 
                              ? <Message textPosition='left' variant='success'>
                                 Entregado el {order.deliveredAt.substring(0,10)}
                              </Message>
                              : <Message textPosition='left' variant='danger'>
                                 No entregado
                              </Message>
                        }  
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <h2>Método de pago</h2>
                        <p><strong>Método:</strong> {order.paymentMethod}</p>
                        {
                           order.isPaid
                              ? <Message textPosition='left' variant='success'>
                                 Pagado el {order.paidAt.substring(0,10)}
                              </Message>
                              : <Message textPosition='left' variant='danger'>
                                 No pagado
                              </Message>
                        }
                     </ListGroup.Item>
                     <ListGroup.Item>
                        <h2> Productos </h2>
                        {
                           order.orderItems === 0 
                              ? <Message variant='info'>Tu orden esta vacía</Message>
                              : <ListGroup variant='flush'>
                                 {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                       <Row>
                                          <Col md={1}>
                                             <Image src={item.image} alt={item.name} fluid rounded />
                                          </Col>
                                          <Col>
                                             <Link className='text-dark' to={`/product/${item._id}`}>
                                                {item.name}
                                             </Link>
                                          </Col>
                                          <Col>
                                             {item.qty} x ${item.price} = ${item.qty * item.price}
                                          </Col>
                                       </Row>
                                    </ListGroup.Item>
                                 ))}
                              </ListGroup>
                        }
                     </ListGroup.Item>
                  </ListGroup>
               </Col>
               <Col md={4}>
                  <Card>
                     <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h2>Resumen de pedido</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Productos</Col>
                              <Col>${order.totalPrice}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Envío</Col>
                              <Col>${order.shippingPrice}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Total</Col>
                              <Col>${order.totalPrice + order.shippingPrice}</Col>
                           </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                           <ListGroup.Item>
                              <PayPalButton 
                                 amount={order.totalPrice} 
                                 onSuccess={successPaymentHandler}
                              />
                           </ListGroup.Item>
                        )}
                        {userInfo && userInfo.role === 'admin' && order.isPaid && !order.isDelivered && (
                           <ListGroup.Item>
                              <Button type='button' className='btn btn-block btn-orange' onClick={deliverHandler}>
                                 Marcar como producto entregado
                              </Button>
                           </ListGroup.Item>
                        )}
                     </ListGroup>
                  </Card>
               </Col>
            </Row>
         )}
      </Container>
   );
}
