import React, {Component} from 'react';

class Message extends Component {
  render() {
    const listmessage = this.props.messages.map((message) =>
    <div key={message.id}>
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
    );
    return (
      <main className="messages">
        {listmessage}
      </main>
    );
  }
}
export default Message;
