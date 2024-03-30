const { addNewActiveRoom } = require("../serverStore");
// const { updateChat } = require("./updates/chats");
const {updateRooms} = require('./updates/rooms');

const roomCreateHandler = (socket) => {
    console.log("handling room create");
    // console.log(socket);
    const socketId = socket.id;
    const userId = socket.user.userId;

    const roomDetails = addNewActiveRoom(userId , socketId)

    socket.emit('room-create' , {
        roomDetails
    })

    updateRooms()
}

module.exports = {
    roomCreateHandler,
}