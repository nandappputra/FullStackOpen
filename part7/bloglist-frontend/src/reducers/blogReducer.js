import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return [...action.payload];
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
    commentBlog(state, action) {
      return { ...state, comments: [...state.comments, action.payload] };
    },
    likeBlog(state, action) {
      const blogId = action.payload;
      const blogToLike = state.find((blog) => blog.id === blogId);
      const filteredBlog = state.filter((blog) => blog.id !== blogId);

      return [...filteredBlog, { ...blogToLike, likes: blogToLike.likes + 1 }];
    },
    deleteBlog(state, action) {
      return [...state.filter((blog) => blog.id !== action.payload)];
    },
  },
});

export const { setBlog, addBlog, commentBlog, likeBlog, deleteBlog } =
  blogSlice.actions;

export default blogSlice.reducer;
