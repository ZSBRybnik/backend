import ioRedisClient from "~backend/source/server/clients/ioRedisClient/ioRedisClient";
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
        request.redisClient = ioRedisClient;
        next();
      },
    });
  return redisClientMiddleware;
};

export default getRedisClientMiddleware;
