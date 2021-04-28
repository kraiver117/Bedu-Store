import React, { useState } from 'react';
import { Container, Table, Modal, Button } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import './Users.scss';
import { beduStoreAPI } from '../../api/beduStoreAPI';
import { Message } from '../../components/Alert/Alert';
import { Link } from 'react-router-dom';


export const Users = () => {
  const [users, setUsers] = useState([]);
  const [idUser, setIdUser] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [datatable, setDatatable] = useState({});
  // Modal Delete User
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = (id) => {setShowModal(true); setIdUser(id)};

  // Get Users
  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      beduStoreAPI.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      beduStoreAPI
        .get('/users')
        .then((response) => {
          let users = response.data.data;
          for (let i = 0; i < users.length; i++) {
            users[i].role = users[i].role === "user" ? <i className="icon-admin bi bi-x"></i> : <i className="icon-admin bi bi-check2"></i>
            users[i].edit = <Link className="btn btn-primary btn-sm" to={"/user/update/" + users[i]._id}>
                            <i className="bi bi-pencil-square"></i>
                          </Link>;
            users[i].delete = <button onClick={(e) => {handleShow(users[i]._id)}} className="btn btn-danger btn-sm">
                                <i className="bi bi-trash-fill"></i>
                            </button>;

          }
          setUsers(response.data.data);
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
              },
              {
                label: '',
                field: 'delete',
                sort: 'disabled',
                width: 150,
              },
            ],
            rows: users,
          })
        })
        .catch((error) => {
          //setError(error.response.data.error);
          //setLoading(false);
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // Delete User
  const deleteUser = async () => {
    try {
      beduStoreAPI.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      beduStoreAPI
        .delete(`/users/${idUser}`)
        .then((response) => {
          setSuccess("Usuario eliminado con éxito");
          getUsers();
        })
        .catch((error) => {
          setError("Usuario eliminado con éxito");
          console.log(error);
        });
        handleClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container className="container-table">
      <h1 className="mb-4">Usuarios</h1>
      { error && <Message variant="danger">{error}</Message> }
      { success && <Message variant="success">{success}</Message> }
      <MDBDataTableV5 hover entriesOptions={[5, 10, 15, 20, 25]} entries={5} pagingTop searchTop searchBottom={false} pagesAmount={4} data={datatable} />
      {/* <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th className="text-center">Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td className="text-center icon-admin">{ user.role === "user" ? <i className="bi bi-x"></i> : <i className="bi bi-check2"></i>}</td>
              <td className="d-flex justify-content-around">
                <Link className="btn btn-primary btn-sm" to={"/user/update/" + user._id}>
                  <i className="bi bi-pencil-square"></i>
                </Link>
                <button onClick={(e) => {handleShow(user._id)}} className="btn btn-danger btn-sm">
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
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
