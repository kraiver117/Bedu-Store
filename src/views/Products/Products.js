import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Table, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';

export const Products = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList;

    const productDelete = useSelector(state => state.productDelete)
    const { 
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete 
    } = productDelete

    useEffect(() => {
        dispatch(listProducts('', 1));
    }, [dispatch, successDelete]);

    const deleteProductHandler = (id) => {
        if (window.confirm('¿Deseas eliminar el producto?')) {
            dispatch(deleteProduct(id))
        }
    }

    return (
        <Container>
            <Row className="align-items-center">
                <Col>
                    <h3>Productos</h3>
                </Col>
                <Col className='text-right'>
                    <LinkContainer to='createproduct'>
                        <Button className='btn-orange my-3'>
                            <FaPlus /> Crear producto
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader /> : 
                (
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                    <th>Categoria</th>
                                    <th>Marca</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td className='d-flex'>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm mr-2'>
                                                        <FaEdit />
                                                    </Button>
                                                </LinkContainer>
                                                <Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product._id)}>
                                                    <BsTrashFill />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </>
                )
            }
        </Container>
    )
}
