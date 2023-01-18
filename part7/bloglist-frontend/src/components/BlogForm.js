import { useState } from "react";
import Button from "react-bootstrap/Button";

const BlogForm = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = async (event) => {
    event.preventDefault();
    props.newBlogHandler({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog} style={{ display: "table" }}>
        <div style={{ display: "table-row" }}>
          <label style={{ display: "table-cell" }}>title</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title of the blog"
            id="blog-title"
            style={{ display: "table-cell" }}
          />
        </div>
        <div style={{ display: "table-row" }}>
          <label style={{ display: "table-cell" }}>author</label>
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="name of the author"
            id="blog-author"
            style={{ display: "table-cell" }}
          />
        </div>
        <div style={{ display: "table-row" }}>
          <label style={{ display: "table-cell" }}>url</label>
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url of the blog"
            id="blog-url"
            style={{ display: "table-cell" }}
          />
        </div>
        <Button type="submit" variant="primary" id="blog-submit">
          create
        </Button>
      </form>
    </>
  );
};

export default BlogForm;
