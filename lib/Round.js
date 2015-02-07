'use strict';
var _ = require('lodash'),
  Trick = require('./Trick'),
  ShengJi = require('./ShengJi')();

/**
 *    Create a new game, initialize all states
 *    @constructor
 *    @param {int} numPlayers - The number of players in this game.
 *    @param {int} level - The level of this game.
 *    @param {int} startingTrump - The starting trump suit.
 *    @param {int} startingDealer - The id of the starting dealer.
 */
function Round({numPlayers, level, startingTrump, startingDealer}) {
  // round data
  this.level = level;
  this.DECKS = ShengJi.numDecks(numPlayers);
  this.DECKSIZE = this.DECKS * 54; //TODO: fix this according to rules
  this.trick = null;
  this.trumpSuit = startingTrump || ShengJi.cardSuit.JOKER;

  // player data
  this.dealer = startingDealer || 0; // jscs fails on destructured default param
  this.playerPoints = _.range(numPlayers).reduce((obj, x) => { obj[x] = 0; return obj; }, {});
  this.attackers = [];
  this.defenders = [];

  // card piles
  this.kittyPile = [];
  this.playedPile = [];
  this.history = [];
}

/**
*   Sets the trump for this game
*   @param {int} suit - The suit to set as trump.
*/
Round.prototype.setTrump = function(suit) {
  this.trumpSuit = suit;
};

/**
*   Starts a new trick
*   @param {array} play - The leading cards played in the new trick.
*/
Round.prototype.startTrick = function(play) {
  this.trick = new Trick(play, this.trumpSuit);
};

/**
*   Called every time someone plays cards, updates the current trick
*   @param {array} newPlay - The latest cards played in the current trick.
*/
Round.prototype.play = function(newPlay) {
  this.trick.play(newPlay, this.level, this.trumpSuit);
};

/**
*   Ends the current trick, if this is the last trick, ends the game
*   @return {object} An object containing the points, point cards, and the winner of the current trick.
*/
Round.prototype.endTrick = function() {
  var points = this.trick.points();
  var pointCards = this.trick.pointCards();
  var winner = this.trick.winner();

  this.playerPoints[winner] += points;
  this.playedPile = this.playedPile.concat(this.trick.cards);
  this.history.push(this.trick);

  // Round is finished, count kitty pile
  if (this.playedPile.length === this.DECKSIZE) {
    this.playerPoints[winner] += ShengJi.calcKittyPoints(this.kittyPile);
    return this.endRound();
  }

  return {
    points: points,
    pointCards: pointCards,
    winner: winner
  };
};

/**
*   Ends the game, counts up points for each team. Only called in endTrick.
*   @return {object} The winning team's player ids, and the number of levels they gain.
*/
Round.prototype.endRound = function() {
  // point calculation
  var attackingPoints = _.map(this.attackers, (p) => this.playerPoints[p])
                         .reduce((sum, n) => { return sum + n; }, 0);
  var defendingPoints = ShengJi.maxPoints(this.DECKS) - attackingPoints;
  // level calculation, defenders first
  var levelsGained = (defendingPoints / 40) - 2;
  var winningTeam = this.defenders;
  if (levelsGained < 0) {
    levelsGained *= -1;
    winningTeam = this.attackers;
  }
  return {
    winningTeam: winningTeam,
    levelsGained: levelsGained
  };
};

module.exports = Round;

