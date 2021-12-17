import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';

const Header = ({ user, setUser, token, setRedirect, setToken }) => {
  // const history = useHistory();
  const logOut = () => {
    axios.post('/api/logout', {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });
    setToken(sessionStorage.removeItem('token'));
    setUser('');

    console.log('logOut Fired!');
    console.log('token in logout: ', token);
    return <Redirect to='/login' />;
  };

  // history.push('/login');

  return (
    <Navbar bg='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#home' style={{ color: '#fff' }}>
          Welcome {user.firstname}
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
