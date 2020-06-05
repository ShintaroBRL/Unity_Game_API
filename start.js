const server = require('http').createServer();
const io = require('socket.io')(server);

server.listen(3000);

console.log ('Server Started');

io.sockets.on('connection', function(socket){

	console.log ('User connected: ' + socket.id);

});