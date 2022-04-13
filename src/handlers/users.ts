import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, UserStore } from "../models/user";
dotenv.config();
const { TOKEN_SECRET } = process.env;
const store = new UserStore();

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    id: Number(req.params.id),
  };
  try {
    const u = await store.authenticate(user.firstname, user.password);
    const token = jwt.sign({ user: u }, TOKEN_SECRET!);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const index = async (_req: Request, res: Response) => {
  try {
    const token = _req.get("x-auth-token");
    jwt.verify(String(token), TOKEN_SECRET!);
  } catch (error) {
    return res.status(401).json(`invalid token ${error}`);
  }
  const users = await store.index();
  res.json(users);
};
const show = async (_req: Request, res: Response) => {
  try {
    const token = _req.get("x-auth-token");
    jwt.verify(String(token), TOKEN_SECRET!);
  } catch (error) {
    return res.status(401).json(`invalid token ${error}`);
  }
  const users = await store.show(Number(_req.params.id));
  res.json(users);
};
const create = async (_req: Request, res: Response) => {
  if (!_req.body.firstname || !_req.body.lastname) {
    res.status(400);
    return res.json("Invalid input.");
  }
  const users = await store.create(_req.body);
  res.json(users);
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.post("/users/login/:id", authenticate);
};

export default user_routes;
