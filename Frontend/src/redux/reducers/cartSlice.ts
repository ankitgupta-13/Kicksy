import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [{}],
  totalAmount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      state.items = action.payload.items;
      state.totalAmount += action.payload.amount;
    },
    removeItemFromCart: (state, action) => {
      state.items.filter((item) => item.id !== action.payload.id);
      state.totalAmount -= action.payload.price;
    },
    toggleCartVisibility: (state) => {
      state.isOpen = !state.isOpen;
    },
    setInitialCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  toggleCartVisibility,
  setInitialCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
