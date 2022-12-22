import Gun from "gun";
import { serve, setup } from "swagger-ui-express";
import getCorsMiddleware from "../../middlewares/getCorsMiddleware/getCorsMiddleware";
import getEmailSenderMiddleware from "../../middlewares/getEmailSenderMiddleware/getEmailSenderMiddleware";
import getGraphQLMiddleware from "../../middlewares/getGraphQLMiddleware/getGraphQLMiddleware";
import getHelmetMiddleware from "../../middlewares/getHelmetMiddleware/getHelmetMiddleware";
import getJsonBodyParserMiddleware from "../../middlewares/getJsonBodyParserMiddleware/getJsonBodyParserMiddleware";
import getJsonRedisClientMiddleware from "../../middlewares/getJsonRedisClientMiddleware/getJsonRedisClientMiddleware";
import getDatabaseClientMiddleware from "../../middlewares/getPostgreSQLClientMiddleware/getPostgreSQLClientMiddleware";
import getRedisClientMiddleware from "../../middlewares/getRedisClientMiddleware/getRedisClientMiddleware";
import getSendWithValidFormatMiddleware from "../../middlewares/getSendWithValidFormatMiddleware/getSendWithValidFormatMiddleware";
import getSwaggerMiddleware from "../../middlewares/getSwaggerMiddleware/getSwaggerMiddleware";
import getTrpcMiddleware from "../../middlewares/getTrpcMiddleware/getTrpcMiddleware";
import getVerifyTokenMiddleware from "../../middlewares/getVerifyTokenMiddleware/getVerifyTokenMiddleware";

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
  instance.use(getVerifyTokenMiddleware());
  instance.use(getHelmetMiddleware());
  instance.use("/trpc", getTrpcMiddleware());
  instance.use((Gun as any).serve);
  instance.use("/swagger", serve, getSwaggerMiddleware());
  instance.use("/swagger/trpc", serve, setup());
};

export default applyMiddlewares;
