import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    backgroundColor: "lightgrey",
    borderRadius: "0.5em",
    padding: "0.5em",
    margin: "1em",
  };
  const [detailVisible, setDetailVisibility] = useState(false);
  const [buttonText, setButtonText] = useState("view");

  const toggleDetail = () => {
    if (detailVisible) {
      setButtonText("view");
    } else {
      setButtonText("hide");
    }
    setDetailVisibility(!detailVisible);
  };

  const blogDetail = () => {
    return (
      <div>
        {blog.url} <br />
        {blog.likes} <button>like</button>
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
