var Reflux = require('reflux');
var actions = require('../actions');

var cardsStore = Reflux.createStore({
	listenables: actions,
	init: function(){
		this.played = [];
	},
	onSelect: function(playerId, card){
		console.log(playerId + " chose: " + JSON.stringify(card));
		this.trigger(card);
		//TODO write real logic here
	}
});

module.exports = cardsStore