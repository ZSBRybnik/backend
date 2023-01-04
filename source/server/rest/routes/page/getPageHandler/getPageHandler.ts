import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import getPageHandlerErrorCodes from "./getPageHandlerErrorCodes";
import validateGetPageHandler from "./validateGetPageHandler";

/**
 * @openapi
 * /page/{name}:
 *   get:
 *     summary: Get page by name
 *     tags:
 *       - Page endpoints
 *     description: Get page by name
 *     parameters:
 *     - in: path
 *       name: name
 *       schema:
 *         type: string
 *       required: true
 *       description: Page name
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Failed get user.
 */

const { handler: getPageHandler } = createHandler({
  rawHandler: async ({
    request: {
      jsonRedisClient,
      params: { name },
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    await validateGetPageHandler({ response, next, validationData: { name } });
    await getPageHandlerErrorCodes({
      request: { jsonRedisClient },
      response,
      next,
      where: { name },
    });
  },
});

export default getPageHandler;
