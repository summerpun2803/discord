import io from 'socket.io-client';
// import { useDispatch, useSelector } from 'react-redux';
import { setFriends, setPending_Friend_Request } from '../store/friendsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../store/chatSlice';
import { setRoomDetails } from '../store/roomSlice';
import { updateActiveRooms } from './roomHandler';
import { handleLeft, handleSinalingData, preparePeerConn } from './webRTCHandler';

let socket = null;
let receiverId = null;
export const connectWithSocket = (userId , dispatch) => {

    socket = io('http://localhost:5000/',{
        auth:{userId},
    });
    console.log(socket);


    socket.on('connect', ()=>{
        console.log("socket connected with the server");
        console.log(socket.id);
    })

    socket.on("friend-invitations" , (data)=> {
        const {pendingInvitations} = data;
        // console.log("invitation Came" , pendingInvitations)
        dispatch(setPending_Friend_Request(pendingInvitations));
    })

    socket.on('connect_error', (error) => {
        console.error("Connection Error:", error);
    });

    socket.on("friend-list", (data)=> {
        const {friends} = data;
        // console.log(friends,"friends");
        dispatch(setFriends(friends));
    })

    socket.on("direct-chat-history" , (data) => {
        console.log("hmmm",data);
        const { messages , participants } = data;
        console.log(userId);
        console.log(receiverId);
        // dispatch(setMessages(messages))
        console.log(participants)
        if(receiverId && userId){
            const userConversation = [userId , receiverId];

            const result = participants.every((participantId) => {
                return userConversation.includes(participantId)
            });
            console.log(participants);
            if(result){
                dispatch(setMessages(messages));
            }
        }
    })


    socket.on("room-create" , (data) => {
        console.log("room created");
        
        const {roomDetails} = data;
        // console.log(roomDetails);
        dispatch(setRoomDetails(roomDetails));
    })

    socket.on("active-rooms" , (data) => {
        const {activeRooms} = data;
        // console.log("active_Rooms");
        // console.log(activeRooms);
        updateActiveRooms(dispatch , activeRooms);
    })

    socket.on('conn-prepare' , (data) => {
        const {connUserSocketId} = data;
        console.log("preparing..." , data);
        preparePeerConn(connUserSocketId , false);
        socket.emit('conn-init' , {connUserSocketId : connUserSocketId});

    })

    socket.on('conn-init' , (data) => {
        const {connUserSocketId} = data;
        preparePeerConn(connUserSocketId, true);
    })

    socket.on('conn-signal' , (data) => {
        handleSinalingData(data)
        
    })

    socket.on('room-left-participant' , (data) => {
        console.log("left" , data);
        handleLeft(data);
    })
    // return socket;
}
export const disconnect = () => {
    if (socket && socket.connected) {
        socket.disconnect();
        console.log('Socket disconnected');

    }
    console.log("already disconnected");
}

export const sendMessage = (data) => {
    console.log(data); 
    socket.emit("direct-message" , data);
}

export const getDirectChatHistory = (data) =>{
    console.log(data)
    receiverId = data.receiverId;
    socket.emit('direct-chat-history' , data);
    
}

export const createNewRoomSocket = () => {
    socket.emit("room-create");
}

export const joinRoomSocket = (data) => {
    socket.emit("join-room" , data);
}

export const leaveRoomSocket = (data) => {
    console.log("leaving the room" , data);
    socket.emit("leave-room" , data);
}

export const signalPeerData = (data) => {
    socket.emit('conn-signal' , data);
    
}