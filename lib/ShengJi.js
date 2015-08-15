/**
 *   @module ShengJi
 */
const _ = require('lodash');

/**
 *   @param {object} options - A set of configuration rules for the game
 *   @return {object} A ShengJi object with utility functions that act as rules for games.
 */
const ShengJi = options => {
  /**
   *   @namespace
   */
  const defaultOptions = {
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
    calcSingle(card) {
      const value = card.value;
      if (value === this.cardValue.FIVE) {
        return 5;
      } else if (value === this.cardValue.TEN ||
        value === this.cardValue.KING) {
        return 10;
      }
      return 0;
    },

    /**
     *   @param {array|Card} cards - An array of cards or a card to calculate points.
     *   @return {int} The number of points these cards are worth.
     */
    calcPoints(cards) {
      if (_.isArray(cards)) {
        if (cards.length >= 0) {
          let points = 0;
          _.each(cards, card => { points += this.calcSingle(card); });
          return points;
        } else {
          return this.calcSingle(cards[0]);
        }
      } else {
        return this.calcSingle(cards);
      }
    },

    /**
     *   @param {int} numPacks - number of decks of cards.
     *   @return {int} The number of points in numPacks of decks.
     */
    maxPoints(numPacks) {
      return numPacks * 100;
    },

    /**
     *   @param {array} cards - A list of cards in the kitty pile.
     *   @param {int} multiplyKitty - (optional) The multiplier for the points in the kitty pile.
     *   @return {int} Number of points that the kitty pile is worth.
     */
    calcKittyPoints(cards, multiplyKitty = 2) {
      return this.calcPoints(cards) * multiplyKitty;
    },

    /**
     *   Starting with 2 packs for 4 players, add a a pack every 2 players.
     *   @param {int} numPlayers - The number of players.
     *   @param {int} The number of decks needed to play a game.
     */
    numDecks(numPlayers) {
      return Math.floor(numPlayers / 2);
    },

    /**
     *   Returns true if newPlay is stronger than oldPlay, false otherwise.
     *   Each of the plays is in [{value: [v], suit: [s]}, {..}] form
     *   @param {array} oldPlay - The list of cards that currently leads the trick.
     *   @param {array} newPlay - The latest play made in the trick.
     *   @param {int} level - The level of the current game.
     *   @param {int} trumpSuit - The trump suit in the current game.
     *   @param {int} leadingSuit - The leading suit of this trick.
     *   @return {boolean} Whether newPlay is greater than oldPlay.
     */
    isStronger(oldPlay, newPlay, level, trumpSuit, leadingSuit) {
      // Establish important features, check the cards against game level to adjust value
      const newSuit = newPlay[0].suit;
      // check trumps
      const trumps = c => defaultOptions.isTrump(c, level, trumpSuit);
      const newTrump = newPlay.length === _.filter(newPlay, trumps).length;
      const oldTrump = oldPlay.length === _.filter(oldPlay, trumps).length;

      // Function transforming regular cards to trump and trump suit values
      const transform = c => {
        const copy = _.clone(c);
        if (c.value === level) {
          if (c.suit === trumpSuit) {
            copy.value = defaultOptions.cardValue.CURRENTLEVELSUIT;
          } else {
            copy.value = defaultOptions.cardValue.CURRENTLEVEL;
          }
        }
        return copy;
      };
      const newPlayWithValue = _.map(newPlay, transform);
      const oldPlayWithValue = _.map(oldPlay, transform);

      // Can't win if multiple cards of different suits or different numbers
      const sameCards = _.filter(newPlayWithValue, c =>
        newSuit === c.suit && newPlayWithValue[0].value === c.value
      );
      if (newPlayWithValue.length !== sameCards.length) {
        return false;
      }

      // Can't win if not leadingSuit unless trump
      if (newSuit !== leadingSuit && !newTrump) {
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
      return newPlayWithValue[0].value > oldPlayWithValue[0].value;
    },

    /**
     *   @param {card} card - Card holding a suit and a value.
     *   @return {boolean} Whether this card is a point card.
     */
    isAPointCard(card) {
      return this.calcSingle(card) > 0;
    },

    /**
     *   @param {card} card - A card holding a suit and a value.
     *   @param {int} level - The level of the current game.
     *   @param {int} trumpSuit - The trump suit of the current game.
     *   @return {boolean} Whether this card is a trump card or not.
     */
    isTrump: function(card, level, trumpSuit) {
      if (card.value === this.cardValue.REDJOKER ||
        card.value === this.cardValue.BLACKJOKER ||
        card.value === level ||
        card.suit === trumpSuit) {
        return true;
      }
      return false;
    }
  };

  var v = defaultOptions.cardValue;
  defaultOptions.pointCards = [
    { value: v.FIVE },
    { value: v.TEN },
    { value: v.KING }
  ];

  defaultOptions.jokers = [
    { value: v.REDJOKER },
    { value: v.BLACKJOKER }
  ];

  defaultOptions.nonPointCards = [
    { value: v.TWO },
    { value: v.THREE },
    { value: v.FOUR },
    { value: v.SIX },
    { value: v.SEVEN },
    { value: v.EIGHT },
    { value: v.NINE },
    { value: v.JACK },
    { value: v.QUEEN },
    { value: v.ACE }
  ];

  return _.extend(options || {}, defaultOptions);
};

export default ShengJi;
