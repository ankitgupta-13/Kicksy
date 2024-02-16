import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionsState: {
    user: false,
    product: false,
    order: false,
  },
  currentSection: null,
  currentAction: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleSection: (state, action) => {
      const sectionName = action.payload;
      state.sectionsState[sectionName] = !state.sectionsState[sectionName];
      state.currentSection = state.sectionsState[sectionName]
        ? sectionName
        : null;
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
  },
});

export const { toggleSection, selectAction } = dashboardSlice.actions;

export default dashboardSlice.reducer;
