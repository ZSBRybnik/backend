import { Post } from "@prisma/client";
import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import validateGetPostHandler from "./validateGetPostHandler";

const { handler: getPostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      params: { id },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    const parsedId: number = parseInt(id);
    await validateGetPostHandler({
      response,
      next,
      validationData: { id: parsedId },
    });
    const post: Omit<Post, "id"> = await jsonRedisClient.get(`post-${id}`);
    if (post) {
      response.sendWithValidFormat({ data: post });
    } else {
      const databasePost: Omit<Post, "id" | "brief"> | null =
        await postgreSQLClient.post.findUnique({
          where: { id: parseInt(id) },
          select: { title: true, author: true, content: true },
        });
      if (databasePost) {
        await jsonRedisClient.set(`pages-${id}`, databasePost);
        response.sendWithValidFormat({ data: databasePost });
      } else {
        response.sendStatus(404);
      }
    }
  },
});

export default getPostHandler;
