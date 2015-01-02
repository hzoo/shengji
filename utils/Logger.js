function Logger() {
	return this;
}

log_f = function(message, level) {
	if (!level) {
		level = "INFO";
	}
	console.log("[%s] %s", level, message);
};

Logger.prototype.err = function(message) {
	log_f("ERROR", message);
}

Logger.prototype.debug = function(message) {
	log_f("DEBUG", message);
}

Logger.prototype.log = log_f;


module.exports = new Logger();
