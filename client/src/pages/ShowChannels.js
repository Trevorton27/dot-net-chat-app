import React, { useEffect, useState, useCallback } from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from '../components/SendMessageForm';
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

const ShowChannels = ({
  messages,
  setChannelId,
  token,
  redirectToLogin,
  getUser,
  sendMessage
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
        setChannelId(channels[0].id);

        console.log('channels response: ', channels);
      })
      .catch((error) => {
        if (error) {
          console.log('error: ', error);
          redirectToLogin();
          return;
        }
      });
  }, [redirectToLogin, token, setChannelId]);

  useEffect(() => {
    if (token) {
      getChannels();
      getUser();
      console.log('ChannelName: ', channels.channelName);
    }
  }, [token, getChannels, getUser, channels.channelName]);

  return (
    <>
      <Nav tabs>
        {channels.map((channel) => {
          console.log('channels in channelDisplay: ', channel);
          const toggleChannel = () => {
            setChannelId(channel.id);
            console.log('channel id: ', channel.id);
          };
          return (
            <NavItem key={channel.id}>
              <NavLink
                id={channel.id}
                onClick={() => toggleChannel(channel.id)}
              >
                {channel.channelName}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>

      <TabContent>
        {channels.map((channel) => {
          return (
            <TabPane key={channel.id} tabId={`${channel.id}`}>
              <Row className={'channel__row'}>
                <Col sm='12' className='channel__col'>
                  {() => {
                    return (
                      <MessageContainer
                        messages={messages}
                        className='bg-dark'
                      />
                    );
                  }}
                  <SendMessageForm sendMessage={sendMessage} />
                </Col>
              </Row>

              {/* <InputMessage
                handleMessageChange={this.handleMessageChange}
                handleSendMessage={this.handleSendMessage}
                messageText={this.state.messageText}
                channelName={channel.name}
              /> */}
            </TabPane>
          );
        })}
      </TabContent>
    </>
  );
};
export default ShowChannels;
