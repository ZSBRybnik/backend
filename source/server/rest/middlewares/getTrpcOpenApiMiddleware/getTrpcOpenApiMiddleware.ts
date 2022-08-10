import { createOpenApiExpressMiddleware } from "trpc-openapi";
import { appRouter } from "../getTrpcMiddleware/getTrpcMiddleware";

const getTrpcOpenApiMiddleware = () => {
  return createOpenApiExpressMiddleware({
    router: appRouter,
  });
};

export default getTrpcOpenApiMiddleware;
