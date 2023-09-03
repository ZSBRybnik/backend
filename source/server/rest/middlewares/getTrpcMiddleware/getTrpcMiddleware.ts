/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable sonarjs/no-unused-collection */
import { router } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { number, object, string, union, null as zodNull } from "zod";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import { gun } from "../..";
import postgreSQLClient from "../../../clients/postgreSQLClient/postgreSQLClient";

export const appRouter = router()
  .query("getPost", {
    //meta: { openapi: { enabled: true, method: "GET", path: "/page" } },
    input: object({
      id: number(),
    }),
    output: union([
      object({
        id: number(),
        title: string(),
        content: object({
          runtime: string(),
          content: string(),
          id: number(),
        }).array(),
      }),
      zodNull(),
    ]),
    resolve: async ({ input: { id } }) => {
      const schemaCondition = {
        where: { id },
        select: {
          title: true,
          content: {
            select: {
              id: true,
              content: true,
              runtime: true,
            },
            where: { postId: id },
          },
          id: true,
        },
      };
      let post = null; // await mongoDBClient.post.findUnique(schemaCondition a);
      console.log(post);
      if (!post) {
        post = (await postgreSQLClient.post.findUnique(schemaCondition)) as any;
        console.log(post);
      }
      /*if (post) {
        await gun.get("posts").get(`${id}`).put(post);
      }*/
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
      const schemaCondition = {
        where: { name },
        select: { name: true, title: true, content: true, id: true },
      };
      let page = await mongoDBClient.page.findUnique(schemaCondition);
      if (!page) {
        page = await postgreSQLClient.subpage.findUnique(schemaCondition);
      }
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
        //role: string(),
      }),
      zodNull(),
    ]),
    resolve: ({ input: { id } }) => {
      return postgreSQLClient.user.delete({
        where: { id },
        select: {
          id: true,
          login: true,
          //role: true,
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
