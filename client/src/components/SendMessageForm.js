import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import React from 'react';

const SendMessageForm = ({ sendMessage, user, message, setMessage }) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message, user);
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
