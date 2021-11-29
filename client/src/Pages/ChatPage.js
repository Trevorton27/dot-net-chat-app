import React, { useState, useEffect, useCallback } from 'react';
import SendMessageForm from '../Components/SendMessageForm';
import MessageContainer from '../Components/MessageContainer';
import ChannelDisplay from '../Components/ChannelDisplay';
import MessageDisplay from '../Components/MessageDisplay';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

import { HubConnectionBuilder } from '@microsoft/signalr';

const ChatPage = ({ isLoggedIn, userName, userId }) => {
  const [messages, setMessages] = useState([]);
  const [channel, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('');
  const [channelId, setChannelId] = useState('');

  const getAllMessages = useCallback(async () => {
    try {
      const response = await axios.get('/api/getallmessages', {
        headers: { 'Content-Type': 'application/json' },
        ChannelName: channel.channelName
      });

      console.log('response from getAllMessages: ', response);

      setMessages(response.data);
    } catch (error) {
      console.log(error.response);
    }
  }, []);

  const getChannels = useCallback(async () => {
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
        console.log('selectedChannel: ', selectedChannel);
      })
      .catch((error) => {
        console.log('channels error: ', error);
      });
  });

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
          ChannelName: channel.channelName
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
  }, [
    getAllMessages,
    messages,
    userId,
    userName,
    channel.channelName,
    getChannels
  ]);

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  const sendMessage = async (message, userName, userId, channel, channelId) => {
    try {
      const response = await axios.post('/api/message', {
        headers: { 'Content-Type': 'application/json' },
        Username: userName,
        Text: message,
        UserId: userId,
        ChannelId: parseInt(channelId),
        ChannelName: channel.name
      });
      console.log('response: ', response.data);
      getAllMessages();
    } catch (error) {
      console.log('error response: ', error);
    }
  };
  //console.log('messages in chatpage: ', messages);

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
          <MessageDisplay
            userId={userId}
            userName={userName}
            channelId={channelId}
            messages={messages}
            sendMessage={sendMessage}
            channel={channel}
          />
        </Col>
        <Col>
          <ChannelDisplay
            getChannels={getChannels}
            channelId={channelId}
            setChannelId={setChannelId}
            userName={userName}
            channel={channel}
          />
        </Col>
      </Row>
    </Container>
  ) : (
    'You are not authorized to view this page. Please register and/or login. '
  );
};

export default ChatPage;
