import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlogFromList: PropTypes.func.isRequired,
  };

  return (
    <tr className="blog">
      <td>
        {" "}
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </td>
    </tr>
  );
};

export default Blog;
