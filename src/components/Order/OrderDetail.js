import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

import './OrderDetail.scss';

export const OrderDetail = () => {
   return (
      <Container>
         <section className="detailOrder-container">
            <div className="d-flex justify-content-around my-5">
               <div className="detailOrder-info">
                  <h1>Pedido 1598452128456AS55D</h1>
                  <h2> Envío </h2>
                  <p> Nombre: José Alfredo Pérez </p>
                  <p> Email: josealf@gmail.com </p>
                  <p> Dirección: Nuevo Mexico #123, CDMX </p>
                  <Alert variant='danger'>
                     No entregado
                  </Alert>
                  <hr />
                  <h2> Método de pago </h2>
                  <p> Método: paypal </p>
                  <Alert variant='danger'>
                     No entregado
                  </Alert>
                  <hr />
                  <h2> Productos </h2>
                  <div className="detailOrder-products d-flex align-items-center">
                     <img src="./images/playeraBedu.png" alt="Playera BEDU" />
                     <p>Playera BEDU</p>
                     <p className="total"> 1x $120.00 = <span>$120.00</span> </p>
                  </div>
               </div>
               <div className="detailOrder-checkout">
                  <div>
                     <h2>Resumen de pedido</h2>
                     <p>Productos  <span>$120</span></p>
                     <hr />
                     <p>Envio  <span>$50</span></p>
                     <hr />
                     <p>Productos  <span>$170</span></p>
                     <Button variant="primary" block>
                        Paypal
                     </Button>
                     <Button variant="secondary" block>
                        Debit or Credit Card
                     </Button>
                  </div>
               </div>
            </div>
         </section>
      </Container>
   )
}
