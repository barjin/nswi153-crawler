import { Router } from "express";
import type { EntityManager } from "typeorm";

import { Execution } from "../entity/Execution";
import type { QueryParamsType, ResponseType } from '../util/helperTypes';


export function getExecutionsRouter(orm: EntityManager) {
  const router = Router();

  router.route("/").get(async (req, res) => {
    const query = req.query as QueryParamsType<'/executions', 'get'>;
    const { limit = 10, offset = 0, recordId } = query;

    const executionRepo = orm.getRepository(Execution);

    const [executions, total] = await executionRepo.findAndCount({
      where: recordId ? { record: { id: parseInt(recordId as unknown as string, 10) } } : {},
      skip: offset,
      take: limit,
    });

    const response: Required<ResponseType<'/executions', 'get'>> = {
      total,
      limit,
      offset,
      records: executions.map((e) => e.serialize()),
    }

    return res.json(response);
  });

  router
    .route("/:executionId")
    .get(async (req, res) => {
      const execution = await orm.findOneBy(
        Execution,
        {
          id: parseInt(req.params.executionId, 10),
        });

      if (!execution) {
        return res.status(404).send();
      }

      const response: ResponseType<'/executions/{executionId}', 'get'> = execution.serialize();

      return res.status(200).json(response).send();
    })
    .delete(async (req, res) => {
      const executionId = parseInt(req.params.executionId, 10);
      const executionRef = await orm.findOneBy(Execution, { id: executionId });
      await orm.remove(executionRef);

      return res.status(204).send();
    });

  return router;
}
