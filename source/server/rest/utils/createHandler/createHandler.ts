/* eslint-disable @typescript-eslint/ban-types */

import {
  Application,
  NextFunction,
  Request as RequestBase,
  Response,
} from "express";

import Request from "~server/rest/types/request/request";

import {
  CreateHandler,
  CreateHandlerArguments,
  CreateHandlerOutput,
} from "./createHandler.types";

const createHandler: CreateHandler = ({
  rawHandler,
}: CreateHandlerArguments): CreateHandlerOutput => {
  const handler: Application = ((
    request: RequestBase,
    response: Response,
    next: NextFunction,
    // eslint-disable-next-line max-params
  ): (() => Promise<void>) => {
    return async (): Promise<void> => {
      const fixedRequest: Request = request as Request;
      await rawHandler({ response, request: fixedRequest, next });
    };
  }) as Application;
  return {
    handler,
  };
};

export default createHandler;
