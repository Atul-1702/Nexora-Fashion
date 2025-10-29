import { userdto } from "../dto/user.dto";
import UserModel from "../models/user.model";

export async function createUser(user: userdto) {
  const userDB = UserModel.create(user);
  (await userDB).save();
  return userDB;
}
