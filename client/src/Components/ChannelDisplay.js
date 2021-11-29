import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  ButtonGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ChannelDisplay = ({ channel, setChannelId, channelId, getChannels }) => {
  //const [channels, setChannels] = useState([]);
  const [editing, setEditing] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   getChannels();
  // }, []);

  const changeChannel = (e) => {
    setChannelId(e.target.id);
    console.log('channel.id :', channelId);
  };

  const addChannel = () => setEditing(true);

  const history = useHistory();

  const renderChannelButtons = () => {
    return channel.map((channel, i) => {
      return (
        <Button
          key={i}
          id={channel.id}
          variant='outline-light'
          className='channel w-100'
          onClick={changeChannel}
        >
          # {channel.channelName}
        </Button>
      );
    });
  };

  const postNewChannel = (e) => {
    if (e.keyCode !== 13) return;
    setEditing(false);
    axios
      .post('/api/newchannel', {
        headers: { 'Content-Type': 'application/json' },
        channel: e.target.value
      })
      .then((response) => {
        if (response.data.error) {
          setIsError(true);
          console.log('error: ', response.data.error);
        }
        getChannels();
        console.log('I fired dang it');
      });
  };

  return (
    <Card
      lg={1}
      className=' text-center text-light border mt-3 overflow-auto'
      style={{ height: '85vh' }}
      id='channel-list'
    >
      <Card.Body className='pt-1'>
        <Card.Text style={{ fontSize: '1.5em' }} className='mb-0'>
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
          {channel.length === 0 ? '' : renderChannelButtons()}
        </ButtonGroup>
        {editing ? (
          <InputGroup size='sm' className='mt-2 w-75 mx-auto'>
            <FormControl
              placeholder='Channel Name'
              aria-label='Channel Name'
              aria-describedby='basic-addon1'
              onKeyUp={postNewChannel}
            />
          </InputGroup>
        ) : (
          <Button
            variant='link'
            className='text-light text-decoration-none'
            onClick={addChannel}
          >
            + Add Channel
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ChannelDisplay;
