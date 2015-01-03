'use strict';
var _ = require('lodash');
var Trick = require('./Trick');
var ShengJi = require('./ShengJi')();

/**
 *		Create a new game, initialize all states
 *		@constructor
 *		@param {int} level - The level of this game.
 *		@param {array} players - Array of player ids included in this game.
 *		@param {int} dealer - The id of the player who is dealing this round.
 */
function Game(level, players, dealer) {
	var numDecks = ShengJi.numDecks(players.length);
	this.level = level;
	this.decks = numDecks;
	this.DECKSIZE = _.max([players.length, (numDecks * 54) % players.length]); //TODO: fix this according to rules

	// player states
	this.playerPoints = players.reduce(function(obj, x) {
		obj[x] = 0;
		return obj;
	}, {});
	this.attackers = [];
	this.defenders = [];
	this.dealer = dealer || players[0];
	this.kittyPile = [];
	// card states
	this.playedPile = [];

	this.trick = null;
	this.trump = null;
}

/**
*		Sets the trump for this game
*		@param {int} suit - The suit to set as trump.
*/
Game.prototype.setTrump = function(suit) {
	this.trump = suit;
};

/**
*		Starts a new trick
*		@param {array} play - The leading cards played in the new trick.
*/
Game.prototype.nextTrick = function(play) {
	this.trick = new Trick(play, this.trump);
};

/**
*		Called every time someone plays cards, updates the current trick
*		@param {array} newPlay - The latest cards played in the current trick.
*/
Game.prototype.play = function(newPlay) {
	this.trick.play(newPlay);
};

/**
*		Ends the current trick, if this is the last trick, ends the game
*		@return {object} An object containing the points, point cards, and the winner of the current trick.
*/
Game.prototype.endTrick = function() {
	var points = this.trick.points();
	var pointCards = this.trick.pointCards();
	var winner = this.trick.winner();

	this.playerPoints[winner] += points;
	this.playedPile.concat(this.trick.cards);
	if (this.playedPile == this.DECKSIZE) { // Game is finished, count kitty pile
		this.playerPoints[winner] += ShengJi.calcKittyPoints(this.kittyPile);
		return this.endGame();
	}

	return {
		points: points,
		pointCards: pointCards,
		winner: winner
	};
};

/**
*		Ends the game, counts up points for each team. Only called in endTrick.
*		@return {object} The winning team's player ids, and the number of levels they gain.
*/
Game.prototype.endGame = function() {
	// point calculation
	var attackingPoints = 0;
	_.each(this.attackers, function(p) {
		attackingPoints += this.players[p];
	});
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

module.exports = Game;
