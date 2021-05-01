import React, { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listOrders } from '../../actions/orderActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import './Order.scss';

export const Orders = () => {
    const dispatch = useDispatch();

    const listAllOrders = useSelector(state => state.listAllOrders);
    const { loading, error, orders = [] } = listAllOrders;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            dispatch(listOrders());
        }
    }, [dispatch, userInfo]);

    return (
        <Container className='my-4'>
            <h2>Pedidos</h2>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <th>Id</th>
                            <th>Usuario</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Pagado</th>
                            <th>Entregado</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.fullName}</td>
                                        <td>{order.createdAt.substring(0,10)}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {
                                                order.isPaid
                                                ? (order.paidAt.substring(0,10))
                                                : (<FaTimes color='red' />)
                                            }
                                        </td>
                                        <td>
                                            {
                                                order.isDelivered
                                                ? (order.deliveredAt.substring(0,10))
                                                : (<FaTimes color='red' />)
                                            }
                                        </td>
                                        <td>
                                            <LinkContainer to={`order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Detalles
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                )
            }
        </Container>
    );
}
