import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChannelDisplay = ({ setSelectedChannel }) => {
  const [channels, setChannels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getChannels();
  }, []);
  const history = useHistory();
  const getChannels = () => {
    axios
      .get('/api/channels')
      .then((response) => {
        const channels = response.data.channels;
        setChannels(channels);
        setSelectedChannel(channels[0].id);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 422) {
          history.push('/login');
          return;
        }
      });
  };

  const channelData = {
    name: 'another new Channel'
  };

  const createNewChannel = () => {
    const response = axios.post('/api/newchannel', channelData);
    console.log('response from createNewChannel: ', response);
  };
  return (
    <div>
      <p className='channels-title'>Channels</p>
    </div>
  );
};

export default ChannelDisplay;
