import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User, UserStore } from "../models/user";
import auth from "../middleware/auth";
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
    const users = await store.index();
    res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const show = async (_req: Request, res: Response) => {
  try {
    const users = await store.show(Number(_req.params.id));
    res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const create = async (_req: Request, res: Response) => {
  if (!_req.body.firstname || !_req.body.lastname) {
    res.status(400);
    return res.json("Invalid input.");
  }
  try {
    const users = await store.create(_req.body);
    res.json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/users", auth, index);
  app.get("/users/:id", auth, show);
  app.post("/users", create);
  app.post("/users/login/:id", authenticate);
};

export default user_routes;
