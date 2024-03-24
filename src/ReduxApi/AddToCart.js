import { createSlice } from "@reduxjs/toolkit";
let storedCart = JSON.parse(localStorage.getItem("cart")) || null;
const initialState = {
  cart: storedCart ? storedCart.cart : [],
  cartItem: storedCart ? storedCart.cartItem : 0,
  cartPrice: storedCart ? storedCart.cartPrice : 0,
};

export const cartSlice = createSlice({
  name: "cartitems",
  initialState,
  reducers: {
    // add to cart recux logic
    addToCart: (state, action) => {
      var data = action.payload;
      console.log("sdf0", data);
      var exicting = state.cart.find((p) => p._id === data._id);
      if (exicting) {
        console.log("data aaya cart me", data);
        exicting.qty += 1;
        console.log(data);
      } else {
        data = { ...data, qty: 1 };
        state.cart.push(data);
        console.log(data);
        // state = [...state.cart, { ...isPresent }];
      }

      // var data = action.payload;
      // // console.log(data);
      // data = { ...data, qty: 1 };
      // state.cart.push(data);
      // console.log(data);
      console.log(state);
      // console.log(calculateTotalPrice(state.cart));
      localStorage.setItem("cart", JSON.stringify(state));
    },
    totalItems: (state) => {
      state.cartItem = state.cart.length;
    },

    totalPrice: (state) => {
      state.cartPrice = 0;
      var price = 0;
      var ppp = state.cart.map((p) => {
        price += p.price * p.qty;
      });
      state.cartPrice = price;
      localStorage.setItem("cart", JSON.stringify(state));

      console.log("ppp", price);
    },

    //remove items from cart
    removeItem: (state, action) => {
      const idremove = action.payload;
      state.cart = state.cart.filter((i) => {
        return i._id !== idremove;
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },

    IncreaseItemQty: (state, action) => {
      const ItemId = action.payload;
      state.cart.filter((p) => {
        if (p._id === ItemId) {
          if (p.qty === 9) {
            p.qty = 9;
          } else {
            p.qty += 1;
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },

    DecreaseItemQty: (state, action) => {
      const ItemId = action.payload;
      state.cart.filter((p) => {
        if (p._id === ItemId) {
          if (p.qty <= 1) {
            p.qty = 1;
          } else {
            p.qty -= 1;
          }
          // p.price = p.price * p.qty;
        }
        console.log(state.cart);
        // return p._id === ItemId
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  totalItems,
  totalPrice,
  removeItem,
  IncreaseItemQty,
  DecreaseItemQty,
} = cartSlice.actions;
export default cartSlice.reducer;
