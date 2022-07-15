import Roles from "~root/source/server/constants/roles/Roles";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import Request from "../../../types/request/request";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "../../../utils/createHandler/createHandler.types";
import updateUserHandlerValidator from "../../../validators/updateUserHandlerValidator/updateUserHandlerValidator";

type UpdateUserHandlerBody = {
  login: string;
  role: Roles;
  email: string;
};

const { handler: updateUserHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request,
    response,
    next,
  }: RawHandlerArguments<{
    body: UpdateUserHandlerBody;
  }>): Promise<void> => {
    const {
      params: { id },
      body: { login, role, email },
      postgreSQLClient,
    }: Request<{ body: UpdateUserHandlerBody }> = request;
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
    } catch (error) {
      console.error(error);
      response.sendStatus(404);
    }
  },
});

export default updateUserHandler;
