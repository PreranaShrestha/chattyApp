import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'postMessage',
      currentUser: this.props.currentUser,
      messageText: ''
    };
  }

  onMessageTextChange(event) {
    this.setState({messageText: event.target.value});
  }

  onMessageKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newMessage({
        type: this.state.type,
        username: this.state.currentUser,
        content: this.state.messageText
      });
      this.setState({messageText: ''});
    }
  }


  onUsernameKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.newUser({
        type: "postNotification",
        username: this.state.currentUser
      });
    }
  }


  onUserTextChange(event) {
    this.setState({currentUser: event.target.value});
  }


  render() {
    return (
      <footer className="chatbar">
        <input value={this.state.currentUser}
          onChange={this.onUserTextChange.bind(this)}
          className="chatbar-message" placeholder="Type a message and hit ENTER"
          placeholder="Your Name (Optional)" onKeyPress={this.onUsernameKeyPress.bind(this)} />
        <input value={this.state.messageText}
          onChange={this.onMessageTextChange.bind(this)}
          className="chatbar-message" placeholder="Type a message and hit ENTER"
          onKeyPress={this.onMessageKeyPress.bind(this)} />
      </footer>
    );
  }
}
export default ChatBar;
