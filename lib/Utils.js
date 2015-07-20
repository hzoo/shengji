/**
 *   @module Utils
 */
const _ = require('lodash');
const ShengJi = require('./ShengJi')();

/**
 *    @namespace
 */
const Utils = {
  /**
   *    Generates any number of the same card, default 1.
   *    @param {ShengJi.cardValue} val - The value of the generated card.
   *    @param {ShengJi.cardSuit} suit - The suit of the generated card.
   *    @param {int} num - The number of cards to generate (default 1).
   *    @return {[Card]} cards - The generated card(s).
   */
  genCards(val, suit, num = 1) {
    const cards = new Array(num);
    _.forEach(_.range(num), i => {
      cards[i] = { value: val, suit: suit };
    });
    return cards;
  },

  /**
   *    Generates a pair of cards.
   *    @param {ShengJi.cardValue} val - The value of the generated pair.
   *    @param {ShengJi.cardSuit} suit - The suit of the generated pair.
   *    @return {[Card]} cards - The generated pair.
   */
  genPair(val, suit) {
    return Utils.genCards(val, suit, 2);
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
  genTuolaji(val, suit, level, numCards = 2, num = 2) {
    let tuolaji = [];
    // Adjust the number of pairs by +1 if skipping the current level
    if (level > val - num && level < val) {
      num += 1;
    }
    _.forEach(_.range(val - num + 1, val + 1), v => {
      if (v === ShengJi.cardValue.CURRENTLEVEL || v === ShengJi.cardValue.CURRENTLEVELSUIT) {
        v = level;
      }
      if (v !== level) {
        tuolaji = tuolaji.concat(Utils.genCards(v, suit, numCards));
      }
    });
    return _.sortBy(tuolaji, 'value').reverse();
  },

  /**
   *    Generates a single deck of cards.
   *    @return {[Card]} cards - The generated deck.
   */
  genDeck() {
    const cards = [];
    // normal values (2-A)
    _.forEach(_.range(2, 15), j => {
      _.forEach(_.range(1, 5), k => {
        cards.push({ id: cards.length, value: j, suit: k });
      });
    });
    // the two jokers
    cards.push({ id: cards.length, value: 17, suit: 5 });
    cards.push({ id: cards.length, value: 18, suit: 5 });
    return cards;
  },

  /**
   *    Generates decks of cards, default 2.
   *    @param {int} num - The number of decks to generate (default 2).
   *    @return {[Card]} cards - The generated card(s).
   */
  genDecks(num = 2) {
    let cards = [];
    _.forEach(_.range(num - 1), () => {
      cards = cards.concat(Utils.genDeck());
    });
    return _.shuffle(cards);
  }
};

module.exports = Utils;
