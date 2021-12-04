import './App.css';
import React, { useState } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ChatPage from './pages/ChatPage';

function App() {
  const [token, setToken] = useState();
  return (
    <div className='App'>
      <BrowserRouter>
        <Route exact path='/' render={() => <ChatPage token={token} />} />
        <Route path='/sign-up' render={() => <Register />} />
        <Route
          exact
          path='/login'
          render={() => <Login setToken={setToken} token={token} />}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
