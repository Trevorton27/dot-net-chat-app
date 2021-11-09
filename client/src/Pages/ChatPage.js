import React, { useState, useEffect } from 'react';
import SendMessageForm from '../Components/SendMessageForm';
import MessageContainer from '../Components/MessageContainer';
import axios from 'axios';

const ChatPage = ({ isLoggedIn, userName, userId }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // const getUsers = async () => {
  //   axios.get('api/users');
  // };
  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    try {
      const response = await axios.get('/api/getallmessages', {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('response from getAllMessages: ', response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const sendMessage = async (message, userName, userId) => {
    try {
      const response = await axios.post('/api/message', {
        Username: userName,
        Text: message,
        UserId: userId
      });
      console.log('response: ', response);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <div>
      {isLoggedIn ? (
        <div className='chat'>
          Welcome to the chat page {userName}.
          <MessageContainer messages={messages} />
          <SendMessageForm
            userId={userId}
            userName={userName}
            sendMessage={sendMessage}
          />
        </div>
      ) : (
        'You are not authorized to view this page. Please register and/or login. '
      )}{' '}
    </div>
  );
};

export default ChatPage;
