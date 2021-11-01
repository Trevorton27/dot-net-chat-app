import React, { useState, useEffect } from 'react';
import SendMessageForm from '../Components/SendMessageForm';
import MessageContainer from '../Components/MessageContainer';
import axios from 'axios';

const ChatPage = ({ isLoggedIn, name }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // const getUsers = async () => {
  //   axios.get('api/users');
  // };

  const sendMessage = async (message, name) => {
    const response = await axios
      .post('/api/message', {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: { Username: name, Text: message }
      })
      .then((res) => {
        console.log('response: ', response);
      });
  };
  return (
    <div>
      {name ? (
        <div className='chat'>
          Welcome to the chat page {name}.
          <MessageContainer messages={messages} />
          <SendMessageForm name={name} sendMessage={sendMessage} />
        </div>
      ) : (
        'You are not authorized to view this page. Please register and/or login. '
      )}{' '}
    </div>
  );
};

export default ChatPage;
