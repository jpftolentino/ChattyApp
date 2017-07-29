import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // userdata: {
      numUsers: 0,
      previousUser: '',
      currentUser: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    // this.handleUsername = this.handleUsername.bind(this);

  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");

     this.socket.onopen = function (event) {
      console.log("Connected to server");
      };


      this.socket.onmessage = (event) => {
        let eventObj = JSON.parse(event.data);
        let numUsers = eventObj.numUsers;
        this.setState({
          numUsers: numUsers
        });

        switch(eventObj.type) {
          case "incomingMessage":
            let messages = this.state.messages.concat(eventObj);
            this.setState({
              messages: messages
            });
            break;
          case "incomingNotification":
            //handle incoming notification
            messages = this.state.messages.concat(eventObj);
            let previousUser = eventObj.previousUser;
            let currentUser = eventObj.currentUser;
            this.setState({
              previousUser: previousUser,
              currentUser: currentUser,
              messages: messages
            });
            break;
          default:
            //show an error in the console if the message type is unknown
            throw new Error("Unknown event type" + data.type);
        }

      };
  }


  //gets user invoked in addMessage method
  changeUser(username) {
    let content = (this.state.currentUser + " changed their name to " + username);
    const newUser = {
      type: "postNotification",
      previousUser: this.state.currentUser,
      currentUser: username,
      content: content
    }

    let currUser = JSON.stringify(newUser);
    this.socket.send(currUser);
  }

  //gets message from chatbar and sends to server
  addMessage(content) {


    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser,
      content: content
    };
    let currMessage = JSON.stringify(newMessage);
    this.socket.send(currMessage);
  }




  render() {
    if(this.state.loading) {
      return (
        <div >
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <span id="numUsers">{this.state.numUsers} users online</span>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar changeUser={this.changeUser.bind(this)} addMessage={this.addMessage.bind(this)}/>
        </div>
        );
      } else {
        return <h1>0.5s seconsd have elapsed and page is loaded</h1>;
      }
  }
}
export default App;
