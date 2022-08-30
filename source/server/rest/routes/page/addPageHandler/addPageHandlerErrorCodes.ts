import { NextFunction } from "express";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import Response from "../../../types/response/response";
import { AddPageHandlerBody } from "./addPageHandler";

type AddPageHandlerErrorCodes = {
  response: Response;
  next: NextFunction;
  data: AddPageHandlerBody;
};

const addPageHandlerErrorCodes = async ({
  response,
  next,
  data,
}: AddPageHandlerErrorCodes): Promise<void> => {
  try {
    await postgreSQLClient.page.create({
      data,
    });
  } catch {
    response.sendStatus(404);
    return next();
  }
};
export default addPageHandlerErrorCodes;
