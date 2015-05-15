'use strict';
const describe = require('tape').test;
const ShengJi = require('../lib/ShengJi')();
const Trick = require('../lib/Trick');

const v = ShengJi.cardValue;
const s = ShengJi.cardSuit;

const joker = {
  player: 1, cards: [{ value: v.BLACKJOKER }]
};

const plays = [{
  player: 1, cards: [{ value: v.KING, suit: s.DIAMONDS }]
}, {
  player: 2, cards: [{ value: v.ACE, suit: s.DIAMONDS }]
}, {
  player: 3, cards: [{ value: v.FOUR, suit: s.SPADES }]
}, {
  player: 4, cards: [{ value: v.TWO, suit: s.CLUBS }]
}];

describe('Trick', suite => {
  const it = suite.test;

  it('Creates a new Trick and sets the properties correctly', t => {
    t.plan(6);

    const trick = new Trick(plays[0], 2);
    t.equals(trick.leader, 1, 'Sets the current leader to be the leading player');
    t.equals(trick.leadingPlay, plays[0].cards, 'Sets the current leading play to be the first cards played');
    t.equals(trick.cards, plays[0].cards, 'Sets the set of cards played to be the first cards played');
    t.equals(trick.leadingSuit, s.DIAMONDS, 'Sets the leading suit correctly');

    const trick2 = new Trick(plays[0], v.KING, s.SPADES);
    t.equals(trick2.leadingSuit, s.SPADES, 'Sets the lead suit to trump when level value card is played');

    const trick3 = new Trick(joker, v.TWO, s.DIAMONDS);
    t.equals(trick3.leadingSuit, s.DIAMONDS, 'Sets the lead suit to trump when joker is played');
  });

  it('Calculates point cards in the trick correctly', t => {
    t.plan(4);

    const points = new Trick(plays[0], 2);
    const nopoints = new Trick(plays[1], 2);
    t.equals(points.points(), 10, 'Calculates Kings as 10 points');
    t.equals(nopoints.points(), 0, 'Calculates 3s as 0 points');

    t.equals(points.pointCards().value, plays[0].cards.value, 'Returns the cards with points correctly when there are points');
    t.equals(nopoints.pointCards().length, 0, 'Returns the cards with points correctly when there are no points');
  });

  it('Compares plays and updates the current leader correctly', t => {
    t.plan(11);

    const trick = new Trick(plays[0], 2, s.SPADES);
    t.equals(trick.leader, trick.winner(), 'Leader equals winner');

    trick.play(plays[1], v.TWO, s.SPADES);
    t.equals(trick.leader, plays[1].player, 'Leader changed when ace was played > king');
    t.equals(trick.leadingPlay[0].value, plays[1].cards[0].value, 'Leading play is now an Ace');

    trick.play(plays[2], v.TWO, s.SPADES);
    t.equals(trick.leader, plays[2].player, 'Leader changed because trump was played over an ace');
    t.equals(trick.leadingPlay[0].suit, s.SPADES, 'Leading play is now a trump suit card');

    trick.play(plays[3], v.TWO, s.SPADES);
    t.equals(trick.leader, plays[3].player, 'Leader changed because current level card was played over trump');
    t.equals(trick.leadingPlay[0].suit, plays[3].cards[0].suit, 'Leading play is now a club');

    trick.play(joker, v.TWO, s.SPADES);
    t.equals(trick.leader, joker.player, 'Leader changed because joker was played over level card');
    t.equals(trick.leadingPlay[0].suit, s.SPADES, 'Leading play is now trump');

    trick.play(plays[3], v.TWO, s.SPADES);
    t.equals(trick.leader, joker.player, 'Leader remains the same lesser card was played');
    t.equals(trick.leadingPlay[0].suit, s.SPADES, 'Leading play is still trump, did not change');
  });
});
