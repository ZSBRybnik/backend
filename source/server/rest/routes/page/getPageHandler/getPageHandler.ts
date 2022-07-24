/* eslint-disable sonarjs/no-duplicate-string */
import { Page } from "@prisma/client";
import { dump } from "js-yaml";
import { toPairs } from "lodash";
import xml from "xml";
import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";
import getPageHandlerValidator from "../../../validators/pageValidators/getPageHandlerValidator/getPageHandlerValidator";

const { handler: getPageHandler } = createHandler({
  rawHandler: async ({
    request: {
      postgreSQLClient,
      jsonRedisClient,
      params: { name },
      headers: { "content-type": contentType },
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
      if (contentType === "application/xml") {
        response.header("Content-Type", "application/xml");
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
        if (contentType === "application/xml") {
          response.header("Content-Type", "application/xml");
          response.send(
            xml(
              // tslint:disable-next-line:typedef
              toPairs(databasePage).map(([key, value]: any) => {
                return { [key]: value };
              }),
            ),
          );
        } else if (contentType === "application/yaml") {
          response.header("Content-Type", "application/yaml");
          response.send(dump(databasePage));
        } else {
          response.json(databasePage);
        }
      } else {
        response.sendStatus(404);
      }
    }
  },
});

export default getPageHandler;
