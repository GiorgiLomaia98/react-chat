import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import messageSevice from './MessagesService';

const initialState = {

  isLoading: false,
  allMessages: [],
  message: null,
  messageRecive: null,
  notifications: []

}

export const fertchAllMessages = createAsyncThunk(
  "messages/fetchAll",
  async ( chatId,thunkAPI) => {
    try {
      return await messageSevice.getMessages(chatId);
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


const MessagesSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    SET_ALL_MESSAGES(state, action) {
      state.allMessages = [...state.allMessages, action.payload];
    },
    SET_MESSAGERECIVE(state, action) {
      state.messageRecive = action.payload
    },
    SET_NOTIFICATIONS(state, action) {
      const notificationExists = state.notifications.some(notification => notification?._id === action.payload?._id);
      if (!notificationExists) {
        state.notifications.push(action.payload);
      }
    },
    SET_NOTIFICATIONS_NULL(state) {
        state.notifications = []
    }
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fertchAllMessages.pending, (state) => {
      state.isLoading = true
    
    })
    .addCase(fertchAllMessages.fulfilled, (state, action) => {
      state.allMessages = action.payload
      
    })
      .addCase(fertchAllMessages.rejected, (state, action) => {
      state.message = action.payload
      
    })
    
  }
});

export const { SET_ALL_MESSAGES ,SET_MESSAGERECIVE,SET_NOTIFICATIONS,SET_NOTIFICATIONS_NULL} = MessagesSlice.actions;


export const selectAllMessages = (state) => state.message.allMessages;
export const selectMessageREcive = (state) => state.message.messageRecive;
export const selectNotifications = (state) => state.message.notifications



export default MessagesSlice.reducer