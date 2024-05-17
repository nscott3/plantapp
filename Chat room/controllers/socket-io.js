const { Message } = require('../app');

exports.init = function(io) {
  io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });

    /**
     * Create or join a room
     */
    socket.on('create or join', async (room, userId) => {
      socket.join(room);

      // Load messages from MongoDB
      try {
        const messages = await Message.find({ roomName: room }).sort('timestamp');
        socket.emit('load messages', messages);
        io.to(room).emit('joined', room, userId);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    });

    socket.on('chat', async (room, userId, chatText) => {
      const chatMessage = new Message({ roomName: room, userName: userId, text: chatText });

      try {
        await chatMessage.save();
        io.to(room).emit('chat', room, userId, chatText);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });
  });
};
