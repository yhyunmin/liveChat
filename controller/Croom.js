const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http); // socket.io


io.on('connection', (socket) => {
  console.log('a user connected socket.id =>',socket.id);
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

exports.getRoom = (req, res) => {
  res.render('chat');
}
