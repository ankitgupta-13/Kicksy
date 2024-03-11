import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionsState: {
    user: false,
    product: false,
    order: false,
    blog: false,
  },
  currentSection: null,
  currentAction: null,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
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
      console.log(selectedSection, selectAction);
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
  adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
