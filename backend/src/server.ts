import express from "express";
import type { Express } from "express";
import serverConfig from "./config/env.config";
import dbConnect from "./config/db.config";
import AppErrorMiddleware from "./middlewares/app-error.middleware";
import UncaughtErrorMiddleware from "./middlewares/uncaught-error.middleware";
import router from "./routers/index.router";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

dbConnect();

app.use("/api", router);

app.use(AppErrorMiddleware);
app.use(UncaughtErrorMiddleware);

app.listen(serverConfig.port, async () => {
  console.log("App is running at", serverConfig.port);
});
