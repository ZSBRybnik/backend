import JSONCache from "redis-json";

type GetFromJsonRedisClientArguments = {
  instance: JSONCache;
  key: string;
};

const getFromJsonRedisClient = async <T extends object>({
  instance,
  key,
}: GetFromJsonRedisClientArguments): Promise<T> => {
  return instance.get(key) as Promise<T>;
};

export default getFromJsonRedisClient;
