import React from 'react';
import '../../styles/form.scss';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap';

export const Register = () => {
    return (
        <Container>
            <Form className="form">
                <Form.Group controlId="formBasicEmail">
                    <h4 className="text-center my-4">Registrar</h4>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico*</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="text-center">
                    <Button type="submit" className="button-orange mt-4">
                        Registrarse
                    </Button>
                </Form.Group>
                <div className="text-center my-4 password-forgotten">
                    <a href="#">¿Olvidaste tu contraseña?</a>
                </div>
            </Form>
        </Container>
    );
}