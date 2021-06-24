import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import { resetPassword } from '../../actions/resetPassword';
import { USER_RESET_PASSWORD_RESET } from '../../constants/resetPasswordConstants';

export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const resetPasswordState = useSelector(state => state.resetPassword);
    const { loading, successMessage, errorMessage} = resetPasswordState;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: USER_RESET_PASSWORD_RESET });
    }, [dispatch]);

    const handleChangePassword = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError(true);
        } else {
            dispatch(resetPassword(email));
        }
    }

    return (
        <Container>
            <Form className='form' onSubmit={handleChangePassword}>
                <Form.Group>
                    <h4 className='text-center my-4'>Restablecer Contraseña</h4>
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
                        disabled={successMessage}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu correo electrónico
                    </Form.Control.Feedback>
                </Form.Group>
                { loading && <Loader size={100} margin={1} /> }
                { errorMessage && <Message variant='danger' dismissible>{errorMessage}</Message> }
                { successMessage && <Message variant='success' dismissible>{successMessage}</Message>}
                <Form.Group className="text-center">
                    <Button type="submit" className="button-orange mt-4" disabled={successMessage}>
                        ENVIAR
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    );
}
