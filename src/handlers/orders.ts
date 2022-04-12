import express, { Request, Response } from "express";
import { OrderStore } from "../models/orders";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;
const store = new OrderStore();

const show = async (_req: Request, res: Response) => {
  try {
    const token = _req.get("x-auth-token");
    jwt.verify(String(token), TOKEN_SECRET!);
  } catch (error) {
    return res.status(401).json(`invalid token ${error}`);
  }
  const orders = await store.show(Number(_req.params.userId));
  res.json(orders);
};

const create = async (_req: Request, res: Response) => {
  const products = await store.create(
    _req.body.userId,
    _req.body.status,
    _req.body.products
  );
  res.json(products);
};

const order_routes = (app: express.Application) => {
  app.post("/orders", create);
  app.get("/orders/:userId", show);
};

export default order_routes;
