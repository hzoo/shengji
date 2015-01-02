'use strict';
var React = require('react');
var Reflux = require('reflux');
var Hand = require('./Hand.jsx');
var cardStore = require('../stores/cardsStore');

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