import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Execution } from "./Execution";

@Entity()
export class CrawledPage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Execution, { onDelete: 'CASCADE' })
  execution: Execution;

  @Column()
  url: string;

  @Column()
  crawledAt: Date;

  @Column({ type: 'text' })
  title: string;

  @ManyToMany(() => CrawledPage, (crawledPage) => crawledPage.id, { onDelete: 'CASCADE' })
  @JoinTable()
  outLinks: CrawledPage[];
}
