'use strict';
var describe = require('tape').test;
var ShengJi = require('../lib/ShengJi')();
var Trick = require('../lib/Trick');

var plays = [
	{
		player: 1,
		cards: [
			{
				value: ShengJi.cardValue.KING,
				suit: ShengJi.cardSuit.DIAMONDS
			}
		]
	},
	{
		player: 2,
		cards: [
			{
				value: ShengJi.cardValue.THREE,
				suit: ShengJi.cardSuit.DIAMONDS
			}
		]
	},
	{
		player: 3,
		cards: [
			{
				value: ShengJi.cardValue.FOUR,
				suit: ShengJi.cardSuit.DIAMONDS
			}
		]
	},
	{
		player: 4,
		cards: [
			{
				value: ShengJi.cardValue.CURRENTLEVEL,
				suit: ShengJi.cardSuit.DIAMONDS
			}
		]
	}
]

describe('Trick', function(suite){
	var it = suite.test;

	it('Creates a new Trick and sets the properties correctly', function(t){
		t.plan(4);

		var trick = new Trick(plays[0]);
		t.equals(trick.leader, 1, 'Sets the current leader to be the leading player');
		t.equals(trick.leadingPlay, plays[0]['cards'], 'Sets the current leading play to be the first cards played');
		t.equals(trick.cards, plays[0]['cards'], 'Sets the set of cards played to be the first cards played');
		t.equals(trick.leadSuit, ShengJi.cardSuit.DIAMONDS, 'Sets the leading suit correctly');
	});

	it('Calculates point cards in the trick correctly', function(t){
		t.plan(4);

		var points = new Trick(plays[0]);
		var nopoints = new Trick(plays[1]);
		t.equals(points.points(), 10, 'Calculates Kings as 10 points');
		t.equals(nopoints.points(), 0, 'Calculates 3s as 0 points');
		t.equals(points.pointCards().value, plays[0]['cards'].value, 'Returns the cards with points correctly when there are points');
		t.equals(nopoints.pointCards().length, 0, 'Returns the cards with points correctly when there are no points');
	});
});
