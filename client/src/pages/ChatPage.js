import React, { useEffect, useState, useCallback } from 'react';
import ChannelDisplay from './ChannelDisplay';
import MessageContainer from './MessageContainer';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const ChatPage = ({ token }) => {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState('');
  const [channelName, setChannelName] = useState('');
  useEffect(() => {
    if (!token) {
      setRedirect(true);
    }
  }, [token]);

  const redirectToLogin = () => {
    sessionStorage.removeItem('token');
    setRedirect(true);
  };

  const getUser = useCallback(async () => {
    const response = await axios.get('api/user', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (token) {
      const responseData = await response.data;
      console.log('userData: ', responseData);
      setUser(responseData);
    }
  }, [token]);

  return redirect ? (
    <Redirect to='/login' />
  ) : (
    <Container lg={2} fluid>
      <Row>
        <Nav className='bg-dark border border-light'>
          <Nav.Item>
            <Nav.Link className='text-light' onClick={redirectToLogin}>
              Logout
            </Nav.Link>
          </Nav.Item>
          <p style={{ color: '#fff', paddingTop: '.5em', marginLeft: '40em' }}>
            {' '}
            Welcome {user.firstname}
          </p>
        </Nav>
      </Row>
      <Row>
        <Col lg={10}>
          <MessageContainer
            channelId={selectedChannel}
            redirectToLogin={redirectToLogin}
            token={token}
            getUser={getUser}
            user={user}
            channelName={channelName}
          />
        </Col>
        <Col>
          <ChannelDisplay
            setSelected={setSelectedChannel}
            redirectToLogin={redirectToLogin}
            token={token}
            getUser={getUser}
            user={user}
            setChannelName={setChannelName}
            channelName={channelName}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
