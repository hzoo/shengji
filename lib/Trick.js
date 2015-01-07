'use strict';
var _ = require('lodash'),
  ShengJi = require('./ShengJi')();

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
  var player = play['player'];
  var cards = play['cards'];
  this.leader = player;
  this.cards = cards;
  this.leadingPlay = cards;
  this.leadingSuit = ShengJi.isTrump(level, trumpSuit, cards[0]) ? trumpSuit : cards[0]['suit'];
}

/**
 *    Looks at the next card(s) played, decides who is the current winner,
 *    and adds these cards to the trick. Returns the current leader.
 *    @param {array} newPlay - The latest cards played.
 *    @returns {int} The id of the leading player.
 */
Trick.prototype.play = function(newPlay, trumpSuit, level) {
  var newPlayer = newPlay.player;
  var newCards = newPlay.cards;
  // isStronger(x, y) true when y > x, false otherwise
  if (ShengJi.isStronger(this.leadingPlay, newCards, this.leadingSuit, trumpSuit, level)) {
    this.leader = newPlayer;
    this.leadingPlay = newCards;
    if (ShengJi.isTrump(level, trumpSuit, newCards[0])) {
      this.leadingPlay = _.map(this.leadingPlay, function(c) {
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
  var pointCards = _.filter(this.cards, function(c) {
    return ShengJi.isAPointCard(c);
  });
  return pointCards;
};

module.exports = Trick;
