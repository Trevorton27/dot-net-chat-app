import React, { useEffect, useState, useCallback } from 'react';
import ChannelDisplay from './ChannelDisplay';
import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

const ChatPage = ({ token }) => {
  const [channelId, setChannelId] = useState();
  const [user, setUser] = useState('');
  const [channelName, setChannelName] = useState('');
  const [users, setUsers] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token) {
      setRedirect(true);
    }
  }, [token]);
  console.log('user in ChatPage: ', user);
  const redirectToLogin = useCallback(() => {
    sessionStorage.removeItem('token');
    setRedirect(true);
  }, []);

  const getUser = useCallback(async () => {
    const response = await axios.get('api/user', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (token) {
      const responseData = await response.data;
      console.log('userData: ', responseData);
      console.log('token: ', token);
      setUser(responseData);
    }
  }, [token]);

  // useEffect(() => {
  //   try {
  //     const connection = new HubConnectionBuilder()
  //       .withUrl('hubs/chat')
  //       .withAutomaticReconnect()
  //       .build();

  //     connection.start().then(() => {
  //       console.log('Connected!');
  //       const newMessage = {
  //         Username: user.firstname,
  //         Text: messages,
  //         UserId: user.id
  //       };
  //       connection.on('ReceiveMessage', () => {
  //         const updateChat = [...messages];
  //         updateChat.push(newMessage);
  //         getAllMessagesByChannel();
  //       });
  //     });
  //   } catch (e) {
  //     console.log('Connection failed: ', e);
  //   }
  // }, [getAllMessagesByChannel, messages, user.firstname, user.id]);

  return redirect ? (
    <Redirect to='/login' />
  ) : (
    <Container lg={2} fluid>
      <Row>
        <Header
          token={token}
          setUser={setUser}
          user={user}
          setRedirect={setRedirect}
        />
      </Row>
      <Row>
        <h4 style={{ textAlign: 'center' }}>Channels</h4>
        <Col lg={10}>
          <ChannelDisplay
            classname='bg-dark'
            setChannelId={setChannelId}
            redirectToLogin={redirectToLogin}
            token={token}
            getUser={getUser}
            user={user}
            setChannelName={setChannelName}
            channelName={channelName}
            messages={messages}
            channelId={channelId}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
