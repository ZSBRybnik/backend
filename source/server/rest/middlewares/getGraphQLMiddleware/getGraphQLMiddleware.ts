import { graphqlHTTP } from "express-graphql";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        },
      },
    },
  }),
});

const getGraphQLMiddleware = () => {
  return graphqlHTTP({
    schema,
    graphiql: true,
  });
};

export default getGraphQLMiddleware;
