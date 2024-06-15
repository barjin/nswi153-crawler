import "reflect-metadata";
import { AppDataSource } from "./data-source"
import { Execution } from "./entity/Execution";
import { WebsiteRecord } from "./entity/WebsiteRecord";
import { WebsiteRecordTag } from "./entity/WebsiteRecordTag";

export async function seed() {
  await AppDataSource.initialize();
  const orm = AppDataSource.manager;

  const testTag = orm.create(WebsiteRecordTag, { tag: "test" });
  const productionTag = orm.create(WebsiteRecordTag, { tag: "production" });
  const criticalTag = orm.create(WebsiteRecordTag, { tag: "critical" });

  await orm.save(testTag);
  await orm.save(productionTag);
  await orm.save(criticalTag);

  const exampleRecord = orm.create(WebsiteRecord, { 
    url: "https://www.example.com",
    boundaryRegEx: "https://www.example.com/.*",
    periodicity: 60,
    label: "Example",
    isActive: true,
    tags: [testTag],
  });

  const wikipediaRecord = orm.create(WebsiteRecord, { 
    url: "https://cs.wikipedia.org/",
    boundaryRegEx: "https://cs.wikipedia.org/wiki/.*",
    periodicity: 360,
    label: "Scraping Wikipedia",
    isActive: true,
    tags: [productionTag, criticalTag],
  });

  await orm.save(exampleRecord);
  await orm.save(wikipediaRecord);
  
  await orm.save(orm.create(Execution, { 
    record: exampleRecord,
    status: "succeeded",
    executionTime: new Date(),
  }));
  
  await orm.save(orm.create(Execution, { 
    record: exampleRecord,
    status: "failed",
    executionTime: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
  }));
  
  await orm.save(orm.create(Execution, { 
    record: wikipediaRecord,
    status: "ongoing",
    executionTime: new Date(new Date().getTime() - 2000 * 60 * 60 * 24),
  }));

  await AppDataSource.destroy();
}

seed();