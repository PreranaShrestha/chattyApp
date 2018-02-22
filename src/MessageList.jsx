import React, {Component} from 'react';
import Message from './Message.jsx';

function MessageList({messagesList}) {
  const newMessages = messagesList.map((message) => {
    return (<Message type={message.type} key={message.id}  username={message.username} userColor={message.userColor} content={message.content} />);
  });
  return (
    <main className="messages">
      {newMessages}
    </main>
  );
}

export default MessageList;