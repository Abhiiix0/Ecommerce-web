import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
let storedCart = JSON.parse(localStorage.getItem("cart")) || null;
const initialState = {
  cartID: storedCart ? storedCart.cartID : "",
  cart: storedCart ? storedCart.cart : [],
  cartItem: storedCart ? storedCart.cartItem : 0,
  cartPrice: storedCart ? storedCart.cartPrice : 0,
};

export const cartSlice = createSlice({
  name: "cartitems",
  initialState,
  reducers: {
    CartSet: (state, action) => {
      var data = action.payload;
      console.log("set", data);
      state.cartID = action.payload.cartId;
      state.cart = { items: action.payload.cartItems };
      state.cartItem = action.payload.totalCartItem;
      state.cartPrice = action.payload.totalCartValue;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // add to cart recux logic
    addToCart: (state, action) => {
      var data = action.payload;
      console.log("sdf0", data);
      state.cartID = action.payload.cartId;
      state.cart = action.payload.cart;
      state.cartItem = action.payload.totalCartItem;
      state.cartPrice = action.payload.totalCartValue;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    //remove items from cart
    removeItem: (state, action) => {
      var data = action.payload;
      console.log("sdf0", data);
      state.cart = {
        items: action.payload.cart.items,
      };
      state.cartItem = action.payload.cart.totalCartItem;
      state.cartPrice = action.payload.cart.totalCartValue;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    IncreaseItemQty: (state, action) => {
      var data = action.payload;
      console.log("sdf0", data);
      state.cart = action.payload.cart;
      state.cartItem = action.payload.totalCartItem;
      state.cartPrice = action.payload.totalCartValue;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    DecreaseItemQty: (state, action) => {
      var data = action.payload;
      console.log("dec", data);
      state.cart = action.payload.cart;
      state.cartItem = action.payload.totalCartItem;
      state.cartPrice = action.payload.totalCartValue;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    logoutCart: (state) => {
      state.cart = [];
      state.cartItem = 0;
      state.cartPrice = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  CartSet,
  logoutCart,
  removeItem,
  IncreaseItemQty,
  DecreaseItemQty,
} = cartSlice.actions;
export default cartSlice.reducer;
