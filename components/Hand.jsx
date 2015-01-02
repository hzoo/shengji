'use strict';
var React = require('react');
var Card = require('./Card.jsx');

var Hand = React.createClass({
	render: function() {
		var cards = this.props.cards.map(function(card) {
			return (
				<Card card={card}	playerId={1}/>
			)
		});
		return (
			<div className={"container hand"}>
				{cards}
			</div>
		)
	}
});

module.exports = Hand;
