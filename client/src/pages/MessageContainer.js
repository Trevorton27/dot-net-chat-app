import React, { useEffect, useRef } from 'react';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import './MessageContainer.css';

const MessageContainer = ({ channelId, messages }) => {
  const messageRef = useRef();
  // console.log('messages from messages container: ', messages);
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
    <div
      ref={messageRef}
      className='message-container'
      // style={{ overflowX: 'hidden', overflowY: 'scroll' }}
    >
      {messages.map((m, index) => (
        <div key={index} className='user-message'>
          <div className='message '>{m.text}</div>
          <div className='from-user'>From {m.username}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
