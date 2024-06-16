import {
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLBoolean,
} from "graphql";
import { In, type EntityManager } from "typeorm";

import { CrawledPage } from "../entity/CrawledPage";
import { WebsiteRecord } from "../entity/WebsiteRecord";
import type { WebsiteRecordTag } from "../entity/WebsiteRecordTag";

// type Query{
//     websites: [WebPage!]!
//     nodes(webPages: [ID!]): [Node!]!
// }

// type WebPage{
//     identifier: ID!
//     label: String!
//     url: String!
//     regexp: String!
//     tags: [String!]!
//     active: Boolean!
// }

// type Node{
//     title: String
//     url: String!
//     crawlTime: String
//     links: [Node!]!
//     owner: WebPage!
// }

export function getSchema(orm: EntityManager) {
  const webpageSchema = new GraphQLObjectType({
    name: "WebPage",
    fields: {
      identifier: {
        type: GraphQLID,
        resolve: (webpage: WebsiteRecord) => webpage.id,
      },
      label: { type: GraphQLString },
      url: { type: GraphQLString },
      regexp: {
        type: GraphQLString,
        resolve: (webpage: WebsiteRecord) => webpage.boundaryRegEx,
      },
      tags: {
        type: new GraphQLList(GraphQLString),
        resolve: async (webpage: WebsiteRecord) =>
          webpage.tags.map((tag: WebsiteRecordTag) => tag.tag),
      },
      active: {
        type: GraphQLBoolean,
        resolve: (webpage: WebsiteRecord) => webpage.isActive,
      },
    },
  });

  const nodeSchema = new GraphQLObjectType({
    name: "Node",
    fields: {
      title: { type: GraphQLString },
      url: { type: GraphQLString },
      crawlTime: {
        resolve: (node) => node.crawledAt,
        type: GraphQLString,
      },
      owner: {
        type: webpageSchema,
        resolve: async (node) =>
          orm.findOne(WebsiteRecord, {
            where: {
              id: node.recordId,
            },
          }),
      },
    },
  });

  const querySchema = new GraphQLObjectType({
    name: "Query",
    fields: {
      websites: {
        type: new GraphQLList(webpageSchema),
        resolve: async () => {
          return orm.find(WebsiteRecord, { relations: ["tags"] });
        },
      },
      nodes: {
        type: new GraphQLList(nodeSchema),
        args: {
          webPages: { type: new GraphQLList(GraphQLID) },
        },
        resolve: async (_, args) => {
          if (!args.webPages?.length) {
            return orm.find(CrawledPage);
          }

          return orm.find(CrawledPage, {
            where: {
              record: {
                id: In(args.webPages),
              },
            },
          });
        },
      },
    },
  });

  return new GraphQLSchema({
    query: querySchema,
  });
}
