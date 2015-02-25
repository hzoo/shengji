'use strict';
var describe = require('tape').test;
var ShengJi = require('../lib/ShengJi')();
var Utils = require('../lib/Utils');

var v = ShengJi.cardValue;
var s = ShengJi.cardSuit;

describe('ShengJi', suite => {
  var it = suite.test;

  it('calculates cards that are points', t => {
    t.plan(3);

    t.equals(ShengJi.calcPoints({ value: v.FIVE }), 5, '5 is 5 points');
    t.equals(ShengJi.calcPoints({ value: v.TEN }), 10, '10 is 10 points');
    t.equals(ShengJi.calcPoints({ value: v.KING }), 10, 'K is 10 points');
  });

  it('calculates other cards to be worth no points', t => {
    t.plan(1);

    t.equals(ShengJi.calcPoints(ShengJi.nonPointCards), 0);
  });

  it('calculates max points for a specified # of decks', t => {
    t.plan(2);

    t.equals(ShengJi.maxPoints(1), 100);
    t.equals(ShengJi.maxPoints(2), 200);
  });

  it('calculates bottom points with multiplier', t => {
    t.plan(2);

    // Default multiplier
    t.equals(ShengJi.calcKittyPoints([{ value: v.FIVE }]), 10,
      'a bottom pile of 5 points will be worth 10 by default');

    // Explicit multiplier
    var multiplier = 3;
    t.equals(ShengJi.calcKittyPoints([{ value: v.FIVE }], multiplier), 15,
      'a bottom pile of 5 points will be worth 15 with a 3x multiplier');
  });

  it('calculates the # of decks based on the # of players', t => {
    t.equals(ShengJi.numDecks(4), 2, '2 decks for 4 players');
    t.equals(ShengJi.numDecks(5), 2, '2 decks for 5 players');
    t.equals(ShengJi.numDecks(6), 3, '3 decks for 6 players');
    t.equals(ShengJi.numDecks(7), 3, '3 decks for 7 players');
    t.equals(ShengJi.numDecks(8), 4, '4 decks for 8 players');
    t.equals(ShengJi.numDecks(9), 4, '4 decks for 9 players');

    t.end();
  });

  it('determines if a card is a point card', t => {
    ShengJi.pointCards.forEach(card => {
      t.true(ShengJi.isAPointCard(card), card.value + ' is a point card');
    });

    ShengJi.nonPointCards.forEach(card => {
      t.false(ShengJi.isAPointCard(card), card.value + ' is not a point card');
    });

    t.end();
  });

  it('determines the stronger play correctly', t => {
    var trumpLevel = 5;
    var trumpSuit = s.SPADES;
    var leadingSuit = s.DIAMONDS;

    var twoDiamonds = Utils.genCards(v.TWO, s.DIAMONDS),
      threeDiamonds = Utils.genCards(v.THREE, s.DIAMONDS),
      fourDiamonds = Utils.genCards(v.FOUR, s.DIAMONDS),
      twoClubs = Utils.genCards(v.TWO, s.CLUBS),
      threeClubs = Utils.genCards(v.TWO, s.CLUBS),
      twoTrump = Utils.genCards(v.TWO, s.SPADES),
      threeTrump = Utils.genCards(v.THREE, s.SPADES),
      currentLevel = Utils.genCards(trumpLevel, s.DIAMONDS),
      currentLevelAndSuit = Utils.genCards(trumpLevel, trumpSuit),
      redJoker = Utils.genCards(v.REDJOKER, s.JOKER),
      blackJoker = Utils.genCards(v.BLACKJOKER, s.JOKER);

    t.test('for single cards', t => {
      t.false(ShengJi.isStronger(threeDiamonds, threeDiamonds, trumpLevel, trumpSuit, leadingSuit),
        '2nd play of the same card cannot be stronger');

      t.false(ShengJi.isStronger(threeDiamonds, twoDiamonds, trumpLevel, trumpSuit, leadingSuit),
        '2 of diamonds < 3 of diamonds');

      t.true(ShengJi.isStronger(threeDiamonds, fourDiamonds, trumpLevel, trumpSuit, leadingSuit),
        '4 of diamonds > 3 of diamonds');

      t.false(ShengJi.isStronger(threeDiamonds, twoClubs, trumpLevel, trumpSuit, leadingSuit),
        '2 of clubs (not trump) < than 3 of diamonds');

      t.false(ShengJi.isStronger(threeDiamonds, threeClubs, trumpLevel, trumpSuit, leadingSuit),
        '3 of clubs (not trump) < 3 of diamonds');

      t.true(ShengJi.isStronger(threeDiamonds, twoTrump, trumpLevel, trumpSuit, leadingSuit),
        '2 of spades (trump) > 3 of diamonds');

      t.true(ShengJi.isStronger(threeDiamonds, threeTrump, trumpLevel, trumpSuit, leadingSuit),
        '3 of spades (trump) > 3 of diamonds');

      t.false(ShengJi.isStronger(threeTrump, threeDiamonds, trumpLevel, trumpSuit, leadingSuit),
        '3 of diamonds < 3 of spades (trump)');

      t.true(ShengJi.isStronger(threeTrump, currentLevel, trumpLevel, trumpSuit, leadingSuit),
        'Current level > 3 of spades (trump)');

      t.true(ShengJi.isStronger(currentLevel, currentLevelAndSuit, trumpLevel, trumpSuit, leadingSuit),
        'Current level and suit > just current level');

      t.true(ShengJi.isStronger(currentLevelAndSuit, blackJoker, trumpLevel, trumpSuit, leadingSuit),
        'Black joker > current level and suit');

      t.true(ShengJi.isStronger(blackJoker, redJoker, trumpLevel, trumpSuit, leadingSuit),
        'Red joker > black joker');

      t.end();
    });

    t.test('for pairs of cards', t => {
      t.false(ShengJi.isStronger(threeDiamonds.concat(threeDiamonds), threeDiamonds.concat(threeDiamonds),
        trumpLevel, trumpSuit, leadingSuit), '2nd play of the same pair cannot be stronger');

      t.false(ShengJi.isStronger(threeDiamonds.concat(threeDiamonds), twoDiamonds.concat(twoDiamonds),
        trumpLevel, trumpSuit, leadingSuit), '2x three of diamonds > 2x two of diamonds');

      t.false(ShengJi.isStronger(threeDiamonds.concat(threeDiamonds), threeClubs.concat(threeClubs),
        trumpLevel, trumpSuit, leadingSuit), '2x three of diamonds > 2x three of clubs when played first');

      t.false(ShengJi.isStronger(threeDiamonds.concat(threeDiamonds), blackJoker.concat(threeDiamonds),
        trumpLevel, trumpSuit, leadingSuit), '2x three of diamonds > nonmatching trump+diamonds');

      t.false(ShengJi.isStronger(threeDiamonds.concat(threeDiamonds), threeDiamonds.concat(threeTrump),
        trumpLevel, trumpSuit, leadingSuit), '2x three of diamonds > trump three + three of diamonds');

      t.true(ShengJi.isStronger(threeDiamonds.concat(threeDiamonds), fourDiamonds.concat(fourDiamonds),
        trumpLevel, trumpSuit, leadingSuit), '2x three of diamonds < 2x four of diamonds');

      t.true(ShengJi.isStronger(threeDiamonds.concat(threeDiamonds), threeTrump.concat(threeTrump),
        trumpLevel, trumpSuit, leadingSuit), '2x three of diamonds < 2x three of trump');

      t.true(ShengJi.isStronger(fourDiamonds.concat(fourDiamonds), twoTrump.concat(twoTrump),
        trumpLevel, trumpSuit, leadingSuit), '2x four of diamonds < 2x two of trump suit');

      t.true(ShengJi.isStronger(currentLevel.concat(currentLevel), blackJoker.concat(blackJoker),
        trumpLevel, trumpSuit, leadingSuit), '2x current level < 2x black joker (trump)');

      t.true(ShengJi.isStronger(twoTrump.concat(twoTrump), currentLevel.concat(currentLevel),
        trumpLevel, trumpSuit, leadingSuit), ' 2x two of trump suit < 2x currentLevel');

      t.false(ShengJi.isStronger(currentLevel.concat(currentLevel), currentLevelAndSuit.concat(currentLevel),
        trumpLevel, trumpSuit, leadingSuit),
        '2x current level of non trump > 2x non-matching suit of current level + current level trump');

      t.false(ShengJi.isStronger(currentLevel.concat(currentLevel), blackJoker.concat(redJoker),
        trumpLevel, trumpSuit, leadingSuit),
        '2x current level of non trump > blackjoker + redjoker');

      t.end();
    });

    t.end();
  });

  it('determines if a card is a trump card', t => {
    ShengJi.jokers.forEach(card => {
      t.true(ShengJi.isTrump(card, 2, s.DIAMONDS),
        card.value + ' is a trump card');
    });

    t.true(ShengJi.isTrump({ value: v.TWO }, 2, s.DIAMONDS),
      'current level is a trump');

    t.end();
  });

});
