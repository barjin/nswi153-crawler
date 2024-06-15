import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import { WebsiteRecord } from "./WebsiteRecord";

@Entity()
@Unique('tag', ['tag'])
export class WebsiteRecordTag {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  tag: string;

  @ManyToMany(() => WebsiteRecord, (record) => record.id)
  websiteRecords: WebsiteRecord[];
}
