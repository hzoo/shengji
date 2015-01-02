'use strict';
var React = require('react');
var actions = require('../actions/actions');

var Card = React.createClass({
	ready: function(playerId, card) {
		actions.select(playerId, card);
	},
	render: function() {
		var card = this.props.card;
		var playerId = this.props.playerId;
		return (
			<div className={"card"}>
				<button onClick={this.ready.bind(this, playerId, card)}>
				{card.value} of {card.suit}
				</button>
			</div>
		)
	}
});

module.exports = Card;
