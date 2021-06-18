import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Image, Button } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { deliverOrder, getOrderDetails, payOrder } from '../../actions/orderActions';
import { beduStoreAPI } from '../../api/beduStoreAPI';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../constants/orderConstants';

import './OrderDetails.scss';

export const OrderDetails = ({ match, history }) => {
   const orderId = match.params.id;

   const [sdkReady, setSdkReady] = useState(false);

   const dispatch = useDispatch();

   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const orderDetails = useSelector(state => state.orderDetails);
   const { loading, error, order } = orderDetails;
   
   const orderPay = useSelector(state => state.orderPay);
   const { success: successPay, loading: loadingPay } = orderPay;

   const orderDeliver = useSelector(state => state.orderDeliver);
   const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

   useEffect(() => {
      if (!userInfo) {
         history.push('/login');
      } 

      const addPayPalScript = async () => {
         const { data: clientId } = await beduStoreAPI.get('/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
               setSdkReady(true)
            }
            document.body.appendChild(script);
      }
      
      if(!order || successPay || successDeliver || order._id !== orderId) {
         dispatch({ type: ORDER_PAY_RESET });
         dispatch({ type: ORDER_DELIVER_RESET });
         dispatch(getOrderDetails(orderId));
      } else if (!order.isPaid) {
         if (!window.paypal) {
            addPayPalScript();
         } else {
            setSdkReady(true);
         }
      }
   }, [dispatch, history, orderId, userInfo, order, successDeliver, successPay]);

   const successPaymentHandler = (paymentResults) => {
      dispatch(payOrder(orderId, paymentResults));
   }

   const deliverHandler = () => {
      dispatch(deliverOrder(order));
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
                                 Entregado el {moment(order.deliveredAt).format('LL')}
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
                                 Pagado el {moment(order.paidAt).format('LL')}
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
                                             <Link className='text-dark' to={`/product/${item.product}`}>
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
                              <Col>${order && order.orderItems && (order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2))}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Envío</Col>
                              <Col>${order.shippingPrice.toFixed(2)}</Col>
                           </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Row>
                              <Col>Total</Col>
                              <Col>${(order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0) + order.shippingPrice).toFixed(2)}</Col>
                           </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                           <ListGroup.Item>
                              {loadingPay && <Loader />}
                              {!sdkReady ? <Loader /> : (
                                 <PayPalButton 
                                    amount={order.totalPrice} 
                                    onSuccess={successPaymentHandler}
                                 />
                              )}
                           </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader />}
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
