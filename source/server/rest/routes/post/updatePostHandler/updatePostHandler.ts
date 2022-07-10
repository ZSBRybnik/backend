import { Post, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Redis from "ioredis";
import JSONCache from "redis-json";

const databaseClient = new PrismaClient();
const redis = new Redis();
const jsonRedis = new JSONCache(redis);

const updatePostHandler = async (request: Request, response: Response) => {
  const { title, author, content }: Omit<Post, "id"> = request.body;
  const { id } = request.params;
  await databaseClient.post.update({
    where: { id: parseInt(id) },
    data: { title, author, content },
  });
  const redisPost = await jsonRedis.get(`post-${id}`);
  if (redisPost) {
    await jsonRedis.set(`post-${id}`, { title, author, content });
  }
  response.sendStatus(200);
};

export default updatePostHandler;
