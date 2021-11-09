import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch('api/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       email,
  //       password
  //     })
  //   });
  // };

  const history = useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('api/login', {
        email,
        password
      });
      setIsLoggedIn(true);
      console.log('response: ', response);

      history.push('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>

      <input
        type='email'
        className='form-control'
        placeholder='name@example.com'
        required
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        className='form-control'
        placeholder='Password'
        required
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='w-100 btn btn-lg btn-primary' type='submit'>
        Sign in
      </button>
      <p className='mt-5 mb-3 text-muted'>&copy; 2017–2021</p>
    </form>
  );
};

export default Login;
