const describe = require('tape').test;
const _ = require('lodash');
const Utils = require('../lib/Utils');
const ShengJi = require('../lib/ShengJi')();

const v = ShengJi.cardValue;
const s = ShengJi.cardSuit;

describe('Utils', suite => {
  const it = suite.test;

  it('generates a card when given the value and suit', t => {
    const val = v.FOUR;
    const suit = s.SPADES;

    t.test('defaults to a single card', t => {
      const card = Utils.genCards(val, suit);

      t.equals(card.length, 1, 'Generated cards are equal in length');
      t.equals(card[0].value, val, 'Equal in value');
      t.equals(card[0].suit, suit, 'Equal in suit');
      t.end();
    });

    t.test('works for multiple cards', t => {
      const num = 5;
      const cards = Utils.genCards(val, suit, num);

      t.equals(cards.length, num, 'Generated cards are equal in length');
      _.forEach(cards, c => {
        t.equals(c.value, val, 'Equal in value');
        t.equals(c.suit, suit, 'Equal in suit');
      });
      t.end();
    });
  });

  it('generates a sorted tuolaji correctly', t => {
    const val = v.KING;
    const suit = s.DIAMONDS;
    const level = v.FIVE;

    t.test('for the default case of 2 pairs of cards', t => {
      const tuolaji = Utils.genTuolaji(val, suit, level);
      t.equals(tuolaji.length, 4, 'Generated cards are equal in length');
      _.forEach(_.range(2), i => {
        _.forEach(_.range(2 * i, 2 * (i + 1)), j => {
          t.equals(tuolaji[j].value, val - i, 'Equal in value');
          t.equals(tuolaji[j].suit, suit, 'Equal in suit');
        });
      });
      t.end();
    });

    t.test('for the case of 3 in a row of quad(4-card) plays', t => {
      const rowNum = 3;
      const cardNum = 4;
      const tuolaji = Utils.genTuolaji(val, suit, level, cardNum, rowNum);

      t.equals(tuolaji.length, rowNum * cardNum, 'Generated cards are equal in length');
      _.forEach(_.range(rowNum), i => {
        _.forEach(_.range(cardNum * i, cardNum * (i + 1)), j => {
          t.equals(tuolaji[j].value, val - i, 'Equal in value');
          t.equals(tuolaji[j].suit, suit, 'Equal in suit');
        });
      });
      t.end();
    });
  });
});
