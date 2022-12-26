const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

const validateRequest = async (username, name, password) => {
  if (username.length < 3 || password.length < 3) {
    throw {
      name: "InvalidUserParameters",
      message: "Username and password must be atleast 3 characters",
    };
  }

  const existingUser = await User.find({ username });
  if (existingUser && !existingUser.length === 0) {
    throw {
      name: "InvalidUserParameters",
      message: "Username already exist",
    };
  }
};

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  await validateRequest(username, name, password);

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    password: passwordHash,
  });

  const savedUser = await newUser.save();

  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
