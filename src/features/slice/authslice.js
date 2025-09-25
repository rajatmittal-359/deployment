import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  registeredUser: null, //  yeh alag rakhenge signup ke liye
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      state.registeredUser = action.payload; //  signup ka data save hoga
    },
    login: (state, action) => {
      const { name, email } = action.payload;
      if (
        state.registeredUser &&
        state.registeredUser.name === name &&
        state.registeredUser.email === email
      ) {
        state.user = { name, email }; //  login successful
      } else {
        state.user = null; // login fail
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { signup, login, logout } = authslice.actions;
export default authslice.reducer;
