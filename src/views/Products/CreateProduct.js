import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { beduStoreAPI } from '../../api/beduStoreAPI';
import { Loader } from '../../components/Loader/Loader';
import { FormContainer } from '../../components/FormContainer/FormContainer';
import { createProduct } from '../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
import { Message } from '../../components/Alert/Alert';

export const CreateProduct = ({ history }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productCreate = useSelector(state => state.productCreate);

    const { loading: loadingCreate, error: errorCreate, success: successCreate } = productCreate;

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            history.push('/admin/productlist');
        } else if (errorCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
        }
    }, [dispatch, successCreate, errorCreate, history]);

    const handleCreateProduct = (e) => {
        e.preventDefault();

        dispatch(createProduct({
            name,
            price,
            image,
            category,
            inStock,
            brand: 'test',
            description
        }));
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await beduStoreAPI.post('/upload', formData, config);

            setImage(data);
            setUploading(false);

        } catch (error) {
            setUploading(false);
        }
    }

    return (
        <Container className='mb-5'>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Regresar
            </Link>
            <FormContainer>
                <h3 className='text-center'>Crear producto</h3>
                { errorCreate && <Message variant='danger'>{errorCreate}</Message> }
                { loadingCreate && <Loader/> }
                <Form onSubmit={handleCreateProduct}>
                    <Form.Group controlId='name'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Ingresa nombre'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Ingresa precio'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='image'>
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingresa URL de la imagen'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Form.File
                                id='image-file'
                                label='Elige una imagen'
                                custom
                                onChange={uploadFileHandler}
                            >
                                {uploading && <Loader />}
                            </Form.File>
                        </Form.Group>
                        <Form.Group controlId='inStock'>
                            <Form.Label>Cantidad disponible</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Ingresa cantidad de producto disponible'
                                value={inStock}
                                onChange={(e) => setInStock(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingresa categoría'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Ingresa descripción'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Button type='submit' className='btn-orange'>
                            Crear producto
                        </Button>
                </Form>
            </FormContainer>
        </Container>
    );
}
