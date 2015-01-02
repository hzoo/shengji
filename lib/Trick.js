/*
 *   Module for object encapsulation of a trick, instantiates when the leader plays.
 *
 *   play is an object consisting of
 *   {
 *       player: [id],
 *       cards: [{value: [v], suit:[s]}, {...}, ...]
 *   }
 */
'use strict';
var _ = require('lodash');
var ShengJi = require('./ShengJi')();
/*
 *   Creates a new trick object, only called when the leader plays.
 *   The current winner is the leader by default, as is the current leading play.
 *   cards represents the entire set of cards played in this trick and is updated at each play.
 */
function Trick(play, level, trumpSuit) {
  var player = play['player'];
  var cards = play['cards'];
  this.trumpSuit = trumpSuit || ShengJi.cardSuit.JOKER;
  this.level = level;
  this.leader = player;
  this.cards = cards;
  this.leadingPlay = cards;
  this.leadSuit = cards[0]['suit'];
}

/*
 *   Looks at the next card(s) played, decides who is the current winner,
 *   and adds these cards to the trick. Returns the current leader.
 */
Trick.prototype.play = function(newPlay) {
  var newPlayer = newPlay.player;
  var newCards = newPlay.cards;
  // isStronger(x, y) true when y > x, false otherwise
  if (ShengJi.isStronger(this.leadingPlay, newCards, this.leadSuit, this.trumpSuit, this.level)) {
    this.leader = newPlayer;
    this.leadingPlay = newCards;
  }
  this.cards = this.cards.concat(newCards);
  return this.leader;
}

/*
 *   Returns the player who currently has the highest play in this trick.
 */
Trick.prototype.winner = function() {
  return this.leader
}

/*
 *   Returns the current number of points in this trick.
 */
Trick.prototype.points = function() {
  return ShengJi.calcPoints(this.cards);
}

/*
 *   Returns an array of the cards with points currently in the trick.
 */
Trick.prototype.pointCards = function() {
  var pointCards = _.filter(this.cards, function(c) {
    return ShengJi.isAPointCard(c);
  });
  return pointCards;
}

module.exports = Trick;
