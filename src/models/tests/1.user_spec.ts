import { UserStore } from "../user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import request from "supertest";
import app from "../../server";

dotenv.config();
const store = new UserStore();
const { BCRYPT_PASSWORD: pepper, TOKEN_SECRET } = process.env;

// End Point Tests and model tests can't be run at the same time.

describe("Users Model", () => {
  it("Should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Index method should return a list of users", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it("Should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Create method should return a list of users", async () => {
    const result = await store.create({
      firstname: "Ahmed",
      lastname: "Ayman",
      password: "123",
    });
    expect(result.msg).toEqual("Created successfully");
  });
  it("Should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("Show method should return a user with id 1", async () => {
    const result = await store.show(1);

    expect(result[0].id).toBeDefined();
    expect(result[0].firstname).toBeDefined();
    expect(result[0].lastname).toBeDefined();
    expect(result[0].password).toBeDefined();
    expect(result[0].id).toBe(1);
    expect(result[0].firstname).toBe("Ahmed");
    expect(result[0].lastname).toBe("Ayman");
    expect(bcrypt.compareSync("123" + pepper, result[0].password)).toBeTrue();
  });
  it("Should have an authenticate method", () => {
    expect(store.authenticate).toBeDefined();
  });
  it("Authenticate method should return user if right password", async () => {
    const u = await store.authenticate("Ahmed", "123");
    expect(u).toBeDefined();
    expect(u?.firstname).toBe("Ahmed");
    expect(u?.lastname).toBe("Ayman");
  });
});

describe("POST /users", function () {
  it("Should Return Created successfully", async () => {
    try {
      const response = await request(app)
        .post("/users")
        .send({ firstname: "user", lastname: "one", password: "123" });
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ msg: "Created successfully" });
    } catch (error) {
      console.log("=================> ", error);
    }
  });
  it("Should Return Invalid input", async () => {
    try {
      const response = await request(app)
        .post("/users")
        .send({ lastname: "one", password: "123" });
      expect(response.status).toEqual(400);
      expect(response.body).toEqual("Invalid input.");
    } catch (error) {
      console.log("=================> ", error);
    }
  });
});

describe("POST /users/login/:id", function () {
  it("Should Responds with token if correct user password", async () => {
    try {
      const response = await request(app).post("/users/login/1").send({
        firstname: "user",
        lastname: "one",
        password: "123",
      });
      expect(response.status).toEqual(200);
      expect(response.body).toBeInstanceOf(String);
    } catch (error) {
      console.log("=================> ", error);
    }
  });
});

describe("GET /users/:id", function () {
  it("Responds with invalid token if not provided", async () => {
    try {
      const response = await request(app).get("/users/1");
      expect(response.status).toEqual(401);
      expect(response.body).toEqual(
        "invalid token JsonWebTokenError: jwt malformed"
      );
    } catch (error) {
      console.log("=================> ", error);
    }
  });
  it("Responds with invalid token if not provided", async () => {
    try {
      // Get Token
      const tokenReq = await request(app).post("/users/login/1").send({
        firstname: "user",
        lastname: "one",
        password: "123",
      });
      const response = await request(app)
        .get("/users/1")
        .set("x-auth-token", tokenReq.body);
      expect(response.status).toEqual(200);
      expect(response.body[0].id).toEqual(1);
      expect(response.body[0].firstname).toEqual("user");
      expect(response.body[0].lastname).toEqual("one");
    } catch (error) {
      console.log("=================> ", error);
    }
  });
});

describe("GET /users", function () {
  it("Responds with invalid token if not provided", async () => {
    try {
      const response = await request(app).get("/users");
      expect(response.status).toEqual(401);
      expect(response.body).toEqual(
        "invalid token JsonWebTokenError: jwt malformed"
      );
    } catch (error) {
      console.log("=================> ", error);
    }
  });
  it("Responds with list of users", async () => {
    try {
      const tokenReq = await request(app).post("/users/login/1").send({
        firstname: "user",
        lastname: "one",
        password: "123",
      });
      const response = await request(app)
        .get("/users")
        .set("x-auth-token", tokenReq.body);
      expect(response.status).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
    } catch (error) {
      console.log("=================> ", error);
    }
  });
});
