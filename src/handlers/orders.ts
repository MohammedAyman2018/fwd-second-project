import express, { Request, Response } from "express";
import { OrderStore } from "../models/orders";
import auth from "../middleware/auth";
const store = new OrderStore();

const show = async (_req: Request, res: Response) => {
  try {
    const orders = await store.show(Number(_req.params.userId));
    res.json(orders);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const { userId, status, products } = req.body;
  try {
    const order = await store.create(userId, status, products);
    res.json(order);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const order_routes = (app: express.Application) => {
  app.post("/orders", auth, create);
  app.get("/orders/:userId", show);
};

export default order_routes;
