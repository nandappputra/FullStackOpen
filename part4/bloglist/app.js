require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

mongoose.set("strictQuery", false);
const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl).then(() => {
  console.log("connected to mongo!");
});

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

app.use(middleware.errorHandler);

module.exports = app;
