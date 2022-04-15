import { ProductStore } from "../product";
import request from "supertest";
import app from "../../server";
const store = new ProductStore();

describe("Product Model", () => {
  it("Should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Index method should return a list of producs", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it("Should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Create method should return a list of users", async () => {
    const result = await store.create({
      name: "product 1",
      price: 10,
    });
    expect(result.msg).toEqual("Created successfully");
  });
  it("Should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("Show method should return a user with id 1", async () => {
    const result = await store.show(1);

    expect(result[0].id).toBeDefined();
    expect(result[0].name).toBeDefined();
    expect(result[0].price).toBeDefined();
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe("product 1");
    expect(result[0].price).toBe(10);
  });
});

describe("Product endpoints", () => {
  describe("POST /products", function () {
    it("Should return Invalid input if name missing", async () => {
      try {
        const tokenReq = await request(app).post("/users/login/1").send({
          firstname: "user",
          lastname: "one",
          password: "123",
        });
        const response = await request(app)
          .post("/products")
          .set("x-auth-token", tokenReq.body)
          .send({
            price: 30,
          });
        expect(response.status).toEqual(400);
        expect(response.body).toEqual("Invalid input.");
      } catch (error) {
        console.log("=================> ", error);
      }
    });
    it("Should return Created successfully", async () => {
      try {
        const tokenReq = await request(app).post("/users/login/1").send({
          firstname: "user",
          lastname: "one",
          password: "123",
        });
        const response = await request(app)
          .post("/products")
          .set("x-auth-token", tokenReq.body)
          .send({
            name: "Product 1",
            price: 30,
          });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ msg: "Created successfully" });
      } catch (error) {
        console.log("=================> ", error);
      }
    });
  });

  describe("GET /products", function () {
    it("Should return list of products", async () => {
      try {
        const response = await request(app).get("/products");
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].name).toBeInstanceOf(String);
        expect(response.body[0].price).toBeInstanceOf(Number);
        expect(response.body[0].id).toBeInstanceOf(Number);
      } catch (error) {
        console.log("=================> ", error);
      }
    });
  });

  describe("GET /products/:id", function () {
    it("Should return Single product", async () => {
      try {
        const response = await request(app).get("/products/1");
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0].name).toBeInstanceOf(String);
        expect(response.body[0].price).toBeInstanceOf(Number);
        expect(response.body[0].id).toBeInstanceOf(Number);
      } catch (error) {
        console.log("=================> ", error);
      }
    });
  });
});
