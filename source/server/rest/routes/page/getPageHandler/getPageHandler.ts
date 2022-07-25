import { Page } from "@prisma/client";
import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import getPageHandlerValidator from "../../../validators/pageValidators/getPageHandlerValidator/getPageHandlerValidator";

const { handler: getPageHandler } = createHandler({
  rawHandler: async ({
    request: {
      postgreSQLClient,
      jsonRedisClient,
      params: { name },
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    const validator = getPageHandlerValidator();
    try {
      await validator.validate({ name }, { strict: true, abortEarly: true });
    } catch {
      response.sendStatus(400);
      return next();
    }
    const page = await jsonRedisClient.get(`page-${name}`);
    if (page) {
      response.sendWithValidFormat({ data: page });
    } else {
      const databasePage: Pick<Page, "content" | "title" | "id"> | null =
        await postgreSQLClient.page.findUnique({
          where: { name },
          select: { content: true, title: true, id: true },
        });
      if (databasePage) {
        await jsonRedisClient.set(`pages-${name}`, databasePage);
        response.sendWithValidFormat({ data: databasePage });
      } else {
        response.sendStatus(404);
      }
    }
  },
});

export default getPageHandler;
