const socket = require('socket.io');
const { verifyToken } = require('./middleware/socketProtect');
const {newConnectionHandler} = require('./SocketHandler/newConnectionHandler');
const { disconnectHandler } = require('./SocketHandler/disconnectHandler');
const { setSocketServerInstance } = require('./serverStore');
const { directMessageHandler } = require('./SocketHandler/directMessageHandler');
const { directChatHistoryHandler } = require('./SocketHandler/directChatHistoryHandler');
const { roomCreateHandler } = require('./SocketHandler/roomCreateHandler');
const { roomJoinHandler } = require('./SocketHandler/roomJoinHandler');
const {roomLeaveHandler} = require('./SocketHandler/roomLeaveHandler');
const { connInitHandler } = require('./SocketHandler/conn-initHandler');
const { roomSignaling } = require('./SocketHandler/roomSignaling');

const registerSocketServer = (server) =>{
    const io = socket(server , {
        cors: {
            origin : '*',
            methods : ['GET' , "POST"],
        },
    });
    setSocketServerInstance(io);
      
    io.use((socket,next) => {
        console.log("middleware");
        verifyToken(socket , next);
    })
    io.on('connection' , (socket) => {
        console.log(socket.id , "connected");
        newConnectionHandler(socket , io);

        socket.on("direct-message" , (data) => {
            directMessageHandler(socket , data);
        })

        socket.on("direct-chat-history" , (data) => {
            console.log("retreiving");
            directChatHistoryHandler(socket , data);
        })

        socket.on("room-create" , () => {

            roomCreateHandler(socket)
        })

        socket.on("join-room" , (data) => {
            roomJoinHandler(data , socket);
        })

        socket.on("leave-room" , (data) => {
            roomLeaveHandler(socket , data);
        }) 
 
        socket.on('conn-init' , data => {
            connInitHandler(socket , data);
        })

        socket.on('conn-signal' , data => {
            roomSignaling(socket , data);
        })

        socket.on("disconnect" , () => {
            disconnectHandler(socket)
        })
    });    
};
 
module.exports = { 
    registerSocketServer,
}