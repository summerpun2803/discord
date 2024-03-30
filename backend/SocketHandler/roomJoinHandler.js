const { getActiveRoomId, joinActiveRoom } = require ("../serverStore");
const { updateRooms } = require("./updates/rooms");


const roomJoinHandler = (data ,socket) => {
    const roomId = data;
    const participantId = {
        userId : socket.user.userId,
        socketId : socket.id,
    }
    // console.log(roomId,"ab yaha");
    const roomDetails = getActiveRoomId(roomId);
    joinActiveRoom(roomId , participantId);

    roomDetails.participants.forEach((participant) => {
        if(participant.socketId !== participantId.socketId){

            socket.to(participant.socketId).emit('conn-prepare' , {
                connUserSocketId : participantId.socketId,
            })
        }
       })
    updateRooms();
}

module.exports = {roomJoinHandler}