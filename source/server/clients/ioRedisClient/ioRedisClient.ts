import Redis from "ioredis";

const ioRedisClient: Redis = new Redis({
  host: process.env.REDIS_HOST,
});

export default ioRedisClient;
