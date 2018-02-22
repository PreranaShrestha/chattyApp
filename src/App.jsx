import React, {Component} from 'react';
import Nav from './Nav.jsx'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countUser: 0,
      currentUser: {name: "Anonymous", userColor: "black"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://0.0.0.0:3001");
    this.socket.onmessage =  (message) => {
      let newMessage = JSON.parse(message.data);
     if (newMessage.type === "incomingMessage" || newMessage.type === "incomingNotification") {
        let oldMessage = this.state.messages;
        oldMessage.push(newMessage);
        this.setState({
          messages: oldMessage
        });
      } else if (newMessage.type === "userCountChange") {
        this.setState({
          countUser: newMessage.userCount
        });
      }
    }
  }

  newMessage(message) {
    this.socket.send(JSON.stringify(message));
    this.setState({currentUser: { name : message.username}});
  }

  newUser(user) {
    this.socket.send(JSON.stringify(user));
  }

  render() {
    return (
      <div>
      <Nav countUser={this.state.countUser} />
      <MessageList messagesList={this.state.messages} />
      <ChatBar username={this.state.currentUser.name} newUser={this.newUser.bind(this)} newMessage={this.newMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;
