import React, { useEffect, useState, useCallback } from 'react';
import ChannelDisplay from './ChannelDisplay';
import Header from '../components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { HubConnectionBuilder } from '@microsoft/signalr';
import axios from 'axios';

const ChatPage = ({ token }) => {
  const [channelId, setChannelId] = useState();
  const [user, setUser] = useState('');
  const [channelName, setChannelName] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token) {
      setRedirect(true);
    }
  }, [token]);

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
      setUser(responseData);
    }
  }, [token]);

  const getAllMessages = useCallback(async () => {
    const data = {
      channelId: parseInt(channelId)
    };

    await axios
      .post('/api/getallmessages', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('getMessages response: ', response);
        setMessages(response.data);
      })
      .catch((error) => {
        if (error) {
          redirectToLogin();
          return;
        }
      });
  }, [channelId, redirectToLogin, token]);

  useEffect(() => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('hubs/chat')
        .withAutomaticReconnect()
        .build();

      connection.start().then(() => {
        console.log('Connected!');
        const newMessage = {
          Username: user.firstname,
          Text: messages,
          UserId: user.id
        };
        connection.on('ReceiveMessage', (username, text) => {
          const updateChat = [...messages];
          updateChat.push(newMessage);
          getAllMessages();
        });
      });
    } catch (e) {
      console.log('Connection failed: ', e);
    }
  }, [getAllMessages, messages, user.firstname, user.id]);

  const sendMessage = async (message, user) => {
    try {
      const response = await axios.post('/api/message', {
        channelId: channelId,
        userId: user.id,
        text: message,
        userName: user.firstname
      });
      console.log('response: ', response.data);
      getAllMessages();
    } catch (error) {
      console.log('error response: ', error.response);
    }
  };

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
            sendMessage={sendMessage}
            channelId={channelId}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
