const  { getActiveRoom, getSocketServerInstance } = require("../../serverStore")

const updateRooms = (toSocketId = null) => {
    const io = getSocketServerInstance();
    const activeRooms = getActiveRoom();
    if(toSocketId) {
        console.log("sending....." , toSocketId ,"=>" , activeRooms);
        io.to(toSocketId).emit("active-rooms" , {
            activeRooms,
        })
    }else{
        io.emit("active-rooms" , {
            activeRooms,
        })
    }

}

module.exports = {
    updateRooms,
}