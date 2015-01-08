'use strict';
var describe = require('tape').test,
  ShengJi = require('../lib/ShengJi')();

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

  it('calculates cards that are points', function(t) {
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

  it('calculates other cards to be worth no points', function(t) {
    t.plan(1);

    t.equals(ShengJi.calcPoints(nonPointCards), 0);
  });

  it('calculates max points for a specified # of decks', function(t) {
    t.plan(2);

    t.equals(ShengJi.maxPoints(1), 100);
    t.equals(ShengJi.maxPoints(2), 200);
  });

  it('calculates bottom points with multiplier', function(t) {
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

  it('calculates the # of decks based on the # of players', function(t) {
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

  it('determines the stronger play correctly for single cards', function(t) {
    var trumpLevel = 5;
    var trumpSuit = ShengJi.cardSuit.SPADES;
    var leadingSuit = ShengJi.cardSuit.DIAMONDS;

    var twoDiamonds = [{
      value: ShengJi.cardValue.TWO,
      suit: ShengJi.cardSuit.DIAMONDS
    }];

    var threeDiamonds = [{
      value: ShengJi.cardValue.THREE,
      suit: ShengJi.cardSuit.DIAMONDS
    }];

    var fourDiamonds = [{
      value: ShengJi.cardValue.FOUR,
      suit: ShengJi.cardSuit.DIAMONDS
    }];

    var twoClubs = [{
      value: ShengJi.cardValue.TWO,
      suit: ShengJi.cardSuit.CLUBS
    }];

    var threeClubs = [{
      value: ShengJi.cardValue.THREE,
      suit: ShengJi.cardSuit.CLUBS
    }];

    var twoTrump = [{
      value: ShengJi.cardValue.TWO,
      suit: ShengJi.cardSuit.SPADES
    }];

    var threeTrump = [{
      value: ShengJi.cardValue.THREE,
      suit: ShengJi.cardSuit.SPADES
    }];

    var currentLevel = [{
      value: trumpLevel,
      suit: ShengJi.cardSuit.DIAMONDS
    }];

    var currentLevelAndSuit = [{
      value: trumpLevel,
      suit: trumpSuit
    }];

    var redJoker = [{
      value: ShengJi.cardValue.REDJOKER,
      suit: ShengJi.cardSuit.JOKER
    }];

    var blackJoker = [{
      value: ShengJi.cardValue.BLACKJOKER,
      suit: ShengJi.cardSuit.JOKER
    }];

    t.false(ShengJi.isStronger(threeDiamonds, threeDiamonds, trumpLevel, trumpSuit, leadingSuit),
      '2nd play of the same card cannot be stronger');

    t.false(ShengJi.isStronger(threeDiamonds, twoDiamonds, trumpLevel, trumpSuit, leadingSuit),
      '2 of diamonds is not stronger than 3 of diamonds');

    t.true(ShengJi.isStronger(threeDiamonds, fourDiamonds, trumpLevel, trumpSuit, leadingSuit),
      '4 of diamonds is stronger than 3 of diamonds');

    t.false(ShengJi.isStronger(threeDiamonds, twoClubs, trumpLevel, trumpSuit, leadingSuit),
      '2 of clubs (not trump) is not stronger than 3 of diamonds');

    t.false(ShengJi.isStronger(threeDiamonds, threeClubs, trumpLevel, trumpSuit, leadingSuit),
      '3 of clubs (not trump) is not stronger than 3 of diamonds');

    t.true(ShengJi.isStronger(threeDiamonds, twoTrump, trumpLevel, trumpSuit, leadingSuit),
      '2 of spades (trump) is stronger than 3 of diamonds');

    t.true(ShengJi.isStronger(threeDiamonds, threeTrump, trumpLevel, trumpSuit, leadingSuit),
      '3 of spades (trump) is stronger than 3 of diamonds');

    t.true(ShengJi.isStronger(threeTrump, currentLevel, trumpLevel, trumpSuit, leadingSuit),
      'Current level is stronger than 3 of spades (trump)');

    t.true(ShengJi.isStronger(currentLevel, currentLevelAndSuit, trumpLevel, trumpSuit, leadingSuit),
      'Current level and suit is stronger than just current level');

    t.true(ShengJi.isStronger(currentLevelAndSuit, blackJoker, trumpLevel, trumpSuit, leadingSuit),
      'Black joker is stronger than Current level and suit');

    t.true(ShengJi.isStronger(blackJoker, redJoker, trumpLevel, trumpSuit, leadingSuit),
      'Red joker is stronger than black joker');

    t.end();
  });

  it('determines if a card is a trump card', function(t) {
    jokers.forEach(function(card) {
      t.true(ShengJi.isTrump(card, 2, ShengJi.cardSuit.DIAMONDS), card.value + ' is a trump card');
    });

    t.end();
  });

});
