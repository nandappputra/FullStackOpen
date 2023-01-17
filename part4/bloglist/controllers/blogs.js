const blogsRouter = require("express").Router();
const { Blog } = require("../models/blog");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

const validateRequest = (request) => {
  if (request.url === undefined || request.title === undefined) {
    throw {
      name: "MissingURLOrTitle",
      message: "URL and title cannot be blank",
    };
  }
};

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  validateRequest(request.body);
  const user = request.user;

  const blog = new Blog({
    likes: 0,
    ...request.body,
    user: user._id.toString(),
  });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blogToDeleteId = request.params.id;

    const blog = await Blog.findById(blogToDeleteId);

    if (blog === null) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user._id.toString() !== request.user._id.toString()) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    await Blog.deleteOne({ _id: blogToDeleteId });

    return response.status(201).end();
  }
);

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdateId = request.params.id;
  const fields = request.body;

  const result = await Blog.updateOne({ _id: blogToUpdateId }, fields);

  response.status(201).json(result);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const blogToBeCommentedId = request.params.id;
  const comment = request.body.comment;

  const blog = await Blog.findById(blogToBeCommentedId);
  blog.comments.push(comment);

  const result = await Blog.updateOne({ _id: blogToBeCommentedId }, blog);

  response.status(201).json(result);
});

module.exports = blogsRouter;
