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
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    const chattyClientSocket = new WebSocket("ws://localhost:3001");
    console.log("Client connected");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  addMessage(content) {
    const newMessage = {
      id: Math.random(),
      username: 'Bob',
      content: content
    };

    const messages = this.state.messages.concat(newMessage);
    this.setState({
      messages: messages
    });
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
