import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import getPageHandlerErrorCodes from "./getPageHandlerErrorCodes";
import validateGetPageHandler from "./validateGetPageHandler";

const { handler: getPageHandler } = createHandler({
  rawHandler: async ({
    request: {
      jsonRedisClient,
      params: { name },
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    await validateGetPageHandler({ response, next, validationData: { name } });
    await getPageHandlerErrorCodes({
      request: { jsonRedisClient },
      response,
      next,
      where: { name },
    });
  },
});

export default getPageHandler;
