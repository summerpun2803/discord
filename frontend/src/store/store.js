import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import friendReducer from './friendsSlice'
import chatReducer from "./chatSlice";
import roomReducer from "./roomSlice";

export const store = configureStore ({
    reducer: {
        auth : authReducer,
        friend : friendReducer,
        chat : chatReducer,
        room : roomReducer,
    },
});