'use strict';
require('babel/register');
var resolve = require('path').resolve;
process.argv.slice(2).map(function(file) {
  require(resolve(file));
});
