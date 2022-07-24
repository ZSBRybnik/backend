import Roles from "~server/constants/roles/Roles";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import updateUserHandlerValidator from "../../../validators/userValidators/updateUserHandlerValidator/updateUserHandlerValidator";

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
        data: { login, role, email },
      });
      response.sendStatus(200);
    } catch {
      response.sendStatus(404);
    }
  },
});

export default updateUserHandler;
