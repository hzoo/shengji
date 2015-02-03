'use strict';
var _ = require('lodash'),
  Trick = require('./Trick'),
  ShengJi = require('./ShengJi')();

/**
 *    Create a new game, initialize all states
 *    @constructor
 *    @param {array} players - Array of player ids included in this game.
 *    @param {int} level - The level of this game.
 *    @param {int} dealer - The id of the player who is dealing this round.
 */
function Round(players, level, dealer = players[0]) {
  var numDecks = ShengJi.numDecks(players.length);
  this.level = level;
  this.decks = numDecks;
  this.DECKSIZE = _.max([players.length, (numDecks * 54) % players.length]); //TODO: fix this according to rules

  // player states
  this.playerPoints = players.reduce((obj, x) => { obj[x] = 0; return obj; }, {});
  this.attackers = [];
  this.defenders = [];
  this.dealer = dealer;
  this.kittyPile = [];
  // card states
  this.playedPile = [];
  this.history = [];

  this.trick = null;
  this.trumpSuit = ShengJi.cardSuit.JOKER;
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

  if (this.playedPile == this.DECKSIZE) { // Round is finished, count kitty pile
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
  var attackingPoints = 0;
  _.each(this.attackers, p => { attackingPoints += this.players[p]; });
  var defendingPoints = ShengJi.maxPoints(this.decks) - attackingPoints;
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

