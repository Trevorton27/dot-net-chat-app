import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
const SendMessageForm = ({
  userName,
  userId,
  channelId,
  sendMessage,
  channel
}) => {
  const [message, setMessage] = useState('');

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message, userName, userId, channelId, channel);

        setMessage('');
      }}
    >
      <InputGroup>
        <FormControl
          type='user'
          placeholder='message...'
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <Button variant='primary' type='submit' disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
