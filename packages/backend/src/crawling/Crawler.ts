import { resolve } from "path";

import Piscina from 'piscina';
import type { EntityManager } from "typeorm";

import { filename } from "./worker";
import type { Execution } from "../entity/Execution";

export class Crawler {
    static workerPool = new Piscina({
        filename: resolve(__dirname, "./workerWrapper.js"),
        workerData: { fullpath: filename },
    });

    static async crawl(execution: Execution) {
        await this.workerPool.run({ 
            executionId: execution.id, 
        }, { name: 'run' });
    }
}