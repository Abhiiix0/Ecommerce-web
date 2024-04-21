import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

let wishlistLocal = JSON.parse(localStorage.getItem("wishlist")) || null;

let initialState = {
  items: wishlistLocal ? wishlistLocal.items : [],
};
// console.log("in", initialState);
const WishList = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    AddToWishlist: (state, action) => {
      state.items = [...state.items, action.payload];
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
    RemoveFromWishlist: (state, action) => {
      const id = action.payload;
      const newData = state.items.filter((e) => e._id !== id);
      state.items = newData;
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
  },
});

export const { AddToWishlist, RemoveFromWishlist } = WishList.actions;
export default WishList.reducer;
