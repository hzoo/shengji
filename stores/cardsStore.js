'use strict';
const Reflux = require('reflux');
const actions = require('../actions/actions');
// const io = require('socket.io-client');

export const cardsStore = Reflux.createStore({
  listenables: actions,
  init() {
    this.selected = [];
  },
  onSelect(cardId) {
    const selected = this.selected;
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
