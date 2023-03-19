import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import chatReducer from "./chat/chatSlice";
import messageReducer from "./messages/MessagesSlice"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
        message: messageReducer
    }
})