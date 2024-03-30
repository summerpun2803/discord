const {removeConnectedUser, getActiveRoom} = require('../serverStore');
const { roomLeaveHandler } = require('./roomLeaveHandler');

const disconnectHandler = (socket) => {
    const activeRooms = getActiveRoom();
    activeRooms.forEach((activeRoom)=> {
        const UserInRoom = activeRoom.participants.some(
            (participant) => participant.socketId === socket.id
        )

        if(UserInRoom){
            roomLeaveHandler(socket , activeRoom.roomId);
        }
    })
    removeConnectedUser(socket.id);
    
}

module.exports ={
    disconnectHandler,
}