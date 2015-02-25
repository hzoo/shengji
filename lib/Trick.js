'use strict';
var _ = require('lodash');
var ShengJi = require('./ShengJi')();

/**
 *    Creates a new trick object, only called when the leader plays.
 *    The current winner is the leader by default, as is the current leading play.
 *    cards represents the entire set of cards played in this trick and is updated at each play.
 *    @constructor
 *    @param {array} play - The latest cards played.
 *    @param {int} level - The level of the current game.
 *    @param {int} trumpSuit - The trump suit of the current game.
 */
function Trick(play, level, trumpSuit) {
  var cards = play.cards;
  this.leader = play.player;
  this.cards = cards;
  this.leadingPlay = cards;
  this.leadingSuit = ShengJi.isTrump(cards[0], level, trumpSuit) ? trumpSuit : cards[0].suit;
}

/**
 *    Looks at the next card(s) played, decides who is the current winner,
 *    and adds these cards to the trick. Returns the current leader.
 *    @param {array} newPlay - The latest cards played.
 *    @param {int} level - The level of the current game.
 *    @param {int} trumpSuit - The trump suit of the current game.
 *    @returns {int} The id of the leading player.
 */
Trick.prototype.play = function(newPlay, level, trumpSuit) {
  var newPlayer = newPlay.player;
  var newCards = newPlay.cards;
  // isStronger(x, y) true when y > x, false otherwise
  if (ShengJi.isStronger(this.leadingPlay, newCards, level, trumpSuit, this.leadingSuit)) {
    this.leader = newPlayer;
    this.leadingPlay = newCards;
    if (ShengJi.isTrump(newCards[0], level, trumpSuit)) {
      this.leadingPlay = _.map(this.leadingPlay, c => {
        var copy = c;
        copy.suit = trumpSuit;
        return copy;
      });
    }
  }
  this.cards = this.cards.concat(newCards);
  return this.leader;
};

/**
 *    @return {int} The id of the leading player.
 */
Trick.prototype.winner = function() {
  return this.leader;
};

/**
 *    @return {int} The current number of points included in this trick.
 */
Trick.prototype.points = function() {
  return ShengJi.calcPoints(this.cards);
};

/**
 *    @return {array} The cards with points currently in the trick.
 */
Trick.prototype.pointCards = function() {
  return _.filter(this.cards, ShengJi.isAPointCard, ShengJi);
};

module.exports = Trick;
