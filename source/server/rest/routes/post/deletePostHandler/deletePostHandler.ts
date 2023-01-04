import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~backend/source/server/rest/utils/createHandler/createHandler.types";
import Request from "../../../types/request/request";
import deletePostHandlerErrorCodes from "./deletePostHandlerErrorCodes";
import validateDeletePostHandler from "./validateDeletePostHandler";

/**
 * @openapi
 * /post/{id}:
 *   delete:
 *     summary: Delete post by ID
 *     tags:
 *       - Post endpoints
 *     description: Delete post endpoint.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: number
 *       required: true
 *       description: Post name
 *     responses:
 *       '200':
 *         description: Ok.
 *       '500':
 *         description: Failed delete post.
 *       '401':
 *         description: Unauthorized.
 *       '400':
 *         description: Bad request.
 */

const { handler: deletePostHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request,
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    const {
      params: { id },
    }: Request = request;
    const parsedId: number = parseInt(id);
    await validateDeletePostHandler({
      validationData: { id: parsedId },
      response,
      next,
    });
    await deletePostHandlerErrorCodes({
      response,
      next,
      where: { id: parsedId },
      request,
    });
  },
});

export default deletePostHandler;
