import { router } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { OpenApiMeta } from "trpc-openapi";
import { number, object, string } from "zod";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";

export const appRouter = router<unknown, OpenApiMeta>().mutation("post", {
  meta: { openapi: { enabled: true, method: "POST", path: "/post" } },
  input: object({
    title: string(),
    author: string(),
    content: string(),
    brief: string().optional(),
  }),
  output: object({
    id: number(),
    title: string(),
    author: string(),
    content: string(),
    brief: string().optional(),
  }),
  resolve: ({ input: { author, title, content, brief } }) => {
    return postgreSQLClient.post.create({
      data: { author, title, content, brief: brief || content.slice(0, 150) },
    });
  },
});

const getTrpcMiddleware = () => {
  return createExpressMiddleware({
    router: appRouter,
  });
};

export default getTrpcMiddleware;
