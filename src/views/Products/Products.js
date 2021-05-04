import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTableV5 } from 'mdbreact';
import { Row, Col, Button, Container, Modal } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { listProducts, deleteProduct } from '../../actions/productActions';
import { Message } from '../../components/Alert/Alert';
import { Loader } from '../../components/Loader/Loader';
import { PRODUCT_DELETE_RESET } from '../../constants/productConstants';

export const Products = ({ history }) => {
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector(state => state.productDelete);
    const { 
        loading: loadingDelete, 
        error: errorDelete, 
        success: successDelete 
    } = productDelete

    const [dataTable, setDataTable] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [productId, setProductId] = useState([]);
    const handleClose = () => setShowModal(false);
    const handleShow = (id) => {setShowModal(true); setProductId(id)};

    const dispatch = useDispatch();

    const deleteProductHandler = () => {
        dispatch(deleteProduct(productId));
        handleClose();
    }

    const setTableContent = () => {
            for (let i = 0; i < products.length; i++) {
                products[i].actions = 
                    <div className='d-flex justify-content-around'>
                        <LinkContainer to={`/admin/product/${products[i]._id}/edit`}>
                            <Button variant='btn btn-primary' className='btn-sm mr-2'>
                                <FaEdit color='white' />
                            </Button>
                        </LinkContainer>
                        <Button variant='danger' className='btn-sm' onClick={() => handleShow(products[i]._id)}>
                            <BsTrashFill />
                        </Button>
                    </div>
            }

            setDataTable({
                columns: [
                {
                    label: 'ID',
                    field: '_id',
                    width: 150,
                    attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                    },
                },
                {
                    label: 'Nombre',
                    field: 'name',
                    width: 270,
                },
                {
                    label: 'Precio',
                    field: 'price',
                    width: 200,
                },
                {
                    label: 'En stock',
                    field: 'inStock',
                    width: 200,
                },
                {
                    label: 'Categoria',
                    field: 'category',
                    width: 100,
                },
                {
                    label: '',
                    field: 'actions',
                    sort: 'disabled',
                    width: 150,
                }
                ],
                rows: products
            });
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        if (!products || !dataTable.rows || successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
            dispatch(listProducts());
        }

        setTableContent();

        // eslint-disable-next-line
    }, [dispatch, successDelete, userInfo, products]);

    return (
        <Container className='my-5'>
            <Row className="align-items-center">
                <Col>
                    <h1>Productos</h1>
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
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                <MDBDataTableV5 
                    className='table-sm' 
                    striped 
                    bordered 
                    responsive 
                    hover 
                    pagingTop 
                    searchTop
                    searchBottom={false}
                    entriesOptions= {[5, 10, 15, 20, 25]}
                    entries={5}
                    pagesAmount={5}
                    data={dataTable}
                />
            }
            <Modal size="sm" show={showModal} onHide={handleClose}  backdrop="static"
                keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Borrar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Deseas borrar el producto?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button className="btn-orange" onClick={deleteProductHandler}>
                        Aceptar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
