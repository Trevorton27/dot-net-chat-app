import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';
// import NavBarLoggedOut from './NavBarLoggedOut';
// import NavBarLoggedIn from './NavBarLoggedIn';

const Navbar = ({ userName, setUserName, setIsLoggedIn }) => {
  const history = useHistory();
  const logout = async () => {
    await fetch('api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    setIsLoggedIn(false);
    setUserName('');
    history.push('/login');
  };

  let menu;

  if (userName === '') {
    menu = (
      <ul className='navbar-nav me-auto mb-2 mb-md-0'>
        <li>
          <Link to='/login' className='nav-link active' aria-current='page'>
            Login
          </Link>
        </li>
        <li className='nav-item'>
          <Link to='/register' className='nav-link active' aria-current='page'>
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <ul>
        <li className='nav-item'>
          <Link
            to='/login'
            className='nav-link active'
            aria-current='page'
            onClick={logout}
          >
            Logout
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark mb-4'>
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          Chat
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
          aria-controls='navbarCollapse'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'></div>
        {menu}
      </div>
    </nav>
  );
  //if (isLoggedIn) {
  //  return <NavBarLoggedIn logout={logout} />;
  //}
  //return <NavBarLoggedOut />;
};

export default Navbar;
