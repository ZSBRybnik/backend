import { Post } from "@prisma/client";
import createHandler from "../../../utils/createHandler/createHandler";

import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";

const { handler: updatePostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { title, author, content },
      params: { id },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
  }: RawHandlerArguments<{
    body: Omit<Post, "id">;
  }>): Promise<void> => {
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
