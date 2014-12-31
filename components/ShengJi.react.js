var React = require('react');
var Hand = require('./Hand.react.js');

var example_hand = [
	{
		value: 5,
		suit: "spades"
	},
	{
		value: 12,
		suit: "hearts"
	},
	{
		value: 6,
		suit: "diamonds"
	}
]

module.exports = ShengJi = React.createClass({
	addCard: function(card){
		this.state.cards.push(card); 
	},
	componentDidMount: function(){
		var self = this;
		var socket = io.connect();
		socket.on('draw', function(card){
			self.addCard(card);
		});
	},
	render: function(){
		return (
			<div class={"shengji"}>
				<Hand cards={example_hand}/>
			</div> 
		)
	}
});