import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { register } from "../../redux/actions/userActions";
import './Register.css'

const Register = ({ history, location }) => {
    const [name, setName] = useState("");
  
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.userRegister);

  console.log(`location.search = ${location.search}`);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(`redirect=${redirect}`);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name,email, password));
  };
  return (
    <Container >
      <Row>
        <Col>
          <h3>Register</h3>
                  <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control className='register-form'
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control className='register-form'
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control className='register-form'
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button className='btn' type="submit" variant="primary">Register</Button>
            <Row>
              <Col>
                Already have an account?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                >
                  Login
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
