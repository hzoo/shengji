module.exports = function(stream, io){
	stream.on('turn', function(data){
		var card = {
			value: 5,
			suit: "spades"
		};

		io.emit('draw', card);
	});
}