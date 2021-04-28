import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Payment.scss';

export const Payment = () => {
   return (
      <Container>
         <h2>Método de pago</h2>
         <Form className="form-payment">
            <Form.Group controlId="formGroupEmail">
               <Form.Label>Selecciona método de pago:</Form.Label>
               <Form.Check
                  type="radio"
                  label='Paypal o tarjeta de credito'
                  id={`disabled-default`}
               />
            </Form.Group>
            <Form.Group className="text-left">
            <Link to="/makeorder">
                    <Button type="submit" className="button-orange mt-4">
                        Siguiente
                    </Button>
            </Link>
                </Form.Group>
         </Form>
      </Container>
   )
}
