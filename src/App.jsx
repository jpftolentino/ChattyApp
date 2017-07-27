import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // userdata: {
      currentUser: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };

    // this.handleUsername = this.handleUsername.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");

     this.socket.onopen = function (event) {
      console.log("Connected to server");
      };

      this.socket.onmessage = (event) => {
        let messages = this.state.messages.concat(JSON.parse(event.data));
        console.log(messages);
        this.setState({
          messages: messages
        });
      };
  }


  //gets user invoked in addMessage method
  getUsername(username) {
    this.setState({
      currentUser: username
    });
  }

  //gets message from chatbar and sends to server
  addMessage(content) {
    const newMessage = {
      username: this.state.currentUser,
      content: content
    };
    let currMessage = JSON.stringify(newMessage);
    this.socket.send(currMessage);
  }




  render() {

    console.log("Rendering <App />");

    if(this.state.loading) {
      return (
        <div >
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages}/>
          <ChatBar getUsername={this.getUsername.bind(this)} addMessage={this.addMessage.bind(this)}/>
        </div>
        );
      } else {
        console.log('3 seconds have elapsed');
        return <h1>0.5s seconsd have elapsed and page is loaded</h1>;
      }
  }
}
export default App;
