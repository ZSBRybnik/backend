/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-params */
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlHTTP } from "express-graphql";
import pagesResolver from "~root/source/server/graphql/resolvers/pageResolver/pageResolver";
import postsResolver from "~root/source/server/graphql/resolvers/postsResolver/postsResolver";
import mainSchemaConnector from "~root/source/server/graphql/schemaDefinitions/mainSchemaConnector/mainSchemaConnector";

const schema = makeExecutableSchema({
  typeDefs: mainSchemaConnector,
  resolvers: {
    Query: {
      pages: pagesResolver,
      posts: postsResolver,
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
