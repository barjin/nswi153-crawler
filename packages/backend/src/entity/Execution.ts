import EventEmitter from "events";

import { CheerioCrawler, Configuration } from "@crawlee/cheerio";
import type { paths } from "@nswi153-crawler/openapi-spec";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm"

import { WebsiteRecord } from "./WebsiteRecord";

@Entity()
export class Execution {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @ManyToOne(() => WebsiteRecord, { onDelete: 'CASCADE' })
  @JoinColumn() 
  record: WebsiteRecord;

  @Column({ type: 'text', default: 'waiting' })
  status: paths['/executions/{executionId}']['get']['responses']['200']['content']['application/json']['status'];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  executionTime: Date;

  async run() {
    if (this.status !== 'waiting') {
      throw new Error('Execution is not in waiting state');
    }

    this.status = 'running';
    const emitter = new EventEmitter();

    const crawler = new CheerioCrawler({
      requestHandler: async ({ request, $, enqueueLinks, pushData }) => {
        console.log(`[DEBUG] Crawling ${request.url}.`);

        const links = $('a').map((_, el) => $(el).attr('href')).get().map((href) => new URL(href, request.url).href);

        emitter.emit(
          'newCrawledPage',  
          {
            title: $('title').text(),
            url: request.url,
            crawledAt: new Date(),
            record: this.record,
            outLinks: links.filter((x,i,a) => a.indexOf(x) === i),
          },
        );
        
        await enqueueLinks({
          regexps: [new RegExp(this.record.boundaryRegEx)],
        });
      },
      maxRequestsPerCrawl: 10,
    }, new Configuration({
      persistStorage: false,
    }));

    crawler.run([this.record.url]).then(() => {
      this.status = 'succeeded';
      emitter.emit('done');
    }).catch((err) => {
      console.error(err);
      this.status = 'failed';
      emitter.emit('error', err);
    });

    return emitter;
  }

  serialize() {
    return {
      id: this.id,
      status: this.status,
      executionTime: this.executionTime.toISOString(),
      record: {
        id: this.record.id,
        label: this.record.label,
      },
    };
  }
}
