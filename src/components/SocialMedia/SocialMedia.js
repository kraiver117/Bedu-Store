import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BeduLogo from '../../assets/images/BeduLogoSmall.png';
import './SocialMedia.scss';

export const SocialMedia = () => {
    return (
        <Container className='pt-5'>
            <Row className='d-flex justify-content-center'>
                <Col sm={12} md={5} className='socialMediaContainer d-flex flex-column justify-content-center align-items-center mb-5'>
                    <h4 className='text-white pb-4'>Visita nuestra página oficial</h4>
                    <a href="https://bedu.org/" target="_blank" rel="noreferrer">
                        <img className='beduLogo' src={BeduLogo} alt="Bedu Logo Small"/>
                    </a>
                </Col>
                <Col sm={12} md={5} className='socialMediaContainer d-flex flex-column justify-content-center align-items-center mb-5 offset-md-1'>
                    <h4 className='text-white pb-4'>Visita nuestra redes</h4>
                    <div className='d-flex justify-content-around w-100 pr-5 pl-5'>
                        <a href='https://www.facebook.com/BeduOrg' target="_blank" rel="noreferrer">
                            <i className="bi bi-facebook socialMediaLogo text-white"></i>
                        </a>
                        <a href="https://www.instagram.com/bedu_org/" target="_blank" rel="noreferrer">
                            <i className="bi bi-instagram socialMediaLogo text-white"></i>
                        </a>
                        <a href="https://www.linkedin.com/school/beduorg/mycompany/" target="_blank" rel="noreferrer">
                            <i className="bi bi-linkedin socialMediaLogo text-white"></i>
                        </a>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}