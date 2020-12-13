import { client } from "./client";
import { IUser } from "./types";

export const findUser = async (username: string): Promise<IUser> => {
  const users = client("users");
  try {
    let dbUser = (await users.findOne({
      username,
    })) as IUser;
    return dbUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
