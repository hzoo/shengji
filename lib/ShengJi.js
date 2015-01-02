'use strict';
var _ = require('lodash');

var ShengJi = function(options) {
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

    calcPoints: function(cards) {
      var points = 0;
      cards.forEach(function(card) {
        points += this.calcPointsForSingleCard(card);
      }.bind(this));
      return points;
    },

    maxPoints: function(numPacks) {
      return numPacks * 100;
    },

    calcKittyPoints: function(cards, multiplyKitty) {
      var multiplier = multiplyKitty || 2;
      return this.calcPoints(cards) * multiplier;
    },

    // Starting with 2 packs for 4 players, add a a pack every 2 players.
    numDecks: function(numPlayers) {
      return Math.floor(numPlayers / 2);
    },

    // Returns true if newPlay is stronger than oldPlay, false otherwise.
    // Each of the plays is in [{value: [v], suit: [s]}, {..}] form
    isStronger: function(oldPlay, newPlay, leadSuit, trumpSuit, level) {
      var newSuit = newPlay[0].suit;
      var oldSuit = oldPlay[0].suit;
      var newTrump = this.isTrump(level, trumpSuit, newPlay[0]);
      var oldTrump = this.isTrump(level, trumpSuit, oldPlay[0]);

      // Can't win if multiple cards of different suits or different numbers
      if (newPlay.length != _.filter(newPlay, function(c) {
          return newSuit == c.suit &&
            newPlay[0].value == c.value;
        }).length) {
        return false;
      }
      // Can't win if not leadSuit unless trump
      if (newSuit != leadSuit && !newTrump) {
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
    isAPointCard: function(card) {
      return this.calcPointsForSingleCard(card) > 0;
    },
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
