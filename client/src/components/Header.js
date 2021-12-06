import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
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
    <Nav className='bg-dark border border-light'>
      <Nav.Item>
        <Nav.Link className='text-light' onClick={logOut}>
          Logout
        </Nav.Link>
      </Nav.Item>
      <p style={{ color: '#fff', paddingTop: '.5em', marginLeft: '40em' }}>
        {' '}
        Welcome {user.firstname}
      </p>
    </Nav>
  );
};

export default Header;
