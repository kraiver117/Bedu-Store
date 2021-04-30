import React, { useEffect, useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { beduStoreAPI } from '../../api/beduStoreAPI';
import { Message } from '../../components/Alert/Alert';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Loader } from '../../components/Loader/Loader';
import './Users.scss';

export const Users = ({history}) => {
  const [idUser, setIdUser] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [datatable, setDatatable] = useState({});
  const [loading, setLoading] = useState(false);
  // Modal Delete User
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (id) => {setShowModal(true); setIdUser(id)};

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  // Get Users
  useEffect(() => {    
    if(!userInfo.role === "admin") {
      history.push('/');
    }
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      setLoading(true);
      beduStoreAPI.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
      beduStoreAPI
        .get('/users')
        .then((response) => {
          let users = response.data.data;
          for (let i = 0; i < users.length; i++) {
            users[i].role = users[i].role === "user" ? <div className="w-100 text-center"><i className="icon-admin bi bi-x"></i></div>: <div className="w-100 text-center"><i className="icon-admin bi bi-check2"></i></div>;
            users[i].edit = <div className="d-flex justify-content-around">
                          <Link className="btn btn-primary btn-sm" to={`admin/user/${users[i]._id}/edit`}>
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <Button size="sm" onClick={(e) => {handleShow(users[i]._id)}} variant="danger">
                            <i className="bi bi-trash-fill"></i>
                          </Button>                        
                          </div>;
          }
          setDatatable({
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
                field: 'fullName',
                width: 270,
              },
              {
                label: 'Email',
                field: 'email',
                width: 200,
              },
              {
                label: 'Admin',
                field: 'role',
                width: 100,
              },
              {
                label: '',
                field: 'edit',
                sort: 'disabled',
                width: 150,
              }
            ],
            rows: users,
          });
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

  // Delete User
  const deleteUser = async () => {
    try {
      beduStoreAPI.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
      beduStoreAPI
        .delete(`/users/${idUser}`)
        .then((response) => {
          setSuccess("Usuario eliminado con éxito");
          if(idUser === userInfo._id) {
            dispatch(logout());
          }
          getUsers();
        })
        .catch((error) => {
          setError(error.response.data.error);
        });
        handleClose();
    } catch (e) {
      setError(error.response.data.error);
    }
  };

  return (
    <Container className="container-table">
      { loading && <Loader /> }
      <h1 className="mb-4">Usuarios</h1>
      { error && <Message variant="danger">{error}</Message> }
      { success && <Message variant="success">{success}</Message> }
      <MDBDataTableV5 className="table-sm" striped bordered responsive hover entriesOptions={[5, 10, 15, 20, 25]} entries={5} pagingTop searchTop searchBottom={false} pagesAmount={4} data={datatable} />
      <Modal size="sm" show={showModal} onHide={handleClose}  backdrop="static"
        keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Deseas borrar el usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="orange" onClick={deleteUser}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
