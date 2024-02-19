import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducers/cartSlice";
import authSlice from "../reducers/authSlice";
import dashboardSlice from "../reducers/dashboardSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    dashboard: dashboardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
