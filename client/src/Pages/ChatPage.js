import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const getUsers = async () => {
    axios.get('api/users');
  };
  return <div>Welcome to the chat page. </div>;
};

export default ChatPage;
