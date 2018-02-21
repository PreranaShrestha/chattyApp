// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const colorList = ["#00688B", "#a4d7e7", "#00008B", "#00ff00"];
let colorPicker = 0;
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

function boardcastMessage(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}


wss.on('connection', (ws) => {
  colorPicker = colorPicker % 4;
  var color = colorList[colorPicker];

  let message = {
    userColor: color,
    type: "userCountChange",
    userCount: wss.clients.size,
  }
  boardcastMessage(message);

  ws.on('message', function incoming(message) {
    let msg = JSON.parse(message);
    switch(msg.type) {
      case "postNotification":
      let newPostMessage = {
          type: "incomingNotification",
          newUsername: msg.username,
          userColor: color,
          id: uuidv4()
        }
        boardcastMessage(newPostMessage);
        break;
      case "postMessage":
        let newMessage = {
          type: "incomingMessage",
          id: uuidv4(),
          username: msg.username.name,
          userColor: color,
          content: msg.content
        }
        boardcastMessage(newMessage);
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    const message = {
      type: "userCountChange",
      userCount: wss.clients.size,
    }
    oardcastMessage(message);
  });
});