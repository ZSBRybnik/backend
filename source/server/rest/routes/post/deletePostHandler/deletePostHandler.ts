import { Post, Prisma } from "@prisma/client";

import Redis from "ioredis";
import JSONCache from "redis-json";
import Request from "~server/rest/types/request/request";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";

const redis = new Redis();
const jsonRedis = new JSONCache(redis);

const { handler: deletePostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request,
    response,
  }: RawHandlerArguments): Promise<void> => {
    const {
      params: { id },
      postgreSQLClient,
    }: Request = request;
    try {
      const redisDelete: Promise<Post> = jsonRedis.del(`post-${id}`);
      const databaseDelete: Prisma.Prisma__PostClient<Post> =
        postgreSQLClient.post.delete({
          where: { id: parseInt(id) },
        });
      await Promise.all([redisDelete, databaseDelete]);
      response.sendStatus(200);
    } catch {
      response.sendStatus(404);
    }
  },
});

export default deletePostHandler;
