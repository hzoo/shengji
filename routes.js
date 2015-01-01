var JSX = require('node-jsx').install(),
	React = require('react'),
	logger = require('./utils/Logger');

module.exports = {
	index: function(req, res){
		res.render('index');
	}
}
