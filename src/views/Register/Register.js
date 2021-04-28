import React, {useState} from 'react';
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

export const Register = ( {history} ) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const registerHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(`${name} ${lastName}, ${email}, ${password}`)
        const fullName = `${name}  ${lastName}`;
        beduStoreAPI.post('/auth/register', { fullName, email, password })
            .then( response => {
                localStorage.setItem('token', `Bearer ${response.data.token}`);
                setSuccess("Te has registrado éxitosamente");
                setLoading(false);
                history.push("/");
            })
            .catch( error => {
                setError(error.response.data.error);
                setLoading(false);
            })
    }
    return (
        <Container>
            { loading && <Loader /> }
            <Form className="form" onSubmit={registerHandler}>
                <Form.Group controlId="formBasicEmail">
                    <h4 className="text-center my-4">Registrar</h4>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" 
                    onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                    }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" 
                    onChange={(e) => {
                        setLastName(e.target.value);
                        setError('');
                    }}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Correo Electrónico*</Form.Label>
                    <Form.Control type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                    }} 
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" 
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                    }}/>
                </Form.Group>
                { error && <Message variant="danger">{error}</Message> }
                { success && <Message variant="success">{success}</Message> }
                <Form.Group className="text-center">
                    <Button type="submit" className="button-orange mt-4">
                        Registrarse
                    </Button>
                </Form.Group>
                <div className="text-center my-4 password-forgotten">
                    ¿Ya tienes cuenta?
                    <Link to="/login"> Inicia sesión</Link>
                </div>
            </Form>
        </Container>
    );
}