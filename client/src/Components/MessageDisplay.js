import React from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';

const MessageDisplay = (
  messages,
  userId,
  channelId,
  userName,
  getAllMessages,
  sendMessage,
  channel
) => {
  //console.log('messages in messagedisplay: ', messages);
  return (
    <div>
      <MessageContainer messages={messages} />
      <SendMessageForm
        userId={userId}
        userName={userName}
        channelId={channelId}
        getAllMessages={getAllMessages}
        sendMessage={sendMessage}
        channel={channel}
      />
    </div>
  );
};

export default MessageDisplay;
