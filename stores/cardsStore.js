'use strict';
var Reflux = require('reflux');
var actions = require('../actions/actions');
var io = require('socket.io-client');

var cardsStore = Reflux.createStore({
  listenables: actions,
  init: function() {
    this.selected = [];
  },
  onSelect: function(cardId) {
    var selected = this.selected;
    if (selected[cardId] === undefined) {
      // initial selection
      selected[cardId] = true;
    } else {
      // toggle true/false
      selected[cardId] = !selected[cardId];
    }

    this.trigger(cardId, selected[cardId]);
  }
});

// var playedCardsStore = Reflux.createStore({
//   listenables: actions,
//   init: function() {
//     this.playedCards = [];
//     var socket = io.connect();
//     socket.on("message", function(m) {
//       console.log(m);
//     });
//   },
//   onSend: function(cardIds) {
//     this.trigger(cardIds);
//   }
// });

module.exports = cardsStore;
