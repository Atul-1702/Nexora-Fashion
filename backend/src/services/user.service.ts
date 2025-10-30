import { userlogindto } from "../dto/user-login.dto";
import { userdto } from "../dto/user.dto";
import { createUser, getUserByEmail } from "../repositories/user.repository";
import { NotFoundError, UnauthorizedError } from "../utils/app.error";
import catchErrorHelper from "../utils/catch.error";
import bcrypt from "bcrypt";
import generateJWT from "../utils/jwt.helper";

export async function createUserService(user: userdto) {
  return await catchErrorHelper(async () => {
    return await createUser(user);
  });
}

export async function getUserService(user: userlogindto) {
  let userDetails: any;
  await catchErrorHelper(async () => {
    userDetails = await getUserByEmail(user.email);
  });
  if (!userDetails) {
    throw new NotFoundError("User does not exist.");
  }

  if (!(await bcrypt.compare(user.password, userDetails.password))) {
    throw new UnauthorizedError("Incorrect password.");
  }

  const jwt_token = generateJWT(user.email);

  return [jwt_token, userDetails._id];
}
