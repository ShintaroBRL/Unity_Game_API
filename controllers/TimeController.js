
const TimerController = (socket) =>{

    socket.on("StartMatch", (matchData) => {
        var counfrom = matchData.time
        var courent = counfrom
        var countto = 0
        
        // Contador a cada 1s
        var x = setInterval(function() {
            var minutes = Math.floor(courent / 60);
            var seconds = courent - minutes * 60;
            var time = ""+minutes+"m "+seconds+"s "
            socket.broadcast.to(matchData.roomid).emit('Time', time);
            socket.broadcast.to(matchData.roomid).emit('TimeUp', false);
            courent = courent-1
            if(courent == countto){
                clearInterval(x);
                socket.broadcast.to(matchData.roomid).emit('TimeUp', true);
            }
        
        }, 1000);
    })

}

module.exports = TimerController