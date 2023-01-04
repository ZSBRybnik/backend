import Roles from "~backend/source/server/constants/roles/roles";
import createHandler from "~backend/source/server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import updateUserHandlerValidator from "../../../validators/userValidators/updateUserHandlerValidator/updateUserHandlerValidator";

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       required:
 *         - login
 *         - role
 *         - password
 *         - email
 *         - enabledTwoFactorAuthentication
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id
 *         login:
 *           type: string
 *           description: User login
 *         role:
 *           type: User role
 *           description: Post content
 *         password:
 *           type: string
 *           description: User password
 *         email:
 *           type: email
 *           description: User email
 *       example:
 *         login: RandomLogin
 *         role: administrator
 *         email: email@gmail.com
 */

/**
 * @openapi
 * /user/{id}:
 *   put:
 *     summary: Update page
 *     tags:
 *       - User endpoints
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *             $ref: '#/components/schemas/UpdateUser'
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

type UpdateUserHandlerBody = {
  login: string;
  role: Roles;
  email: string;
};

const { handler: updateUserHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      params: { id },
      body: { login, role, email },
      postgreSQLClient,
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: UpdateUserHandlerBody;
  }>): Promise<void> => {
    const validator = updateUserHandlerValidator();
    try {
      await validator.validate(
        { login, role, email },
        { strict: true, abortEarly: true },
      );
    } catch {
      response.sendStatus(400);
      return next();
    }
    try {
      await postgreSQLClient.user.update({
        where: { id: parseInt(id) },
        data: { login, email },
      });
      response.sendStatus(200);
    } catch {
      response.sendStatus(404);
    }
  },
});

export default updateUserHandler;
