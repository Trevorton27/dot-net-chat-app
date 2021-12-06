import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

const MessageContainer = ({
  channelId,
  redirectToLogin,
  token,
  user,
  getUser,
  channelName,
  messages,
  setMessages
}) => {
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

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef && messageRef.current) {
      const { scrollHeight, clientHeight } = messageRef.current;
      messageRef.current.scrollTo({
        left: 0,
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div ref={messageRef} className='message-container'>
      {messages.map((m, index) => (
        <div key={index} className='user-message'>
          <div className='message bg-primary'>{m.text}</div>
          <div className='from-user'>From {m.username}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
