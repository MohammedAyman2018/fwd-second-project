import { UserStore } from "../user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const store = new UserStore();
const { BCRYPT_PASSWORD: pepper, TOKEN_SECRET } = process.env;

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
