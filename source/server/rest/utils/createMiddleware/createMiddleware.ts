import { Application, NextFunction, Response } from "express";
import Request from "../../types/request/request";
import {
  CreateMiddleware,
  CreateMiddlewareArguments,
  CreateMiddlewareOutput,
} from "./createMiddleware.types";

const createMiddleware: CreateMiddleware = ({
  rawMiddleware,
}: CreateMiddlewareArguments): CreateMiddlewareOutput => {
  const middleware: Application = (async (
    request: Request,
    response: Response,
    next: NextFunction,
    // eslint-disable-next-line max-params
  ): Promise<void> => {
    await rawMiddleware({ response, request, next });
  }) as Application;
  return {
    middleware,
  };
};

export default createMiddleware;
