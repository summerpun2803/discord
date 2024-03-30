const { getActiveRoom, getActiveRoomId, leaveActiveRoom } = require("../serverStore")
const { updateRooms } = require("./updates/rooms")

const roomLeaveHandler = (socket , data) => {
    const roomId = data;

    const activeRoom = getActiveRoomId(roomId);
    if(activeRoom) {
        leaveActiveRoom(roomId , socket.id);

        const updatedActiveRoom = getActiveRoomId(roomId);
        if(updatedActiveRoom){
            updatedActiveRoom.participants.forEach((participant) => {
                socket.to(participant.socketId).emit('room-left-participant' , {
                    connUserSocketId : socket.id,
                })
            })
        }
        updateRooms();
    }
}

module.exports = {
    roomLeaveHandler 
}

