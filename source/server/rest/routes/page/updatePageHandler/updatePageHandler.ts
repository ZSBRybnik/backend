import { Subpage } from "@prisma/postgresql";
import createHandler from "../../../utils/createHandler/createHandler";
import {
  JSONTypes,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import updatePageHandlerErrorCodes from "./updatePageHandlerErrorCodes";
import validateUpdatePageHandler from "./validateUpdatePageHandler";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdatePage:
 *       type: object
 *       required:
 *         - name
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Title to update
 *         content:
 *           type: string
 *           description: Content to update
 *       example:
 *         title: Title of the page
 *         content: sample of content
 */

/**
 * @openapi
 * /page/{name}:
 *   put:
 *     summary: Update page
 *     tags:
 *       - Page endpoints
 *     parameters:
 *     - in: path
 *       name: name
 *       required: true
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *             $ref: '#/components/schemas/UpdatePage'
 *        application/xml:
 *         schema:
 *             $ref: '#/components/schemas/UpdatePage'
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

const { handler: updatePageHandler } = createHandler({
  defaultSuccessfullStatusCode: 204,
  rawHandler: async ({
    request: {
      body: { /*title, category,*/ content },
      params: { name },
      jsonRedisClient,
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: Omit<Subpage, "id"> & { content: JSONTypes[] };
  }>): Promise<void> => {
    const title = "";
    const category = "";
    await validateUpdatePageHandler({
      response,
      next,
      validationData: { title, category, content },
    });
    await updatePageHandlerErrorCodes({
      request: { jsonRedisClient },
      response,
      next,
      data: { title, category, content },
      where: { name },
    });
  },
});
export default updatePageHandler;
