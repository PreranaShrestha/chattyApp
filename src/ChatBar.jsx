import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messageText: ''
    };
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newMessage({
        type: 'postMessage',
        username: this.state.currentUser ? this.state.currentUser : "Anonymous",
        content: this.state.messageText
      });

      this.setState({messageText: ''});
    }
  }

  onUsernameKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newUser({
        type: "postNotification",
        username: this.state.currentUser,
        content: this.props.username + " has changed name to " + this.state.currentUser
      });
    }
  }

  onUsernameChange(event ) {
    this.props.newUser({
      type: "postNotification",
      username: this.state.currentUser,
      content: this.props.username + " has changed name to " + this.state.currentUser
    });
  }

  onUserTextChange(event) {
    this.setState({currentUser: event.target.value});
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          value={this.state.currentUser}
          onChange={this.onUserTextChange.bind(this)}
          className="chatbar-username"
          onKeyPress={this.onUsernameKeyPress.bind(this)}
          placeholder="Your Name (Optional)"
          onBlur={this. onUsernameChange.bind(this)}
        />
        <input
          value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageKeyPress.bind(this)}
        />
      </footer>
    );
  }
}

export default ChatBar;
