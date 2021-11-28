import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from 'react-bootstrap';
// import NavBarLoggedOut from './NavBarLoggedOut';
// import NavBarLoggedIn from './NavBarLoggedIn';

const Header = ({ userName, setUserName, setIsLoggedIn }) => {
  const history = useHistory();
  const logout = async (e) => {
    e.preventDefault();

    sessionStorage.removeItem('isAuthenticated');
    setIsLoggedIn(false);
    // history.push('/login');
    // await axios.post('api/logout', {
    //   headers: { 'Content-Type': 'application/json' }
    // });

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
      <div>
        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
          <li
            style={{
              color: '#fff',
              textAlign: 'center',
              margin: 'auto 0'
            }}
          >
            {' '}
            Welcome to the chat page {userName}.
          </li>
          <li className='nav-item'>
            <Link
              to='/login'
              className='nav-link active'
              id='logout-button'
              aria-current='page'
              onClick={logout}
              style={{ marginLeft: '33em' }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <Navbar
      className='navbar navbar-expand-md navbar-dark bg-dark mb-4'
      sticky='top'
    >
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          Chat App
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
    </Navbar>
  );
  //if (isLoggedIn) {
  //  return <NavBarLoggedIn logout={logout} />;
  //}
  //return <NavBarLoggedOut />;
};

export default Header;
