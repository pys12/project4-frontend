import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../redux/actions/cartActions";
import './Shipping.css'

const Shipping = ({history}) => {
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector((state) => state.cart);
  const [streetAddress, setStreetAddress] = useState(shippingAddress.streetAddress);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [zipcode, setZipcode] = useState(shippingAddress.zipcode);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(saveShippingAddress({ streetAddress, city, state, zipcode }))
    history.push('/payment')
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Shipping Address</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='address-section' controlId="address">
              <Form.Label>Street Address</Form.Label>
              <Form.Control className='shipping-form'
                type="text"
                value={streetAddress}
                required
                onChange={(e) => setStreetAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group  className='address-section' controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control className='shipping-form'
                type="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group  className='address-section' controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control className='shipping-form'
                type="text"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>
                      
            <Form.Group  className='address-section' controlId="zipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control className='shipping-form'
                type="text"
                value={zipcode}
                required
                onChange={(e) => setZipcode(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Button type="submit" variant="primary">
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Shipping;
