import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const blogStyle = {
    backgroundColor: "lightgrey",
    borderRadius: "0.5em",
    padding: "0.5em",
    margin: "1em",
  };
  const [detailVisible, setDetailVisibility] = useState(false);
  const [buttonText, setButtonText] = useState("view");

  const [numberOfLikes, setNumberOfLikes] = useState(blog.likes);

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
    blog = { ...blog, likes: numberOfLikes + 1 };

    await blogService.likeBlog(blog);
  };

  const blogDetail = () => {
    return (
      <div>
        {blog.url} <br />
        {numberOfLikes}{" "}
        <button type="button" onClick={handleLike}>
          like
        </button>
        <br />
        {blog.name}
      </div>
    );
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button type="button" onClick={toggleDetail}>
        {buttonText}
      </button>
      {detailVisible && blogDetail()}
    </div>
  );
};

export default Blog;
