const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { Blog } = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "hehe",
    author: "me",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 3,
  },
];

beforeEach(async () => {
  jest.setTimeout(1000000);
  await Blog.deleteMany({});
  let blogModel = new Blog(initialBlogs[0]);
  await blogModel.save();

  blogModel = new Blog(initialBlogs[1]);
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

    await api.post("/api/blogs").send(newBlog);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length + 1);
  }, 150000);

  test("when the number of likes missing it will default to 0", async () => {
    const newBlog = {
      title: "Newest blog!",
      author: "Nanda",
      url: "http://test.test",
    };

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body.likes).toEqual(0);
  }, 150000);

  test("when the title or url is missing it will return 404", async () => {
    const newBlog = {
      title: "Cool blog!",
      author: "Nanda",
    };

    await api.post("/api/blogs").send(newBlog).expect(404);
  }, 150000);
});

afterAll(() => {
  mongoose.connection.close();
});
