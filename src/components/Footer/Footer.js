import React from 'react';
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import './Footer.scss';

export const Footer = () => {
    return (
        <footer className="footer-page">
            <Container>
                <Row xs={1} sm={2} md={3} lg={3}>
                    <Col className="footer-box">
                        <h5 className="footer-box-title">Nosotros</h5>
                        <ul>
                            <li><a href="/quienesSomos">¿Quiénes somos?</a></li>
                            <li><a href="/contacto">Contacto</a></li>
                        </ul>
                    </Col>
                    <Col className="footer-box">
                        <h5 className="footer-box-title">Servicios</h5>
                        <ul>
                            <li><a href="/terminosCondiciones">Términos y condiciones</a></li>
                            <li><a href="/politicaPrivacidad">Política de privacidad</a></li>
                            <li><a href="/cupones">Cupones</a></li>
                        </ul>
                    </Col>
                    <Col className="footer-box">
                        <h5 className="footer-box-title">Métodos de pago</h5>
                        <ul>
                            <li><a href="/paypal">Paypal</a></li>
                            <li><a href="/oxxo">OXXO</a></li>
                            <li><a href="/mercadoPago">Mercado Pago</a></li>
                        </ul>
                    </Col>
                </Row>   
                <Row>
                    <Col className="footer-box"> 
                        <div className="justify-content-md-center">
                            <a href="https://www.facebook.com/BeduOrg" target="_blank" rel="noreferrer">
                                <svg className="mr-5 mx-md-5 social-networks-icon" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M39 20.5C39 9.17695 30.2707 0 19.5 0C8.7293 0 0 9.17695 0 20.5C0 31.823 8.7293 41 19.5 41C19.6143 41 19.7285 41 19.8428 40.992V25.0404H15.6533V19.9074H19.8428V16.1277C19.8428 11.7475 22.3869 9.36113 26.1041 9.36113C27.8865 9.36113 29.4176 9.49727 29.8594 9.56133V14.1418H27.3C25.2814 14.1418 24.8854 15.1508 24.8854 16.6322V19.8994H29.7223L29.09 25.0324H24.8854V40.2072C33.0357 37.7488 39 29.8611 39 20.5Z" fill="white"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/bedu_org/" target="_blank" rel="noreferrer">
                                <svg className="mr-5 mx-md-5 social-networks-icon" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M28.443 0H10.5569C4.73574 0 0 4.9786 0 11.0983V29.9019C0 36.0213 4.73574 40.9999 10.5569 40.9999H28.4433C34.2642 40.9999 38.9999 36.0213 38.9999 29.9019V11.0983C38.9999 4.9786 34.2642 0 28.443 0V0ZM36.7136 29.9019C36.7136 34.696 33.0035 38.5963 28.443 38.5963H10.5569C5.99644 38.5963 2.28634 34.696 2.28634 29.9019V11.0983C2.28634 6.30395 5.99644 2.40359 10.5569 2.40359H28.4433C33.0035 2.40359 36.7136 6.30395 36.7136 11.0983V29.9019Z" fill="white"/>
                                    <path d="M19.4999 9.28931C13.6198 9.28931 8.83618 14.3183 8.83618 20.4999C8.83618 26.6816 13.6198 31.7105 19.4999 31.7105C25.38 31.7105 30.1637 26.6816 30.1637 20.4999C30.1637 14.3183 25.38 9.28931 19.4999 9.28931ZM19.4999 29.3069C14.8808 29.3069 11.1225 25.3562 11.1225 20.4999C11.1225 15.6439 14.8808 11.6929 19.4999 11.6929C24.1193 11.6929 27.8773 15.6439 27.8773 20.4999C27.8773 25.3562 24.1193 29.3069 19.4999 29.3069Z" fill="white"/>
                                    <path d="M30.4188 5.30798C28.6812 5.30798 27.2678 6.79412 27.2678 8.62058C27.2678 10.4474 28.6812 11.9335 30.4188 11.9335C32.1565 11.9335 33.5701 10.4474 33.5701 8.62058C33.5701 6.79381 32.1565 5.30798 30.4188 5.30798ZM30.4188 9.52959C29.9422 9.52959 29.5542 9.1217 29.5542 8.62058C29.5542 8.11916 29.9422 7.71157 30.4188 7.71157C30.8958 7.71157 31.2838 8.11916 31.2838 8.62058C31.2838 9.1217 30.8958 9.52959 30.4188 9.52959Z" fill="white"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/school/beduorg/mycompany/" target="_blank" rel="noreferrer">
                                <svg className="mr-5 mx-md-5 social-networks-icon bi bi-linkedin" fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                </svg>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row xs={12}>
                    <Col className="footer-copyright text-left text-md-center text-center px-0">
                        <p>Copyright © 2021. Bedu Store. All Rights Reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
