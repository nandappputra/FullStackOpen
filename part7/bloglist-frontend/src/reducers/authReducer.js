import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setLoggedInUser(state, action) {
      return action.payload;
    },
    logOut() {
      return null;
    },
  },
});

export const { setLoggedInUser, logOut } = authSlice.actions;

export default authSlice.reducer;
