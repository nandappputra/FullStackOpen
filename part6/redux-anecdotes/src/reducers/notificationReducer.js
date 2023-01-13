import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "hello",
    latestTimeout: null,
  },
  reducers: {
    setNotification(state, action) {
      clearTimeout(state.latestTimeout);
      return action.payload;
    },
    clearNotification(state, action) {
      return { ...state, message: null };
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const setNotificationWithTimeout = (message, timeout) => {
  return async (dispatch) => {
    let latestTimeout = setTimeout(
      () => dispatch(clearNotification()),
      timeout
    );
    let payload = {
      message,
      latestTimeout,
    };
    dispatch(setNotification(payload));
  };
};

export default notificationSlice.reducer;
