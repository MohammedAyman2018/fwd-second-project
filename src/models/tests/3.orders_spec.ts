import { OrderStore } from "../orders";
const store = new OrderStore();

describe("Orders Model", () => {
  it("Should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Create method should return a list of users", async () => {
    const result = await store.create(1, "Active", [{ id: 1, quantity: 20 }]);
    expect(result).toEqual([{ id: 1 }]);
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
