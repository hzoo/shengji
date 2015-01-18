'use strict';
var describe = require('tape').test,
  _ = require('lodash'),
  Utils = require('../lib/Utils'),
  ShengJi = require('../lib/ShengJi')();

describe('Utils', function(suite) {
  var it = suite.test;

  it('shuffles a list of cards into a random order', function(t) {
    var cards = [{
      value: ShengJi.cardValue.TWO,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.THREE,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.FOUR,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.FIVE,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.SIX,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.SEVEN,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.EIGHT,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.NINE,
      suit: ShengJi.cardSuit.DIAMONDS
    }, {
      value: ShengJi.cardValue.TEN,
      suit: ShengJi.cardSuit.DIAMONDS
    }];

    t.equals(Utils.shuffle(cards).length, cards.length, "Generated cards are equal in length");
    t.end();
  });

  it('generates a card when given the value and suit', function(t) {
    var val = ShengJi.cardValue.FOUR;
    var suit = ShengJi.cardSuit.SPADES;

    t.test('defaults to a single card', function(t) {
      var card = Utils.generateCard(val, suit);

      t.equals(card.length, 1, "Generated cards are equal in length");
      t.equals(card[0].value, val, 'Equal in value');
      t.equals(card[0].suit, suit, 'Equal in suit');
      t.end();
    });

    t.test('works for multiple cards', function(t) {
      var num = 5;
      var cards = Utils.generateCard(val, suit, num);

      t.equals(cards.length, num, "Generated cards are equal in length");
      _.forEach(cards, function(c) {
        t.equals(c.value, val, 'Equal in value');
        t.equals(c.suit, suit, 'Equal in suit');
      });
      t.end();
    });
  });

  it('generates a sorted tuolaji correctly', function(t) {
    var val = ShengJi.cardValue.KING;
    var suit = ShengJi.cardSuit.DIAMONDS;
    var level = ShengJi.cardValue.FIVE;

    t.test('for the default case of 2 pairs of cards', function(t) {
      var tuolaji = Utils.generateTuolaji(val, suit, level);
      console.log(JSON.stringify(tuolaji));
      t.equals(tuolaji.length, 4, "Generated cards are equal in length");
      _.forEach(_.range(2), function(i) {
        _.forEach(_.range(2 * i, 2 * (i + 1)), function(j) {
          t.equals(tuolaji[j].value, val - i, 'Equal in value');
          t.equals(tuolaji[j].suit, suit, 'Equal in suit');
        });
      });
      t.end();
    });

    t.test('for the case of 3 in a row of quad(4-card) plays', function(t) {
      var rowNum = 3;
      var cardNum = 4;
      var tuolaji = Utils.generateTuolaji(val, suit, level, cardNum, rowNum);

      t.equals(tuolaji.length, rowNum * cardNum, "Generated cards are equal in length");
      _.forEach(_.range(rowNum), function(i) {
        _.forEach(_.range(cardNum * i, cardNum * (i + 1)), function(j) {
          t.equals(tuolaji[j].value, val - i, 'Equal in value');
          t.equals(tuolaji[j].suit, suit, 'Equal in suit');
        });
      });
      t.end();
    });
  });
});
