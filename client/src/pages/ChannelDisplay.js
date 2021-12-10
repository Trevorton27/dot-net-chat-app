import React, { useEffect, useState, useCallback } from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from '../components/SendMessageForm';
import './ChannelDisplay.css';
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
  messages,
  setChannelId,
  channelId
  //getAllMessages
}) => {
  const [channels, setChannels] = useState([]);

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
        //setChannelId(channels[0].id);

        console.log('channels response: ', channels);
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
    if (token) {
      getChannels();
      getUser();
    }
  }, [token, getChannels, getUser, channels.channelName]);

  const sendMessage = async (message, user) => {
    console.log('sendMessage fired.');
    try {
      const response = await axios.post('/api/message', {
        channelId: channelId,
        userId: user.id,
        text: message,
        userName: user.firstname
      });
      console.log('sendeMessage response: ', response.data);
      //  getAllMessages();
    } catch (error) {
      console.log('error response: ', error);
    }
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <Nav tabs>
        {channels.map((channel) => {
          //console.log('channels in channelDisplay: ', channel);
          const toggleChannel = () => {
            setChannelId(channel.id);
            console.log('channel id: ', channel.id);
          };

          return (
            <NavItem key={channel.id}>
              <NavLink
                className={`${channelId === channel.id ? 'active' : ''}`}
                id={channel.id}
                onClick={() => toggleChannel(channel.id)}
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
            <Row className={'channel__row'}>
              <Col sm='12' className='channel__col'>
                <>
                  <MessageContainer
                    // getAllMessages={getAllMessages}
                    messages={messages}
                    className='bg-dark'
                  />
                </>
              </Col>
            </Row>
            <SendMessageForm
              user={user}
              channelId={channelId}
              sendMessage={sendMessage}
            />
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};

export default ChannelDisplay;
