import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  //  const [reroute, setReroute] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    };
    axios.post('/api/login', user).then((response) => {
      console.log('login response: ', response);
      return <Redirect to='/' />;
    });
  };

  return (
    <div id='main' className='d-flex align-items-center h-100'>
      <Container className='bg-light w-75 pb-5 mt-1 rounded'>
        <Row lg={2}></Row>
        <Row className='mt-3 mb-4'>
          <div className='text-center'>
            <h1>Chat App</h1>
          </div>
        </Row>
        {errorMessage ? (
          <Row className='mt-3 mb-4'>
            <div className='text-center text-danger'>{errorMessage}</div>
          </Row>
        ) : (
          ''
        )}
        <Row lg={3}>
          <Col lg={{ offset: 4 }}>
            <Form>
              <Row className='mt-2'>
                <Col>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    onChange={handleEmail}
                  />
                </Col>
              </Row>
              <Form.Group as={Row} className='mt-4'>
                <Col>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    onChange={handlePassword}
                  />
                </Col>
              </Form.Group>
              <Row className='d-flex justify-content-center'>
                <Button
                  type='submit'
                  className='bg-dark mt-3 px-4'
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  href='/register'
                  type='submit'
                  className='bg-dark mx-1 mt-3 px-4'
                >
                  Register
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
