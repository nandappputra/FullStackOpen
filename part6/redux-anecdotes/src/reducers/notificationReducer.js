import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "hello",
  reducers: {
    setNotification(state, action) {
      debugger;
      console.log(state);
      return action.data;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
