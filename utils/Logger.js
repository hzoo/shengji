'use strict';
function Logger() {
  return this;
}

Logger.prototype.err = function(message) {
  log_f("ERROR", message);
};

Logger.prototype.debug = function(message) {
  log_f("DEBUG", message);
};

Logger.prototype.log = log_f;

function log_f(message, level) {
  if (!level) {
    level = "INFO";
  }
  console.log("[%s] %s", level, message);
}

module.exports = new Logger();
