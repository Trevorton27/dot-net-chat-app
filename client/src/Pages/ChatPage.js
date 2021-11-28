import React, { useState, useEffect, useCallback } from 'react';
import SendMessageForm from '../Components/SendMessageForm';
import MessageContainer from '../Components/MessageContainer';
import ChannelDisplay from '../Components/ChannelDisplay';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import { HubConnectionBuilder } from '@microsoft/signalr';

const ChatPage = ({ isLoggedIn, userName, userId }) => {
  const [messages, setMessages] = useState([]);
  // const [channelId, setChannelId] = useState([]);
  const [channel, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('');

  const getAllMessages = useCallback(async () => {
    try {
      const response = await axios.get('/api/getallmessages', {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('response from getAllMessages: ', response);

      setMessages(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  useEffect(() => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('hubs/chat')
        .withAutomaticReconnect()
        .build();

      connection.start().then(() => {
        // console.log('Connected!');
        const newMessage = {
          Username: userName,
          Text: messages,
          UserId: userId,
          ChannelName: channel.name
        };
        connection.on('ReceiveMessage', (username, text) => {
          const updateChat = [...messages];
          updateChat.push(newMessage);
          getAllMessages();
          getChannels();
          connection.onclose((e) => {
            setMessages([]);
          });
        });
      });
    } catch (e) {
      console.log('Connection failed: ', e);
    }
  }, [getAllMessages, messages, userId, userName, channel.name]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const getChannels = async () => {
    await axios
      .get('/api/channels', {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        const channels = response.data;
        console.log('getChannels response: ', channels);
        // setChannelId(channel.id);
        setChannels(channels);
        setSelectedChannel(channels[0].id);
      })
      .catch((error) => {
        console.log('channels error: ', error);
      });
  };

  useEffect(() => {
    getChannels();
  }, []);

  const sendMessage = async (message, userName, userId, channel) => {
    try {
      const response = await axios.post('/api/message', {
        Username: userName,
        Text: message,
        UserId: userId,
        ChannelName: channel.name
      });
      console.log('response: ', response.data);
      getAllMessages();
    } catch (error) {
      console.log('error response: ', error.response);
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
          <br /> <p> Select a channel and enter a message to get started.</p>
        </div>{' '}
        <Col>
          <ChannelDisplay userName={userName} channel={channel} />
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
