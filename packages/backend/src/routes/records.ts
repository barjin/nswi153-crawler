import type { paths } from "@nswi153-crawler/openapi-spec";
import { Router } from "express";
import { Like, type EntityManager } from "typeorm";

import { WebsiteRecord } from "../entity/WebsiteRecord";
import { WebsiteRecordTag } from "../entity/WebsiteRecordTag";
import type { QueryParamsType, ResponseType } from "../util/helperTypes";

export function getRecordsRouter(orm: EntityManager) {
  const router = Router();

  router.route("/")
    .get(async (req, res) => {
      const query = req.query as QueryParamsType<'/records', 'get'>;
      const { limit = 10, offset = 0, filter = null, filterBy = 'url', sort = 'url:desc' } = query;
      const [sortField, sortOrder] = sort.split(':');

      const websiteRecordRepo = orm.getRepository(WebsiteRecord);
      const [records, total] = await websiteRecordRepo.findAndCount({
        ...(filter ? {
          where: {
            [filterBy]: Like(`%${filter}%`),
          },
        } : {}),
        skip: parseInt(offset as unknown as string, 10),
        take: parseInt(limit as unknown as string, 10),
        order: {
          [sortField]: sortOrder.toUpperCase() as 'ASC' | 'DESC',
        },
        relations: ['tags', 'executions'],
      });

      const response: Required<ResponseType<'/records', 'get'>> = {
        records: records.map((r) => r.serialize()),
        total,
        limit: parseInt(limit as unknown as string, 10),
        offset: parseInt(offset as unknown as string, 10),
      };

      return res.json(response);
    })
    .post(async (req, res) => {
      const data: paths['/records']['post']['requestBody']['content']['application/json'] = req.body;

      const exisitngTags = await orm.find(WebsiteRecordTag, {
        where: data.tags.map((tag) => ({ tag })),
      });

      const newTags = data.tags.filter((tag) => !exisitngTags.some((t) => t.tag === tag)).map((tag) => {
        const newTag = orm.create(WebsiteRecordTag, { tag });
        return newTag;
      });

      await orm.save(newTags);
      const record = orm.create(WebsiteRecord, {
        ...data,
        tags: [...exisitngTags, ...newTags],
      });
      await orm.save(record);

      return res.status(201).json(record.serialize());
    });

  router
    .route("/:recordId")
    .get(async (req, res) => {
      const id = req.params.recordId;
      const record = await orm.findOne(
        WebsiteRecord, 
        { 
          where: {
            id: parseInt(id, 10),
          }, 
          relations: ['tags', 'executions'],
        },
      );

      if (!record) {
        return res.status(404).send();
      }

      const response: ResponseType<'/records/{recordId}', 'get'> = record.serialize();

      return res.status(200).json(response);
    })
    .put(async (req, res) => {
      const id = req.params.recordId;
      const record = await orm.findOneBy(WebsiteRecord, { id: parseInt(id, 10) });

      if (!record) {
        return res.status(404).send();
      }

      const data: paths['/records/{recordId}']['put']['requestBody']['content']['application/json'] = req.body;
      // @ts-expect-error
      const updatedRecord = orm.merge(WebsiteRecord, record, data);
      await orm.save(updatedRecord);

      return res.status(200).json(record.serialize());
    })
    .delete(async (req, res) => {
      const id = req.params.recordId;
      const record = await orm.findOneBy(WebsiteRecord, { id: parseInt(id, 10) });

      if (!record) {
        return res.status(404).send();
      }

      await orm.remove(record);

      return res.status(204).send();
    });

  return router;
}
