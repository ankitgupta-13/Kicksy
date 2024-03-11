import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionsState: {
    product: false,
    order: false,
  },
  currentSection: null,
  currentAction: null,
};

const sellerDashboardSlice = createSlice({
  name: "sellerDashboard",
  initialState,
  reducers: {
    toggleSection: (state, action) => {
      const sectionName = action.payload;
      state.sectionsState[sectionName] = !state.sectionsState[sectionName];
    },
    selectAction: (state, action) => {
      const { selectedSection, selectedAction } = action.payload;
      state.currentSection = selectedSection;
      state.currentAction = selectedAction;
      Object.keys(state.sectionsState).forEach((key) => {
        if (key !== selectedSection) {
          state.sectionsState[key] = false;
        }
      });
    },
    closeSection: (state) => {
      state.currentSection = null;
      state.currentAction = null;
    },
  },
});

export const { toggleSection, selectAction, closeSection } =
  sellerDashboardSlice.actions;

export default sellerDashboardSlice.reducer;
