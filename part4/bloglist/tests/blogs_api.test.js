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
  await Blog.deleteMany({});
  let blogModel = new Blog(initialBlogs[0]);
  await blogModel.save();

  blogModel = new Blog(initialBlogs[1]);
  await blogModel.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 15000);

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
}, 15000);

test("the unique identifier of the blog is id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
}, 15000);

afterAll(() => {
  mongoose.connection.close();
});
