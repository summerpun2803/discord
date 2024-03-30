const {v4 : uuidv4} = require("uuid")


const connectedUsers = new Map();
let activeRooms = [];
let io = null;

const setSocketServerInstance = (ioInstance) =>{
    io = ioInstance;
}
const getSocketServerInstance =()=>{
    return io;
}

const addNewConnectedUser = ({socketId , userId}) => {
    connectedUsers.set(socketId , {userId});
    console.log(connectedUsers);
}

const removeConnectedUser = (socketId ) => {
    if(connectedUsers.has(socketId)){
        connectedUsers.delete(socketId);
        console.log("deleting")
        console.log(connectedUsers);
    }
}

const getActiveConnections = (userId) =>{
    const activeConnection = [];

    connectedUsers.forEach((key , value) => {
        
        if(key.userId === userId){
            console.log(key , "===>>>" ,value);
            activeConnection.push(value)
        }
    })

    return activeConnection;
}

const addNewActiveRoom = (userId , socketId) => {
    const roomId = uuidv4();
    const newActiveRoom = {
        roomId,
        roomCreater : {
            userId,
            socketId
        },
        participants:[
            {
                userId,
                socketId,
            },
        ],
        
    }

    activeRooms.push(newActiveRoom)

    console.log("New Room ADDED");
    console.log(activeRooms);
    return newActiveRoom
}

const getActiveRoom = () => {
    return [...activeRooms];
}

const getActiveRoomId = (roomId) => {
    const activeRoom = activeRooms.find(
        (activeRoom) => activeRoom.roomId === roomId
    )
    if(activeRoom){
        return activeRoom
    }else{
        return null
    }
    
} 
const joinActiveRoom = (roomId , newParticipants) => {
    console.log(roomId, "idhar wala");
    const reqroom = activeRooms.find (room => room.roomId === roomId);
    activeRooms = activeRooms.filter((room) => room.roomId !== roomId)

    const updatedRoom = {
        ...reqroom ,
        participants :[...reqroom.participants , newParticipants]
    }

    activeRooms.push(updatedRoom);
    console.group("joined room;;;;")
    console.log(activeRooms);
}

const leaveActiveRoom = (roomId , participantSocketId) => {
    const activeRoom = activeRooms.find((room) => room.roomId === roomId);
    console.log("removing the user ........" , participantSocketId)
    if (activeRoom) {
        const copyActiveRoom = { ...activeRoom };

        copyActiveRoom.participants = copyActiveRoom.participants.filter(
            (participant) => participant.socketId !== participantSocketId
        )

        activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

        if (copyActiveRoom.participants.length > 0) {
        activeRooms.push(copyActiveRoom); 
        }
        // console.log(activeRoom)
    }
}



module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    addNewActiveRoom,
    getActiveRoom,
    getActiveRoomId,
    joinActiveRoom,
    leaveActiveRoom
}