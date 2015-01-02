var JSX = require('node-jsx').install(),
	React = require('react'),
	logger = require('./Logger');

module.exports = {
	index: function(req, res) {
		res.render('index');
	}
}
