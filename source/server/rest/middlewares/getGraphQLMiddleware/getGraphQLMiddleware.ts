/* eslint-disable max-params */
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlHTTP } from "express-graphql";
import postgreSQLClient from "~server/clients/postgreSQLClient/postgreSQLClient";

type PagesResolverArguments = {
  ids?: number[];
};

type PagesResolverNestedArguments = {
  id: boolean;
  name: boolean;
};

const PagesResolver = async (
  { id, name }: PagesResolverNestedArguments,
  { ids }: PagesResolverArguments,
) => {
  const conditions =
    ids?.map((id: number): { id: number } => {
      return { id };
    }) ?? null;
  return await postgreSQLClient.page.findMany({
    select: { id, name },
    where: conditions ? { OR: conditions } : undefined,
  });
};

const schema = makeExecutableSchema({
  typeDefs: `#graphql
    type Query {
      pages(ids: [Int]): [Page]
    }

    type Page {
      id: ID!
      name: String!
    }
  `,
  resolvers: {
    Query: {
      pages: PagesResolver,
    },
  },
});

const getGraphQLMiddleware = () => {
  return graphqlHTTP({
    schema: schema,
    graphiql: true,
  });
};

export default getGraphQLMiddleware;
