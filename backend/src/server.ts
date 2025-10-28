import express from "express";
import type { Express } from "express";
import serverConfig from "./config/env.config";

const app: Express = express();

app.listen(serverConfig.port, () => {
  console.log("App is running at", serverConfig.port);
});
