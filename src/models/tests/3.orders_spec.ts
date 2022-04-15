import { OrderStore } from "../orders";
import request from "supertest";
import app from "../../server";
const store = new OrderStore();

describe("Orders Model", () => {
  it("Should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Create method should return a list of users", async () => {
    const result = await store.create(1, "Active", [{ id: 1, quantity: 20 }]);
    expect(result).toEqual({ msg: "Created successfully" });
  });
  it("Should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("Show method should return user orders", async () => {
    const result = await store.show(1);

    expect(result[0]).toBeDefined();
    expect(result[0].id).toBe(1);
  });
});

describe("Order endpoints", () => {
  describe("POST /orders", function () {
    it("Should return Created successfully", async () => {
      try {
        const tokenReq = await request(app).post("/users/login/1").send({
          firstname: "user",
          lastname: "one",
          password: "123",
        });
        const response = await request(app)
          .post("/orders")
          .set("x-auth-token", tokenReq.body)
          .send({
            userId: 1,
            status: "Active",
            products: [{ id: 1, quantity: 3 }],
          });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ msg: "Created successfully" });
      } catch (error) {
        console.log("=================> ", error);
      }
    });
  });

  describe("GET /orders/:userId", function () {
    it("Should return invalid token if not provided", async () => {
      try {
        const response = await request(app).get("/orders/1");
        expect(response.status).toEqual(401);
        expect(response.body).toEqual(
          "invalid token JsonWebTokenError: jwt malformed"
        );
      } catch (error) {
        console.log("=================> ", error);
      }
    });

    it("Should return List of orders", async () => {
      try {
        const tokenReq = await request(app).post("/users/login/1").send({
          firstname: "user",
          lastname: "one",
          password: "123",
        });
        const response = await request(app)
          .get("/orders/1")
          .set("x-auth-token", tokenReq.body);
        expect(response.status).toEqual(200);
        expect(response.body[0].id).toEqual(1);
        expect(response.body[0].user_id).toEqual(1);
        expect(response.body[0].order_id).toEqual(1);
        expect(response.body[0].product_id).toEqual(1);
        expect(response.body[0].status_of_order).toEqual("Active");
        expect(response.body[0].quantity).toEqual(20);
      } catch (error) {
        console.log("=================> ", error);
      }
    });
  });
});
