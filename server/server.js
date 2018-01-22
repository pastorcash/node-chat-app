const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Listener for joining a room
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required');
    }

    socket.join(params.room);
    // socket.leave('string');

    // io.emit: sends to ALL users
    // socket.broadcast.emit: sends to All but sending user
    // socket.emit: sends to ONE users
    
    // io.emit -> io.to('room').emit: sends to all users connected to the room
    // socket.broadcast.emit - socket.broadcast.to('room').emit : sends to all users connected to the room except the sending user

    // socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the CMC chat app!'));
    // socket.broadcast.emit   from Admin ... new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    
    callback();
  });

  // Listener for Chat requests from client & Broadcast
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
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