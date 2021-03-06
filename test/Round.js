const describe = require('tape').test;
const Round = require('../lib/Round');
const ShengJi = require('../lib/ShengJi')();
const Utils = require('../lib/Utils');

const v = ShengJi.cardValue;
const s = ShengJi.cardSuit;

const joker = { player: 1, cards: Utils.genCards(v.BLACKJOKER, s.JOKER) };
const level = { player: 2, cards: Utils.genCards(v.TWO, s.DIAMONDS) };
const trump = { player: 3, cards: Utils.genCards(v.NINE, s.SPADES) };
const normal = { player: 4, cards: Utils.genCards(v.TEN, s.DIAMONDS) };

describe('Round', suite => {
  const it = suite.test;

  it('Creates a new round and sets the state correctly', t => {
    t.plan(6);

    let round = new Round({
      numPlayers: 4,
      level: 2
    });
    t.equals(round.level, 2, 'Starts the level correctly');
    t.equals(round.DECKS, 2, 'Starts the number of decks correctly');
    t.equals(round.dealer, 0, 'Starts the startingDealer correctly');
    t.equals(round.DECKSIZE, 108, 'Starts the deck size correctly');
    t.equals(round.trumpSuit, s.JOKER, 'Constructs the trump to be joker by default');

    round.setTrump(s.SPADES);
    t.equals(round.trumpSuit, s.SPADES, 'Sets the trump correctly when given');
  });

  it('Plays a trick correctly', t => {
    t.plan(10);

    const startingTrump = s.SPADES;
    const round = new Round({
      numPlayers: 4,
      level: 2,
      startingTrump: startingTrump,
      startingDealer: 3
    });
    t.equals(round.trumpSuit, s.SPADES, 'Starts the trump correctly');

    round.startTrick(normal);
    t.true(round.trick, 'Creates a trick');

    round.play(trump);
    t.equals(round.trumpSuit, startingTrump, 'Does not change trump suit when playing a trick');
    t.equals(round.trick.leader, trump.player, 'Changes the leading player correctly inside a trick');

    round.play(level);
    round.play(joker);
    const trickStats = round.endTrick();
    t.equals(round.history.length, 1, 'Adds the last trick to the round history');
    t.equals(trickStats.pointCards.length, 1, 'Returns the correct point cards in the trick');
    t.equals(trickStats.points, 10, 'Returns the correct number of points in the trick');
    t.equals(trickStats.winner, joker.player, 'Returns the correct winner of the trick');
    t.equals(round.playerPoints[joker.player], trickStats.points, 'Awards points to the winning player');
    t.equals(round.playedPile.length, 4, 'Maintains the pile of discarded cards correctly');
  });

  it('Ends a round correctly', t => {
    t.plan(2);

    const round = new Round({
      numPlayers: 4,
      level: 2,
      startingTrump: s.SPADES,
      startingDealer: 3
    }).startTrick(normal)
      .play(trump)
      .play(level)
      .play(joker);

    // test endRound by setting DECKSIZE to be lower
    round.DECKSIZE = 4;
    // set attackers
    round.attackers = [0, 2];
    round.defenders = [1, 3];

    const trickStats = round.endTrick();
    t.equals(trickStats.winningTeam, round.defenders, 'Returns the correct winning team');
    t.equals(trickStats.levelsGained, 3, 'Returns the correct number of levels gained');
  });

});
