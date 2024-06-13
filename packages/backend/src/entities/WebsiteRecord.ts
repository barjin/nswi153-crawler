import { Collection, Entity, OneToOne, PrimaryKey, Property, Enum } from "@mikro-orm/core";
import { Execution } from "./Execution";

export enum ExecutionStatus {
    succeeded, ongoing, failed, waiting
}

@Entity()
export class WebsiteRecord {
    @PrimaryKey({autoincrement: true})
    id!: number;

    @Property()
    url: string;

    @Property()
    boundaryRegEx: string;

    @Property()
    periodicityInSec: bigint;

    @Property()
    label: string;

    @Property()
    tags: string[];

    @Property()
    isActive: boolean = true;

    @OneToOne(() => Execution)
    lastExecution!: Execution;

    @Enum(() => ExecutionStatus)
    lastExecutionStatus = ExecutionStatus.waiting; 

    @Property()
    lastExecutionTime!: number;

    constructor(url: string, boundaryRegEx: string, 
        periodicityInSec: bigint, label:string, tags: string[]){
            this.url = url;
            this.boundaryRegEx = boundaryRegEx;
            this.periodicityInSec = periodicityInSec;
            this.label = label;
            this.tags = tags;
        }

    public Deactivate(){
        this.isActive = false;
    }

    public SetLastExecution(execution: Execution, status: ExecutionStatus, time: number){
        this.lastExecution = execution;
        this.lastExecutionStatus = status;
        this.lastExecutionTime = time;
    }
}