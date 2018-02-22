import React, {Component} from 'react';

function Message({userColor, content, username, type}) {
  const style = {
    color: userColor
  }
  if(type==="incomingMessage"){
    var regExp = new RegExp("http(?:\"|\')?(?<imgSrc>[^>]*[^/].(?:jpe?g|bmp|gif|png))(?:\"|\')?");
    const imageUrl = content.match(regExp);
    if(imageUrl) {
      return (
      <div>
        <img className="image" src={imageUrl[0]} />
      </div>
      );
    } else {
    return (
        <div className="message">
          <span className="message-username" style={style} >{username}</span>
          <span className="message-content">{content}</span>
        </div>
    );
  }
  } else if (type === "incomingNotification") {
    return (
      <div className="message system">
          {content}
      </div>
    );
  }
}

export default Message;
