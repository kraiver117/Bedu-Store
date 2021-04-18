import React from 'react';
import '../styles/footer.scss';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';

export const Footer = () => {
    return (
        <footer className="footer-page">
            <Container>
                <Row xs={1} sm={2} md={3} lg={4}>
                    <Col className="footer-box">
                        <h5 className="footer-box-title">Nosotros</h5>
                        <ul>
                            <li><a href="#">¿Quienes somos?</a></li>
                            <li><a href="#">Contacto</a></li>
                        </ul>
                    </Col>
                    <Col className="footer-box">
                        <h5 className="footer-box-title">Servicios</h5>
                        <ul>
                            <li><a href="#">Terminos y condiciones</a></li>
                            <li><a href="#">Politica de privacidad</a></li>
                            <li><a href="#">Cupones</a></li>
                        </ul>
                    </Col>
                    <Col className="footer-box"> 
                        <div className="d-flex justify-content-md-center">
                            <a href="#" target="_blank">
                                <svg class="mr-3 mx-md-2 social-networks-icon" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39 20.5C39 9.17695 30.2707 0 19.5 0C8.7293 0 0 9.17695 0 20.5C0 31.823 8.7293 41 19.5 41C19.6143 41 19.7285 41 19.8428 40.992V25.0404H15.6533V19.9074H19.8428V16.1277C19.8428 11.7475 22.3869 9.36113 26.1041 9.36113C27.8865 9.36113 29.4176 9.49727 29.8594 9.56133V14.1418H27.3C25.2814 14.1418 24.8854 15.1508 24.8854 16.6322V19.8994H29.7223L29.09 25.0324H24.8854V40.2072C33.0357 37.7488 39 29.8611 39 20.5Z" fill="white"/>
                            </svg>
                            </a>
                            <a href="#" target="_blank">
                                <svg class="mr-3 mx-md-2 social-networks-icon" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.443 0H10.5569C4.73574 0 0 4.9786 0 11.0983V29.9019C0 36.0213 4.73574 40.9999 10.5569 40.9999H28.4433C34.2642 40.9999 38.9999 36.0213 38.9999 29.9019V11.0983C38.9999 4.9786 34.2642 0 28.443 0V0ZM36.7136 29.9019C36.7136 34.696 33.0035 38.5963 28.443 38.5963H10.5569C5.99644 38.5963 2.28634 34.696 2.28634 29.9019V11.0983C2.28634 6.30395 5.99644 2.40359 10.5569 2.40359H28.4433C33.0035 2.40359 36.7136 6.30395 36.7136 11.0983V29.9019Z" fill="white"/>
                                <path d="M19.4999 9.28931C13.6198 9.28931 8.83618 14.3183 8.83618 20.4999C8.83618 26.6816 13.6198 31.7105 19.4999 31.7105C25.38 31.7105 30.1637 26.6816 30.1637 20.4999C30.1637 14.3183 25.38 9.28931 19.4999 9.28931ZM19.4999 29.3069C14.8808 29.3069 11.1225 25.3562 11.1225 20.4999C11.1225 15.6439 14.8808 11.6929 19.4999 11.6929C24.1193 11.6929 27.8773 15.6439 27.8773 20.4999C27.8773 25.3562 24.1193 29.3069 19.4999 29.3069Z" fill="white"/>
                                <path d="M30.4188 5.30798C28.6812 5.30798 27.2678 6.79412 27.2678 8.62058C27.2678 10.4474 28.6812 11.9335 30.4188 11.9335C32.1565 11.9335 33.5701 10.4474 33.5701 8.62058C33.5701 6.79381 32.1565 5.30798 30.4188 5.30798ZM30.4188 9.52959C29.9422 9.52959 29.5542 9.1217 29.5542 8.62058C29.5542 8.11916 29.9422 7.71157 30.4188 7.71157C30.8958 7.71157 31.2838 8.11916 31.2838 8.62058C31.2838 9.1217 30.8958 9.52959 30.4188 9.52959Z" fill="white"/>
                            </svg>
                            </a>
                            <a href="#" target="_blank">
                                <img class="mr-3 mx-md-2 social-networks-icon"src="linkedin.png"></img>
                            </a>
                        </div>
                        <div className="bedu-store-text text-left text-md-center">
                            BEDU STORE
                        </div>
                    </Col>
                    <Col className="footer-box">
                        <h5 className="footer-box-title">Métodos de Pago</h5>
                        <ul>
                            <li><a href="#">Paypal</a></li>
                            <li><a href="#">OXXO</a></li>
                            <li><a href="#">Mercado Pago</a></li>
                        </ul>
                    </Col>
                </Row>
                <Row xs={12}>
                    <Col className="footer-copyright text-left text-md-center px-0">
                        <p>Copyright © 2021. Bedu Store. All Rights Reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
