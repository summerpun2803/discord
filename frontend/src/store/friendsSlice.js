const { createSlice } = require("@reduxjs/toolkit")

const initialState ={
    friends : [],
    pending_friend_req :[],
    online : [],
}

const friendSlice = createSlice({
    name: "friend",
    initialState,
    reducers : {
        setFriends : (state , action) => {
            state.friends = action.payload;
        },
        setPending_Friend_Request : (state , action) => {
            state.pending_friend_req = action.payload;
        },
        setOnline : (state,action) =>{
            state.online = action.payload;
        },
    }
});

export const { setFriends , setPending_Friend_Request , setOnline } = friendSlice.actions;
export default friendSlice.reducer;