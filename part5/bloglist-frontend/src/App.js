import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notification, setNotification] = useState("");

  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
      setNotification(error.response.data.error);

      setTimeout(() => setNotification(""), 5000);
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

      setBlogs([...blogs, response]);
      blogFormRef.current.changeVisibility();

      setNotification(`New blog added: ${newBlog.title}`);
      setTimeout(() => setNotification(""), 5000);
    } catch (error) {
      setNotification(error.response.data.error);
      setTimeout(() => setNotification(""), 5000);
    }
  };

  const notificationMessage = () => {
    return notification === "" ? (
      <div></div>
    ) : (
      <div>
        <p>{notification}</p>
      </div>
    );
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
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
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

  return (
    <div>
      {notificationMessage()}
      {user === null ? (
        loginForm()
      ) : (
        <>
          {userInfo()}
          <h2>blogs</h2>
          <Togglable showButton="new note" hideButton="hide" ref={blogFormRef}>
            <BlogForm newBlogHandler={handleNewBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
