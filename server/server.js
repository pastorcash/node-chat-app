const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Chat Event 1
  socket.emit('newMessage', {
    from: 'Boss',
    text: 'Call me when you get back to the office',
    createdAt: 123
  })

  // Listen for Chat requests from client
  socket.on('createMessage', (newChatMsg) => {
    console.log('createMessage', newChatMsg);
  })

  socket.on('disconnect', (socket) => {
    console.log('Client disconnected');
  });
});

// ----- Activate listener ----- //
server.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  
  module.exports = {app};