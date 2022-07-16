import { Application, NextFunction, Response } from "express";
import Request from "~server/rest/types/request/request";
import {
  CreateHandler,
  CreateHandlerArguments,
  CreateHandlerOutput,
} from "./createHandler.types";

const createHandler: CreateHandler = ({
  rawHandler,
}: CreateHandlerArguments): CreateHandlerOutput => {
  const handler: Application = (async (
    request: Request,
    response: Response,
    next: NextFunction,
    // eslint-disable-next-line max-params
  ): Promise<void> => {
    await rawHandler({ response, request, next });
  }) as Application;
  return {
    handler,
  };
};

export default createHandler;