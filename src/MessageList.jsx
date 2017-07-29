import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    return (
        <div className="message system">
          <Message messages={this.props.messages}/>
        </div>
    );
  }
}
export default MessageList;




