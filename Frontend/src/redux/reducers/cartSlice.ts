import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state) => {
      state.items = state.items + 1;
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items - 1;
    },
    toggleCartVisibility: (state) => {
      state.isOpen = !state.isOpen;
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
