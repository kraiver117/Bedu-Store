import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {
    Container,
    Form,
    Button
} from 'react-bootstrap'; 
import { beduStoreAPI } from '../../api/beduStoreAPI';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import { FormContainer } from '../../components/FormContainer/FormContainer';

export const UpdateUser = ({history}) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    // Get User
    const getUser = async () => {
        try {
          setLoading(true);
          beduStoreAPI.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
          beduStoreAPI
            .get('/users/' + id )
            .then((response) => {
                const { fullName, email, role } = response.data.data;
                setFullName(fullName);
                setEmail(email);
                setRole(role);
                setLoading(false);
            })
            .catch((error) => {
              setError(error.response.data.error);
              setLoading(false);
            });
        } catch (e) {
            setError(error.response.data.error);
        }
      };
    useEffect(() => {
        if(!userInfo.role === "admin") {
            history.push('/');
        }
        getUser();
        // eslint-disable-next-line
    }, []);

    const updtadeUserHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        beduStoreAPI.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        beduStoreAPI.put(`/users/${id}`, { fullName, email, role })
            .then( response => {
                getUser();
                setLoading(false);
                setSuccess('Usuario actualizado con éxito');
            })
            .catch( error => {
                setError(error.response.data.error);
                setLoading(false);
            })
    }
    return (
        <Container className='mb-5'>
            { loading && <Loader /> }
            <Link to='/users' className='btn btn-light my-3'>
                Regresar
            </Link>
            <FormContainer>
                <Form onSubmit={updtadeUserHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <h4 className="text-center my-4">Editar usuario</h4>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" defaultValue={fullName} 
                            onChange={(e) => {
                                setFullName(e.target.value);
                                setError('');
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Correo Electrónico*</Form.Label>
                        <Form.Control type="email" defaultValue={email} 
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }} 
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Admin" checked={role === "admin"}
                            onChange={(e) => {
                                setRole(e.target.checked ? "admin" : "user");
                                setError('');
                            }} 
                        />
                    </Form.Group>
                    { error && <Message variant="danger">{error}</Message> }
                    { success && <Message variant="success">{success}</Message> }
                    <Form.Group className="text-center">
                        <Button type="submit" className="btn-orange mt-4">
                            Actualizar usuario
                        </Button>
                    </Form.Group>
                </Form>
            </FormContainer>
        </Container>
    );
}