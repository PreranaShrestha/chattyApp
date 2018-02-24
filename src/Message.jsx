import React, {Component} from 'react';

function Message({userColor, content, username, type}) {
  const style = {
    color: userColor
  }
  const imgRE = /(https?:\/\/.*\.(?:png|jpg))/i;
  const textToMU = content.split(imgRE).map(entry => {
    if (imgRE.test(entry)) {
      return <img src={entry} />;
    } else {
      return <span >{entry}</span>;
    }
  });

  if (type === "incomingMessage"){
    return (<div className="message">
          <span className="message-username" style={style} >{username}</span>
          <span className="message-content">{textToMU}</span>
        </div>);
  } else if (type === "incomingNotification") {
    return (
      <div className="message system">
          {content}
      </div>
    );
  }
}

export default Message;
