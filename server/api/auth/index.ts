import * as express from "express";
import { loginRouter } from "./login.post";
import { registerRouter } from "./register.post";

const authRouter = express.Router();

authRouter.use("", loginRouter, registerRouter);

export { authRouter };
