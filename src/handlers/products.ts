import express, { Request, Response } from "express";
import { ProductStore } from "../models/product";
import auth from "../middleware/auth";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const show = async (_req: Request, res: Response) => {
  try {
    const products = await store.show(Number(_req.params.id));
    res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const create = async (_req: Request, res: Response) => {
  if (!_req.body.name || !_req.body.price) {
    res.status(400);
    return res.json("Invalid input.");
  }
  try {
    const products = await store.create(_req.body);
    res.json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", auth, create);
};

export default product_routes;
