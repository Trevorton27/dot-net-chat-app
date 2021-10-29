import React, { useState } from 'react';
import { Redirect } from 'react-router';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    setRedirect(true);

    const content = await response.json();
    console.log(content);
  };

  if (redirect) {
    return <Redirect to='/login' />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='h3 mb-3 fw-normal'>Please Register</h1>

      <input
        type='text'
        className='form-control'
        placeholder='name'
        required
        onChange={(e) => setName(e.target.value)}
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
