import React, { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Image, Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { createProductReview, listProductDetails } from '../../actions/productActions';
import { Message } from '../../components/Alert/Alert';
import { CardsCarousel } from '../../components/CardsCarousel/CardsCarousel';
import { Loader } from '../../components/Loader/Loader';
import { Rating } from '../../components/Rating/Rating';

import './ProductDetails.scss';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants';

export const ProductDetails = ({ history, match }) => {
    const [qty, setQty] = useState(0);
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({
        rating: '',
        title: '',
        comment: ''
    });


    const productId = match.params.id;
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productReviewCreate = useSelector(state => state.productReviewCreate);
    const { success: successProductReview, error: errorProductReview, loading: loadingProductReview } = productReviewCreate;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });

        if (successProductReview) {
            setRating(0);
            setComment('');
            setTitle('');
        }

        dispatch(listProductDetails(productId));
        window.scrollTo(0,0);
    }, [dispatch, productId, successProductReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const handleCreateReview = (e) => {
        e.preventDefault();

        if(!rating) setErrors(errors => ({...errors, rating: 'Ingresa un rating'}));

        if(!title) setErrors(errors => ({...errors, title: 'Ingresa un título'}));

        if(!comment) setErrors(errors => ({...errors, comment: 'Ingresa un comentario'}));

        if(errors.rating || errors.title || errors.comment){
            return;
        } else {
            dispatch(createProductReview(productId, {
                title,
                comment,
                rating
            }));
        }
    }

    return (
        <Container>
            <Link className='btn btn-light back-btn my-4' to='/'>
                Regresar
            </Link>
            { loading ? <Loader className='d-flex' position='block' marginY='100px' /> : error ? <Message variant="danger">{error}</Message> :
                (
                    <>
                        <Row className='my-1'>
                            <Col md={5} className='text-center'>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h5>{product.name}</h5>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating || 0} text={`${product.numReviews} reseñas`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <span className='orange-color font-weight-bold'> Descripción: </span>{product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <span className='orange-color font-weight-bold'> Precio: </span>
                                                </Col>
                                                <Col>
                                                    ${product.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    <span className='orange-color font-weight-bold'> Status: </span>
                                                </Col>
                                                <Col>
                                                    {product.inStock > 0 ? 'Disponible' : 'No disponible'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.inStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        <span className='orange-color font-weight-bold'> Cantidad: </span>
                                                    </Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product.inStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroup.Item>
                                            <Button
                                                className='btn-orange btn-block'
                                                type='button'
                                                disabled={product.inStock === 0}
                                                onClick={addToCartHandler}
                                            >
                                                Agregar al carrito
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='mt-5'>
                            <Col>
                                <h4>Reseñas de producto</h4>
                                {product.reviews && product.reviews.length === 0 && <Message>No se han agregado reviews para este producto</Message>}
                                {loadingProductReview ? <Loader /> : (
                                    <ListGroup variant='flush'>
                                        { product.reviews &&
                                            product.reviews.map(review => (
                                                <ListGroup.Item key={review._id}>
                                                    <Row>
                                                        <Col md={12}>
                                                            <Image className='review-user-img mr-2' src='https://www.pikpng.com/pngl/b/326-3261783_person-icon-default-user-image-jpg-clipart.png' roundedCircle fluid thumbnail />
                                                            <span>{review.name}</span>
                                                        </Col>
                                                        <Col md={12}>
                                                            <Rating value={review.rating} display='inline' />
                                                            <strong className='ml-1'>{review.title}</strong>
                                                            <p className='text-muted'>{`Reseña agregada el ${moment(review.createdAt).format('LL')}`}</p>
                                                        </Col>
                                                        <Col md={12}>
                                                            <p>{review.comment}</p>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                        <ListGroup.Item className='mt-3'>
                                            <h4>Añade una reseña de producto</h4>
                                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                            {
                                                userInfo ? (
                                                    <Form onSubmit={handleCreateReview}>
                                                        <Form.Group controlId='rating'>
                                                            <Form.Label>Calificación</Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}
                                                                isInvalid={errors.rating}
                                                                onFocus={() => setErrors({...errors, rating: ''})}
                                                            >
                                                                <option value=''>Selecciona la calificación del producto:</option>
                                                                <option value='1'>1 - Muy Malo</option>
                                                                <option value='2'>2 - Malo</option>
                                                                <option value='3'>3 - Regular</option>
                                                                <option value='4'>4 - Muy bueno</option>
                                                                <option value='5'>5 - Excelente</option>
                                                            </Form.Control>
                                                            <Form.Control.Feedback type="invalid">
                                                                Por favor ingresa una calificación
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group controlId='review-title'>
                                                            <Form.Label>Título</Form.Label>
                                                            <Form.Control
                                                                type='text'
                                                                placeholder='Ingresa el título de la reseña'
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)}
                                                                isInvalid={errors.title}
                                                                onFocus={() => setErrors({...errors, title: ''})}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Por favor ingresa un título
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Form.Group controlId='review-comments'>
                                                            <Form.Label>Reseña</Form.Label>
                                                            <Form.Control
                                                                as='textarea'
                                                                placeholder='Ingresa una reseña del producto'
                                                                rows={5}
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}
                                                                isInvalid={errors.comment}
                                                                onFocus={() => setErrors({...errors, comment: ''})}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Por favor ingresa una reseña
                                                            </Form.Control.Feedback>
                                                        </Form.Group>
                                                        <Button 
                                                            className='btn-orange'
                                                            type='submit'
                                                        >
                                                            Crear reseña
                                                        </Button>
                                                    </Form>
                                                ) :
                                                <Message>
                                                    <Link to='/login'>Inicia sesión</Link> para añadir una reseña
                                                </Message>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                )}
                            </Col>
                        </Row>
                    </>
                )
            }
            <CardsCarousel title='También te podría interesar' />
        </Container>
    )
}
