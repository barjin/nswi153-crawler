import { Collection, Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { WebsiteRecord } from "./WebsiteRecord";
import { Node } from "./Node";

@Entity()
export class Execution {
    @PrimaryKey({autoincrement: true})
    id!: number;

    @OneToOne(() => WebsiteRecord)
    sourceRecord: WebsiteRecord;

    @OneToOne(() => Node)
    startingNode!: Node;

    constructor(sourceRecord: WebsiteRecord){
        this.sourceRecord = sourceRecord;
    }
}