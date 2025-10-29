import mongoose from "mongoose";
import serverConfig from "./env.config";

async function dbConnect() {
  try {
    await mongoose.connect(serverConfig.db_url);
    console.log("DB connected successfully");
  } catch (error: unknown) {
    console.log("DB connection failed.");
    process.exit(1);
  }
}

export default dbConnect;
