import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionsState: {
    user: false,
    product: false,
    order: false,
  },
  selectedAction: "create",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleSection: (state, action) => {
      state.sectionsState[action.payload] =
        !state.sectionsState[action.payload];
    },
    selectAction: (state, action) => {
      state.selectedAction = action.payload;
    },
  },
});

export const { toggleSection, selectAction } = dashboardSlice.actions;

export default dashboardSlice.reducer;
