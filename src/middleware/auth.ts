import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();
const { TOKEN_SECRET } = process.env;

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get("x-auth-token");
    jwt.verify(String(token), TOKEN_SECRET!);
    next();
  } catch (error) {
    return res.status(401).json(`invalid token ${error}`);
  }
};
