import type { components, paths } from '@nswi153-crawler/openapi-spec';
import express from 'express';
import getopts from 'getopts';
import { EntityManager, MikroORM } from '@mikro-orm/sqlite';
import config from './mikro-orm.config';
import { Execution } from './entities/Execution';
import { WebsiteRecord } from './entities/WebsiteRecord';

const app = express();

const initORM = async () => {
    const orm = await MikroORM.init(config);
    return orm;
};

const startServer = async () => {
    const orm = await initORM();
    
    /* Execution */
    app.get('/executions', async (req, res) => {
        const executionRepo = orm.em.getRepository(Execution);
        const executions = await executionRepo.findAll();
    
        return res.json(executions);
    });

    app.get('/executions/:executionId', async (req, res) => {
        const executionRepo = orm.em.getRepository(Execution);
        const execution = await executionRepo.findOne({id: parseInt(req.params.executionId, 10)})
        
        if(!execution){
            return res.status(404).send();
        }
    
        return res.status(204).json(execution).send();
    });

    app.delete('/execution/:executionId', async (req, res) => {
        const executionId = parseInt(req.params.executionId, 10);
        const executionRef = orm.em.getReference(Execution, executionId);
        await orm.em.remove(executionRef).flush();

        return res.status(204).send();
    });

    /* THINGS FROM HERE DOWN ARE NOT IMPLEMENTED */

    /* RECORDS */
    app.get('/records', (req, res) => {
        const recordsRepo = orm.em.getRepository(WebsiteRecord);
        
        const q = req.query as paths['/records']['get']['parameters']['query'];
        
        if (!q?.sort) {
            const records = recordsRepo.findAll();
            return res.json(records);
        }
    
        const [sortKey, sortDirection] = q.sort.split(':') as [keyof components['schemas']['WebsiteRecord'], 'ASC' | 'DSC'];
    
        //TODO: here we need to get the execution status 
        return res.json(websiteRecords.sort((a, b) => {
            if ((a[sortKey] ?? 0) < (b[sortKey] ?? 0)) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if ((a[sortKey] ?? 0) > (b[sortKey] ?? 0)) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        }));
    });

}

app.post('/records', async (req, res) => {
    const recordRepo = (await initORM()).em.getRepository(WebsiteRecord);
    const newRecord = recordRepo.create({
        ...req.body
    });
    await recordRepo.getEntityManager().persist(newRecord).flush();

    return res.status(201).json({ id: newRecord.id });
});


app.delete('/records/:recordId', (req, res) => {
    const recordId = parseInt(req.params.recordId, 10);
    websiteRecords = websiteRecords.filter(({ id }) => id !== recordId);

    return res.status(204).send();
});
app.get('/records/:recordId', (req, res) => {
    const recordId = parseInt(req.params.recordId, 10);
    const record = websiteRecords.find(({ id }) => id === recordId);

    if (!record) {
        return res.status(404).send();
    }

    return res.json(record);
});

app.put('/records/:recordId', (req, res) => {
    const recordId = parseInt(req.params.recordId, 10);

    websiteRecords.find((record, index) => {
        if (record.id === recordId) {
            websiteRecords[index] = { ...websiteRecords[index], ...record };
            return true;
        }
        return false;
    });

    return res.status(204).send();
});

const options = getopts(process.argv.slice(2), {
    alias: {
        port: 'p',
    },
    unknown: (option) => {
        console.log(`Unknown option: ${option}`);
        return false;
    },
});

const port = options.port || 3000;
const server = app.listen(port, () => {
    const address = server.address();
    if (typeof address === 'string') {
        console.log(`Listening on ${address}`);
    } else if (address) {
        console.log(`Listening on ${address.port}`);
    }
});
