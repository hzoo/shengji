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
];

module.exports = ShengJi = React.createClass({
	render: function(){
		return (
			<div className={"container shengji"}>
				<Hand cards={example_hand}/>
			</div> 
		)
	}
});