'use strict';
const Reflux = require('reflux');

const actions = Reflux.createActions([
  // UI actions
  'showHUD',
  // player actions
  'select',
  'play',
  'draw'
]);

module.exports = actions;
