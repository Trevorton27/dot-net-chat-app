import React, { useEffect, useState, useCallback, useRef } from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from '../components/SendMessageForm';
import LoggedInUsers from '../components/LoggedInUsers';
import './ChannelDisplay.css';
import * as signalR from '@microsoft/signalr';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  Col,
  Row,
  TabPane
} from 'reactstrap';
import axios from 'axios';

const ChannelDisplay = ({
  redirectToLogin,
  token,
  user,
  getUser,
  setChannelId,
  channelId,
  setChannelName,
  channelName
}) => {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [connection, setConnection] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const latestChat = useRef(null);
  latestChat.current = messages;
  console.log('users: ', users);

  const returnNewMessage = useCallback(async () => {
    await axios.get(`/api/getmessagebyid/${newMessage.id}`).then((response) => {
      console.log('new message response: ', response.data);
      const newMessage = response.data;
      setMessages((messages) => [...messages, newMessage]);
    });
  }, [newMessage.id]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('hub/chat')
      .withAutomaticReconnect()
      .build();
    setConnection(newConnection);
    returnNewMessage();
  }, [returnNewMessage]);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log('Good Connection');
          connection.on('ReceiveMessage', (message) => {
            console.log('receiving message');
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);
            setMessages(updatedChat);
            // updateScroll();
          });
        })
        .catch((e) => console.log('error in signalR connection: ', e));
    }
  }, [connection]);

  const sendMessage = async () => {
    const message = {
      channelId: channelId,
      userId: user.id,
      text: newMessage,
      userName: user.firstname,
      channelName: channelName
    };
    try {
      const response = await axios.post('/api/message', message);
      // connection.on('ReceiveMessage',
      console.log('sendmessage response: ', response.data);
      setNewMessage(response.data);
      setNewMessage('');
    } catch (e) {
      console.log(e);
    }
  };

  const getAllMessagesByChannel = useCallback(async () => {
    // console.log('channelId in getAllMessagesByChannel: ', channelId);
    await axios
      .get(`/api/getmessagesbychannel/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        // console.log('getMessagesByChannel response: ', response);
        setMessages(response.data);
      })
      .catch((error) => {
        if (error) {
          console.log('error in getAllMessagesByChannel: ', error);
        }
      });
  }, [channelId, token]);

  useEffect(() => {
    getAllMessagesByChannel();
  }, [getAllMessagesByChannel]);

  const getChannels = useCallback(async () => {
    await axios
      .get('/api/channels', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const channels = response.data;
        setChannels(channels);

        //  console.log('channels response: ', channels);
      })
      .catch((error) => {
        if (error) {
          console.log('error: ', error);
          redirectToLogin();
          return;
        }
      });
  }, [redirectToLogin, token]);
  console.log('user: ', user);

  useEffect(() => {
    getChannels();
    getUser();
  }, [getUser, getChannels]);

  return (
    <div>
      <Row>
        <Col>
          <Nav tabs>
            {channels.map((channel) => {
              //console.log('channels in channelDisplay: ', channel);
              const toggleChannel = () => {
                setChannelId(channel.id);
                setChannelName(channel.channelName);
                console.log('channel: ', channel);
                console.log('channel id: ', channel.id);
              };

              return (
                <NavItem key={channel.id}>
                  <NavLink
                    className={`${
                      channelId === channel.id ? 'active' : 'not-active'
                    }`}
                    id={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    style={{ fontSize: '12px' }}
                  >
                    {channel.channelName}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={channelId}>
            {console.log('activeTab: ', channelId)}
            {channels.map((channel) => (
              <TabPane key={channel.id} tabId={channel.id}>
                <>
                  <MessageContainer
                    messages={messages}
                    // returnNewMessage={returnNewMessage}
                    className='bg-dark'
                  />
                  <SendMessageForm
                    user={user}
                    channelId={channelId}
                    sendMessage={sendMessage}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                  />
                </>
              </TabPane>
            ))}
          </TabContent>
        </Col>
        <Col className='col-4'>
          <LoggedInUsers users={users} />
        </Col>
      </Row>
    </div>
  );
};

export default ChannelDisplay;
