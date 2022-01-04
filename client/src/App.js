import './App.css';
import React, { useState } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' render={() => <ChatPage />} />
        <Route path='/register' render={() => <Register />} />
        <Route exact path='/login' render={() => <Login />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
