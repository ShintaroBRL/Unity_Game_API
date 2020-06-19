
var vote;

const VoteController = (socket) => {

    socket.on("StartVoteKick", (data) => {
        vote = {
            startedBy: data.startedBy,
            kick: data.playerid,
            yes: 1,
            no: 0
        }
        socket.broadcast.to(data.roomID).emit('StartVoteKick', vote);
    })

    socket.on("StartVoteChengeMap", (data) => {
        vote = {
            startedBy: data.startedBy,
            map: data.newmap,
            yes: 1,
            no: 0
        }
        socket.broadcast.to(data.roomID).emit('StartVoteChengeMap', vote);
    })

    socket.on("StartVoteChengeGamemode", (data) => {
        vote = {
            startedBy: data.startedBy,
            gamemode: data.newgamemode,
            yes: 1,
            no: 0
        }
        socket.broadcast.to(data.roomID).emit('StartVoteChengeGamemode', vote);
    })

    socket.on("VoteYes", (data) => {
        vote.yes = vote.yes+1
        socket.broadcast.to(data.roomID).emit('StartVoteKick', vote);
    })

    socket.on("VoteNo", (data) => {
        vote.yes = vote.yes+1
        socket.broadcast.to(data.roomID).emit('StartVoteKick', vote);
    })

}

module.exports = VoteController