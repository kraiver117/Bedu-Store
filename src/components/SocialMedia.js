import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BeduLogo from '../assets/BeduLogoSmall.png';
import '../styles/socialMedia.scss';

export const SocialMedia = () => {
    return (
        <Container className='pt-5'>
            <Row className='d-flex justify-content-center'>
                <Col sm={12} md={5} className='socialMediaContainer d-flex flex-column justify-content-center align-items-center mb-5'>
                    <h4 className='text-white pb-4'>Visita nuestra página oficial</h4>
                    <a href="https://bedu.org/" target="_blank">
                        <img src={BeduLogo} alt="Bedu Logo Small" style={{height: '60px', width: '50px'}}/>
                    </a>
                </Col>
                <Col sm={12} md={5} className='socialMediaContainer d-flex flex-column justify-content-center align-items-center mb-5 offset-md-1'>
                    <h4 className='text-white pb-4'>Visita nuestra redes</h4>
                    <div className='d-flex justify-content-around w-100 pr-5 pl-5'>
                        <a href='https://www.facebook.com/BeduOrg' target="_blank">
                            <i class="bi bi-facebook text-white" style={{fontSize: '2.5rem'}}></i>
                        </a>
                        <a href="https://www.instagram.com/bedu_org/" target="_blank">
                            <i class="bi bi-instagram text-white" style={{fontSize: '2.5rem'}}></i>
                        </a>
                        <a href="https://www.linkedin.com/school/beduorg/mycompany/" target="_blank">
                            <i class="bi bi-linkedin text-white" style={{fontSize: '2.5rem'}}></i>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}