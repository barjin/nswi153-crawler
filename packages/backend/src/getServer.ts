import path from "path";

import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";

import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { getGraphQlRouter } from "./graphql/graphql";
import { getExecutionsRouter } from "./routes/executions";
import { getRecordsRouter } from "./routes/records";

export async function getServer() {
  const app = express();

  app.use(cors());

  app.use(bodyParser.json());

  await AppDataSource.initialize();
  app.on("close", async () => {
    await AppDataSource.destroy();
  });

  const orm = AppDataSource.manager;

  const apiRouter = Router();
  apiRouter.use("/executions", getExecutionsRouter(orm));
  apiRouter.use("/records", getRecordsRouter(orm));
  apiRouter.use("/graphql", getGraphQlRouter(orm));

  app.use("/api", apiRouter);
  app.use(
    "/assets",
    express.static(path.join(__dirname, "frontend", "assets")),
  );
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "frontend", "index.html")),
  );

  return app;
}
