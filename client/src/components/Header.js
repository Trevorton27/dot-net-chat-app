import React, { useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useHistory, Redirect } from 'react-router-dom';

const Header = ({ user, setUser, token, setRedirect }) => {
  const history = useHistory();
  const logOut = () => {
    sessionStorage.removeItem('token');
    setRedirect(true);
    setUser('');
    console.log('logOut Fired!');

    // history.push('/login');
  };

  //   useEffect(() => {
  //     if (!token) {
  //       return <Redirect to='/login' />;
  //     }
  //   }, [token]);

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
