import Gun from "gun";
import { serve, setup } from "swagger-ui-express";
import { generateOpenApiDocument } from "trpc-openapi";
import getCorsMiddleware from "../../middlewares/getCorsMiddleware/getCorsMiddleware";
import getEmailSenderMiddleware from "../../middlewares/getEmailSenderMiddleware/getEmailSenderMiddleware";
import getGraphQLMiddleware from "../../middlewares/getGraphQLMiddleware/getGraphQLMiddleware";
import getJsonBodyParserMiddleware from "../../middlewares/getJsonBodyParserMiddleware/getJsonBodyParserMiddleware";
import getJsonRedisClientMiddleware from "../../middlewares/getJsonRedisClientMiddleware/getJsonRedisClientMiddleware";
import getDatabaseClientMiddleware from "../../middlewares/getPostgreSQLClientMiddleware/getPostgreSQLClientMiddleware";
import getRedisClientMiddleware from "../../middlewares/getRedisClientMiddleware/getRedisClientMiddleware";
import getSendWithValidFormatMiddleware from "../../middlewares/getSendWithValidFormatMiddleware/getSendWithValidFormatMiddleware";
import getTrpcMiddleware, {
  appRouter,
} from "../../middlewares/getTrpcMiddleware/getTrpcMiddleware";
import getTrpcOpenApiMiddleware from "../../middlewares/getTrpcOpenApiMiddleware/getTrpcOpenApiMiddleware";
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
  instance.use("/trpc", getTrpcMiddleware());
  instance.use("/open-api/trpc", getTrpcOpenApiMiddleware());
  instance.use((Gun as any).serve);
  instance.use(
    "/swagger/trpc",
    serve,
    setup(
      generateOpenApiDocument(appRouter, {
        title: "tRPC ZSB Rybnik",
        version: "1.0.0",
        baseUrl: "http://localhost:3000/trpc",
      }),
    ),
  );
  instance.use(
    "/swagger/rest",
    serve,
    setup(
      {},
      {
        swaggerOptions: {
          url: "http://localhost:3000/",
        },
      },
    ),
  );
};

export default applyMiddlewares;
