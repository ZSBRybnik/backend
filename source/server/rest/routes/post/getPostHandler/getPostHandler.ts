import { Post } from "@prisma/client";

import createHandler from "../../../utils/createHandler/createHandler";

import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";

const getPostHandler = createHandler({
  rawHandler: async ({
    request: {
      params: { id },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
  }: RawHandlerArguments): Promise<void> => {
    const post: Omit<Post, "id"> = await jsonRedisClient.get(`post-${id}`);
    if (post) {
      response.json(post);
    } else {
      const databasePost: Omit<Post, "id"> | null =
        await postgreSQLClient.post.findUnique({
          where: { id: parseInt(id) },
          select: { title: true, author: true, content: true },
        });
      if (databasePost) {
        response.json(databasePost);
        jsonRedisClient.set(`post-${id}`, databasePost);
      } else {
        response.sendStatus(404);
      }
    }
  },
});

export default getPostHandler;
