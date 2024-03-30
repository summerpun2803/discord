const  {addNewConnectedUser} = require("../serverStore");
const { updateFriendPendingInvitation, updateFriends } = require("./updates/friends");
const { updateRooms } = require("./updates/rooms");

const newConnectionHandler = async(socket , io) => {
    const userDetails = socket.user;

    addNewConnectedUser({
        socketId : socket.id,
        userId: userDetails.userId,
    });

    updateFriendPendingInvitation(userDetails.userId);
    updateFriends(userDetails.userId);
    updateRooms(socket.id);
}

module.exports = {
    newConnectionHandler,
}