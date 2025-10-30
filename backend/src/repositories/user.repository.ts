import { userlogindto } from "../dto/user-login.dto";
import { userdto } from "../dto/user.dto";
import UserModel from "../models/user.model";

export async function createUser(user: userdto) {
  const userDB = UserModel.create(user);
  (await userDB).save();
  return userDB;
}

export async function getUserByEmail(email: string) {
  const userDB = await UserModel.findOne({ email }).select("password");
  return userDB;
}
