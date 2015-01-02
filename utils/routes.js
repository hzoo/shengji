'use strict';
var logger = require('./Logger');

module.exports = {
	index: function(req, res) {
		logger.log("GET /index.html");
		res.render('index');
	}
};
