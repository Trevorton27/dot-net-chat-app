import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ChannelDisplay = ({ setSelectedChannel }) => {
  const [channels, setChannels] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   getChannels();
  // }, []);

  const history = useHistory();

  return (
    <div>
      <p className='channels-title'>Channels</p>
    </div>
  );
};

export default ChannelDisplay;
