import React, { useEffect, useState } from 'react';
import ChannelCard from './ChannelCard';
import MessageBoard from './MessageBoard';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

const Home = () => {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      setRedirect(true);
    }
  }, []);

  const redirectToLogin = () => {
    sessionStorage.removeItem('token');
    setRedirect(true);
  };

  return redirect ? (
    <Redirect to='/login' />
  ) : (
    <Container lg={2} fluid>
      <Row>
        <Nav className='bg-danger border border-light'>
          <Nav.Item>
            <Nav.Link className='text-light' onClick={redirectToLogin}>
              Logout
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
      <Row>
        <Col>
          <ChannelCard
            setSelected={setSelectedChannel}
            redirectToLogin={redirectToLogin}
            token={token}
          />
        </Col>
        <Col lg={10}>
          <MessageBoard
            channelId={selectedChannel}
            redirectToLogin={redirectToLogin}
            token={token}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
