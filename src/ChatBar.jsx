import React, {Component} from 'react';


class ChatBar extends Component {
  render() {
    console.log("Render <ChatBar/>");
    return (
      <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={(event) => {
          if(event.key === 'Enter'){
            this.props.addMessage(event.target.value);
            event.target.value = '';
          }
      }}/>
      </footer>
    );
  }
}
export default ChatBar;
