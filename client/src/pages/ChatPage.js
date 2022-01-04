import React, { useEffect, useState, useCallback } from 'react';
import ChannelDisplay from './ChannelDisplay';
import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

const ChatPage = () => {
  const [channelId, setChannelId] = useState();
  const [user, setUser] = useState('');
  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);

  console.log('user in ChatPage: ', user);
  const redirectToLogin = useCallback(() => {
    setRedirect(true);
  }, []);

  const getUser = useCallback(async () => {
    const response = await axios.get('api/user', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    const responseData = await response.data;
    console.log('userData: ', responseData);

    setUser(responseData);
  }, []);

  return redirect ? (
    <Redirect to='/login' />
  ) : (
    <Container lg={2} fluid>
      <Row>
        <Header setUser={setUser} user={user} setRedirect={setRedirect} />
      </Row>
      <Row>
        <h5
          style={{
            textAlign: 'left',
            marginTop: '2em',
            marginBottom: '2em',
            marginLeft: '15em'
          }}
        >
          Channels
        </h5>
        <Col lg={10}>
          <ChannelDisplay
            classname='bg-dark'
            setChannelId={setChannelId}
            redirectToLogin={redirectToLogin}
            getUser={getUser}
            user={user}
            setChannelName={setChannelName}
            channelName={channelName}
            channelId={channelId}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
