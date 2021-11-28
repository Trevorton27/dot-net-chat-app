import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
//import {  Redirect } from 'react-router';
import Login from './Pages/Login';
import './App.css';
import Header from './Components/Header';
import ChatPage from './Pages/ChatPage';
import Register from './Pages/Register';
import axios from 'axios';

function App() {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
    console.log('isLoggedIn: ', isLoggedIn);
  });

  const getUser = async () => {
    const response = await axios.get('api/user', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    if (isLoggedIn) {
      const responseData = await response.data;
      console.log('userData: ', responseData);
      setUserName(responseData.username);
      setUserId(responseData.id);
    } else {
    }
  };

  return (
    <div className='App'>
      <Router>
        <Header
          userName={userName}
          setUserName={setUserName}
          setIsLoggedIn={setIsLoggedIn}
        />
        <main>
          <Route
            path='/'
            exact
            render={() =>
              isLoggedIn ? (
                <ChatPage
                  userId={userId}
                  userName={userName}
                  isLoggedIn={isLoggedIn}
                />
              ) : (
                <Register />
              )
            }
          />

          <Route
            path='/login'
            render={() =>
              isLoggedIn ? (
                <Redirect to='/' />
              ) : (
                <Login
                  setUserName={setUserName}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )
            }
          />

          <Route
            path='/register'
            render={isLoggedIn ? <Redirect to='/' /> : <Register />}
          />
        </main>
      </Router>
    </div>
  );
}

export default App;
