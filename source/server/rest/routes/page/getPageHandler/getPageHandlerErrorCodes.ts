import { Subpage } from "@prisma/postgresql";
import { NextFunction } from "express";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
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
    const databasePage: Pick<Subpage, "name"> | null =
      await postgreSQLClient.subpage.findUnique({
        where,
        select: { /*content: true, title: true, */ name: true },
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
