import {
  Collection,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";

import { Node } from "./Node";
import { WebsiteRecord } from "./WebsiteRecord";

@Entity()
export class Execution {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @OneToOne(() => WebsiteRecord)
  sourceRecord: WebsiteRecord;

  @OneToOne(() => Node)
  startingNode!: Node;

  constructor(sourceRecord: WebsiteRecord) {
    this.sourceRecord = sourceRecord;
  }
}
