import jsonRedisClient from "~backend/source/server/clients/redisJSONClient/redisJSONClient";
import createMiddleware from "../../utils/createMiddleware/createMiddleware";
import {
  CreateMiddlewareOutput,
  RawMiddlewareArguments,
} from "../../utils/createMiddleware/createMiddleware.types";

const getJsonRedisClientMiddleware = () => {
  const { middleware: jsonRedisClientMiddleware }: CreateMiddlewareOutput =
    createMiddleware({
      rawMiddleware: async ({
        request,
        next,
      }: RawMiddlewareArguments): Promise<void> => {
        request.jsonRedisClient = jsonRedisClient;
        next();
      },
    });
  return jsonRedisClientMiddleware;
};
export default getJsonRedisClientMiddleware;
