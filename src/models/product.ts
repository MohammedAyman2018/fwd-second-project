import Client from "../database";
export type Product = {
  name: string;
  price: number;
  id?: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async create(product: Product): Promise<{ msg: string }> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO products (name, price) VALUES ('${product.name}', ${product.price});`;
      await conn.query(sql);
      conn.release();
      return { msg: "Created successfully" };
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }

  async show(id: number): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products where id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products ${err}`);
    }
  }
}
