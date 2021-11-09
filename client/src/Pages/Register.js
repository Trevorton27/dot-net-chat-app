import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/register', {
        userName,
        email,
        password
      });

      const content = await response.data;
      console.log(content);
      history.push('/login');
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='h3 mb-3 fw-normal'>Please Register</h1>

      <input
        type='text'
        className='form-control'
        placeholder='name'
        required
        onChange={(e) => setUserName(e.target.value)}
      />

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
        Register
      </button>
      <p className='mt-5 mb-3 text-muted'>&copy; 2017–2021</p>
    </form>
  );
};

export default Register;
