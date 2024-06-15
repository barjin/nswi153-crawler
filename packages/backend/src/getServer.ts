import express from "express";

import "reflect-metadata";
import { AppDataSource } from "./data-source"
import { getExecutionsRouter } from "./routes/executions";
import { getRecordsRouter } from "./routes/records";

export async function getServer() {
  const app = express();

  app.all("*", (req, res, next) => {
    console.log(`Serving ${req.method} ${req.path}`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

  await AppDataSource.initialize();
  app.on("close", async () => {
    await AppDataSource.destroy();
  });

  const orm = AppDataSource.manager;
  
  app.use("/executions", getExecutionsRouter(orm));
  app.use("/records", getRecordsRouter(orm));
  return app;
}

