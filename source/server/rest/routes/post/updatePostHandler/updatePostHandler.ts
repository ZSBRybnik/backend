import { Post } from "@prisma/client";
import createHandler from "../../../utils/createHandler/createHandler";

import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import updatePostHandlerValidator from "../../../validators/updatePostHandlerValidator/updatePostHandlerValidator";

const { handler: updatePostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { title, author, content },
      params: { id },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: Omit<Post, "id">;
  }>): Promise<void> => {
    const validator = updatePostHandlerValidator();
    try {
      await validator.validate(
        { title, author, content },
        { strict: true, abortEarly: true },
      );
    } catch {
      response.sendStatus(400);
      return next();
    }
    await postgreSQLClient.post.update({
      where: { id: parseInt(id) },
      data: { title, author, content },
    });
    const redisPost: Omit<Post, "id"> = await jsonRedisClient.get(`post-${id}`);
    if (redisPost) {
      await jsonRedisClient.set(`post-${id}`, { title, author, content });
    }
    response.sendStatus(200);
  },
});

export default updatePostHandler;
