import { NextFunction, Response } from "express";
import postgreSQLClient from "~server/clients/postgreSQLClient/postgreSQLClient";
import Request from "~server/rest/types/request/request";

const getPostgreSQLClientMiddleware = () => {
  // eslint-disable-next-line max-params
  return (request: Request, _response: Response, next: NextFunction): void => {
    request.postgreSQLClient = postgreSQLClient;
    next();
  };
};
export default getPostgreSQLClientMiddleware;
