import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log("Render <MessageList/>");
    return (
        <div className="message system">
          Anonymous1 changed their name to nomnom.
          <Message />
        </div>
    );
  }
}
export default MessageList;




