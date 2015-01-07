'use strict';
process.argv.slice(2).map(function(file) {
  require(require('path').resolve(file));
});
