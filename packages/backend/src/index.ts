import type { components, paths } from "@nswi153-crawler/openapi-spec";
import bodyParser from "body-parser";
import express from "express";
import getopts from "getopts";

const app = express();

app.use(bodyParser.json());

// TODO: remove before release
app.all("*", (req, res, next) => {
  console.log(`Serving ${req.method} ${req.path}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

let executions: components["schemas"]["Execution"][] = [
  {
    id: 1,
    websiteRecordId: 1,
    startURL: "https://example.com",
    nodes: [
      {
        url: "https://example.com",
        links: [3, 4],
        crawlTime: new Date().toISOString(),
        title: "Example Domain",
      },
    ],
  },
  {
    id: 2,
    websiteRecordId: 2,
    startURL: "https://wikipedia.org",
    nodes: [
      {
        url: "https://wikipedia.org",
        links: [5, 6],
        crawlTime: new Date(Date.now() - 10e2).toISOString(),
        title: "Wikipedia",
      },
    ],
  },
];

/* Execution */
app.delete("/execution/:executionId", (req, res) => {
  const executionId = parseInt(req.params.executionId, 10);
  executions = executions.filter(({ id }) => id !== executionId);

  return res.status(204).send();
});

app.get("/execution", (req, res) => {
  const q = req.query as Record<
  keyof Exclude<paths["/execution"]["get"]["parameters"]["query"], undefined>,
    string | undefined
  >;

  const { recordId } = q;
  const limit = parseInt(q.limit ?? "10", 10) ?? 10;
  const offset = parseInt(q.offset ?? "0", 10) ?? 0;

  const filteredExecutions = executions.filter(
    (execution) => !recordId || execution.websiteRecordId === parseInt(recordId, 10),
  );

  const response: paths["/execution"]["get"]["responses"]["200"]["content"]["application/json"] = {
    limit,
    offset,
    total: filteredExecutions.length,
    records: filteredExecutions.slice(offset, offset + limit),
  }

  return res.json(response);
});

app.get("/execution/:executionId", (req, res) => {
  const executionId = parseInt(req.params.executionId, 10);
  const execution = executions.find(({ id }) => id === executionId);

  if (!execution) {
    return res.status(404).send();
  }

  return res.json(execution);
});

let websiteRecords: components["schemas"]["WebsiteRecord"][] = Array(10)
  .fill([
    {
      id: 1,
      url: "https://example.com",
      boundaryRegEx: "^https://example.com/.*",
      isActive: true,
      periodicity: 3600,
      label: "Example Domain",
      tags: ["example, test"],
      lastExecutionTime: new Date(Date.now() - 10e2).toISOString(),
      lastExecutionStatus: "succeeded",
    },
    {
      id: 2,
      url: "https://cs.wikipedia.org",
      boundaryRegEx: "^https://cs.wikipedia.org/wiki/.*",
      isActive: false,
      periodicity: 86400,
      label: "Czech Wikipedia | scraping disabled",
      tags: ["wikipedia"],
      lastExecutionTime: new Date().toISOString(),
      lastExecutionStatus: "ongoing",
    },
  ])
  .flat();

app.post("/records", (req, res) => {
  const record = req.body as components["schemas"]["WebsiteRecord"];

  const recordId = websiteRecords.push(record) - 1;

  return res.status(201).json({ id: recordId });
});
app.delete("/records/:recordId", (req, res) => {
  const recordId = parseInt(req.params.recordId, 10);
  websiteRecords = websiteRecords.filter(({ id }) => id !== recordId);

  return res.status(204).send();
});
app.get("/records/:recordId", (req, res) => {
  const recordId = parseInt(req.params.recordId, 10);
  const record = websiteRecords.find(({ id }) => id === recordId);

  if (!record) {
    return res.status(404).send();
  }

  return res.json(record);
});
app.get("/records", (req, res) => {
  const q = req.query as Record<
    keyof Exclude<paths["/records"]["get"]["parameters"]["query"], undefined>,
    string | undefined
  >;

  if (!q?.sort) {
    return res.json(websiteRecords);
  }

  const [sortKey, sortDirection] = (q.sort?.split(":") ?? ["url", "asc"]) as [
    keyof components["schemas"]["WebsiteRecord"],
    "asc" | "dsc",
  ];
  const [filterQuery, filterField] = [q.filter, q.filterBy] as [string, "url"];
  const limit = parseInt(q.limit ?? "10", 10) ?? 10;
  const offset = parseInt(q.offset ?? "0", 10) ?? 0;

  const records = websiteRecords
    .filter((record) => {
      if (!filterQuery || !filterField) {
        return true;
      }
      return record[filterField]
        .toLowerCase()
        .includes(filterQuery.toLowerCase());
    })
    .sort((a, b) => {
      if ((a[sortKey] ?? 0) < (b[sortKey] ?? 0)) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if ((a[sortKey] ?? 0) > (b[sortKey] ?? 0)) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

  const response: paths["/records"]["get"]["responses"]["200"]["content"]["application/json"] =
    {
      limit,
      offset,
      total: records.length,
      records: records.slice(offset, offset + limit),
    };

  return res.json(response);
});
app.put("/records/:recordId", (req, res) => {
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
    port: "p",
  },
  unknown: (option) => {
    console.log(`Unknown option: ${option}`);
    return false;
  },
});

const port = options.port || 3000;
const server = app.listen(port, () => {
  const address = server.address();
  if (typeof address === "string") {
    console.log(`Listening on ${address}`);
  } else if (address) {
    console.log(`Listening on ${address.port}`);
  }
});
