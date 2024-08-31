import { Router } from "express";
import { createHandler } from "graphql-http/lib/use/express";
// @ts-ignore
import { ruruHTML } from "ruru/server";
import type { EntityManager } from "typeorm";

import { getSchema } from "./schema";

export function getGraphQlRouter(orm: EntityManager) {
  const router = Router();

  router.all(
    "/",
    createHandler({
      schema: getSchema(orm),
    }),
  );

  router.get("/playground", (_, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(ruruHTML({ endpoint: "/api/graphql" }));
  });

  return router;
}
