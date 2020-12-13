import { Request, Response, Router } from "express";
import * as jwt from "jsonwebtoken";
import * as config from "../../config";
import { login } from "../../mongo/login";

const loginRouter = Router();

const loginHandler = async (req: Request, res: Response) => {
  if (!req.body["username"] || !req.body["password"]) {
    res.status(400).json({
      message: "Username or password not provided",
    });
    return;
  }
  const match = await login({
    username: req.body["username"],
    password: req.body["password"],
  });
  if (!match) {
    res.status(400).json({
      message: "Invalid credentials",
    });
    return;
  }
  const token = jwt.sign(
    {
      data: {
        userName: req.body["username"],
      },
      exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
    },
    config.jwt_secret
  );
  res.send({ token });
};

loginRouter.post("/login", loginHandler);

export { loginRouter };
