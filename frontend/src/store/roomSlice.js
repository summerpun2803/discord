const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    isUserInRoom : false,
    isUserRoomCreator : false,
    roomDetails : null,
    activeRooms:[],
    localStream: null,
    remoteStreams : [],
    audioOnly : false , 
    screenSharingStream : null,
    isScreenSharingActive:false,
}

const roomSlice = createSlice({
    name : "room",
    initialState,
    reducers:{
        setOpenRoom : (state , action) => {
            state.isUserInRoom = action.payload.isUserInRoom;
            state.isUserRoomCreator = action.payload.isUserRoomCreator;
        },
        setRoomDetails : (state , action) => {
            state.roomDetails = action.payload;
        },
        setActiveRooms : (state , action) => {
            state.activeRooms = action.payload;
        },
        setLocalStream : (state , action) => {
            state.localStream = action.payload;
        },
        setRemoteStream : (state , action) => {
            state.remoteStreams = action.payload;
        },
    }
})

export const { setOpenRoom , setRoomDetails , setActiveRooms , setLocalStream , setRemoteStream} = roomSlice.actions;
export default roomSlice.reducer;