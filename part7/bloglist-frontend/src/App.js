import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import CommentForm from "./components/CommentForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer";
import { setBlog, addBlog, likeBlog, deleteBlog } from "./reducers/blogReducer";
import { setLoggedInUser, logOut } from "./reducers/authReducer";
import Notification from "./components/Notification";
import { Route, Routes, Link, useParams } from "react-router-dom";
import { setUsers } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogData) => {
      dispatch(setBlog(blogData));
    });
  }, []);

  useEffect(() => {
    userService.getAllUsers().then((userData) => {
      dispatch(setUsers(userData));
    });
  }, []);

  useEffect(() => {
    const loginInfo = window.localStorage.getItem("loginInfo");
    if (loginInfo) {
      const loggedInUser = JSON.parse(loginInfo);
      dispatch(setLoggedInUser(loggedInUser));
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loginInfo = await loginService.login({ username, password });
      window.localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      blogService.setToken(loginInfo.token);
      dispatch(setLoggedInUser(loginInfo));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification(error));

      setTimeout(() => dispatch(clearNotification()), 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loginInfo");
    blogService.setToken(null);
    dispatch(logOut());
  };

  const handleNewBlog = async (newBlog) => {
    try {
      const response = await blogService.createNewBlog(newBlog);

      dispatch(addBlog(response));
      blogFormRef.current.changeVisibility();

      dispatch(setNotification(`New blog added: ${newBlog.title}`));
      setTimeout(() => dispatch(clearNotification()), 5000);
    } catch (error) {
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
        {auth.name} is logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </>
    );
  };

  const sendLikeToBlog = async (blogToLike) => {
    await blogService.likeBlog(blogToLike);
    dispatch(likeBlog(blogToLike.id));
  };

  const removeBlogFromList = async (blogToDelete) => {
    await blogService.deleteBlog(blogToDelete);
    dispatch(deleteBlog(blogToDelete.id));
  };

  const NavigationBar = () => {
    return (
      <div>
        <Link style={padded} to="/">
          Home
        </Link>
        <Link style={padded} to="/users">
          Users
        </Link>
        {userInfo()}
      </div>
    );
  };

  const BlogList = () => {
    return (
      <div>
        <Togglable showButton="new blog" hideButton="hide" ref={blogFormRef}>
          <BlogForm newBlogHandler={handleNewBlog} />
        </Togglable>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={sendLikeToBlog}
              removeBlogFromList={removeBlogFromList}
            />
          ))}
      </div>
    );
  };

  const Users = () => {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user._id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const UserDetail = () => {
    const id = useParams().id;
    const user = users.find((data) => data._id === id);

    if (!user) {
      return null;
    }

    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Added blogs</h2>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </div>
    );
  };

  const BlogDetail = () => {
    const id = useParams().id;
    const blog = blogs.find((data) => data.id === id);

    if (!blog) {
      return null;
    }

    return (
      <div>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes{" "}
          <button
            onClick={() => {
              sendLikeToBlog({ ...blog, likes: blog.likes + 1 });
            }}
          >
            like
          </button>
        </p>
        <p>added by {blog.author}</p>
        <h3>comments</h3>
        {<CommentForm blog={blog} />}
        {blog.comments.map((commentData, idx) => (
          <li key={idx}>{commentData}</li>
        ))}
      </div>
    );
  };

  const padded = {
    padding: "1em",
  };

  return (
    <div>
      <Notification />
      {auth === null ? (
        loginForm()
      ) : (
        <>
          <NavigationBar />
          <h2>blogs</h2>

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
