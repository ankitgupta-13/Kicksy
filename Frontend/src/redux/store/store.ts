import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cartSlice";
import authSlice from "../reducers/authSlice";
import dashboardSlice from "../reducers/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    dashboard: dashboardSlice,
  },
});

export default store;
