import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import deletePageHandlerErrorCodes from "./deletePageHandlerErrorCodes";
import validateDeletePageHandler from "./validateDeletePageHandler";

/**
 * @openapi
 * /page/{name}:
 *   delete:
 *     summary: Delete page by name
 *     tags:
 *       - Page endpoints
 *     description: Delete page endpoint.
 *     parameters:
 *     - in: path
 *       name: name
 *       schema:
 *         type: string
 *       required: true
 *       description: Page name
 *     responses:
 *       '200':
 *         description: Ok.
 *       '500':
 *         description: Failed delete page.
 *       '401':
 *         description: Unauthorized.
 *       '400':
 *         description: Bad request.
 */

const { handler: deletePageHandler } = createHandler({
  rawHandler: async ({
    request,
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    const {
      params: { name },
    } = request;
    await validateDeletePageHandler({
      response,
      next,
      validationData: { name },
    });
    await deletePageHandlerErrorCodes({
      response,
      next,
      where: { name },
      request,
    });
  },
});
export default deletePageHandler;
