import { graphqlHTTP } from "express-graphql";

const getGraphQLMiddleware = () => {
  return graphqlHTTP({
    schema: {},
    graphiql: true,
  });
};

export default getGraphQLMiddleware;
