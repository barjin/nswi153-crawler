import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { WebsiteRecord } from "./WebsiteRecord";

@Entity()
export class CrawledPage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => WebsiteRecord, { onDelete: 'CASCADE' })
  record: WebsiteRecord;

  @Column()
  url: string;

  @Column({
    nullable: true,
  })
  crawledAt: Date | null;

  @Column({ 
    type: 'text',
    nullable: true,
  })
  title: string;

  @ManyToMany(() => CrawledPage, (crawledPage) => crawledPage.id, { onDelete: 'CASCADE' })
  @JoinTable()
  outLinks: CrawledPage[];
}
