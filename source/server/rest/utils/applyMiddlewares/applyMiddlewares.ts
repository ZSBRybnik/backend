import getCorsMiddleware from "../../middlewares/getCorsMiddleware/getCorsMiddleware";
import getEmailSenderMiddleware from "../../middlewares/getEmailSenderMiddleware/getEmailSenderMiddleware";
import getGraphQLMiddleware from "../../middlewares/getGraphQLMiddleware/getGraphQLMiddleware";
import getJsonBodyParserMiddleware from "../../middlewares/getJsonBodyParserMiddleware/getJsonBodyParserMiddleware";
import getJsonRedisClientMiddleware from "../../middlewares/getJsonRedisClientMiddleware/getJsonRedisClientMiddleware";
import getDatabaseClientMiddleware from "../../middlewares/getPostgreSQLClientMiddleware/getPostgreSQLClientMiddleware";
import getRedisClientMiddleware from "../../middlewares/getRedisClientMiddleware/getRedisClientMiddleware";
import getSendWithValidFormatMiddleware from "../../middlewares/getSendWithValidFormatMiddleware/getSendWithValidFormatMiddleware";
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
  instance.use(getEmailSenderMiddleware());
  instance.use(getRedisClientMiddleware());
  instance.use(getJsonRedisClientMiddleware());
  instance.use(getSendWithValidFormatMiddleware());
};

export default applyMiddlewares;
