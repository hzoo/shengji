'use strict';
var Reflux = require('reflux');
var actions = require('../actions/actions');
var io = require('socket.io-client');

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
    this.trigger(card);
    //TODO write real logic here
  }
});

module.exports = cardsStore;
