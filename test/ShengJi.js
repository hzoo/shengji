'use strict';
var describe = require('tape').test;
var ShengJi = require('../lib/ShengJi')();

var jokers = [{
  value: ShengJi.cardValue.REDJOKER
}, {
  value: ShengJi.cardValue.BLACKJOKER
}];

var nonPointCards = [{
  value: ShengJi.cardValue.TWO
}, {
  value: ShengJi.cardValue.THREE
}, {
  value: ShengJi.cardValue.FOUR
}, {
  value: ShengJi.cardValue.SIX
}, {
  value: ShengJi.cardValue.SEVEN
}, {
  value: ShengJi.cardValue.EIGHT
}, {
  value: ShengJi.cardValue.NINE
}, {
  value: ShengJi.cardValue.JACK
}, {
  value: ShengJi.cardValue.QUEEN
}, {
  value: ShengJi.cardValue.ACE
}];

var pointCards = [{
  value: ShengJi.cardValue.FIVE
}, {
  value: ShengJi.cardValue.TEN
}, {
  value: ShengJi.cardValue.KING
}];

describe('ShengJi', function(suite) {
  var it = suite.test;

  it('calcluates cards that are points', function(t) {
    t.plan(3);

    t.equals(ShengJi.calcPointsForSingleCard({
      value: ShengJi.cardValue.FIVE
    }), 5, '5 is 5 points');

    t.equals(ShengJi.calcPointsForSingleCard({
      value: ShengJi.cardValue.TEN
    }), 10, '10 is 10 points');

    t.equals(ShengJi.calcPointsForSingleCard({
      value: ShengJi.cardValue.KING
    }), 10, 'K is 10 points');
  });

  it('calcluates other cards to be worth no points', function(t) {
    t.plan(1);

    t.equals(ShengJi.calcPoints(nonPointCards), 0);
  });

  it('calcluates max points for a specified # of decks', function(t) {
    t.plan(2);

    t.equals(ShengJi.maxPoints(1), 100);
    t.equals(ShengJi.maxPoints(2), 200);
  });

  it('calcluates bottom points with multiplier', function(t) {
    t.plan(2);

    // Default multiplier
    t.equals(ShengJi.calcKittyPoints([{
      value: ShengJi.cardValue.FIVE
    }]), 10, 'a bottom pile of 5 points will be worth 10 by default');

    // Explicit multiplier
    var multiplier = 3;
    t.equals(ShengJi.calcKittyPoints([{
        value: ShengJi.cardValue.FIVE
      }], multiplier),
      15,
      'a bottom pile of 5 points will be worth 15 with a 3x multiplier');
  });

  it('calculates the # of decks based on the # of palyers', function(t) {
    t.equals(ShengJi.numDecks(4), 2, '2 decks for 4 players');
    t.equals(ShengJi.numDecks(5), 2, '2 decks for 5 players');
    t.equals(ShengJi.numDecks(6), 3, '3 decks for 6 players');
    t.equals(ShengJi.numDecks(7), 3, '3 decks for 7 players');
    t.equals(ShengJi.numDecks(8), 4, '4 decks for 8 players');
    t.equals(ShengJi.numDecks(9), 4, '4 decks for 9 players');

    t.end();
  });

  it('determines if a card is a point card', function(t) {
    pointCards.forEach(function(card) {
      t.true(ShengJi.isAPointCard(card), card.value + ' is a point card');
    });

    nonPointCards.forEach(function(card) {
      t.false(ShengJi.isAPointCard(card), card.value + ' is not a point card');
    });

    t.end();
  });

  it('determines if a card is a trump card', function(t) {
    jokers.forEach(function(card) {
      t.true(ShengJi.isTrump(2, ShengJi.cardSuit.DIAMONDS, card), card.value + ' is a trump card');
    });
    t.end();
  });

});
