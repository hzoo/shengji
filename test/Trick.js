'use strict';
var describe = require('tape').test;
var ShengJi = require('../lib/ShengJi')();
var Trick = require('../lib/Trick');

var plays = [{
	player: 1,
	cards: [{
		value: ShengJi.cardValue.KING,
		suit: ShengJi.cardSuit.DIAMONDS
	}]
}, {
	player: 2,
	cards: [{
		value: ShengJi.cardValue.ACE,
		suit: ShengJi.cardSuit.DIAMONDS
	}]
}, {
	player: 3,
	cards: [{
		value: ShengJi.cardValue.FOUR,
		suit: ShengJi.cardSuit.SPADES
	}]
}, {
	player: 4,
	cards: [{
		value: ShengJi.cardValue.CURRENTLEVEL,
		suit: ShengJi.cardSuit.CLUBS
	}]
}]

describe('Trick', function(suite) {
	var it = suite.test;

	it('Creates a new Trick and sets the properties correctly', function(t) {
		t.plan(5);

		var trick = new Trick(plays[0], 2);
		t.equals(trick.leader, 1, 'Sets the current leader to be the leading player');
		t.equals(trick.leadingPlay, plays[0]['cards'], 'Sets the current leading play to be the first cards played');
		t.equals(trick.cards, plays[0]['cards'], 'Sets the set of cards played to be the first cards played');
		t.equals(trick.leadSuit, ShengJi.cardSuit.DIAMONDS, 'Sets the leading suit correctly');
		t.equals(trick.trumpSuit, ShengJi.cardSuit.JOKER, 'Sets trump to joker by default');
	});

	it('Calculates point cards in the trick correctly', function(t) {
		t.plan(4);

		var points = new Trick(plays[0], 2);
		var nopoints = new Trick(plays[1], 2);
		t.equals(points.points(), 10, 'Calculates Kings as 10 points');
		t.equals(nopoints.points(), 0, 'Calculates 3s as 0 points');
		t.equals(points.pointCards().value, plays[0]['cards'].value, 'Returns the cards with points correctly when there are points');
		t.equals(nopoints.pointCards().length, 0, 'Returns the cards with points correctly when there are no points');
	});

	it('Sets the trump correctly', function(t) {
		t.plan(1);

		var trick = new Trick(plays[2], 2, ShengJi.cardSuit.DIAMONDS);
		t.equals(trick.trumpSuit, ShengJi.cardSuit.DIAMONDS, 'Sets the trump suit correctly when given');
	});

	it('Compares plays and updates the current leader correctly', function(t) {
		t.plan(6);

		var trick = new Trick(plays[0], 2, ShengJi.cardSuit.SPADES);
		t.equals(trick.trumpSuit, ShengJi.cardSuit.SPADES, 'Sets the trump suit on the first play');

		trick.play(plays[1]);
		t.equals(trick.trumpSuit, ShengJi.cardSuit.SPADES, 'Trump did not change when same suit is played');
		t.equals(trick.leader, plays[1].player, 'Leader changed when ace was played > king');
		t.equals(trick.leadingPlay[0].value, plays[1].cards[0].value, 'Leading play is now an Ace');

		trick.play(plays[2]);
		t.equals(trick.leader, plays[2].player, 'Leader changed because trump was played over an ace');
		t.equals(trick.leadingPlay[0].suit, trick.trumpSuit, 'Leading play is now a trump suit card');
	});
});