import { Post, User } from "@prisma/postgresql";
import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import validateGetPostHandler from "./validateGetPostHandler";

/**
 * @openapi
 * /post/{id}:
 *   get:
 *     summary: Get post by name
 *     tags:
 *       - Post endpoints
 *     description: Get post by name
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: number
 *       required: true
 *       description: Post name
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Failed get user.
 */

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
      const parsedId = parseInt(id);
      const databasePost:
        | (Pick<Post, "title"> & {
            author: Pick<User, "login">;
            // content: Pick<ContentItem, "runtime">[];
          })
        | null = await postgreSQLClient.post.findUnique({
        where: { id: parsedId },
        select: {
          title: true,
          /*content: {
            select: {
              //content: true,
              runtime: true,
              id: true,
            },
            where: {
              postId: parsedId,
            },
          },*/
          author: {
            select: {
              login: true,
            },
          },
        },
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
