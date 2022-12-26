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

describe("POST /api/login", () => {
  test("should return generated JWT", async () => {
    const credential = {
      username: "user1",
      password: "HEHEHE",
    };

    const response = await api.post("/api/login").send(credential);
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeDefined();
  }, 150000);
});

afterAll(() => {
  mongoose.connection.close();
});
