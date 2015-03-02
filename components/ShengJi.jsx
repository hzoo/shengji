'use strict';
var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var cardStore = require('../stores/cardsStore');
var actions = require('../actions/actions');

var testHand = [{
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
  onSelect: function(card) {
    if (_.isEqual(card, this.props.card)) {
      var selected = !this.state.selected;
      this.setState({selected: selected});
    }
  },
  componentWillMount: function() {
    this.setState({});
  },
  ready: function(card) {
    actions.select(card);
  },
  toIcon: function(str) {
    return 'icon-' + str;
  },
  render: function() {
    var card = this.props.card;
    var selected = this.state.selected ? 'Card--selected' : '';
    return (
      <div className={"Card " + selected}
            onClick={this.ready.bind(this, card)}>
          {card.value + ' of '}
          <span className={this.toIcon(card.suit)}>
          </span>
      </div>
    );
  }
});

var Hand = React.createClass({
  render: function() {
    var cards = this.props.cards.map(function(card) {
      return (
        <Card card={card}/>
      );
    });
    return (
      <div className={"Hand"}>
        {cards}
      </div>
    );
  }
});

var PlayingField = React.createClass({
  render: function() {
    return (
      <div className={"PlayingField"}>
      </div>
    );
  }
});

var ShengJi = React.createClass({
  render: function() {
    return (
      <div className={"Shengji"}>
        <PlayingField />
        <Hand cards={testHand}/>
      </div>
    )
  }
});

module.exports = ShengJi;
