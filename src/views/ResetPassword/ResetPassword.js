import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { Message } from '../../components/Alert/Alert';
import { resetPassword } from '../../actions/resetPassword';

export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const dispatch = useDispatch();

    const handleChangePassword = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError(true);
        } else {
            dispatch(resetPassword);
        }
    }

    return (
        <Container>
            <Form className='form' onSubmit={handleChangePassword}>
                <Form.Group>
                    <h4 className='text-center my-4'>Reestablecer Contraseña</h4>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Ingresa tu correo electrónico'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={emailError}
                        onFocus={() => setEmailError(false)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu correo electrónico
                    </Form.Control.Feedback>
                </Form.Group>
                <Message variant='success'>Te hemos enviado un correo electrónico, revisa los detalles para reestablecer tu contraseña</Message>
                <Message variant='danger'>No se pudo enviar el correo electrónico, intenta más tarde</Message>
                <Form.Group className="text-center">
                    <Button type="submit" className="button-orange mt-4">
                        ENVIAR
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
