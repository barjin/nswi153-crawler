import type { MikroORM } from "@mikro-orm/core";
import { Router } from "express";

import { Execution } from "../entities/Execution";

export function getExecutionsRouter(orm: MikroORM) {
  const router = Router();

  router.route("/").get(async (req, res) => {
    const executionRepo = orm.em.getRepository(Execution);
    const executions = await executionRepo.findAll();

    return res.json(executions);
  });

  router
    .route("/:executionId")
    .get(async (req, res) => {
      const executionRepo = orm.em.getRepository(Execution);
      const execution = await executionRepo.findOne({
        id: parseInt(req.params.executionId, 10),
      });

      if (!execution) {
        return res.status(404).send();
      }

      return res.status(204).json(execution).send();
    })
    .delete(async (req, res) => {
      const executionId = parseInt(req.params.executionId, 10);
      const executionRef = orm.em.getReference(Execution, executionId);
      await orm.em.remove(executionRef).flush();

      return res.status(204).send();
    });

  return router;
}
