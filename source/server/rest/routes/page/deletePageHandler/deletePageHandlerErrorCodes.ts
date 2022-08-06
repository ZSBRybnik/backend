import { NextFunction } from "express";
import postgreSQLClient from "~root/source/server/clients/postgreSQLClient/postgreSQLClient";
import Request from "../../../types/request/request";
import Response from "../../../types/response/response";
import { AddPageHandlerBody } from "../addPageHandler/addPageHandler";

type DeletePageHandlerErrorCodes = {
  response: Response;
  next: NextFunction;
  where: Pick<AddPageHandlerBody, "name">;
  request: Request;
};

const deletePageHandlerErrorCodes = async ({
  response,
  next,
  where,
  request: { jsonRedisClient },
}: DeletePageHandlerErrorCodes) => {
  try {
    const redisDelete = jsonRedisClient.del(`page-${where}`);
    const postgreDelete = postgreSQLClient.page.delete({
      where,
    });
    await Promise.all([redisDelete, postgreDelete]);
  } catch {
    response.sendStatus(500);
    return next();
  }
};
export default deletePageHandlerErrorCodes;
