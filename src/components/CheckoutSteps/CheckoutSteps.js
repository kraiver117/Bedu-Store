import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {
                    step1 
                        ? <LinkContainer className='secondary-color font-weight-bold' to='login'>
                            <Nav.Link>
                                Iniciar Sesión
                            </Nav.Link>
                        </LinkContainer>
                        : <Nav.Link disabled>
                            Iniciar Sesión
                        </Nav.Link>
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step2
                        ? <LinkContainer className='secondary-color font-weight-bold' to='/address'>
                            <Nav.Link>
                                Dirección
                            </Nav.Link>
                        </LinkContainer>
                        : <Nav.Link disabled>
                            Dirección
                        </Nav.Link>
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step3
                        ? <LinkContainer className='secondary-color font-weight-bold' to='/payment'>
                            <Nav.Link>
                                Método de pago
                            </Nav.Link>
                        </LinkContainer>
                        : <Nav.Link disabled>
                            Método de pago
                        </Nav.Link>
                }
            </Nav.Item>
            <Nav.Item>
                {
                    step4
                        ? <LinkContainer className='secondary-color font-weight-bold' to='/makeorder'>
                            <Nav.Link>
                                Realizar pedido
                            </Nav.Link>
                        </LinkContainer>
                        : <Nav.Link disabled>
                            Realizar pedido
                        </Nav.Link>
                }
            </Nav.Item>
        </Nav>
    )
}

CheckoutSteps.propTypes = {
    step1: PropTypes.bool,
    step2: PropTypes.bool,
    step3: PropTypes.bool,
    step4: PropTypes.bool
}

CheckoutSteps.defaultProps = {
    step1: false,
    step2: false,
    step3: false,
    step4: false
}