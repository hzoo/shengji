var React = require('react');
var Card = require('./Card.react.js');

module.exports = Hand = React.createClass({
	render: function(){
		var cards = this.props.cards.map(function(card){
			return(
				<Card card={card}/>
			)
		});
		return (
			<ul class={"hand"}>{cards}</ul>
		)
	}
});