'use strict';
var describe = require('tape').test,
  Round = require('../lib/Round'),
  ShengJi = require('../lib/ShengJi')();

var joker = {player: 1, cards: [{ value: ShengJi.cardValue.BLACKJOKER, suit: ShengJi.cardSuit.JOKER }]};
var level = {player: 2, cards: [{ value: ShengJi.cardValue.TWO, suit: ShengJi.cardSuit.DIAMONDS }]};
var trump = {player: 3, cards: [{ value: ShengJi.cardValue.NINE, suit: ShengJi.cardSuit.SPADES }]};
var normal = {player: 4, cards:[{ value: ShengJi.cardValue.TEN, suit: ShengJi.cardSuit.DIAMONDS }]};

describe('Round', suite => {
  var it = suite.test;

  it('Creates a new round and sets the state correctly', t => {
    t.plan(6);

    var round = new Round([1, 2, 3, 4], 3, 2);
    t.equals(round.level, 2, 'Sets the level correctly');
    t.equals(round.decks, 2, 'Sets the number of decks correctly');
    t.equals(round.dealer, 3, 'Sets the dealer correctly');
    t.equals(round.DECKSIZE, 4, 'Sets the deck size correctly');
    t.equals(round.trumpSuit, ShengJi.cardSuit.JOKER, 'Sets the trump to be joker by default');

    round.setTrump(ShengJi.cardSuit.SPADES);
    t.equals(round.trumpSuit, ShengJi.cardSuit.SPADES, 'Sets the trump correctly when given');
  });

  it('Plays a trick correctly', t => {
    t.plan(9);

    var round = new Round([1, 2, 3, 4], 3, 2);
    var trumpSuit = ShengJi.cardSuit.SPADES;
    round.setTrump(trumpSuit);

    round.startTrick(normal);
    t.true(round.trick, 'Creates a trick');

    round.play(trump);
    t.equals(round.trumpSuit, trumpSuit, 'Does not change trump suit when playing a trick');
    t.equals(round.trick.leader, trump.player, 'Changes the leading player correctly inside a trick');

    round.play(level);
    round.play(joker);
    var trickStats = round.endTrick();
    t.equals(round.history.length, 1, 'Adds the last trick to the round history');
    t.equals(trickStats.pointCards.length, 1, 'Returns the correct point cards in the trick');
    t.equals(trickStats.points, 10, 'Returns the correct number of points in the trick');
    t.equals(trickStats.winner, joker.player, 'Returns the correct winner of the trick');
    t.equals(round.playerPoints[joker.player], trickStats.points, 'Awards points to the winning player');
    t.equals(round.playedPile.length, 4, 'Maintains the pile of discarded cards correctly');
  });

});
