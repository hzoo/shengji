import React from 'react';

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
  toIcon(str) {
    return `icon-${str}`
  },
  render() {
    const { card, selectCard } = this.props;
    const suit = toSuitValue(card.suit);
    const selected = card.selected ? ' Card--selected' : '';
    const red = suit === 'diamonds' || suit === 'hearts' || isRedJoker(card) ? ' Card--red' : '';
    return (
      <div className={`Card${selected}${red}`}
           onClick={() => selectCard(card.id)}>
          <div className={'Card-value'}>
            {toCardValue(card.value)}
          </div>
          <div className={`${this.toIcon(suit)} Card-suit`}></div>
      </div>
    );
  }
});

export default Card;
