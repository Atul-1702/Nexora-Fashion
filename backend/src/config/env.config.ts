import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  port: Number;
};

const serverConfig: ServerConfig = {
  port: Number(process.env.PORT) || 4000,
};

export default serverConfig;
