const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app);

beforeEach(async () => {
  jest.setTimeout(1000000);
  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash("HEHEHE", 10);

  const initialUser = new User({
    username: "user1",
    name: "nanda",
    password: hashedPassword,
  });

  await initialUser.save();
});

describe("GET /api/users", () => {
  test("lists all users", async () => {
    const response = await api.get("/api/users");

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  }, 150000);
});

describe("POST /api/users", () => {
  test("creates a new user", async () => {
    const newUser = {
      username: "user2",
      name: "putra",
      password: "newest password!",
    };

    await api.post("/api/users").send(newUser);

    const response = await api.get("/api/users");
    expect(response.body.length).toEqual(2);
  }, 150000);
});

afterAll(() => {
  mongoose.connection.close();
});
