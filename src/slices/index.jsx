import { combineReducers } from "redux";

import categoriesReducer from "./categories";
import productsReducer from "./products";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
});

export default rootReducer;
