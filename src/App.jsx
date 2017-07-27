import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      // userdata: {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");

     this.socket.onopen = function (event) {
      console.log("Connected to server");
      // let conMessage = JSON.stringify(newMessage);
      // this.socket.send(conMessage);
      };

      this.socket.onmessage = (event) => {
        let messages = this.state.messages.concat(JSON.parse(event.data));
        console.log(messages);
        this.setState({
          messages: messages
        });
      };
  }

  addMessage(content) {

    const newMessage = {
      // id: Math.random(),
      username: 'Bob',
      content: content
    };


    let conMessage = JSON.stringify(newMessage);
    this.socket.send(conMessage);

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
          <ChatBar name={this.state.currentUser.name} addMessage={this.addMessage.bind(this)}/>
        </div>
        );
      } else {
        console.log('3 seconds have elapsed');
        return <h1>0.5s seconsd have elapsed and page is loaded</h1>;
      }
  }
}
export default App;
