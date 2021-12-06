import React from 'react';
import ShowChannels from './ShowChannels';

function ChannelDisplay({
  redirectToLogin,
  token,
  user,
  getUser,
  sendMessage,
  messages,
  setChannelId
}) {
  return (
    <>
      <ShowChannels
        setChannelId={setChannelId}
        token={token}
        redirectToLogin={redirectToLogin}
        getUser={getUser}
        messaged={messages}
        user={user}
        sendMessage={sendMessage}
      />
    </>
  );
}

export default ChannelDisplay;
