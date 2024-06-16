import { CheerioCrawler, Configuration } from "@crawlee/cheerio";
import type { EntityManager } from "typeorm";

import { CrawledPage } from "../entity/CrawledPage";
import type { Execution } from "../entity/Execution";

export class Crawler {
    static async run (execution: Execution, orm: EntityManager) {
        if(execution.status !== "waiting") {
            return;
        }

        execution.status = "running";

        await orm.delete(CrawledPage, {
            record: execution.record,
        });

        const urlToInstanceMap = new Map<string, CrawledPage>();
        const crawler = new CheerioCrawler({
            maxRequestsPerCrawl: 10,
            requestHandler: async ({ request, $, enqueueLinks, log }) => {
                log.info(`Crawling ${request.url}`);

                if (!urlToInstanceMap.has(request.url)) {
                    urlToInstanceMap.set(
                        request.url,
                        orm.create(CrawledPage, {
                            url: request.url,
                            crawledAt: new Date(),
                            title: $("title").text(),
                            record: execution.record,
                            outLinks: [],
                        }),
                    );
                }
                const currentPage = urlToInstanceMap.get(request.url)!;

                currentPage.crawledAt = new Date();
                currentPage.title = $("title").text();
                currentPage.outLinks = [];

                const newDiscoveredPages = [];

                $('a')
                    .map((_, element) => new URL($(element).attr('href'), request.url).href)
                    .get()
                    .filter((x,i,a) => a.indexOf(x) === i)
                    .forEach((href) => {
                        if (!urlToInstanceMap.has(href)) {
                            const linkedPage = orm.create(CrawledPage, {
                                url: href,
                                crawledAt: null,
                                title: null,
                                record: execution.record,
                                outLinks: [],
                            });
    
                            urlToInstanceMap.set(href, linkedPage);
                            newDiscoveredPages.push(linkedPage);
                        }
    
                        currentPage.outLinks.push(urlToInstanceMap.get(href)!);
                    });

                // eslint-disable-next-line @typescript-eslint/promise-function-async
                await Promise.all(newDiscoveredPages.map((linkedPage) => orm.save(linkedPage)));
                await orm.save(currentPage);

                await enqueueLinks({
                    regexps: [new RegExp(execution.record.boundaryRegEx)],
                });
            },
        }, new Configuration({
            persistStorage: false,
        }));

        try {
            await crawler.run([execution.record.url]);
            execution.status = "succeeded";
        } catch (error) {
            console.error(error);
            execution.status = "failed";
        }

        await orm.save(execution);
    }
}