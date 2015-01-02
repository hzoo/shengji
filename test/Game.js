'use strict';
var describe = require('tape').test;
var Game = require('../lib/Game');

describe('Game', function(suite) {
  var it = suite.test;

  it('Creates a new game and sets the state correctly', function(t){
    t.plan(4);

    var game = new Game(2, [1,2,3,4], 3);
    t.equals(game.level, 2, 'Sets the level correctly');
    t.equals(game.decks, 2, 'Sets the number of decks correctly');
    t.equals(game.dealer, 3, 'Sets the dealer correctly');
    t.equals(game.DECKSIZE, 4, 'Sets the deck size correctly');
  });

});
