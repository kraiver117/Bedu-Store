import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form , Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { listMyOrders } from '../../actions/orderActions';
import {  getUserDetails, updateUserProfile } from '../../actions/userActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import './Profile.scss';

export const Profile = ({ history }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [updatedSuccessful, setUpdatedSuccessful] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const myOrders = useSelector(state => state.listMyOrders);
    const { loading: loadingMyOrders, error: errorMyorders, orders = [] } = myOrders;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            dispatch(listMyOrders());

            if (success) {
                setUpdatedSuccessful(true);
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails(userInfo._id));

                setTimeout(() => {
                    setUpdatedSuccessful(false);
                }, 3000);
            } else {
                setFullName(userInfo.fullName);
                setEmail(userInfo.email);
            }
        }
    }, [dispatch, history, userInfo, success]);

    const updateHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Las contrase??as no coinciden');
        } else {
            dispatch(updateUserProfile({
                fullName,
                email,
                password
            }));
        }
    }

    return (
        <Container className='my-4'>
            <Row>
                <Col md={3}>
                    <h3>Perfil</h3>
                    {message && <Message variant='danger'>{message}</Message>}
                    {updatedSuccessful && <Message variant='success'>Perfil actualizado con ??xito</Message>}
                    <Form onSubmit={updateHandler}>
                        <Form.Group name="produtName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Ingresa tu nombre"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group name="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group name="password">
                            <Form.Label>Contrase??a</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Ingresa nueva contrase??a"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group name="confirmPassword">
                            <Form.Label>Confirmar contrase??a</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirma tu nueva contrase??a"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            className='btn-orange'
                            type='submit'
                        >
                            Actualizar
                        </Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h3>Mis pedidos</h3>
                    { loadingMyOrders ? <Loader /> : errorMyorders ? <Message>{errorMyorders}</Message> : orders.length === 0 ? <Message variant='primary'>No tienes ning??n pedido <Link to='/'>Ir a tienda</Link></Message> : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Solicitado</th>
                                    <th>Pagado</th>
                                    <th>Entregado</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id.substring(0, 12)}</td>
                                        <td>{moment(order.createdAt).format('LL')} </td>
                                        <td>{order.isPaid ? (moment(order.createdAt).format('LL')) : (
                                            <FaTimes color='red' />
                                        )}</td>
                                        <td>{order.isDelivered ? (moment(order.createdAt).format('LL')) : (
                                            <FaTimes color='red' />
                                        )}</td>
                                        <td>${order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm' variant='light'>Detalles</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
}