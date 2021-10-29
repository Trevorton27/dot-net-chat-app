import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = ({ isLoggedIn, name }) => {
  // const [users, setUsers] = useState([]);
  // const [messages, setMessages] = useState([]);
  // const [messageInput, setMessageInput] = useState('');

  // const getUsers = async () => {
  //   axios.get('api/users');
  // };

  return (
    <div>
      {name
        ? ` Welcome to the chat page ${name}.`
        : 'You are not authorized to view this page. Please register and login. '}{' '}
    </div>
  );
};

export default ChatPage;
