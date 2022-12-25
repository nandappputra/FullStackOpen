const blogsRouter = require("express").Router();
const { Blog } = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog({ likes: 0, ...request.body });

  if (blog.url === undefined || blog.title === undefined) {
    throw {
      name: "MissingURLOrTitle",
      message: "URL and title cannot be blank",
    };
  }

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDeleteId = request.params.id;

  await Blog.deleteOne({ _id: blogToDeleteId });

  response.status(201).end();
});

module.exports = blogsRouter;
