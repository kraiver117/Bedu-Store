import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import { CheckoutSteps } from '../CheckoutSteps/CheckoutSteps';
import { FormContainer } from '../FormContainer/FormContainer';

export const Address = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [addressError, setAddressError] = useState(false);

    const [city, setCity] = useState(shippingAddress.city);
    const [cityError, setCityError] = useState(false);

    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [postalCodeError, setPostalCodeError] = useState(false);

    const [country, setCountry] = useState(shippingAddress.country);
    const [countryError, setCountryError] = useState(false);

    const shippingHandler = (e) => {
        e.preventDefault();

        if (!address) setAddressError(true);
        if (!city) setCityError(true);
        if (!postalCode) setPostalCodeError(true);
        if (!country) setCountryError(true);

        if (!address || !city || !postalCode || !country) {
            return;
        } else {
            dispatch(saveShippingAddress({address, city, postalCode, country}));
            history.push('/payment');
        }
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <Form onSubmit={shippingHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ingresa tu dirección"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setAddressError(false);
                        }}
                        isInvalid={addressError}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa una dirección
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ingresa tu ciudad"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setCityError(false);
                        }}
                        isInvalid={cityError}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa una ciudad
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control 
                        type="number"
                        placeholder="Ingresa tu código postal"
                        value={postalCode}
                        onChange={(e) => {
                            setPostalCode(e.target.value);
                            setPostalCodeError(false);
                        }} 
                        isInvalid={postalCodeError}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa un código postal
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>País</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ingresa tu país"
                        value={country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                            setCountryError(false);
                        }}
                        isInvalid={countryError}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor ingresa un país
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="text-right">
                    <Button type="submit" className="btn-orange mt-4">
                        Siguiente
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}
