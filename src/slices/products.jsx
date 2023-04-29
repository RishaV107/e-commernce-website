import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.loading = true;
    },
    getProductsSuccess: (state, { payload }) => {
      state.products = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getProductsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getProducts, getProductsSuccess, getProductsFailure } =
  productsSlice.actions;

export const productsSelector = (state) => state.products;

export function fetchProducts() {
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      const response = await fetch("https://fakestoreapi.com/products");

      const data = await response.json();

      dispatch(getProductsSuccess(data));
    } catch (error) {
      dispatch(getProductsFailure());
    }
  };
}

export default productsSlice.reducer;
