/* eslint-disable @typescript-eslint/ban-types */

import type { NextFunction, Response } from "express";
import type Request from "~server/rest/types/request/request";
import {
  CreateHandler,
  CreateHandlerArguments,
  CreateHandlerOutput,
} from "./createHandler.types";

const createHandler: CreateHandler = ({
  rawHandler,
}: CreateHandlerArguments): CreateHandlerOutput => {
  return {
    // eslint-disable-next-line max-params
    handler: (
      request: Request,
      response: Response,
      next: NextFunction,
    ): (() => Promise<void>) => {
      return async (): Promise<void> => {
        await rawHandler({ request, response, next });
      };
    },
  };
};

export default createHandler;
