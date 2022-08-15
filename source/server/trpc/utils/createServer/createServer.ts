import { DefaultErrorShape, LegacyRouter, router } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import applyRoutes from "../applyRoutes/applyRoutes";

const createServer = () => {
  const server = router<unknown, OpenApiMeta>() as LegacyRouter<
    unknown,
    OpenApiMeta<Record<string, any>>,
    Record<string | number | symbol, never>,
    Record<string | number | symbol, never>,
    Record<string | number | symbol, never>,
    DefaultErrorShape
  >;
  return applyRoutes({ instance: server });
};

export default createServer;
