import { createSlice } from "@reduxjs/toolkit";
import { InitialStateAuthType, UserDataType } from "../../types/auth.types";

const initialState: InitialStateAuthType = {
  status: false,
  userData: {} as UserDataType | null,
  isOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    toggleProfileVisibility: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { login, logout, toggleProfileVisibility } = authSlice.actions;

export default authSlice.reducer;
