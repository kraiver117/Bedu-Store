import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './Payment.scss'

export const Payment = () => {
   return (
      <Container>
         <h2>Metodo de pago</h2>
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
                    <Button type="submit" className="button-orange mt-4">
                        Siguiente
                    </Button>
                </Form.Group>
         </Form>
      </Container>
   )
}