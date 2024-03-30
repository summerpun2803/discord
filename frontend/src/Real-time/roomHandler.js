import { useSelector } from "react-redux";
import { setActiveRooms, setOpenRoom, setRemoteStream, setRoomDetails } from "../store/roomSlice";
import { createNewRoomSocket, joinRoomSocket, leaveRoomSocket } from "./socketCommunication";
import { store } from "../store/store";
import { closeAllConnection, getLocalStreamPreview } from "./webRTCHandler";


let streamGlobal = null;
export const createNewRoom = ({dispatch}) => {
    const successCallBackFunc = (stream) => {
        dispatch(setOpenRoom({ isUserInRoom: true , isUserRoomCreator: true}));
        createNewRoomSocket();
        setGlobalStream(stream);
        console.log(streamGlobal , "streamGlobal")
    }
    getLocalStreamPreview(false , successCallBackFunc );
}

export const setGlobalStream = (stream) =>{
    streamGlobal = stream;
} 

export const getStreamGlobal = () =>{
    if(streamGlobal) return streamGlobal;
}

export const updateActiveRooms = (dispatch , activeRooms) => {

    const friends = store.getState().friend.friends;
    const rooms = [];
    activeRooms.forEach(room =>{
        friends.forEach(f => {
            if(f.id === room.roomCreater.userId){
                rooms.push({...room , creatorUsername : f.username});
            }
        })
    })

    dispatch(setActiveRooms(rooms));

}

export const joinRoom = (roomId, dispatch) => {

    const successCallBackFunc = (stream) =>{
        joinRoomSocket(roomId);
        const data = {roomId : {roomId}}
        dispatch(setRoomDetails(data));
        dispatch(setOpenRoom({isUserRoomCreator :false , isUserInRoom :true}));
        setGlobalStream(stream);
    }
    getLocalStreamPreview(false , successCallBackFunc)
    
}

export const leaveRoom = (dispatch ) => {
    const roomId = store.getState().room.roomDetails.roomId;
    store.dispatch(setRemoteStream([]));
    closeAllConnection();
    leaveRoomSocket(roomId);
    dispatch(setRoomDetails(null));
    dispatch(setOpenRoom({isUserRoomCreator :false , isUserInRoom :false}));

    if(streamGlobal){
        streamGlobal.getTracks().forEach((track) => track.stop());
        setGlobalStream(null)
        console.log(streamGlobal);
    }
}

