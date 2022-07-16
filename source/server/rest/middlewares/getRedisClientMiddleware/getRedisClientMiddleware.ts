import redisClient from "~server/clients/redisClient/redisClient";
import createMiddleware from "../../utils/createMiddleware/createMiddleware";
import {
  CreateMiddlewareOutput,
  RawMiddlewareArguments,
} from "../../utils/createMiddleware/createMiddleware.types";

const getRedisClientMiddleware = () => {
  const { middleware: redisClientMiddleware }: CreateMiddlewareOutput =
    createMiddleware({
      rawMiddleware: async ({
        request,
        next,
      }: RawMiddlewareArguments): Promise<void> => {
        request.redisClient = redisClient;
        next();
      },
    });
  return redisClientMiddleware;
};

export default getRedisClientMiddleware;
