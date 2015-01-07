/**
 *   @module ShengJi
 */
'use strict';
var _ = require('lodash');

/**
 *   @param {object} options - A set of configuration rules for the game
 *   @return {object} A ShengJi object with utility functions that act as rules for games.
 */
var ShengJi = function(options) {
  /**
   *   @namespace
   */
  var defaultOptions = {
    cardValue: {
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      SIX: 6,
      SEVEN: 7,
      EIGHT: 8,
      NINE: 9,
      TEN: 10,
      JACK: 11,
      QUEEN: 12,
      KING: 13,
      ACE: 14,
      CURRENTLEVEL: 15,
      CURRENTLEVELSUIT: 16,
      BLACKJOKER: 17,
      REDJOKER: 18
    },

    cardSuit: {
      DIAMONDS: 1,
      CLUBS: 2,
      HEARTS: 3,
      SPADES: 4,
      JOKER: 5
    },

    pointIncreaseThreshold: 0.2,

    /**
     *   @param {Card} card - A card containing a suit and value.
     *   @return {int} The number of points this card is worth.
     */
    calcPointsForSingleCard: function(card) {
      var value = card.value;
      if (value === this.cardValue.FIVE) {
        return 5;
      } else if (value === this.cardValue.TEN ||
        value === this.cardValue.KING) {
        return 10;
      }
      return 0;
    },

    /**
     *   @param {array} cards - An array of cards to calculate points.
     *   @return {int} The number of points these cards are worth.
     */
    calcPoints: function(cards) {
      var points = 0;
      cards.forEach(function(card) {
        points += this.calcPointsForSingleCard(card);
      }.bind(this));
      return points;
    },

    /**
     *   @param {int} numPacks - number of decks of cards.
     *   @return {int} The number of points in numPacks of decks.
     */
    maxPoints: function(numPacks) {
      return numPacks * 100;
    },

    /**
     *   @param {array} cards - A list of cards in the kitty pile.
     *   @param {int} multiplyKitty - (optional) The multiplier for the points in the kitty pile.
     *   @return {int} Number of points that the kitty pile is worth.
     */
    calcKittyPoints: function(cards, multiplyKitty) {
      var multiplier = multiplyKitty || 2;
      return this.calcPoints(cards) * multiplier;
    },

    /**
     *   Starting with 2 packs for 4 players, add a a pack every 2 players.
     *   @param {int} numPlayers - The number of players.
     *   @param {int} The number of decks needed to play a game.
     */
    numDecks: function(numPlayers) {
      return Math.floor(numPlayers / 2);
    },

    /**
     *   Returns true if newPlay is stronger than oldPlay, false otherwise.
     *   Each of the plays is in [{value: [v], suit: [s]}, {..}] form
     *   @param {array} oldPlay - The list of cards that currently leads the trick.
     *   @param {array} newPlay - The latest play made in the trick.
     *   @param {int} leadingSuit - The leading suit of this trick.
     *   @param {int} trumpSuit - The trump suit in the current game.
     *   @param {int} level - The level of the current game.
     *   @return {boolean} Whether newPlay is greater than oldPlay.
     */
    isStronger: function(oldPlay, newPlay, leadingSuit, trumpSuit, level) {
      // Establish important features, check the cards against game level to adjust value
      var newSuit = newPlay[0].suit;
      var newTrump = newPlay.length == _.filter(newPlay, function(c) {
        return defaultOptions.isTrump(level, trumpSuit, c);
      }).length;
      var oldTrump = oldPlay.length == _.filter(oldPlay, function(c) {
        return defaultOptions.isTrump(level, trumpSuit, c);
      }).length;
      // Function transforming regular cards to trump and trump suit values
      var transform = function(c) {
        var copy = c;
        if (c.value == level) {
          if (c.suit == trumpSuit) {
            copy.value = defaultOptions.cardValue.CURRENTLEVELSUIT;
          } else {
            copy.value = defaultOptions.cardValue.CURRENTLEVEL;
          }
        }
        return copy;
      };
      newPlay = _.map(newPlay, function(c) {
        return transform(c);
      });
      oldPlay = _.map(oldPlay, function(c) {
        return transform(c);
      });

      // Can't win if multiple cards of different suits or different numbers
      if (newPlay.length != _.filter(newPlay, function(c) {
          return newSuit == c.suit &&
            newPlay[0].value == c.value;
        }).length) {
        return false;
      }
      // Can't win if not leadingSuit unless trump
      if (newSuit != leadingSuit && !newTrump) {
        return false;
      }

      // Check for trump suits auto-winning
      if (oldTrump && !newTrump) {
        return false;
      }
      if (!oldTrump && newTrump) {
        return true;
      }

      // Finally return by checking value
      return newPlay[0].value > oldPlay[0].value;
    },

    /**
     *   @param {card} card - Card holding a suit and a value.
     *   @return {boolean} Whether this card is a point card.
     */
    isAPointCard: function(card) {
      return this.calcPointsForSingleCard(card) > 0;
    },

    /**
     *   @param {int} level - The level of the current game.
     *   @param {int} trump - The trump suit of the current game.
     *   @param {card} card - A card holding a suit and a value.
     *   @return {boolean} Whether this card is a trump card or not.
     */
    isTrump: function(level, trump, card) {
      if (card.value == this.cardValue.REDJOKER ||
        card.value == this.cardValue.BLACKJOKER ||
        card.value == level ||
        card.suit == trump) {
        return true;
      }
      return false;
    }
  };

  defaultOptions.pointCards = [
    defaultOptions.cardValue.FIVE,
    defaultOptions.cardValue.TEN,
    defaultOptions.cardValue.KING
  ];

  return _.extend(options || {}, defaultOptions);
};

module.exports = ShengJi;
