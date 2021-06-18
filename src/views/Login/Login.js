import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap';
import { login } from '../../actions/userActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import '../../styles/form.scss';

export const Login = ({ history, location }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Container>
            { loading && <Loader /> }
            <Form className="form" onSubmit={loginHandler}>
                <Form.Group controlId="formBasicEmail">
                    <h4 className="text-center my-4">Iniciar Sesión</h4>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Ingresa un correo electrónico"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                </Form.Group>
                { error && <Message variant="danger">{error}</Message> }
                <Form.Group className="text-center">
                    <Button type="submit" className="button-orange mt-4">
                        INICIAR SESIÓN
                    </Button>
                </Form.Group>
                <div className="text-center my-4 password-forgotten">
                    ¿No tienes cuenta?
                    <Link to="/register"> Registrate</Link>
                </div>
                <div className="text-center my-4 password-forgotten">
                    <Link to="/renewPassword">¿Olvidaste tu contraseña?</Link>
                </div>
            </Form>
        </Container>
    );
};