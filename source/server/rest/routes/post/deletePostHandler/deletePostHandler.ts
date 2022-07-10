import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Redis from "ioredis";
import JSONCache from "redis-json";

const databaseClient = new PrismaClient();
const redis = new Redis();
const jsonRedis = new JSONCache(redis);

const deletePostHandler = async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const redisDelete = jsonRedis.del(`post-${id}`);
    const databaseDelete = databaseClient.post.delete({
      where: { id: parseInt(id) },
    });
    await Promise.all([redisDelete, databaseDelete]);
    response.sendStatus(200);
  } catch {
    response.sendStatus(404);
  }
};

export default deletePostHandler;
