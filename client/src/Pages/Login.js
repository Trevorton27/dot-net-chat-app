import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import axios from 'axios';
<Redirect to='/' />;

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post('api/login', {
        email,
        password
      })
      .then((res) => {
        const response = res.data;
        console.log('response: ', response);
        localStorage.setItem('isAuthenticated', response);
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
          setIsLoggedIn(true);
          history.push('/');
        }
      });
  };

  return (
    <form onSubmit={submit}>
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
