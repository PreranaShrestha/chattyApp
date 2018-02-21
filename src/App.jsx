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
      if (newMessage.type === "incomingNotification") {
        var content = this.state.currentUser.name + " has changed name to " + newMessage.newUsername;
        newMessage.content = content;
        this.setState({
          currentUser: {name: newMessage.newUsername},
          messages : this.state.messages.concat(newMessage)
        });
      } else if (newMessage.type === "incomingMessage") {
        let newMessage = JSON.parse(message.data);
        let oldMessage = this.state.messages;
        oldMessage.push(newMessage);
        this.setState({
          messages: oldMessage
        });
      } else if (newMessage.type === "userCountChange") {
        this.setState({
          countUser: newMessage.userCount,
          currentUser: { name: this.state.currentUser.name, userColor: newMessage.userColor}
        });
      }
    }
  }

  newMessage(message) {
    this.socket.send(JSON.stringify(message));
  }

  newUser(user) {
    this.socket.send(JSON.stringify(user));
  }

  render() {
    return (
      <div>
      <Nav countUser={this.state.countUser} />
      <MessageList messagesList={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser} newUser={this.newUser.bind(this)} newMessage={this.newMessage.bind(this)}/>
      </div>
    );
  }
}

export default App;
