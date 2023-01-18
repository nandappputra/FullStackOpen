import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { commentBlog } from "../reducers/blogReducer";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const CommentForm = (props) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const handleNewComment = async (event) => {
    event.preventDefault();
    dispatch(commentBlog({ id: props.blog.id, comment }));
    blogService.commentBlog(props.blog.id, comment);
  };

  return (
    <Container>
      <form
        onSubmit={handleNewComment}
        style={{
          display: "table",
          margin: "1em",
        }}
      >
        <div style={{ display: "table-row" }}>
          <input
            type="text"
            value={comment}
            name="Comment"
            id="comment"
            onChange={({ target }) => setComment(target.value)}
            style={{ display: "table-cell", margin: "0.25em" }}
          />
          <Button type="submit" style={{ display: "table-cell" }}>
            add comment
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default CommentForm;
