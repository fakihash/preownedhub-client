// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  token: null,
  isLoggedIn: false,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.data = action.payload.data;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.role = action.payload.role;
    },
    logout(state) {
      state.data = null;
      state.token = null;
      state.isLoggedIn = false;
      state.role = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
