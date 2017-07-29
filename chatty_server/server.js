// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    client.send(data);
  });
};


wss.on('connection', (ws) => {

  let numUsers = wss.clients.size;
  let usersOnConn = { numUsers: numUsers };
  wss.broadcast(JSON.stringify(usersOnConn));


  ws.on('message', function incoming(message) {


    let id = uuidv4();
    newMessage = JSON.parse(message);

    if(newMessage.type === "postMessage"){
      newMessage['id'] = id;
      newMessage.type = "incomingMessage";
      newMessage = JSON.stringify(newMessage);
      wss.broadcast(newMessage);

      console.log('sent: %s', newMessage);
    } else if (newMessage.type === "postNotification"){

      newMessage.type = "incomingNotification";
      newMessage = JSON.stringify(newMessage);
      wss.broadcast(newMessage);

      console.log('sent: %s', newMessage);

    }

  });


  ws.send("it's working");

  ws.on('close', () => {
    console.log('Client disconnected')
    numUsers--;
    let usersOnDisc = { numUsers: numUsers};
    wss.broadcast(JSON.stringify(usersOnDisc));

  });
});


