import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import './MessageContainer.css';

const MessageContainer = ({
  channelId,
  token,
  getUser,
  messages
  // getAllMessages
}) => {
  // useEffect(() => {
  //   if (token) {
  //     //setUserId(jwt_decode(token).sub);
  //     getAllMessages();
  //   }
  // }, [channelId, token, getAllMessages, getUser]);

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
    <>
      <div style={{ color: '#fff' }}>{channelId}</div>
      <div ref={messageRef} className='message-container'>
        {messages.map((m, index) => (
          <div key={index} className='user-message'>
            <div className='message bg-primary'>{m.text}</div>
            <div className='from-user'>From {m.username}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageContainer;
