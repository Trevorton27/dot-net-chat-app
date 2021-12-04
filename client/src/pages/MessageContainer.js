import React, { useEffect, useState, useCallback } from 'react';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const MessageContainer = ({
  channelId,
  redirectToLogin,
  token,
  user,
  getUser,
  channelName
}) => {
  const [messages, setMessages] = useState(null);
  const [messageText, setMessageText] = useState('');
  // const [userId, setUserId] = useState(0);

  const getMessages = useCallback(async () => {
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
    if (token) {
      //setUserId(jwt_decode(token).sub);
      // getMessages();
    }
  }, [channelId, token, getMessages, getUser]);
  const handleChange = (event) => setMessageText(event.target.value);

  const handleEnter = (event) => {
    if (event.code !== 'Enter') return;

    const data = {
      channelId: channelId,
      userId: user.id,
      text: messageText,
      channelName: channelName,
      userName: user.firstname
    };

    axios
      .post('/api/message', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log('post message response: ', response);
        getMessages();
        setMessageText('');
        event.target.value = '';
      });
  };

  const createMessageCards = () => {
    return messages.map((message, i) => {
      return (
        <div key={i}>
          <Card
            className={`w-50 p-0 mt-2 mx-2 card-font 
                            ${
                              message.user.id === user.id
                                ? 'bg-warning right'
                                : ''
                            }`}
          >
            <Card.Body>
              <Card.Link className='text-dark text-decoration-none user-font'>
                {`${message.user.firstname} ${message.user.lastname}`}
              </Card.Link>
              <Card.Link className='text-muted text-decoration-none'>
                {moment(message.date).format('h:mm:ss A - MMM DD YYYY')}
              </Card.Link>
              <Card.Text className='p-0 mt-2'>{message.text}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  return (
    <Card
      className='bg-light w-100 mt-3 pb-5 overflow-auto'
      style={{ height: '85vh' }}
    >
      {messages ? createMessageCards() : ''}
      <InputGroup size='sm' className='w-75 position-fixed bottom-0 px-5 mb-5'>
        <FormControl
          placeholder='Enter Message...'
          aria-label='Message Input'
          aria-describedby='basic-addon1'
          onChange={handleChange}
          onKeyUp={handleEnter}
        />
      </InputGroup>
    </Card>
  );
};

export default MessageContainer;
