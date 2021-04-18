import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap';
import '../../styles/form.scss';

export const Login = () => {
    return (
        <Container>
            <Form className="form">
                <Form.Group controlId="formBasicEmail">
                    <h4 className="text-center my-4">Iniciar Sesión</h4>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico*</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña*</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
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