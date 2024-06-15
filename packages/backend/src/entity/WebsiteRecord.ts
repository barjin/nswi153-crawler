import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Execution } from "./Execution";
import { WebsiteRecordTag } from "./WebsiteRecordTag";
import type { ResponseType } from "../util/helperTypes";

export enum ExecutionStatus {
  succeeded,
  ongoing,
  failed,
  waiting,
}

@Entity()
export class WebsiteRecord {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column()
  url: string;

  @Column()
  boundaryRegEx: string;

  @Column()
  periodicity: number;

  @Column()
  label: string;

  @ManyToMany(() => WebsiteRecordTag, (tag) => tag.id)
  @JoinTable()
  tags: WebsiteRecordTag[];

  @Column()
  isActive: boolean = true;
  
  @OneToMany(() => Execution, (execution) => execution.record, { nullable: true })
  @JoinColumn()
  executions: Execution[];

  getLastExecution(): Execution | undefined {
    return this.executions?.sort((a, b) => b.executionTime.getTime() - a.executionTime.getTime())[0];
  }

  serialize(): ResponseType<'/records/{recordId}', 'get'> {
    const lastExecution = this.getLastExecution();

    return {
      id: this.id,
      url: this.url,
      boundaryRegEx: this.boundaryRegEx,
      periodicity: this.periodicity,
      label: this.label,
      tags: this.tags?.map((tag) => tag.tag),
      isActive: this.isActive,
      lastExecutionStatus: lastExecution?.status,
      lastExecutionTime: lastExecution?.executionTime.toISOString(),
    };
  }
}
