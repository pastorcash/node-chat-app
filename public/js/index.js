var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

// Chat listener for new messages
socket.on('newMessage', function (chtMsg) {
    console.log('New chat msg', chtMsg)
});