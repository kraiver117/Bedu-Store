import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './MakeOrder.scss';

export const MakeOrder = () => {
   return (
      <Container>
         <section className="makeorder-container">
            <div className="d-flex justify-content-around my-5">
               <div className="makeorder-info">
                  <h2> Dirección </h2>
                  <p> Direccion: Nuevo mexico #123 </p>
                  <hr />
                  <h2> Método de pago </h2>
                  <p> Metodo: paypal </p>
                  <hr />
                  <h2> Productos </h2>
                  <div className="makeorder-products d-flex align-items-center">
                     <img src="./images/playeraBedu.png" alt="Playera BEDU" />
                     <p>Platera BEDU</p>
                     <p className="total"> 1x $120.00 = <span>$120.00</span> </p>
                  </div>
               </div>
               <div className="makeorder-checkout">
                  <div>
                     <h2>Resumen de pedido</h2>
                     <p>Productos  <span>$120</span></p>
                     <hr />
                     <p>Envio  <span>$50</span></p>
                     <hr />
                     <p>Productos  <span>$170</span></p>
                     <Link to="/order-detail">
                        <Button className="btn-checkout" block>
                           Siguiente
                        </Button>
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      </Container>
   )
}
