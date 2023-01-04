import { Post } from "@prisma/postgresql";
import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import updatePostHandlerValidator from "../../../validators/postValidators/updatePostHandlerValidator/updatePostHandlerValidator";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdatePost:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         title:
 *           type: string
 *           description: Title to update
 *         content:
 *           type: string
 *           description: Content to update
 *         author:
 *           type: string
 *           description: Author to update
 *         brief:
 *           type: string
 *           description: Brief to update
 *       example:
 *         title: Title of the page
 *         content: sample of content
 *         author: Author of the page
 *         brief: Brief of the page
 */

/**
 * @openapi
 * /post/{id}:
 *   put:
 *     summary: Update post
 *     tags:
 *       - Post endpoints
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *             $ref: '#/components/schemas/UpdatePost'
 *        application/xml:
 *         schema:
 *             $ref: '#/components/schemas/UpdatePost'
 *     responses:
 *       '200':
 *         description: Success
 *       '204':
 *         description: Success without body.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Failed update page.
 *       '400':
 *         description: Bad request
 */
const { handler: updatePostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { title },
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
      await validator.validate({ title }, { strict: true, abortEarly: true });
    } catch {
      response.sendStatus(400);
      return next();
    }
    await postgreSQLClient.post.update({
      where: { id: parseInt(id) },
      data: { title },
    });
    const redisPost: Omit<Post, "id"> = await jsonRedisClient.get(`post-${id}`);
    if (redisPost) {
      await jsonRedisClient.set(`post-${id}`, { title });
    }
    response.sendStatus(200);
  },
});

export default updatePostHandler;
