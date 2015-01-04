'use strict';
var express = require('express'),
	http = require('http');

var app = express();
var port = process.env.PORT || 5000;

app.disable('etag');

app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
	console.log("Starting the server on port " + port);
});

// Testing socket relationship with react/reflux
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
	socket.emit('message', {
		'message': 'hello world I connected through a socket'
	});
});
