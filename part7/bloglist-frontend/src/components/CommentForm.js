import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { commentBlog } from "../reducers/blogReducer";

const CommentForm = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleNewComment = async (event) => {
    event.preventDefault();
    dispatch(commentBlog({ id: props.blog.id, comment }));
    blogService.commentBlog(props.blog.id, comment);
  };

  return (
    <>
      <form onSubmit={handleNewComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </>
  );
};

export default CommentForm;
