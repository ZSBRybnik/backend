import createHandler from "../../../utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import deleteUserHandlerValidator from "../../../validators/deleteUserHandlerValidator/deleteUserHandlerValidator";

const { handler: deleteUserHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      params: { id },
      postgreSQLClient,
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
