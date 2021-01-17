const path = require('path');
const express = require('express');
const app = express();
const http =  require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

app.use(express.static(path.join(__dirname,'public')));
const server = http.createServer(app);
const io = socketio(server);

// Run when some client connects
io.on('connection', function(socket){
    console.log("New WS Conncetion with id = " +socket.id);

    socket.emit('message','Welcome to ChatCord');

    // BroadCast when a user connects
    socket.broadcast.emit('messageb','A user has joined the Chat');

    // Run when client disconnects
    socket.on('disconnect',function(){
        io.emit('messaged','A user has left the Chat');
    });

    // Listen for the chatMessage
    socket.on('chatMessage',function(message){
        io.emit('message',message);
    });

});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});


