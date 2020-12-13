import * as bcrypt from "bcrypt";
import { client } from "./client";
import { IUser } from "./types";

export const login = async (userInput: IUser) => {
  const users = client("users");
  try {
    let dbUser = (await users.findOne({
      username: userInput.username,
    })) as IUser;
    const passwordMatch = bcrypt.compareSync(
      userInput.password,
      dbUser.password
    );
    return passwordMatch;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
