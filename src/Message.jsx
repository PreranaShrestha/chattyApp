import React, {Component} from 'react';

class Message extends Component {
  render() {
    const style = {
      color: this.props.userColor
    }
    if(this.props.type==="incomingMessage"){
      var regExp = new RegExp("http(?:\"|\')?(?<imgSrc>[^>]*[^/].(?:jpe?g|bmp|gif|png))(?:\"|\')?");
      const imageUrl = this.props.content.match(regExp);
      if(imageUrl) {
        return (
        <div>
          <img className="image" src={imageUrl[0]} />
        </div>
        );
      } else {
      return (
          <div className="message">
            <span className="message-username" style={style} >{this.props.username}</span>
            <span className="message-content">{this.props.content}</span>
          </div>
      );
    }
    } else if(this.props.type==="incomingNotification") {
      return (
        <div className="message system">
            {this.props.content}
        </div>
      );
    }
  }
}

export default Message;
