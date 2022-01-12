const users = [];
const socketController = socket => {
    console.log("Client connected", socket.id);
    // client disconnected
    socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
    });
    // message from client
    socket.on("send-message", (message, callback) => {
        if (!users.find(user => user.id === socket.id)) {
            let user = {
                id: socket.id,
                name: message.user,
            }
            socket.nickname = message.user;
            users.push(user);
        }
 
        socket.broadcast.emit("send-message", message);
        socket.broadcast.emit("users-list", users);
    });
};

module.exports = {
    socketController
};