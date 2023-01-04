import { Application, NextFunction } from "express";
import Request from "~backend/source/server/rest/types/request/request";
import Response from "~backend/source/server/rest/types/response/response";
import {
  CreateHandler,
  CreateHandlerArguments,
  CreateHandlerOutput,
} from "./createHandler.types";

const createHandler: CreateHandler = ({
  rawHandler,
  defaultSuccessfullStatusCode = 200,
}: CreateHandlerArguments): CreateHandlerOutput => {
  const handler: Application = (async (
    request: Request,
    response: Response,
    next: NextFunction,
    // eslint-disable-next-line max-params
  ): Promise<void> => {
    await rawHandler({ response, request, next });
    !response.headersSent &&
      defaultSuccessfullStatusCode &&
      response.sendStatus(defaultSuccessfullStatusCode);
  }) as Application;
  return {
    handler,
  };
};

export default createHandler;
