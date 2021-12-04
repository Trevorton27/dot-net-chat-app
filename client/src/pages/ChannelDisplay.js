import React, { useEffect, useState, useCallback } from 'react';
import {
  Card,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import axios from 'axios';

function ChannelDisplay({
  setSelected,
  redirectToLogin,
  token,
  setChannelName,
  user,
  getUser,
  channelName
}) {
  const [channels, setChannels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isError, setIsError] = useState(false);

  const getChannels = useCallback(async () => {
    await axios
      .get('/api/channels', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const channels = response.data;
        setChannels(channels);
        setSelected(channels[0].id);

        console.log('channels response: ', channels);
      })
      .catch((error) => {
        if (error) {
          console.log('error: ', error);
          redirectToLogin();
          return;
        }
      });
  }, [setSelected, redirectToLogin, token]);

  useEffect(() => {
    if (token) {
      getChannels();
      getUser();
      console.log('ChannelName: ', channelName);
    }
  }, [token, getChannels, getUser, channelName]);
  const handleAddChannel = () => setIsEditing(true);

  const handleClick = (e) => setSelected(e.target.id);

  const addNewChannel = (e) => {
    if (e.code !== 'Enter') return;
    setIsEditing(false);

    const data = {
      channelName: channelName
    };

    axios
      .post('/api/newchannel', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((result) => {
        console.log('addNewChannel result: ', result);
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
          # {channel.channelName}
        </Button>
      );
    });
  };

  return (
    <Card
      lg={1}
      className='bg-dark text-center text-light border mt-3 overflow-auto'
      style={{ height: '85vh' }}
    >
      <Card.Body className='pt-1'>
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
              value={channelName}
              placeholder='Channel Name'
              aria-label='Channel Name'
              aria-describedby='basic-addon1'
              onChange={(e) => setChannelName(e.target.value)}
              onKeyUp={addNewChannel}
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
}
export default ChannelDisplay;
