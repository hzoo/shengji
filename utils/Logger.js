'use strict';
function Logger() {
  return this;
}

function logF(message, level) {
  if (!level) {
    level = 'INFO';
  }
  console.log('[%s] %s', level, message);
}

Logger.prototype.err = function(message) {
  logF('ERROR', message);
};

Logger.prototype.debug = function(message) {
  logF('DEBUG', message);
};

Logger.prototype.log = logF;

module.exports = new Logger();
