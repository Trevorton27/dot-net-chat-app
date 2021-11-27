import React, { useState, useEffect, useCallback } from 'react';
import SendMessageForm from '../Components/SendMessageForm';
import MessageContainer from '../Components/MessageContainer';
import ChannelDisplay from '../Components/ChannelDisplay';
import axios from 'axios';
import { Container, Row, Col, Nav } from 'react-bootstrap';

import { HubConnectionBuilder } from '@microsoft/signalr';

//import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const ChatPage = ({ isLoggedIn, userName, userId, channelId, channelName }) => {
  const [messages, setMessages] = useState([]);

  const getAllMessages = useCallback(async () => {
    try {
      const response = await axios.get('/api/getallmessages', {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('response from getAllMessages: ', response);
      setMessages(response.data);

      console.log('messages: ', messages);
    } catch (error) {
      console.log(error.response);
    }
  }, [messages]);

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
          connection.onclose((e) => {
            setMessages([]);
          });
        });
      });
    } catch (e) {
      console.log('Connection failed: ', e);
    }
  }, [getAllMessages, messages, userId, userName]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const getChannels = () => {
    axios
      .get('/api/channels', {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        const channels = response.data;
        console.log('channels response: ', channels);
        // const channels = response.data.channels;
        // setChannels(channels);
        // setSelectedChannel(channels[0].id);
        // console.log('channels: ', channels);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChannels();
  }, []);
  const sendMessage = async (
    message,
    userName,
    userId,
    channelId,
    channelName
  ) => {
    try {
      const response = await axios.post('/api/message', {
        Username: userName,
        Text: message,
        UserId: userId,
        ChannelId: channelId
        // ChannelName:
      });
      console.log('response: ', response.data);
      getAllMessages();
    } catch (error) {
      console.log('error response: ', error.response.data);
    }
  };

  // const createNewChannel = () => {
  //   const response = axios.post('/api/newchannel', channelData);
  //   console.log('response from createNewChannel: ', response);
  // };

  return isLoggedIn ? (
    <Container className='message-page-container'>
      <Row>
        <div className='welcome-message'>
          <p> Welcome to the chat page {userName}.</p>
          <br /> <p> Select a channel and enter a message to get started.</p>
        </div>{' '}
        <Col>
          <ChannelDisplay />
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
