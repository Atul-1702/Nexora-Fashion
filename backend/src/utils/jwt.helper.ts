import jwt from "jsonwebtoken";
import serverConfig from "../config/env.config";

export default function generateJWT(email: string) {
  return jwt.sign(
    {
      email,
    },
    serverConfig.jwt_secret_token,
    {
      expiresIn: "24h",
    }
  );
}
