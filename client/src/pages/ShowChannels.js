import React, { useEffect, useState, useCallback } from 'react';
import MessageField from './MessageField';
import { Nav, NavItem, NavLink, TabContent } from 'reactstrap';
import axios from 'axios';

const ShowChannels = ({
  user,
  setChannelId,
  token,
  redirectToLogin,
  getUser,
  sendMessage
}) => {
  const [channels, setChannels] = useState([]);

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
        setChannelId(channels[0].id);

        console.log('channels response: ', channels);
      })
      .catch((error) => {
        if (error) {
          console.log('error: ', error);
          redirectToLogin();
          return;
        }
      });
  }, [redirectToLogin, token, setChannelId]);

  useEffect(() => {
    if (token) {
      getChannels();
      getUser();
      console.log('ChannelName: ', channels.channelName);
    }
  }, [token, getChannels, getUser, channels.channelName]);

  return (
    <>
      <Nav tabs>
        {channels.map((channel) => {
          console.log('channels in channelDisplay: ', channel);
          const toggleChannel = () => {
            setChannelId(channel.id);
            console.log('channel id: ', channel.id);
          };
          return (
            <NavItem key={channel.id}>
              <NavLink
                id={channel.id}
                onClick={() => toggleChannel(channel.id)}
              >
                {channel.channelName}
              </NavLink>
            </NavItem>
          );
        })}
      </Nav>

      <TabContent>
        <MessageField
          sendMessage={sendMessage}
          user={user}
          channels={channels}
        />
      </TabContent>
    </>
  );
};
export default ShowChannels;
