var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var port = process.env.PORT || 5000;

app.disable('etag');

app.use('/', express.static(path.join(__dirname, '/public/')));

var server = http.createServer(app).listen(port, function() {
  console.log('Starting the server on port ', port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.emit('message', {
    'message': 'hello world I connected through a socket'
  });
});
