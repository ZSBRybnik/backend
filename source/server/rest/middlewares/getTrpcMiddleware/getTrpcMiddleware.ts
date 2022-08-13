import { router } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
//import superjson from "superjson";
import { OpenApiMeta } from "trpc-openapi";
import { number, object, string } from "zod";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
//const transformer = { serialize: () => {} };
export const appRouter = router<unknown, OpenApiMeta>()
  //.transformer(superjson)
  .mutation("post", {
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
  })
  .mutation("page", {
    meta: { openapi: { enabled: true, method: "POST", path: "/page" } },
    input: object({
      name: string(),
      title: string(),
      content: string(),
    }),
    output: object({
      id: number(),
      title: string(),
      content: string(),
      name: string(),
    }),
    resolve: ({ input: { name, title, content } }) => {
      return postgreSQLClient.page.create({
        data: { name, title, content },
      });
    },
  });
/* .query("page", {
    meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      id: number(),
    }),
    output: union([
      object({
        id: number(),
        title: string(),
        content: string(),
        name: string(),
      }),
      zodNull(),
    ]),
    resolve: ({ input: { id } }) => {
      return postgreSQLClient.page.findUnique({
        where: { id },
        select: { name: true, title: true, content: true, id: true },
      });
    },
  });*/

const getTrpcMiddleware = () => {
  return createExpressMiddleware({
    router: appRouter,
  });
};

export default getTrpcMiddleware;
