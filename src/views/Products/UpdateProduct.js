import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormContainer } from '../../components/FormContainer/FormContainer';
import { Loader } from '../../components/Loader/Loader';
import { listProductDetails, updateProduct } from '../../actions/productActions';
import { Message } from '../../components/Alert/Alert';
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from '../../constants/productConstants';
import { beduStoreAPI } from '../../api/beduStoreAPI';

export const UpdateProduct = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [inStock, setInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    console.log(product);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            dispatch({ type: PRODUCT_DETAILS_RESET });
            history.push('/admin/productlist');
        } else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setCategory(product.category);
                setInStock(product.inStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, history, productId, product, successUpdate]);

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
            console.log(error);
            setUploading(false);
        }
    }

    const updateProductHandler = (e) => {
        e.preventDefault();

        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            description,
            inStock
        }));
    }

    return (
        <Container className='mb-5'>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Regresar
            </Link>
            <FormContainer>
                <h2 className='text-center mb-4'>Editar producto</h2>
                { loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
                { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={updateProductHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Form.File
                                id='image-file'
                                label='Choose File'
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
                                placeholder='Enter count in stock'
                                value={inStock}
                                onChange={(e) => setInStock(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='category'>
                            <Form.Label>Categoría</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Button type='submit' className='btn-orange'>
                            Actualizar Producto
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </Container>
    )
}
