import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

const AuthorizedRoute = () => {
  const isLoggedIn = localStorage.getItem('isAthenticated');

  return isLoggedIn !== null ? <Component /> : <Redirect to='/login' />;
};

export default AuthorizedRoute;
