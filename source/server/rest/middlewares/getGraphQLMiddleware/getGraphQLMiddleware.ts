import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";

type PagesResolverArguments = {
  ids?: number[];
};

const schema: string = `#graphql
  type Query {
    pages(ids: [Int]): [Page]
  }

  type Page {
    id: ID!
    name: String!
  }
`;

const getGraphQLMiddleware = () => {
  return graphqlHTTP({
    schema: buildSchema(schema),
    graphiql: true,
    rootValue: {
      pages: async ({ ids }: PagesResolverArguments) => {
        const conditions =
          ids?.map((id: number): { id: number } => {
            return { id };
          }) ?? null;
        return await postgreSQLClient.page.findMany({
          select: { id: true, name: true },
          where: conditions ? { OR: conditions } : undefined,
        });
      },
    },
  });
};

export default getGraphQLMiddleware;
