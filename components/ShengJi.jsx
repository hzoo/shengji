'use strict';
var React = require('react'),
	Reflux = require('reflux'),
	_ = require('lodash'),
  cardStore = require('../stores/cardsStore'),
  actions = require('../actions/actions');

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
	mixins: [Reflux.listenTo(cardStore, "onSelect")],
	onSelect: function(card, color){
		if(_.isEqual(card, this.props.card)){
			this.setState({style: { "background-color": color }});
		}
	},
	componentWillMount: function(){
		this.setState({});
	},
	ready: function(card) {
		actions.select(card);
	},
	render: function() {
		var card = this.props.card;
		console.log(this.state.style);
		return (
			<div className={"card"}>
				<button onClick={this.ready.bind(this, card)} style={this.state.style}>
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
				<Card card={card}/>
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
	render: function() {
		return (
			<div className={"container shengji"}>
				<Hand cards = {example_hand}/>
			</div>
		)
	}
});

module.exports = ShengJi;
