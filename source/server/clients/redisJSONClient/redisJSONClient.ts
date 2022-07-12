import JSONCache from "redis-json";
import redis from "../redisClient/redisClient";

const redisJSONClient: JSONCache = new JSONCache(redis);

export default redisJSONClient;
