import { MikroORM } from "@mikro-orm/sqlite";
import express from "express";

import config from "./mikro-orm.config";
import { getExecutionsRouter } from "./routes/executions";

export async function getServer() {
  const app = express();

  app.all("*", (req, res, next) => {
    console.log(`Serving ${req.method} ${req.path}`);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });

  const orm = await MikroORM.init(config);
  app.on("close", async () => {
    await orm.close();
  });

  app.use("/executions", getExecutionsRouter(orm));
  return app;
}
