const blogsRouter = require("express").Router();
const { Blog } = require("../models/blog");
const User = require("../models/user");

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

const getUser = async () => {
  return await User.findOne({});
};

blogsRouter.post("/", async (request, response) => {
  validateRequest(request.body);

  const user = await getUser();
  const blog = new Blog({ likes: 0, ...request.body, user: user._id });

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blogToDeleteId = request.params.id;

  await Blog.deleteOne({ _id: blogToDeleteId });

  response.status(201).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToUpdateId = request.params.id;
  const fields = request.body;

  const result = await Blog.updateOne({ _id: blogToUpdateId }, fields);

  response.status(201).json(result);
});

module.exports = blogsRouter;
