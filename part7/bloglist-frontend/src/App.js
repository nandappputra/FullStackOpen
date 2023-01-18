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
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

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
      <Container>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin} style={{ display: "table" }}>
          <div style={{ display: "table-row" }}>
            <label style={{ display: "table-cell" }}>username</label>
            <input
              type="text"
              value={username}
              name="Username"
              id="username"
              onChange={({ target }) => setUsername(target.value)}
              style={{ display: "table-cell" }}
            />
          </div>
          <div style={{ display: "table-row" }}>
            <label style={{ display: "table-cell" }}>passwosrd</label>
            <input
              type="password"
              value={password}
              name="Password"
              id="password"
              onChange={({ target }) => setPassword(target.value)}
              style={{ display: "table-cell" }}
            />
          </div>
          <Button type="submit" id="login-button" variant="primary">
            login
          </Button>
        </form>
      </Container>
    );
  };

  const userInfo = () => {
    return (
      <>
        {auth.name}
        <Button
          variant="outline-dark"
          onClick={handleLogout}
          style={{ margin: "0.5em" }}
        >
          logout
        </Button>
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
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Blogs App</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link style={padded} to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link style={padded} to="/users">
                  Users
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            {userInfo()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };

  const BlogList = () => {
    return (
      <Container>
        <div>
          <h2>Blog List</h2>
          <Togglable showButton="new blog" hideButton="hide" ref={blogFormRef}>
            <BlogForm newBlogHandler={handleNewBlog} />
          </Togglable>
        </div>
        <Table striped bordered hover>
          <tbody>
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
          </tbody>
        </Table>
      </Container>
    );
  };

  const Users = () => {
    return (
      <Container>
        <h2>Users</h2>
        <Table striped bordered hover>
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
        </Table>
      </Container>
    );
  };

  const UserDetail = () => {
    const id = useParams().id;
    const user = users.find((data) => data._id === id);

    if (!user) {
      return null;
    }

    return (
      <Container>
        <h1>{user.name}</h1>
        <h4>Added blogs</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Blogs Created</th>
            </tr>
          </thead>
          <tbody>
            {user.blogs.map((blog) => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  };

  const BlogDetail = () => {
    const id = useParams().id;
    const blog = blogs.find((data) => data.id === id);

    if (!blog) {
      return null;
    }

    return (
      <Container>
        <h1>{blog.title}</h1>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes{" "}
          <Button
            onClick={() => {
              sendLikeToBlog({ ...blog, likes: blog.likes + 1 });
            }}
          >
            like
          </Button>
        </p>
        <p>added by {blog.author}</p>
        <h3>comments</h3>
        {<CommentForm blog={blog} />}

        <Table striped bordered hover>
          <tbody>
            {blog.comments.map((commentData, idx) => (
              <tr key={idx}>
                <td>{commentData}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
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
