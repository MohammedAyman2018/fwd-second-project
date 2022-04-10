import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const { BCRYPT_PASSWORD: pepper, SALT_ROUNDS: saltRounds } = process.env;

export type User = {
  firstname: string;
  lastname: string;
  password: string;
  id?: number;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async create(user: User): Promise<{ msg: string }> {
    try {
      const conn = await Client.connect();
      const hash = await bcrypt.hashSync(
        user.password + pepper,
        parseInt(saltRounds!)
      );

      const sql = `INSERT INTO users (firstname, lastname, password) VALUES ('${user.firstname}', '${user.lastname}', '${hash}')`;
      await conn.query(sql);
      conn.release();
      return { msg: "Created successfully" };
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: number): Promise<any> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE id=${id};`;

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async authenticate(
    firstname: string,
    password: string
  ): Promise<User | null> {
    const conn = await Client.connect();
    const sql = `SELECT * FROM users WHERE firstname='${firstname}'`;
    const result = await conn.query(sql);
    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
