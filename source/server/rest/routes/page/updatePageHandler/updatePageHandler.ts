import { Page } from "@prisma/client";
import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import updatePageHandlerValidator from "../../../validators/pageValidators/updatePageHandlerValidator/updatePageHandlerValidator";

const { handler: updatePageHandler } = createHandler({
  rawHandler: async ({
    request: {
      body: { title, content },
      params: { name },
      postgreSQLClient,
      jsonRedisClient,
    },
    response,
    next,
  }: RawHandlerArguments<{ body: Omit<Page, "id"> }>): Promise<void> => {
    const validator = updatePageHandlerValidator();
    try {
      await validator.validate(
        { title, content },
        { strict: true, abortEarly: true },
      );
    } catch {
      response.sendStatus(400);
      return next();
    }
    await postgreSQLClient.page.update({
      where: { name },
      data: { title, content },
    });
    const redisPage = await jsonRedisClient.get(`page-${name}`);
    if (redisPage) {
      await jsonRedisClient.set(`page-${name}`, { name, title, content });
    }
    response.sendStatus(200);
  },
});
export default updatePageHandler;
