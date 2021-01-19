const path = require('path');
const express = require('express');
const app = express();
const http =  require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages.js');

app.use(express.static(path.join(__dirname,'public')));
const server = http.createServer(app);
const io = socketio(server);
const botName = "ChatCord Bot"

// Run when some client connects
io.on('connection', function(socket){
    console.log("New WS Conncetion with id = " +socket.id);

    socket.emit('message',formatMessage(botName,'Welcome to ChatCord'));

    // BroadCast when a user connects
    socket.broadcast.emit('messageb',formatMessage(botName,'A user has joined the Chat'));

    // Run when client disconnects
    socket.on('disconnect',function(){
        io.emit('messaged',formatMessage(botName,'A user has left the Chat'));
    });

    // Listen for the chatMessage
    socket.on('chatMessage',function(message){
        io.emit('message',formatMessage("USER",message));
    });

});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});


