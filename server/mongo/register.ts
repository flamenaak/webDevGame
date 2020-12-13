import { client } from "./client";
import { IUser } from "./types";

export const register = async (user: IUser) => {
  const users = client("users");
  try {
    await users.insertOne(user);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
