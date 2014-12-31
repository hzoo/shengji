var express = require('express'),
	exphbs = require('express-handlebars'),
	http = require('http'),
	routes = require('./routes'),
	logger = require('./utils/Logger'),
	config = require('./config');

var app = express();
var port = process.env.PORT || 5000;

app.disable('etag');

app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
	logger.log("Starting the server on port " + port);
});
var io = require('socket.io').listen(server);

