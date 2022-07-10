import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import Request from "~server/rest/types/request/request";

const getDatabaseClientMiddleware = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    request.postgreSQLClient = new PrismaClient();
    next();
  };
};
export default getDatabaseClientMiddleware;
