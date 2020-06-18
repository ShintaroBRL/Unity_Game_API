
var players = [];

const PlayerController = (soket) => {

    var thisPlayerId = shortid.generate();
  
    var player = {
        id: thisPlayerId,
        x:0, 
        y:0
    }

    players[thisPlayerId] = player;

    socket.on('JoinRoom', (roomID) => {

        socket.emit('register', {id: thisPlayerId});
        socket.broadcast.to(roomID).emit('spawn', {id: thisPlayerId});
        socket.broadcast.to(roomID).emit('requestPosition' );

        for(var playerId in players){
            if (playerId == thisPlayerId){
                continue;
            }else{
                socket.broadcast.to(roomID).emit('spawn', players[playerId]);
            };
        }
        
	});

    socket.on('move', (data) => {
        data.id = thisPlayerId;
    
        player.x = data.x;
        player.y = data.y;
        
        socket.broadcast.to(data.room).emit('move', data);
    
    });

    socket.on('getCoin', (data) =>{
        data.id = thisPlayerId;
        socket.broadcast.to(data.room).emit('PlayerGetCoin', data);
    });

    socket.on('dead', (data) =>{
        data.id = thisPlayerId;
        socket.broadcast.to(data.room).emit('PlayerDead', data);
    });

}

module.exports = PlayerController