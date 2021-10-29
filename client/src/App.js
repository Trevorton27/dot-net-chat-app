import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Navbar from './Components/NavBar';
import ChatPage from './Pages/ChatPage';
import Register from './Pages/Register';
import axios from 'axios';
import AuthorizedRoute from './Components/AuthorizedRoute';

function App() {
  const [name, setName] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await axios.get('api/user', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    const responseData = await response.data;
    console.log('data: ', responseData);
    setName(responseData.name);
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar name={name} setName={setName} />
        <main className='form-signin'>
          <Route path='/' exact component={() => <ChatPage name={name} />} />

          <Route path='/login' component={() => <Login setName={setName} />} />

          <Route path='/register' component={Register} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

// <Route
//           exact
//           path='/'
//           render={() => {
//             isLoggedIn ? <ChatPage /> : <Register />;
//           }}
//         />
//         <Route
//           path='/register'
//           render={() => {
//             isLoggedIn ? <Redirect to='/' /> : <Register />;
//           }}
//         />
//         <Route
//           path='/login'
//           render={() => {
//             isLoggedIn ? (
//               <Redirect to='/chatpage' />
//             ) : (
//               <Login setIsLoggedIn={setIsLoggedIn} />
//             );
//           }}
//         />
