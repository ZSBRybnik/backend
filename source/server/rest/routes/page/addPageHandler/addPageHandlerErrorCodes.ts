import { NextFunction } from "express";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";
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
    const page = await postgreSQLClient.page.create({
      data,
    });
    natsClient.publish("page.add", jsonCodec.encode(page));
  } catch {
    response.sendStatus(404);
    return next();
  }
};
export default addPageHandlerErrorCodes;
