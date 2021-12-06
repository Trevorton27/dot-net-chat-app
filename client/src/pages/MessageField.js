import React from 'react';
import MessageContainer from './MessageContainer';
import SendMessageForm from '../components/SendMessageForm';
import { Col, Row, TabPane } from 'reactstrap';

const MessageField = ({ channels, messages, sendMessage }) => {
  return channels.map((channel) => {
    <TabPane key={channel.id} tabId={`${channel.id}`}>
      <Row className={'channel__row'}>
        <Col sm='12' className='channel__col'>
          {() => {
            return (
              <MessageContainer messages={messages} />
              // <DisplayMessage
              //   msg={message}
              //   channelName={channel.name}
              //   currentUser={this.props.currentUser}
              //   deleteMessage={this.props.deleteMessage}
              //   selectMessageToEdit={this.selectMessageToEdit}
              // ></DisplayMessage>
            );
          }}
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>

      {/* <InputMessage
        handleMessageChange={this.handleMessageChange}
        handleSendMessage={this.handleSendMessage}
        messageText={this.state.messageText}
        channelName={channel.name}
      /> */}
    </TabPane>;
  });
};

export default MessageField;
