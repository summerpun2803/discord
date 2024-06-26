import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    chosenChatDetails : null,
    chatType : null,
    messages : [],
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers : {
        setChatDetails : (state , action) => {
            state.chosenChatDetails = action.payload.chatDetails;
            state.chatType = action.payload.chatType;
            state.messages = []
        },
        setMessages : (state , action) => {
            state.messages = action.payload;
        },

    }
})

export const {setChatDetails , setMessages} = chatSlice.actions;
export default chatSlice.reducer ;