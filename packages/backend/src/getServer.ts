import bodyParser from "body-parser";
import express from "express";

import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { getGraphQlRouter } from "./graphql/graphql";
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

  app.use(bodyParser.json());

  await AppDataSource.initialize();
  app.on("close", async () => {
    await AppDataSource.destroy();
  });

  const orm = AppDataSource.manager;

  app.use("/executions", getExecutionsRouter(orm));
  app.use("/records", getRecordsRouter(orm));
  app.use("/graphql", getGraphQlRouter(orm));
  return app;
}
