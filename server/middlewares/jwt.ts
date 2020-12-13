import * as jwt from "jsonwebtoken";
import * as config from "../config";
import { Request, Response } from "express";

export interface IJWTToken {
  data: ITokenData;
  exp: number;
  iat: number;
}

export const authMiddleware = (req: Request, res: Response, next: any) => {
  const headerToken = (req
    .header("authorization")
    ?.split("Bearer")[1]
    .trimLeft() || "") as string;
  try {
    const decoded = jwt.verify(headerToken, config.jwt_secret) as IJWTToken;
    req.user = decoded.data;
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(403);
  }
};
