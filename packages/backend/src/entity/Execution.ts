import type { paths } from "@nswi153-crawler/openapi-spec";
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from "typeorm";

import { WebsiteRecord } from "./WebsiteRecord";

@Entity()
export class Execution {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @ManyToOne(() => WebsiteRecord, { onDelete: "CASCADE" })
  @JoinColumn()
  record: WebsiteRecord;

  @Column({ type: "text", default: "waiting" })
  status: paths["/api/executions/{executionId}"]["get"]["responses"]["200"]["content"]["application/json"]["status"];

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  executionTime: Date;

  @Column({ type: "int", nullable: true })
  nodesVisited: number;

  @Column({ type: "int", nullable: true })
  nodesOutOfScope: number;

  serialize() {
    return {
      id: this.id,
      status: this.status,
      executionTime: this.executionTime.toISOString(),
      record: {
        id: this.record.id,
        label: this.record.label,
      },
      stats: {
        nodesVisited: this.nodesVisited ?? 0,
        nodesOutOfScope: this.nodesOutOfScope ?? 0,
      },
    };
  }
}
