import createHandler from "~server/rest/utils/createHandler/createHandler";
import {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import Request from "../../../types/request/request";
import deletePostHandlerErrorCodes from "./deletePostHandlerErrorCodes";
import validateDeletePostHandler from "./validateDeletePostHandler";

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
