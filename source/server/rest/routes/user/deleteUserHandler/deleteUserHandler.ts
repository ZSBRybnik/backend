import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import deleteUserHandlerValidator from "../../../validators/userValidators/deleteUserHandlerValidator/deleteUserHandlerValidator";

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags:
 *       - User endpoints
 *     description: Delete user endpoint.
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

const { handler: deleteUserHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      params: { id },
      postgreSQLClient,
      verifyToken,
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    try {
      const parsedId: number = parseInt(id);
      const validator = deleteUserHandlerValidator();
      try {
        await validator.validate(
          { id: parsedId },
          { strict: true, abortEarly: true },
        );
      } catch (e) {
        response.sendStatus(400);
        return next();
      }
      verifyToken();
      await postgreSQLClient.user.delete({
        where: { id: parsedId },
      });
      response.sendStatus(200);
    } catch {
      response.sendStatus(404);
    }
  },
});

export default deleteUserHandler;
