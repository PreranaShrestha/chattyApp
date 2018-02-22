import React, {Component} from 'react';

function Nav({countUser}) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="countUser">{countUser} users online</span>
    </nav>
  );
}

export default Nav;
