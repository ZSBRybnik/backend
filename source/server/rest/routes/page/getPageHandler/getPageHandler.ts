import { Page } from "@prisma/client";
import xml from "xml";
import contentTypes from "../../../constants/contentTypes/contentTypes";
import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import getPageHandlerValidator from "../../../validators/pageValidators/getPageHandlerValidator/getPageHandlerValidator";

const contentTypeHeaderName: "Content-Type" = "Content-Type" as const;

const { handler: getPageHandler } = createHandler({
  rawHandler: async ({
    request: {
      postgreSQLClient,
      jsonRedisClient,
      params: { name },
      headers: { "content-type": contentType = "" },
    },
    response,
    next,
  }: // eslint-disable-next-line sonarjs/cognitive-complexity
  RawHandlerArguments): Promise<void> => {
    const validator = getPageHandlerValidator();
    try {
      await validator.validate({ name }, { strict: true, abortEarly: true });
    } catch {
      response.sendStatus(400);
      return next();
    }
    const page = await jsonRedisClient.get(`page-${name}`);
    if (page) {
      if (contentTypes.xml.includes(contentType)) {
        response.header(contentTypeHeaderName, contentType);
        response.send(xml(page));
      } else {
        response.json(page);
      }
    } else {
      const databasePage: Pick<Page, "content" | "title" | "id"> | null =
        await postgreSQLClient.page.findUnique({
          where: { name },
          select: { content: true, title: true, id: true },
        });
      if (databasePage) {
        await jsonRedisClient.set(`pages-${name}`, databasePage);
        response.sendWithValidFormat({ data: databasePage, contentType });
      } else {
        response.sendStatus(404);
      }
    }
  },
});

export default getPageHandler;
