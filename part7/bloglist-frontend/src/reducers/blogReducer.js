import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return [...state, ...action.payload];
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setBlog, addBlog } = blogSlice.actions;

export default blogSlice.reducer;
