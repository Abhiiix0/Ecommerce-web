import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
let storedUser = JSON.parse(localStorage.getItem("auth")) || null;
console.log("hii", storedUser);
let initialState = {
  currentUser: storedUser ? storedUser.user : {},
  token: storedUser ? storedUser.token : null,
  isAuthenticated: storedUser ? storedUser.success : false,
};
console.log("in", initialState);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.isAuthenticated = action.payload.success;
      state.token = action.payload.token;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    logout: (state) => {
      // const navigate = useNavigate();
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("auth"); // Remove user from local storage
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export default authSlice.reducer;
