var express = require('express'),
	http = require('http'),
	routes = require('./utils/routes'),
	logger = require('./utils/Logger'),
	config = require('./utils/config');

var app = express();
var port = process.env.PORT || 5000;

app.disable('etag');

app.use("/", express.static(__dirname + "/public/"));

var server = http.createServer(app).listen(port, function() {
	logger.log("Starting the server on port " + port);
});

