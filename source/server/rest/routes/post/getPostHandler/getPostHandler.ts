import { Post, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Redis from "ioredis";
import JSONCache from "redis-json";

const databaseClient = new PrismaClient();
const redis = new Redis();
const jsonRedis = new JSONCache(redis);

const getPostHandler = async (request: Request, response: Response) => {
  const { id } = request.params;
  const post: Omit<Post, "id"> = await jsonRedis.get(`post-${id}`);
  if (post) {
    response.json(post);
  } else {
    const databasePost = await databaseClient.post.findUnique({
      where: { id: parseInt(id) },
      select: { title: true, author: true, content: true },
    });
    if (databasePost) {
      response.json(databasePost);
      jsonRedis.set(`post-${id}`, databasePost);
    } else {
      response.sendStatus(404);
    }
  }
};

export default getPostHandler;
