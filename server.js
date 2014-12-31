var express = require('express'),
	http = require('http'),
	routes = require('./routes'),
	logger = require('./utils/Logger'),
	config = require('./config'),
	game = require('./utils/Game');

var app = express();
var port = process.env.PORT || 5000;

app.disable('etag');

app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
	logger.log("Starting the server on port " + port);
});
var io = require('socket.io').listen(server);

