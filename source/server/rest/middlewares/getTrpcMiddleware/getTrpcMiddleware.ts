import { router } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { OpenApiMeta } from "trpc-openapi";
import { null as zodNull, number, object, string, union } from "zod";
import postgreSQLClient from "../../../clients/postgreSQLClient/postgreSQLClient";

export const appRouter = router<unknown, OpenApiMeta>()
  .mutation("addPost", {
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
  .mutation("addPage", {
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
    resolve: ({ input: { name } }) => {
      return postgreSQLClient.page.findUnique({
        where: { name },
        select: { name: true, title: true, content: true, id: true },
      });
    },
  })
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
        author: string(),
        brief: string(),
      }),
      zodNull(),
    ]),
    resolve: ({ input: { id } }) => {
      return postgreSQLClient.post.findUnique({
        where: { id },
        select: {
          author: true,
          title: true,
          content: true,
          id: true,
          brief: true,
        },
      });
    },
  })
  .mutation("updatePost", {
    //meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      id: number(),
      title: string(),
      content: string(),
      author: string(),
      brief: string(),
    }),
    output: union([
      object({
        id: number(),
        title: string(),
        content: string(),
        author: string(),
        brief: string(),
      }),
      zodNull(),
    ]),
    resolve: ({ input: { id, title, author, content, brief } }) => {
      return postgreSQLClient.post.update({
        where: { id },
        data: { title, author, content, brief },
        select: {
          title: true,
          author: true,
          content: true,
          id: true,
          brief: true,
        },
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
  })
  .mutation("updatePage", {
    //meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      id: number(),
      title: string(),
      content: string(),
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
    resolve: ({ input: { id, title, name, content } }) => {
      return postgreSQLClient.page.update({
        where: { id },
        data: { title, name, content },
        select: {
          id: true,
          title: true,
          name: true,
          content: true,
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
