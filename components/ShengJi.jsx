'use strict';
const React = require('react');
const Reflux = require('reflux');
const _ = require('lodash');
import {cardsStore} from '../stores/cardsStore';
const actions = require('../actions/actions');
const Utils = require('../lib/Utils');

const testHand = _.take(Utils.genDecks(), 27).sort(cardSort);

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
  const map = {
    '1': 'diamonds',
    '2': 'clubs',
    '3': 'hearts',
    '4': 'spades'
  };
  return map[value];
}

// TODO: assuming no trump suit, no trump number
function cardSort(a, b) {
  if (a.suit > b.suit) {
    return -1;
  } else if (a.suit < b.suit) {
    return 1;
  } else {
    if (a.value > b.value) {
      return -1;
    } else if (a.value < b.value) {
      return 1;
    } else {
      return 0;
    }
  }
}

function isRedJoker(card) {
  return card.value === 18;
}

const Card = React.createClass({
  propTypes: {
    card: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      value: React.PropTypes.number.isRequired,
      suit: React.PropTypes.number.isRequired
    }).isRequired,
    key: React.PropTypes.number
  },
  mixins: [Reflux.listenTo(cardsStore, 'onSelect')],
  onSelect(cardId, selected) {
    if (cardId === this.props.card.id) {
      this.setState({selected: selected});
    }
  },
  getInitialState: () => ({ selected: false }),
  ready: cardId => { actions.select(cardId); },
  toIcon: str => `icon-${str}`,
  render() {
    const card = this.props.card;
    const suit = toSuitValue(card.suit);
    const selected = this.state.selected ? ' Card--selected' : '';
    const red = suit === 'diamonds' || suit === 'hearts' || isRedJoker(card) ? ' Card--red' : '';
    return (
      <div className={`Card${selected}${red}`}
            onClick={this.ready.bind(this, card.id)}>
          <div className={'Card-value'}>
            {toCardValue(card.value)}
          </div>
          <div className={this.toIcon(suit) + ' Card-suit'}>
          </div>
      </div>
    );
  }
});

const Hand = React.createClass({
  propTypes: {
    cards: React.PropTypes.array.isRequired
  },
  render() {
    const cards = this.props.cards.map(card => <Card key={card.id} card={card} />);
    return (
      <div className={'Hand'}>
        {cards}
      </div>
    );
  }
});

const PlayingField = React.createClass({
  render() {
    return <div className={'PlayingField'}></div>;
  }
});

const Actions = React.createClass({
  render() {
    return (
      <div className={'Actions'}>
        <button className={'Actions-play'}>Play Hand</button>
      </div>
    );
  }
});

const ShengJi = React.createClass({
  render() {
    return (
      <div className={'Shengji'}>
        <PlayingField />
        <Actions />
        <Hand cards={testHand}/>
      </div>
    );
  }
});

module.exports = ShengJi;
