import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
        state.user = action.payload;
    }
  },
});



export const { login, logout, setUser } = authSlice.actions;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
