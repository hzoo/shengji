import React from 'react';
import Card from './Card';

const Hand = React.createClass({
  propTypes: {
    cards: React.PropTypes.array.isRequired
  },
  render() {
    const { cards, actions } = this.props;

    return (
      <div className={'Hand'}>
        {cards.map(card =>
          <Card key={card.id} card={card} {...actions} />
        )}
      </div>
    );
  }
});

module.exports = Hand;
