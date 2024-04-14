import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCartController } from "../apis/Api";
// import { cartLogout } from "./AddToCart";
// const dispatch = useDispatch();
let storedUser = JSON.parse(localStorage.getItem("auth")) || null;

// useEffect(() => {

//   return () => {
//     second
//   }
// }, [third])

// console.log("hii", storedUser);
let initialState = {
  currentUser: storedUser ? storedUser.currentUser : {},
  cartItems: storedUser ? storedUser.cart : [],
  cart: storedUser ? storedUser.cartItems : 0,
  cartPrice: storedUser ? storedUser.cartPrice : 0,
  token: storedUser ? storedUser.token : null,
  isAuthenticated: storedUser ? storedUser.isAuthenticated : false,
};
// console.log("in", initialState);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.cart = action.payload.cartItems;
      state.cartItems = action.payload.totalCartItem;
      state.cartPrice = action.payload.totalCartValue;
      state.currentUser = action.payload.user;
      state.isAuthenticated = action.payload.success;
      state.token = action.payload.token;
      localStorage.setItem("auth", JSON.stringify(state));
      // localStorage.setItem("cart.")
    },
    setUser: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem(
        "auth",
        JSON.stringify({ ...storedUser, user: action.payload.user })
      );
    },
    logout: (state) => {
      // const navigate = useNavigate();
      state.cartItems = [];
      state.cartItems = 0;
      state.cartPrice = 0;
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
      // dispatch(cartLogout());
      localStorage.removeItem("auth"); // Remove user from local storage
    },
  },
});

export const { setCurrentUser, addTocartProducts, logout, setUser } =
  authSlice.actions;
export default authSlice.reducer;
