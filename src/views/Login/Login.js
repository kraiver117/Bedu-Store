import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap';
import { beduStoreAPI } from '../../api/beduStoreAPI';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import '../../styles/form.scss';

export const Login = ({ history }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const loginHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        beduStoreAPI.post('/auth/login', { email, password })
            .then( response => {
                localStorage.setItem('token', `Bearer ${response.data.token}`);
                history.push('/');
                setLoading(false);
            })
            .catch( error => {
                setError(error.response.data.error);
                setLoading(false);
            })
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
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
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
                    <Link to="/forgotPassword">¿Olvidaste tu contraseña?</Link>
                </div>
            </Form>
        </Container>
    );
};