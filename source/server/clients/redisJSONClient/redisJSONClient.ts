import JSONCache from "redis-json";
import ioRedisClient from "../ioRedisClient/ioRedisClient";

const redisJSONClient: JSONCache = new JSONCache(ioRedisClient);

export default redisJSONClient;
