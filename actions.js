var Reflux = require('reflux');

var actions = Reflux.createActions([
	// UI actions
	'showHUD',
	// player actions
	'select',
	'play',
	'draw'
]);

module.exports = actions;