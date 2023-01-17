import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer";
import { setBlog, addBlog } from "./reducers/blogReducer";
import Notification from "./components/Notification";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogData) => {
      dispatch(setBlog(blogData));
    });
  }, []);

  useEffect(() => {
    const loginInfo = window.localStorage.getItem("loginInfo");
    if (loginInfo) {
      const loggedInUser = JSON.parse(loginInfo);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginInfo = await loginService.login({ username, password });
      window.localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      blogService.setToken(loginInfo.token);
      setUser(loginInfo);
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification("wow"));

      setTimeout(() => dispatch(clearNotification()), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loginInfo");
    blogService.setToken(null);
    setUser(null);
  };

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.createNewBlog(newBlog);

      dispatch(addBlog(response));
      blogFormRef.current.changeVisibility();

      dispatch(setNotification(`New blog added: ${newBlog.title}`));
      setTimeout(() => dispatch(clearNotification()), 5000);
    } catch (error) {
      console.log(error);
      dispatch(setNotification(error.response.data.error));
      setTimeout(() => dispatch(clearNotification()), 5000);
    }
  };

  const loginForm = () => {
    return (
      <>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
        </form>
      </>
    );
  };

  const userInfo = () => {
    return (
      <>
        <p>User {user.name} is logged in</p>
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </>
    );
  };

  // const likeBlog = async (blogToLike) => {
  //   await blogService.likeBlog(blogToLike);
  //   const updatedBlog = blogs.filter((blog) => blog.id !== blogToLike.id);
  //   setBlogs([...updatedBlog, blogToLike]);
  // };

  // const removeBlogFromList = async (blogToDelete) => {
  //   await blogService.deleteBlog(blogToDelete);
  //   const id = blogToDelete.id;
  //   setBlogs(blogs.filter((blog) => blog.id !== id));
  // };

  return (
    <div>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <>
          {userInfo()}
          <h2>blogs</h2>
          <Togglable showButton="new blog" hideButton="hide" ref={blogFormRef}>
            <BlogForm newBlogHandler={handleNewBlog} />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                // likeBlog={likeBlog}
                // removeBlogFromList={removeBlogFromList}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
