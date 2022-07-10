import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { Request as RequestBase } from "express";
import { RawHandlerGeneric } from "~server/rest/utils/createHandler/createHandler.types";

type Request<T = void> = Omit<RequestBase, "body"> & {
  postgreSQLClient: PrismaClient<
    PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  body: T extends RawHandlerGeneric ? T["body"] : RawHandlerGeneric["body"];
};

export default Request;
