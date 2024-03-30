
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAuthenticated : false,
    // token : null,
};

const authSlice = createSlice({
    name : ' auth',
    initialState ,
    reducers: {
        loginSuccess : (state , action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            // console.log("Success" , state.user);
        },
        registerSuccess : (state , action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            // console.log("Success" , state.user);
        },
        logoutSuccess : (state ) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const {loginSuccess , registerSuccess , logoutSuccess} = authSlice.actions;
export default authSlice.reducer;