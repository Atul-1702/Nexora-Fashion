import { userdto } from "../dto/user.dto";
import { createUser } from "../repositories/user.repository";
import catchErrorHelper from "../utils/catch.error";

export async function createUserService(user: userdto) {
  return await catchErrorHelper(async () => {
    return await createUser(user);
  });
}
