import { Express } from "express";
import getGraphQLMiddleware from "../../middlewares/getGraphQLMiddleware/getGraphQLMiddleware";

const applyMiddlewares = (instance: Express): void => {
  instance.use("/graphql", getGraphQLMiddleware());
};

export default applyMiddlewares;
