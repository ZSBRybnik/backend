/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-params */
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlHTTP } from "express-graphql";
import addPagesResolver from "~backend/source/server/graphql/resolvers/addPageResolver/addPageResolver";
import addPostResolver from "~backend/source/server/graphql/resolvers/addPostResolver/addPostResolver";
import deletePagesResolver from "~backend/source/server/graphql/resolvers/deletePageResolver/deletePageResolver";
import deletePostResolver from "~backend/source/server/graphql/resolvers/deletePostResolver/deletePostResolver";
import pagesResolver from "~backend/source/server/graphql/resolvers/pageResolver/pageResolver";
import postsResolver from "~backend/source/server/graphql/resolvers/postsResolver/postsResolver";
import updatePagesResolver from "~backend/source/server/graphql/resolvers/updatePageResolver/updatePageResolver";
import updatePostResolver from "~backend/source/server/graphql/resolvers/updatePostResolver/updatePostResolver";
import mainSchemaConnector from "~backend/source/server/graphql/schemaDefinitions/mainSchemaConnector/mainSchemaConnector";

const schema = makeExecutableSchema({
  typeDefs: mainSchemaConnector,
  resolvers: {
    Query: {
      pages: pagesResolver,
      posts: postsResolver,
    },
    Mutation: {
      updatePage: updatePagesResolver,
      addPage: addPagesResolver,
      deletePage: deletePagesResolver,
      addPost: addPostResolver,
      deletePost: deletePostResolver,
      updatePost: updatePostResolver,
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
