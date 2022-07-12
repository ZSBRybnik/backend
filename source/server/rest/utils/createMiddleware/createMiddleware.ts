import {
  Application,
  NextFunction,
  Request as RequestBase,
  Response,
} from "express";
import Request from "~server/rest/types/request/request";
import {
  CreateMiddleware,
  CreateMiddlewareArguments,
  CreateMiddlewareOutput,
} from "./createMiddleware.types";

const createMiddleware: CreateMiddleware = ({
  rawMiddleware,
}: CreateMiddlewareArguments): CreateMiddlewareOutput => {
  const middleware: Application = ((
    request: RequestBase,
    response: Response,
    next: NextFunction,
    // eslint-disable-next-line max-params
  ): (() => Promise<void>) => {
    return async (): Promise<void> => {
      const fixedRequest: Request = request as Request;
      await rawMiddleware({ response, request: fixedRequest, next });
    };
  }) as Application;
  return {
    middleware,
  };
};

export default createMiddleware;
