import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store.ts";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./pages/Register/Register.tsx";
import Verification from "./pages/Verification/Verification.tsx";
import Login from "./pages/Login/Login.tsx";
import Cart from "./pages/Cart/Cart.tsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import Home from "./pages/Home/Home.tsx";
import ProductDesc from "./pages/ProductDesc/ProductDesc.tsx";
import Shop from "./pages/Shop/Shop.tsx";
import Anime from "./pages/Anime/Anime.tsx";
import TrackOrder from "./pages/TrackOrder/TrackOrder.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/productdesc" element={<ProductDesc/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/anime" element={<Anime/>} />
        <Route path="/trackorder" element={<TrackOrder/>} />
      </Route>
      <Route path="/admin" element={<Dashboard />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
