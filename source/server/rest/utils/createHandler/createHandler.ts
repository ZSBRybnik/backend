import { NextFunction, Response } from "express";

import Request from "~server/rest/types/request/request";

import { CreateHandlerArguments } from "./createHandler.types";

const createHandler = ({ rawHandler }: CreateHandlerArguments) => {
  const handler = async (
    request: Request,
    response: Response,
    next: NextFunction,
    // eslint-disable-next-line max-params
  ) => {
    await rawHandler({ response, request, next });
  };
  return {
    handler,
  };
};

export default createHandler;
