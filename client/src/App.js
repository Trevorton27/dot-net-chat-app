import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Navbar from './Components/NavBar';
import ChatPage from './Pages/ChatPage';
import Register from './Pages/Register';
import AuthorizedRoute from './Components/AuthorizedRoute';

function App() {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie, setCookie] = useState('');
  // useEffect(() => {
  //   getUser();
  // }, []);

  // setCookie(
  //   document.cookie.replace(
  //     /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
  //     '$1'
  //   )
  // );
  console.log('isLoggedIn: ', isLoggedIn);
  const getUser = async () => {
    const response = await fetch('api/user', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    const content = await response.json();
    console.log('content: ', content);
    setName(content.name);
  };
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          name={name}
          setName={setName}
        />
        <main className='form-signin'>
          <Route path='/' exact={true} component={ChatPage} />

          <Route
            path='/login'
            component={() => <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path='/register' component={Register} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
