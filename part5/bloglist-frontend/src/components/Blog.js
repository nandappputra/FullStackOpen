import PropTypes from "prop-types";
import { useState } from "react";

const Blog = ({ blog, likeBlog, removeBlogFromList }) => {
  const blogStyle = {
    backgroundColor: "lightgrey",
    borderRadius: "0.5em",
    padding: "0.5em",
    margin: "1em",
  };
  const [detailVisible, setDetailVisibility] = useState(false);
  const [buttonText, setButtonText] = useState("view");

  const [numberOfLikes, setNumberOfLikes] = useState(blog.likes);

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlogFromList: PropTypes.func.isRequired,
  };

  const toggleDetail = () => {
    if (detailVisible) {
      setButtonText("view");
    } else {
      setButtonText("hide");
    }
    setDetailVisibility(!detailVisible);
  };

  const handleLike = async () => {
    setNumberOfLikes(numberOfLikes + 1);
    const likedBlog = { ...blog, likes: numberOfLikes + 1 };
    likeBlog(likedBlog);
  };

  const handleDelete = async () => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      removeBlogFromList(blog);
    }
  };

  const blogDetail = () => {
    return (
      <div>
        {blog.url} <br />
        {numberOfLikes}{" "}
        <button type="button" onClick={handleLike} className="blog">
          like
        </button>
        <br />
        {blog.name}
      </div>
    );
  };

  const deleteBlog = () => {
    return (
      <button type="button" onClick={handleDelete}>
        delete
      </button>
    );
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button type="button" onClick={toggleDetail}>
        {buttonText}
      </button>
      {detailVisible && blogDetail()}
      {detailVisible && deleteBlog()}
    </div>
  );
};

export default Blog;
