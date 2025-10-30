import dotenv from "dotenv";

dotenv.config();

type ServerConfig = {
  port: Number;
  db_url: string;
  cloudinary_cloud_name: string;
  cloudinary_api_key: string;
  cloudinary_api_secret: string;
  jwt_secret_token: string;
};

const serverConfig: ServerConfig = {
  port: Number(process.env.PORT) || 4000,
  db_url: process.env.DB_URL || "",
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "",
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "",
  jwt_secret_token: process.env.JWT_SECRET_KEY || "SECRET",
};

export default serverConfig;
