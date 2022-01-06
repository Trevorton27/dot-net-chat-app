import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import axios from 'axios';

const Header = ({ user, setUser, setToken }) => {
  const logOut = () => {
    axios.post('/api/logout', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    setToken(localStorage.removeItem('token'));
    setUser('');

    return <Redirect to='/login' />;
  };

  return (
    <Navbar bg='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#home' style={{ color: '#fff' }}>
          <CgProfile size='1.5em' className='mr-1' /> Welcome {user.firstname}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'></Nav>
          <Nav.Link style={{ color: '#fff' }} onClick={logOut}>
            Logout
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
