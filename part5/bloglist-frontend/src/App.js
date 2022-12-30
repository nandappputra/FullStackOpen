import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [notification, setNotification] = useState("");

  const [user, setUser] = useState(null);

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

  const handleNewBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const response = await blogService.createNewBlog(newBlog);

      setBlogs([...blogs, response]);
      setTitle("");
      setAuthor("");
      setUrl("");

      setNotification(`New blog added: ${title}`);

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

  const createNewBlog = () => {
    return (
      <>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog}>
          <div>
            title
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
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
          <Togglable showButton="new note" hideButton="hide">
            {createNewBlog()}
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
