import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';
import { CheckoutSteps } from '../CheckoutSteps/CheckoutSteps';
import { FormContainer } from '../FormContainer/FormContainer';
import './Payment.scss';

export const Payment = ({ history }) => {
   const dispatch = useDispatch();

   const [paymentMethod, setPaymentMethod] = useState('Paypal');

   const paymentHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      history.push('/makeorder');
   }

   return (
      <FormContainer>
         <CheckoutSteps step1 step2 step3 />
         <h2>Método de pago</h2>
         <Form className='form-payment' onSubmit={paymentHandler}>
            <Form.Group>
               <Form.Label as='legend'>Selecciona método de pago:</Form.Label>
               <Col>
                  <Form.Check
                     type="radio"
                     label='Paypal o tarjeta de crédito'
                     value={paymentMethod}
                     checked
                     onChange={(e) => setPaymentMethod(e.target.value)}
                  />
               </Col>
            </Form.Group>
            <Button type="submit" className="btn-orange mt-4">
               Siguiente
            </Button>
         </Form>
      </FormContainer>
   )
}
