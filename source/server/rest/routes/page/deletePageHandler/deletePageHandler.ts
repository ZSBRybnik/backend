import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import deletePageHandlerErrorCodes from "./deletePageHandlerErrorCodes";
import validateDeletePageHandler from "./validateDeletePageHandler";

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
