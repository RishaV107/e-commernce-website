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

export function fetchProducts(queryParams = "") {
  const url =
    queryParams.length === 0
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${queryParams.replace(
          / /g,
          "%20"
        )}`;
  return async (dispatch) => {
    dispatch(getProducts());

    try {
      const response = await fetch(url);

      const data = await response.json();

      dispatch(getProductsSuccess(data));
    } catch (error) {
      dispatch(getProductsFailure());
    }
  };
}

export default productsSlice.reducer;
