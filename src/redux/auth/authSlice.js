import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const name = localStorage.getItem("name") || null
const initialState = {
    isLoading: false,
    isLoggedIn: false,
    name: name ? name : "",
  user: {
        _id:"",
        name: "",
        lastName: "",
        email: "",
        bio: "",
        phone: "",
        picture: null
    }
};

export const getLogUser = createAsyncThunk(
    "auth/get-user",
    async (thunkAPI) => {
      try {
        return await authService.getLoggedInUser();
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
  



const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
        SET_LOGIN(state, action) {
            state.isLoggedIn = action.payload
        },
        SET_NAME(state, action) {
            localStorage.setItem("name", JSON.stringify(action.payload));
            state.name = action.payload
        },
      SET_USER(state, action) {
      
          const profile = action.payload;
            state.user._id = profile?._id
            state.user.name = profile.name;
            state.user.lastName = profile.lastName;
            state.user.email = profile.email;
            state.user.phone = profile.phone;
            state.user.picture = profile.picture;
            state.user.bio = profile.bio
        }
    },
  extraReducers: (builder) => {
    builder
      .addCase(getLogUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogUser.fulfilled, (state, action) => {
       
        const profile = action.payload;
        state.user._id = profile._id
        state.user.name = profile.name;
        state.user.lastName = profile.lastName;
        state.user.email = profile.email;
        state.user.phone = profile.phone;
        state.user.picture = profile.picture;
        state.user.bio = profile.bio;
        state.isLoading = false
            
           
      })
      .addCase(getLogUser.rejected, (state, action) => {
        state.isLoading = false;
           
      })
  }
      
  })
   
    

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser= (state) => state.auth.user;

export default authSlice.reducer