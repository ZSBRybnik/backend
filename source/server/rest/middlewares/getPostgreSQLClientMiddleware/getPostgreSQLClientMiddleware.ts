import { NextFunction, Request as RequestBase, Response } from "express";

import postgreSQLClient from "~server/clients/postgreSQLClient/postgreSQLClient";

import Request from "~server/rest/types/request/request";

const getPostgreSQLClientMiddleware = () => {
  return (
    request: RequestBase,
    response: Response,
    next: NextFunction,
    // eslint-disable-next-line max-params
  ): void => {
    const fixedRequest: Request = request as Request;
    fixedRequest.postgreSQLClient = postgreSQLClient;
    next();
  };
};
export default getPostgreSQLClientMiddleware;
