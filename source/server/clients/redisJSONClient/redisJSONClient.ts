import JSONCache from "redis-json";
import redis from "../redisClient/redisClient";

const jsonRedis: JSONCache = new JSONCache(redis);

export default jsonRedis;
