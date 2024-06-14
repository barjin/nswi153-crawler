import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";

import { WebsiteRecord } from "./WebsiteRecord";

@Entity()
export class Node {
  @Property({ unique: true })
  url: string;

  @Property()
  title: string;

  @Property()
  crawlTime: number;

  @OneToOne(() => WebsiteRecord)
  owner: WebsiteRecord;

  @OneToMany(() => Node, (node) => node.url)
  links = new Collection<Node>(this);

  constructor(
    url: string,
    title: string,
    crawlTime: number,
    owner: WebsiteRecord,
  ) {
    this.url = url;
    this.title = title;
    this.crawlTime = crawlTime;
    this.owner = owner;
  }

  public AddNodeLink(url: Node) {
    this.links.add(url);
  }
}
