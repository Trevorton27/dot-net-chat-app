import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import React, { useEffect } from 'react';

const SendMessageForm = ({ sendMessage, user, newMessage, setNewMessage }) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(newMessage, user);
      }}
    >
      <InputGroup>
        <FormControl
          type='user'
          placeholder='message...'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />

        <Button variant='primary' type='submit' disabled={!newMessage}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
