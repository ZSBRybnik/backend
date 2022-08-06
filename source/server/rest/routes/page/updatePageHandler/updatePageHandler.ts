import { Page } from "@prisma/client";
import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import updatePageHandlerErrorCodes from "./updatePageHandlerErrorCodes";
import validateUpdatePageHandler from "./validateUpdatePageHandler";

const { handler: updatePageHandler } = createHandler({
  defaultSuccessfullStatusCode: 204,
  rawHandler: async ({
    request: {
      body: { title, content },
      params: { name },
      jsonRedisClient,
    },
    response,
    next,
  }: RawHandlerArguments<{ body: Omit<Page, "id"> }>): Promise<void> => {
    await validateUpdatePageHandler({
      response,
      next,
      validationData: { title, content },
    });
    await updatePageHandlerErrorCodes({
      request: { jsonRedisClient },
      response,
      next,
      data: { title, content },
      where: { name },
    });
  },
});
export default updatePageHandler;
