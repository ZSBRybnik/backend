import Redis from "ioredis";

const redisClient: Redis = new Redis({
  host: process.env.REDIS_ADDRESS,
});

export default redisClient;
