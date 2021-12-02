import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const ChannelCard = ({ setSelected, redirectToLogin, token }) => {
  const [channels, setChannels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState({});

  const options = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  useEffect(() => {
    if (token) {
      getChannels();
      getUser();
    }
  }, [token]);

  const getChannels = () => {
    axios
      .get('/api/channels', options)
      .then((response) => {
        const channels = response.data.channels;
        setChannels(channels);
        setSelected(channels[0].id);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 422) {
          redirectToLogin();
          return;
        }
      });
  };

  const getUser = () => {
    const id = jwt_decode(token).sub;
    axios.post('/api/user', { id: id }, options).then((response) => {
      setUser(response.data);
    });
  };

  const handleAddChannel = () => setIsEditing(true);

  const handleClick = (event) => setSelected(event.target.id);

  const handleEnter = (event) => {
    if (event.code !== 'Enter') return;
    setIsEditing(false);

    const data = {
      channel: event.target.value
    };

    axios.post('/api/channels', data, options).then((result) => {
      if (result.data.error) {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
        return;
      }
      setIsError(false);
      getChannels();
    });
  };

  const createButtons = () => {
    return channels.map((channel, i) => {
      return (
        <Button
          key={i}
          id={channel.id}
          variant='outline-light'
          className='channel w-100'
          onClick={handleClick}
        >
          # {channel.name}
        </Button>
      );
    });
  };

  return (
    <Card
      lg={1}
      className=' text-center text-light border mt-3 overflow-auto'
      style={{ height: '85vh' }}
    >
      <Card.Body className='pt-1'>
        <Card.Text className='mb-3'>Hello {user.firstname}!</Card.Text>
        <Card.Text style={{ fontSize: '0.75em' }} className='mb-0'>
          Select a Channel:{' '}
        </Card.Text>
        {isError ? (
          <Card.Text style={{ fontSize: '0.75em' }}>
            Channel already exists
          </Card.Text>
        ) : (
          ''
        )}
        <ButtonGroup vertical className='w-100'>
          {channels.length === 0 ? '' : createButtons()}
        </ButtonGroup>
        {isEditing ? (
          <InputGroup size='sm' className='mt-2 w-75 mx-auto'>
            <FormControl
              placeholder='Channel Name'
              aria-label='Channel Name'
              aria-describedby='basic-addon1'
              onKeyUp={handleEnter}
            />
          </InputGroup>
        ) : (
          <Button
            variant='link'
            className='text-light text-decoration-none'
            onClick={handleAddChannel}
          >
            + Add Channel
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
export default ChannelCard;
