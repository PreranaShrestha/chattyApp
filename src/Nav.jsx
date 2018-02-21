import React, {Component} from 'react';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="countUser">{this.props.countUser} users online</span>
      </nav>
    );
  }
}

export default Nav;
