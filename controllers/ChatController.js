
const ChatController = (socket) => {

    socket.on('ChatMensage', (Chat) => {
        socket.broadcast.to(Chat.roomID).emit('ChatMensage', Chat);
    });

}

module.exports = ChatController