import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~backend/source/server/rest/utils/createHandler/createHandler.types";
import addPostHandlerErrorCodes from "./addPostHandlerErrorCodes";
import validateAddPostHandler from "./validateAddPostHandler";

/**
 * @openapi
 * components:
 *   schemas:
 *     addPost:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *         - brief
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id
 *         title:
 *           type: string
 *           description: Post title
 *         content:
 *           type: string
 *           description: Post content
 *         author:
 *           type: string
 *           description: Post author
 *         brief:
 *           type: string
 *           description: Post brief
 *       example:
 *         title: Title of the post
 *         content: Random content
 *         author: Pieter Bruegel
 *         brief: Post brief
 */

/**
 * @openapi
 * /post:
 *   post:
 *     summary: Add new post
 *     tags:
 *       - Post endpoints
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *             $ref: '#/components/schemas/addPost'
 *     responses:
 *       '201':
 *         description: Created
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Failed create user.
 */

export type AddPostHandler = {
  title: string;
  author: string;
  content: string;
  brief?: string;
};

const { handler: addPostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { title, author, content, brief },
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: AddPostHandler;
  }>): Promise<void> => {
    validateAddPostHandler({
      response,
      next,
      validationData: { title, author, content },
    });
    await addPostHandlerErrorCodes({
      response,
      next,
      data: { title, author, content, brief },
    });
  },
});

export default addPostHandler;
