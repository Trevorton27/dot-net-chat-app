import React, { useEffect, useState, useCallback } from 'react';
import SendMessageForm from '../components/SendMessageForm';
import MessageContainer from './MessageContainer';
import {
  Col,
  Row,
  Nav,
  NavItem,
  TabPane,
  NavLink,
  TabContent
} from 'reactstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';

function ChannelDisplay({
  redirectToLogin,
  token,
  setChannelName,
  user,
  getUser,
  channelName,
  messages,
  setChannelId
}) {
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

  const toggleChannel = (e) => {
    setChannelId(e.target.value);
  };

  const showChannels = () => {
    return (
      <>
        <Nav tabs>
          {channels.map((channel) => {
            return (
              <NavItem key={channel.id}>
                <NavLink onClick={() => toggleChannel(channel.id)}>
                  {channel.channelName}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>

        <TabContent>
          {channels.map((channel) => {
            return messageField(channel);
          })}
        </TabContent>
      </>
    );
  };

  const messageField = (channel) => {
    <TabPane key={channel.id} tabId={`${channel.id}`}>
      <Row className={'channel__row'}>
        <Col sm='12' className='channel__col'>
          {() => {
            return (
              <MessageContainer messages={messages} />
              // <DisplayMessage
              //   msg={message}
              //   channelName={channel.name}
              //   currentUser={this.props.currentUser}
              //   deleteMessage={this.props.deleteMessage}
              //   selectMessageToEdit={this.selectMessageToEdit}
              // ></DisplayMessage>
            );
          }}
          <SendMessageForm />
        </Col>
      </Row>

      {/* <InputMessage
        handleMessageChange={this.handleMessageChange}
        handleSendMessage={this.handleSendMessage}
        messageText={this.state.messageText}
        channelName={channel.name}
      /> */}
    </TabPane>;
  };
  return (
    <Card
      lg={1}
      className='bg-dark text-center text-light border mt-3 overflow-auto'
      style={{ height: '85vh' }}
    >
      <Card.Body className='pt-1'>{showChannels}</Card.Body>
    </Card>
  );
}

export default ChannelDisplay;
