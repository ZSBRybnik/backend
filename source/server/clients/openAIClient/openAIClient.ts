import { OpenAI } from "langchain";
//import { RedisCache } from "langchain/cache";
//import type { RedisClientType } from "redis";
//import redisClient from "../redisClient/redisClient";

/*const openAIRedisCache: RedisCache = new RedisCache(
  redisClient as RedisClientType,
);*/
const openAIClient: OpenAI = new OpenAI({
  temperature: 0,
  //cache: openAIRedisCache,
});

export default openAIClient;
