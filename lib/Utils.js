/**
 *   @module Utils
 */
'use strict';
var _ = require('lodash'),
  ShengJi = require('./ShengJi')();

/**
 *    @namespace
 */
var Utils = {
  /**
   *    Shuffles a deck of cards and returns the shuffled deck as a copy.
   *    @param {[Card]} deck - The original deck of cards.
   *    @returns {[Card]} shuffledDeck - The shuffled deck of cards.
   */
  shuffle: function(cards) {
    return _.shuffle(cards);
  },

  /**
   *    Generates any number of the same card, default 1.
   *    @param {ShengJi.cardValue} val - The value of the generated card.
   *    @param {ShengJi.cardSuit} suit - The suit of the generated card.
   *    @param {int} num - The number of cards to generate (default 1).
   *    @return {[Card]} cards - The generated card(s).
   */
  generateCard: function(val, suit, num) {
    num = num || 1;
    var cards = new Array(num);
    _.forEach(_.range(num), i => { cards[i] = { value: val, suit: suit };
    });
    return cards;
  },

  /**
   *    Generates a pair of cards.
   *    @param {ShengJi.cardValue} val - The value of the generated pair.
   *    @param {ShengJi.cardSuit} suit - The suit of the generated pair.
   *    @return {[Card]} cards - The generated pair.
   */
  generatePair: function(val, suit) {
    return this.generateCard(val, suit, 2);
  },

  /**
   *    Generates a tuolaji of length n with the top pair as the value given.
   *    @param {ShengJi.cardValue} val - The value of the top pair.
   *    @param {ShengJi.cardSuit} suit - The suit of the tuolaji.
   *    @param {ShengJi.cardValue} level - The level of the current round.
   *    @param {int} numCards - The number of cards in each pair, default 2.
   *    @param {int} num - The number of pairs in the tuolaji, default 2.
   *    @return {[Card]} cards - The generated tuolaji.
   */
  generateTuolaji: function(val, suit, level, numCards, num) {
    numCards = numCards || 2;
    num = num || 2;
    var tuolaji = [];
    // Adjust the number of pairs by +1 if skipping the current level
    if (level > val - num && level < val) {
      num += 1;
    }
    _.forEach(_.range(val - num + 1, val + 1), v => {
      if (v == ShengJi.cardValue.CURRENTLEVEL || v == ShengJi.cardValue.CURRENTLEVELSUIT) {
        v = level;
      }
      if (v != level) {
        tuolaji = tuolaji.concat(Utils.generateCard(v, suit, numCards));
      }
    });
    return _.sortBy(tuolaji, 'value').reverse();
  }

};

module.exports = Utils;
