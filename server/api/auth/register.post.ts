import { Request, Response, Router } from "express";
import * as bcrypt from "bcrypt";
import { register } from "../../mongo/register";
import { findUser } from "../../mongo/user";

const registerRouter = Router();

const registerHandler = async (req: Request, res: Response) => {
  let user = await findUser(req.body["username"]);
  if (user) {
    res.status(400).json({
      message: "User already exists",
    });
    return;
  }
  if (req.body["password"] == "") {
    res.status(400).json({
      message: "Password cannot be empty",
    });
    return;
  }
  const hash = bcrypt.hashSync(req.body["password"], 5);
  await register({ username: req.body["username"], password: hash })
    .then(() => {
      res.status(200).json({
        message: "Registered successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
};

registerRouter.post("/register", registerHandler);

export { registerRouter };
