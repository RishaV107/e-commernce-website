import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./slices/index";
import ProductDetailsPage from "./component/ProductDetailsPage.jsx";
import NavBar from "./component/NavBar.jsx";
import CartPage from "./component/CartPage.jsx";

const store = configureStore({ reducer: rootReducer });

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products",
    element: (
      <>
        <NavBar />
        <ProductDetailsPage />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <NavBar />
        <CartPage />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
