import React, { useState, useEffect } from 'react';
import SendMessageForm from '../Components/SendMessageForm';
import MessageContainer from '../Components/MessageContainer';
import ChannelDisplay from '../Components/ChannelDisplay';
import axios from 'axios';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import { HubConnectionBuilder } from '@microsoft/signalr';

//import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const ChatPage = ({
  isLoggedIn,
  userName,
  userId,
  channelId,
  setSelectedChannel
}) => {
  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    const data = {
      channel_id: parseInt(channelId)
    };

    try {
      const response = await axios.get('/api/getallmessages', {
        data,
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('response from getAllMessages: ', response);
      setMessages(response.data);

      console.log('messages: ', messages);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('hubs/chat')
        .withAutomaticReconnect()
        .build();

      connection.start().then(() => {
        console.log('Connected!');
        const newMessage = {
          Username: userName,
          Text: messages,
          UserId: userId
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
  }, [getAllMessages, messages, userId, userName]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const sendMessage = async (message, userName, userId, channelId) => {
    try {
      const response = await axios.post('/api/message', {
        Username: userName,
        Text: message,
        UserId: userId,
        ChannelId: channelId
      });
      console.log('response: ', response.data);
      getAllMessages();
    } catch (error) {
      console.log('error response: ', error.response.data);
    }
  };

  return isLoggedIn ? (
    <Container className='message-page-container'>
      <Row>
        <div className='welcome-message'>
          <p> Welcome to the chat page {userName}.</p>
          <br /> <p> Select a channel and enter a message to get started.</p>
        </div>{' '}
        <Col>
          <ChannelDisplay setSelectedChannel={setSelectedChannel} />
        </Col>
        <Col>
          <MessageContainer messages={messages} />
          <SendMessageForm
            userId={userId}
            userName={userName}
            sendMessage={sendMessage}
          />
        </Col>
      </Row>
    </Container>
  ) : (
    'You are not authorized to view this page. Please register and/or login. '
  );
};

export default ChatPage;
