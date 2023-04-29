import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cart: [],
  isEmpty: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCart: (state) => {
      state.cart;
    },
    setCart: (state, { payload }) => {
      console.log("### payload", payload);
      state.cart = payload;
    },
    addCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { getCart, addCart, clearCart, setCart } = cartSlice.actions;

export const cartSelector = (state) => state.cart;

export function AddItemToCart(data) {
  return (dispatch) => {
    dispatch(addCart(data));
  };
}

export default cartSlice.reducer;
