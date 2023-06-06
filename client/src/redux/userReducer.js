import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    // eslint-disable-next-line no-unused-vars
    logout: (state) => {
      return initialState;
    },
    changeProfile: (state, action) => {
      console.log(action);
      state.currentUser.profilePicture = action.payload;
    },
    following: (state, action) => {
      if (state.currentUser.following.includes(action.payload)) {
        state.currentUser.following.splice(
          state.currentUser.following.findIndex(
            (followingId) => followingId === action.payload
          )
        );
      } else {
        state.currentUser.following.push(action.payload);
      }
    },
  },
});

export default userSlice.reducer;

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  changeProfile,
  following,
} = userSlice.actions;
