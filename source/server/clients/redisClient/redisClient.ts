import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_ADDRESS,
});

export default redisClient;
