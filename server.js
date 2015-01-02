'use strict';
var express = require('express'),
	http = require('http'),
	logger = require('./utils/Logger');

var app = express();
var port = process.env.PORT || 5000;

app.disable('etag');

app.use("/", express.static(__dirname + "/public/"));

http.createServer(app).listen(port, function() {
	logger.log("Starting the server on port " + port);
});

