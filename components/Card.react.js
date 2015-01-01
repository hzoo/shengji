var React = require('react');

module.exports = Card = React.createClass({
	render: function(){
		var card = this.props.card;
		return (
			<div className={"card"}>
				<p>
					{card.value} of {card.suit}
				</p>
			</div>
		)
	}
});