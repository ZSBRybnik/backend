/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/no-unused-collection */
import { router } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { OpenApiMeta } from "trpc-openapi";
import { null as zodNull, number, object, string, union } from "zod";
import { gun } from "../..";
import postgreSQLClient from "../../../clients/postgreSQLClient/postgreSQLClient";

export const appRouter = router<unknown, OpenApiMeta>()
  .query("getPost", {
    //meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      id: number(),
    }),
    output: union([
      object({
        id: number(),
        title: string(),
        content: string(),
      }),
      zodNull(),
    ]),
    resolve: async ({ input: { id } }) => {
      const post = await postgreSQLClient.post.findUnique({
        where: { id },
        select: { title: true, content: true, id: true },
      });
      if (post) {
        await gun.get("posts").get(`${id}`).put(post);
      }
      return post;
    },
  })
  .query("getPage", {
    //meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      name: string(),
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
    resolve: async ({ input: { name } }) => {
      const page = await postgreSQLClient.page.findUnique({
        where: { name },
        select: { name: true, title: true, content: true, id: true },
      });
      if (page) {
        await gun.get("pages").get(name).put(page);
      }
      return page;
    },
  })
  .query("getPosts", {
    //meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      range: number(),
      skip: number(),
    }),
    resolve: ({ input: { range, skip } }) => {
      return postgreSQLClient.post.findMany({
        take: range,
        skip,
        select: { title: true, brief: true, id: true },
      });
    },
  })
  .mutation("deleteUser", {
    //meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      id: number(),
    }),
    output: union([
      object({
        id: number(),
        login: string(),
        role: string(),
      }),
      zodNull(),
    ]),
    resolve: ({ input: { id } }) => {
      return postgreSQLClient.user.delete({
        where: { id },
        select: {
          id: true,
          login: true,
          role: true,
        },
      });
    },
  });

export type AppRouter = typeof appRouter;

const getTrpcMiddleware = () => {
  return createExpressMiddleware({
    router: appRouter,
  });
};

export default getTrpcMiddleware;
