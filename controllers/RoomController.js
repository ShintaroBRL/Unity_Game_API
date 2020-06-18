const Gamemodes = require('../configs/gamemodes')
var shortid = require('shortid');

var rooms = [];

const RoomController = (socket) => {

	var id = shortid.create()

	socket.on('createDeadmachtRoom', (roomData) => {
		
		var room = {
			id: id,
			listID: rooms.lenght+1,
			name: roomData.name,
			dono: roomData.owner,
			maxPlayers: 16,
			correntPlayers: 0,
			usePass: roomData.usePass,
			pass: roomData.pass,
			gamemode: Gamemodes.deadmacht,
			minPlayers: 5,
			pvp: true,
			time: roomData.time,
			breakTime: 10
		};

		socket.emit("JoinRoom", room);

		rooms[id] = room
	
	});

	socket.on('createHideAndSeekRoom', (roomData) => {
		
		var room = {
			id: id,
			name: roomData.name,
			dono: roomData.owner,
			maxPlayers: 16,
			correntPlayers: 0,
			usePass: roomData.usePass,
			pass: roomData.pass,
			gamemode: Gamemodes.hideAndSeek,
			map: roomData.mapID,
			minPlayers: 5,
			pvp: false,
			time: roomData.time,
			breakTime: 10
		};

		socket.emit("JoinRoom", room);

		rooms[id] = room
	
	});

	socket.on('JoinRoom', (roomID) => {
		socket.emit('JoinRoom', rooms[roomID])
	});

	socket.on('ListRooms', () => {
		socket.emit('ListRooms', rooms)
	});
	

}

module.exports = RoomController