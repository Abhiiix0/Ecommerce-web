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
    addToCart: (state, action) => {
      var data = action.payload;
      var exicting = state.cart.find((p) => p.id === data.id);
      if (exicting) {
        // console.log(data);
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
    removeItem: (state, action) => {
      const idremove = action.payload;
      state.cart = state.cart.filter((i) => {
        return i.id !== idremove;
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },

    IncreaseItemQty: (state, action) => {
      const ItemId = action.payload;
      state.cart.filter((p) => {
        if (p.id === ItemId) {
          p.qty += 1;
          // p.price = p.price * p.qty;
        }

        // console.log(state.cart);
        // return p.id === ItemId
      });
      localStorage.setItem("cart", JSON.stringify(state));
    },

    DecreaseItemQty: (state, action) => {
      const ItemId = action.payload;
      state.cart.filter((p) => {
        if (p.id === ItemId) {
          p.qty -= 1;
          // p.price = p.price * p.qty;
        }
        console.log(state.cart);
        // return p.id === ItemId
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
