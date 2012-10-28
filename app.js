var app    = require('express')();
var fs     = require('fs');
var index  = fs.readFileSync('index.html').toString();
var server = require('http').createServer(app);
var io     = require('socket.io');

var playlist = [];

io = io.listen(server);

io.set('log level', 0);
server.listen(8080);

app.get('/', function (req, res) {
	res.send(index);
});

io.sockets.on('connection', function (socket) {
	socket.emit('init', playlist);

	socket.on('newVid', function (vid) {
		socket.broadcast.emit('newVid', vid);
		playlist.push(vid);
	});

	socket.on('shiftPlaylist', function () {
		socket.broadcast.emit('shiftPlaylist');
		playlist.shift();
	})
});