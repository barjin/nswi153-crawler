import express from 'express'
import getopts from 'getopts'
import { components } from 'packages/openapi-specification/lib/api-types';

const app = express();

let executions: components['schemas']['Execution'][] = [
	{
		id: 1,
		startURL: 'https://example.com',
		nodes: [
			{
				url: 'https://example.com',
				links: [
					3,
					4,
				],
				crawlTime: new Date().toISOString(),
				title: 'Example Domain',
			},
		],
	},
	{
		id: 2,
		startURL: 'https://wikipedia.org',
		nodes: [
			{
				url: 'https://wikipedia.org',
				links: [
					5,
					6,
				],
				crawlTime: new Date(Date.now() - 10e2).toISOString(),
				title: 'Wikipedia',
			},
		]
	},
];

/* Execution */
app.delete('/execution/:executionId', function(req, res) {
	const executionId = parseInt(req.params.executionId)
	executions = executions.filter(({ id }) => id !== executionId);

	return res.status(204).send()
})

app.get('/execution', function(req, res) {
	return res.json(executions)
})
app.get('/execution/:executionId', function(req, res) {
	const executionId = parseInt(req.params.executionId)
	const execution = executions.find(({ id }) => id === executionId)

	if (!execution) {
		return res.status(404).send()
	}

	return res.json(execution)
})


let websiteRecords: components['schemas']['WebsiteRecord'][] = [
	{
		id: 1,
		url: 'https://example.com',
		boundaryRegEx: '^https://example.com/.*',
		isActive: true,
		periodicity: 3600,
		label: 'Example Domain',
	},
	{
		id: 2,
		url: 'https://cs.wikipedia.org',
		boundaryRegEx: '^https://cs.wikipedia.org/wiki/.*',
		isActive: false,
		periodicity: 86400,
		label: 'Czech Wikipedia | scraping disabled',
	},
]

app.post('/records', function(req, res) {
	const record = req.body as components['schemas']['WebsiteRecord']
	const recordId = websiteRecords.push(record) - 1

	return res.status(201).json({ id: recordId })
})
app.delete('/records/:recordId', function(req, res) {
	const recordId = parseInt(req.params.recordId)
	websiteRecords = websiteRecords.filter(({ id }) => id !== recordId);

	return res.status(204).send()
})
app.get('/records/:recordId', function(req, res) {
	const recordId = parseInt(req.params.recordId)
	const record = websiteRecords.find(({ id }) => id === recordId)

	if (!record) {
		return res.status(404).send()
	}

	return res.json(record)
})
app.get('/records', function(req, res) {
	return res.json(websiteRecords)
})
app.put('/records/:recordId', function(req, res) {
	const recordId = parseInt(req.params.recordId)
	const record = req.body as components['schemas']['WebsiteRecord']

	websiteRecords.find((record, index) => {
		if (record.id === recordId) {
			websiteRecords[index] = {...websiteRecords[index], ...record}
			return true
		}
		return false
	});

	return res.status(204).send()
})

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
