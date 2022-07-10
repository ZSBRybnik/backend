import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { Request as RequestBase } from "express";
type Request = RequestBase & {
  postgreSQLClient: PrismaClient<
    PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};
export default Request;
