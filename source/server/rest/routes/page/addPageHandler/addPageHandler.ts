import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import addPageHandlerErrorCodes from "./addPageHandlerErrorCodes";
import validateAddPageHandler from "./validateAddPageHandler";

/**
 * @openapi
 * components:
 *   schemas:
 *     addPage:
 *       type: object
 *       required:
 *         - name
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id
 *         name:
 *           type: string
 *           description: Page name
 *         title:
 *           type: string
 *           description: Page title
 *         content:
 *           type: string
 *           description: Page content
 *       example:
 *         name: Your unique page Name
 *         title: Title of the page
 *         content: sample of content
 */

/**
 * @openapi
 * /page:
 *   post:
 *     summary: Add new page
 *     tags:
 *       - Page endpoints
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *             $ref: '#/components/schemas/addPage'
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

export type AddPageHandlerBody = {
  name: string;
  title: string;
  content: string;
};

const { handler: addPageHandler }: CreateHandlerOutput = createHandler({
  defaultSuccessfullStatusCode: 201,
  rawHandler: async ({
    request: {
      body: { name, title, content },
    },
    response,
    next,
  }: RawHandlerArguments<{ body: AddPageHandlerBody }>): Promise<void> => {
    await validateAddPageHandler({
      response,
      next,
      validationData: { name, title, content },
    });
    await addPageHandlerErrorCodes({
      response,
      next,
      data: { name, title, content },
    });
  },
});

export default addPageHandler;
