import getCorsMiddleware from "../../middlewares/getCorsMiddleware/getCorsMiddleware";
import getDatabaseClientMiddleware from "../../middlewares/getDatabaseClientMiddleware/getDatabaseClientMiddleware";
import getGraphQLMiddleware from "../../middlewares/getGraphQLMiddleware/getGraphQLMiddleware";
import getJsonBodyParserMiddleware from "../../middlewares/getJsonBodyParserMiddleware/getJsonBodyParserMiddleware";
import type {
  ApplyMiddlewares,
  ApplyMiddlewaresArguments,
} from "./applyMiddlewares.types";

const applyMiddlewares: ApplyMiddlewares = ({
  instance,
}: ApplyMiddlewaresArguments): void => {
  instance.use("/graphql", getGraphQLMiddleware());
  instance.use(getCorsMiddleware());
  instance.use(getJsonBodyParserMiddleware());
  instance.use(getDatabaseClientMiddleware());
};

export default applyMiddlewares;
