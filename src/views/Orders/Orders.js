import React, { useEffect } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import moment from 'moment';

import { listOrders } from '../../actions/orderActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import './Orders.scss';

export const Orders = ({ history }) => {
    const dispatch = useDispatch();

    const listAllOrders = useSelector(state => state.listAllOrders);
    const { loading, error, orders = [] } = listAllOrders;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        if (userInfo && userInfo.role === 'admin') {
            dispatch(listOrders());
        }
    }, [dispatch, userInfo, history]);

    return (
        <Container className='my-4'>
            <h2>Pedidos</h2>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Usuario</th>
                                <th>Solicitado</th>
                                <th>Pagado</th>
                                <th>Entregado</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.fullName}</td>
                                        <td>{ moment(order.createdAt).format('LL')}</td>
                                        <td>
                                            {
                                                order.isPaid
                                                ? (moment(order.paidAt).format('LL') )
                                                : (<FaTimes color='red' />)
                                            }
                                        </td>
                                        <td>
                                            {
                                                order.isDelivered
                                                ? (moment(order.deliveredAt).format('LL') )
                                                : (<FaTimes color='red' />)
                                            }
                                        </td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
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
