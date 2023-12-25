import { createSlice } from "@reduxjs/toolkit";

const mode = localStorage.getItem("mode");
const initialState = {
  mode: mode ? mode : "light",
  selectedUrl: window.location.pathname,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleColor: (state, action) => {
      const mode = action.payload === "light" ? "dark" : "light";
      state.mode = mode;
      localStorage.setItem("mode", mode);
    },
    toggleListitem: (state, action) => {
      state.selectedUrl = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
    toggleUserSearchFocus: (state, action) => {
      state.isUserSearchFocus = action.payload;
    },
  },
});

export const {
  toggleColor,
  toggleListitem,
  toggleSidebar,
  toggleUserSearchFocus,
} = themeSlice.actions;
export default themeSlice.reducer;
