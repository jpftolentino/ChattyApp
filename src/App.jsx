import React, {Component} from 'react';
import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: true})
    }, 500)
  }

  render() {
    console.log("Rendering <App />");
    if(this.state.loading) {
      return (
        <div >
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList />
          <ChatBar />
        </div>
        );
      } else {
        console.log('3 seconds have elapsed');
        return <h1>0.5s seconsd have elapsed and page is loaded</h1>;
      }
  }
}
export default App;
