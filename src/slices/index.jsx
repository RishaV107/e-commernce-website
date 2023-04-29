import { combineReducers } from "redux";

import categoriesReducer from "./categories";
import productsReducer from "./products";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
});

export default rootReducer;
