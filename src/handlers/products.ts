import express, { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { TOKEN_SECRET } = process.env;
const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};
const show = async (_req: Request, res: Response) => {
  const products = await store.show(Number(_req.params.id));
  res.json(products);
};
const create = async (_req: Request, res: Response) => {
  try {
    jwt.verify(_req.body.token, TOKEN_SECRET!);
  } catch (error) {
    return res.status(401).json(`invalid token ${error}`);
  }
  const products = await store.create(_req.body);
  res.json(products);
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", create);
};

export default product_routes;
