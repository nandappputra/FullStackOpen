import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "hello",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => dispatch(clearNotification()), timeout);
  };
};

export default notificationSlice.reducer;
