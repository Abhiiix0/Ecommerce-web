import { configureStore } from "@reduxjs/toolkit";
import cartreducer from "./AddToCart";
import rootUser from "./authSlice";
import WishList from "./WishList";
export const Store = configureStore({
  reducer: {
    cart: cartreducer,
    auth: rootUser,
    wishList: WishList,
  },
});
