'use strict';
var Reflux = require('reflux'),
  actions = require('../actions/actions'),
  io = require('socket.io-client');

var cardsStore = Reflux.createStore({
  listenables: actions,
  init: function() {
    this.played = [];

    var socket = io.connect();
    socket.on("message", function(m) {
      console.log(m);
    });

  },
  onSelect: function(card) {
    console.log(JSON.stringify(card));
    var color = "#385F0F";
    this.trigger(card, color);
    //TODO write real logic here
  }
});

module.exports = cardsStore;
