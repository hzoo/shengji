'use strict';
var React = require('react');
var Reflux = require('reflux');
var cardStore = require('../stores/cardsStore');
var actions = require('../actions/actions');

var example_hand = [{
	value: 5,
	suit: "spades"
}, {
	value: 12,
	suit: "hearts"
}, {
	value: 6,
	suit: "diamonds"
}];

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

var ShengJi = React.createClass({
	mixins: [Reflux.listenTo(cardStore, "onStatusChange")],
	onStatusChange: function(status) {
		console.log("shengji component received " + status);
	},
	render: function() {
		return (
			<div className={"container shengji"}>
				<Hand cards = {example_hand}/>
			</div>
		)
	}
});

module.exports = ShengJi;
