exports.init = function(io) {
    io.sockets.on('connection', function (socket) {
        console.log("try");
        try {
            /**
             * creates a chat function
             */
            socket.on('chat', function (room, userId, chatText) {
                io.sockets.to(room).emit('chat', room, userId, chatText);
            });

        } catch (e) {
        }
    });
}