import Client from "../database";
export type Order = {
  user_id: number;
  status_of_order: string;
  id: number;
};

export class OrderStore {
  async show(userId: number) {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders JOIN order_products ON orders.id = order_products.order_id WHERE user_id=${userId} AND orders.status_of_order='Active' ;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }

  async create(
    userId: number,
    status: string,
    products: { id: number; quantity: number }[]
  ) {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO orders (user_id, status_of_order) VALUES (${userId}, '${status}') RETURNING id;`;
      const result = await conn.query(sql);
      // HERE
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const newSql = `INSERT INTO order_products (order_id, product_id, quantity) VALUES (${result.rows[0].id}, ${product.id}, ${product.quantity});`;
        await conn.query(newSql);
      }
      conn.release();
      return { msg: "Created successfully" };
    } catch (err) {
      throw new Error(`Cannot get orders ${err}`);
    }
  }
}
