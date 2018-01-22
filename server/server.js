const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the CMC chat app!'));

  // socket.broadcast.emit   from Admin ... new user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has just joinded'));

  // Listener for Chat requests from client & Broadcast
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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