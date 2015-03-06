'use strict';
var React = require('react');
var Reflux = require('reflux');
var _ = require('lodash');
var cardStore = require('../stores/cardsStore');
var actions = require('../actions/actions');
var Utils = require('../lib/Utils');

var testHand = _.take(Utils.genDecks(), 27);

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

function toSuitValue(value) {
  var map = {
    '1': 'diamonds',
    '2': 'clubs',
    '3': 'hearts',
    '4': 'spades'
  };
  return map[value];
}

function isRedJoker(card) {
  return card.value === 18;
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
    var suit = toSuitValue(card.suit);
    var selected = this.state.selected ? ' Card--selected' : '';
    var red = suit === 'diamonds' || suit === 'hearts' || isRedJoker(card) ? ' Card--red' : '';
    return (
      <div className={'Card' + selected + red}
            onClick={this.ready.bind(this, card)}>
          <div className={'Card-value'}>
            {toCardValue(card.value)}
          </div>
          <div className={this.toIcon(suit) + ' Card-suit'}>
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
