import { ProductStore } from "../product";
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
