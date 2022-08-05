import { Page } from "@prisma/client";
import { NextFunction } from "express";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import Request from "../../../types/request/request";
import Response from "../../../types/response/response";
import { AddPageHandlerBody } from "../addPageHandler/addPageHandler";

type GetPageHandlerErrorCodes = {
  request: Pick<Request, "jsonRedisClient">;
  where: Pick<AddPageHandlerBody, "name">;
  response: Response;
  next: NextFunction;
};

const getPageHandlerErrorCodes = async ({
  request: { jsonRedisClient },
  where,
  response,
  next,
}: GetPageHandlerErrorCodes): Promise<void> => {
  const page = await jsonRedisClient.get(`page-${where}`);
  if (page) {
    response.sendWithValidFormat({ data: page });
  } else {
    const databasePage: Pick<Page, "content" | "title" | "id"> | null =
      await postgreSQLClient.page.findUnique({
        where,
        select: { content: true, title: true, id: true },
      });
    if (databasePage) {
      await jsonRedisClient.set(`pages-${where}`, databasePage);
      response.sendWithValidFormat({ data: databasePage });
    } else {
      response.sendStatus(404);
      return next();
    }
  }
};
export default getPageHandlerErrorCodes;
