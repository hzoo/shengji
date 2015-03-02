'use strict';
var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var cardStore = require('../stores/cardsStore');
var actions = require('../actions/actions');

var testHand = [{
  value: 5,
  suit: 'spades'
}, {
  value: 12,
  suit: 'hearts'
}, {
  value: 6,
  suit: 'diamonds'
}];

// TODO: move to Utils
function toCardValue(value) {
  var map = {
    '11': 'J',
    '12': 'Q',
    '13': 'K',
    '14': 'A',
    '17': 'J',
    '18': 'J'
  };
  return value > 10 ? map[value] : value;
}

var Card = React.createClass({
  mixins: [Reflux.listenTo(cardStore, 'onSelect')],
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
    var selected = this.state.selected ? ' Card--selected' : '';
    var red = card.suit === 'diamonds' || card.suit === 'hearts' ? ' Card--red' : '';
    return (
      <div className={'Card' + selected + red}
            onClick={this.ready.bind(this, card)}>
          <div className={'Card-value'}>
            {toCardValue(card.value)}
          </div>
          <div className={this.toIcon(card.suit) + ' Card-suit'}>
          </div>
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
      <div className={'Hand'}>
        {cards}
      </div>
    );
  }
});

var PlayingField = React.createClass({
  render: function() {
    return (
      <div className={'PlayingField'}>
      </div>
    );
  }
});

var ShengJi = React.createClass({
  render: function() {
    return (
      <div className={'Shengji'}>
        <PlayingField />
        <Hand cards={testHand}/>
      </div>
    )
  }
});

module.exports = ShengJi;
