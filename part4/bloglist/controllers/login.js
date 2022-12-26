const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const User = require("../models/user");
const config = require("../utils/config");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const isPasswordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return response.status(401).json({
      error: "wrong username or password",
    });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, config.SECRET);
  return response
    .status(200)
    .json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
