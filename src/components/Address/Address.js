import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export const Address = () => {
   return (
      <Container>
            <Form className="form">
                <Form.Group>
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Codigo postal</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Pais</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>
                <Form.Group className="text-right">
                    <Button type="submit" className="button-orange mt-4">
                        Registrarse
                    </Button>
                </Form.Group>
            </Form>
        </Container>
   )
}
