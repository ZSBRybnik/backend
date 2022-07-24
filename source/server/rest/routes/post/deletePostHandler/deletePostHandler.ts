import { Post, Prisma } from "@prisma/client";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import deletePostHandlerValidator from "../../../validators/postValidators/deletePostHandlerValidator/deletePostHandlerValidator";

const { handler: deletePostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      params: { id },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    const validator = deletePostHandlerValidator();
    try {
      await validator.validate({ id }, { strict: true, abortEarly: true });
    } catch {
      response.sendStatus(400);
      return next();
    }
    try {
      const redisDelete: Promise<Post> = jsonRedisClient.del(`post-${id}`);
      const databaseDelete: Prisma.Prisma__PostClient<Post> =
        postgreSQLClient.post.delete({
          where: { id: parseInt(id) },
        });
      await Promise.all([redisDelete, databaseDelete]);
      response.sendStatus(200);
    } catch {
      response.sendStatus(404);
    }
  },
});

export default deletePostHandler;
