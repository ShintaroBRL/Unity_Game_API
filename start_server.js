const io = require('socket.io')(process.env.PORT || 3000);

const PlayersController = require("./controllers/PlayersController")
const RoomsController = require("./controllers/RoomController")
const TimeController = require("./controllers/TimeController")

console.log('\x1b[32m[!]Game server Started\x1b[0m');

io.on('connection', (socket) => {
    
    RoomsController(socket)
    PlayersController(socket)
    TimeController(socket)

    socket.on('disconnect', () => {
        console.log('client Disconnected');
        delete players[thisPlayerId];
        socket.broadcast.emit('disconnected',{id: thisPlayerId});
    });

})
