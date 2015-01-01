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
      DIAMONDS: 0,
      CLUBS: 1,
      HEARTS: 2,
      SPADES: 3,
      JOKER: 4
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

    isAPointCard: function(card) {
      if (this.pointCards.indexOf(card.value) !== -1) {
        return true;
      }
      return false;
    },

    isTrump: function(card) {
      if (card.value == this.cardValue.REDJOKER ||
        card.value == this.cardValue.BLACKJOKER ||
        card.value == this.currentState.Level ||
        card.suit == this.currentState.Suit) {
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
