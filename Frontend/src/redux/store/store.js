import { configureStore } from "@reduxjs/toolkit";
import adminDashboardSlice from "../reducers/adminDashboardSlice";
import authSlice from "../reducers/authSlice";
import cartSlice from "../reducers/cartSlice";
import sellerDashboardSlice from "../reducers/sellerDashboardSlice";
import wishlistSlice from "../reducers/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    adminDashboard: adminDashboardSlice,
    sellerDashboard: sellerDashboardSlice,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
