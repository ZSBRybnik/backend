import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";
import { Request as RequestBase } from "express";
import Redis from "ioredis";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import JSONCache from "redis-json";
import { RawHandlerGeneric } from "~server/rest/utils/createHandler/createHandler.types";

type Request<T = void> = Omit<RequestBase, "body"> & {
  postgreSQLClient: PrismaClient<
    PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  redisClient: Redis;
  emailSenderClient: Transporter<SMTPTransport.SentMessageInfo>;
  jsonRedisClient: JSONCache;
  body: T extends RawHandlerGeneric ? T["body"] : RawHandlerGeneric["body"];
};

export default Request;