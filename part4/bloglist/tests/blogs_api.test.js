const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { Blog } = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

let newUser;
let token;

const setupUser = async (username, name, password) => {
  await User.deleteMany({});
  const res = await api.post("/api/users").send({
    username,
    name,
    password,
  });
  return res.body._id;
};

const obtainToken = async (username, password) => {
  const response = await api.post("/api/login").send({ username, password });
  return response.body.token;
};

beforeAll(async () => {
  newUser = await setupUser("test1", "testing", "test123");

  token = await obtainToken("test1", "test123");
});

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: mongoose.Types.ObjectId(newUser),
  },
  {
    title: "hehe",
    author: "me",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 3,
    user: mongoose.Types.ObjectId(newUser),
  },
];

beforeEach(async () => {
  jest.setTimeout(1000000);
  await Blog.deleteMany({});
  let blogModel = new Blog({
    ...initialBlogs[0],
    user: mongoose.Types.ObjectId(newUser),
  });
  const res1 = await blogModel.save();

  blogModel = new Blog({
    ...initialBlogs[1],
    user: mongoose.Types.ObjectId(newUser),
  });
  await blogModel.save();
});

describe("GET /api/blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 150000);

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(initialBlogs.length);
  }, 150000);

  test("the unique identifier of the blog is id", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  }, 150000);
});

describe("POST /api/blogs", () => {
  test("post add the number of blogs", async () => {
    const newBlog = {
      title: "Newest blog!",
      author: "Nanda",
      url: "http://test.test",
      likes: 7,
    };

    await api
      .post("/api/blogs")
      .set({
        authorization: `bearer ${token}`,
      })
      .send(newBlog);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length + 1);
  }, 150000);

  test("when the number of likes missing it will default to 0", async () => {
    const newBlog = {
      title: "Newest blog!",
      author: "Nanda",
      url: "http://test.test",
    };

    const response = await api
      .post("/api/blogs")
      .set({
        authorization: `bearer ${token}`,
      })
      .send(newBlog);
    expect(response.status).toEqual(201);
    expect(response.body.likes).toEqual(0);
  }, 150000);

  test("when the title or url is missing it will return 404", async () => {
    const newBlog = {
      title: "Cool blog!",
      author: "Nanda",
    };

    await api
      .post("/api/blogs")
      .set({
        authorization: `bearer ${token}`,
      })
      .send(newBlog)
      .expect(404);
  }, 150000);

  test("populates the user field with user", async () => {
    const newBlog = {
      title: "Newest blog!",
      author: "Nanda",
      url: "http://test.test",
    };

    const response = await api
      .post("/api/blogs")
      .set({
        authorization: `bearer ${token}`,
      })
      .send(newBlog);

    expect(response.status).toEqual(201);
    expect(response.body.user).toBeDefined();
  }, 150000);
});

describe("DELETE /api/blogs/:id", () => {
  test("delete reduces the number of blogs", async () => {
    const beforeDeletion = await api.get("/api/blogs");

    const res = await api
      .delete(`/api/blogs/${beforeDeletion.body[0].id}`)
      .set({
        authorization: `bearer ${token}`,
      });

    const afterDeletion = await api.get("/api/blogs");
    expect(afterDeletion.body).toHaveLength(initialBlogs.length - 1);
  }, 150000);
});

describe("PUT /api/blogs/:id", () => {
  test("update existing blog", async () => {
    const beforeUpdate = await api.get("/api/blogs");

    await api.put(`/api/blogs/${beforeUpdate.body[0].id}`).send({
      title: "wow",
    });

    const afterUpdate = await api.get("/api/blogs");

    expect(
      afterUpdate.body.find((blog) => blog.id === beforeUpdate.body[0].id).title
    ).toEqual("wow");
  }, 150000);
});

afterAll(() => {
  mongoose.connection.close();
});
