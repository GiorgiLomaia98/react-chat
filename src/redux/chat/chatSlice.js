import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';
import {toast} from "react-toastify"

const initialState = {
  isLoading: false,
  isError: false,
  chat: "",
  message: "",
  chats: [],
  selectedChat: null,
  selectedUsers: []


  
}

export const accetUsersChat = createAsyncThunk(
  "auth/access-chat",
  async (userId, thunkAPI) => {
    try {
      return await chatService.accessChat(userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUserChats = createAsyncThunk(
  "auth/get-user-chats",
  async (thunkAPI) => {
    try {
      return await chatService.getUserChats();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createGroup = createAsyncThunk(
  "chat/create-group",
  async ( formdata,thunkAPI) => {
    try {
      return await chatService.createGroupChat(formdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const renameGroup = createAsyncThunk(
  "chat/rename-group",
  async ( formdata,thunkAPI) => {
    try {
      return await chatService.renameGroupChat(formdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removePersonFromGroup = createAsyncThunk(
  "chat/remove-from-group",
  async ( formdata,thunkAPI) => {
    try {
      return await chatService.removeFromGroupChat(formdata);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);



const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    SET_CHAT(state, action) {
      state.chat = action.payload
      
    },
    SET_CHATS(state, action) {
       state.chats = action.payload
  
    },
    SET_SELECTED_CHAT(state,action) {
      state.selectedChat = action?.payload
      state.selectedUsers = action?.payload?.users
    },
    SET_SELCTED_CHAT_TO_NULL(state) {
      state.selectedChat = null
    },
    SET_Selectedusers(state,action) {
      state.selectedUsers = action?.payload
    },
    
  },
    extraReducers: (builder) => { 
      builder
        // accesing the user chats
        .addCase(accetUsersChat.pending, (state) => {
         console.log("peddd")
        })
        .addCase(accetUsersChat.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          const newChat = action.payload;
          state.chats.push(newChat);
          state.chats.splice(0, 0, state.chats.pop()); // move the last chat to the first position

          
        })
        .addCase(accetUsersChat.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
      // getting all the user chats
      .addCase(getAllUserChats.pending, (state) => {
        state.isLoading = true;
        state.isError = false
    })
        .addCase(getAllUserChats.fulfilled, (state, action) => {          
        state.isLoading = false;
        state.isError = false;
        state.chats = action.payload
    })
    .addCase(getAllUserChats.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;    
    })
       // crete group chat
       .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
        state.isError = false
    })
        .addCase(createGroup.fulfilled, (state, action) => {
          const groupChat = action?.payload;   
         state.isLoading = false;
          state.isError = false;
          state.chats.push(groupChat);
          state.chats.splice(0, 0, state.chats.pop()); // move the last chat to the first position
          state.selectedUsers = groupChat?.users

        
    })
    .addCase(createGroup.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;    
    })
       // rename group chat
        .addCase(renameGroup.pending, (state) => {
         state.isLoading = true;
         state.isError = false;

    })
        .addCase(renameGroup.fulfilled, (state, action) => {
          const updatedGroupChat = action?.payload
          state.isLoading = false;
          state.isError = false;
             
    })
    .addCase(renameGroup.rejected, (state,action) => {
        state.isLoading = false;
        state.isError = true;
       state.message = action.payload;    
     
        
    })
       // remove from group chat
       .addCase(removePersonFromGroup.pending, (state) => {
        state.isLoading = true;
        state.isError = false;

   })
   .addCase(removePersonFromGroup.fulfilled, (state, action) => {
    state.isLoading = false;
    state.isError = false;
  
  })
   .addCase(removePersonFromGroup.rejected, (state,action) => {
       state.isLoading = false;
       state.isError = true;
       state.message = action.payload;    
   })
      
    }
});

export const { SET_CHAT, SET_CHATS,SET_SELECTED_CHAT ,SET_SELCTED_CHAT_TO_NULL, SET_Selectedusers} = chatSlice.actions;


export const selectLoading = (state) => state.chat.isLoading;
export const selectError = (state) => state.chat.isError;
export const selectMessage = (state) => state.chat.message;
export const selectChat = (state) => state.chat.chat;
export const selectChats = (state) => state.chat.chats;
export const selectSelectedChat = (state) => state.chat.selectedChat;
export const selectSelectedUsers = (state) => state.chat.selectedUsers;


export default chatSlice.reducer