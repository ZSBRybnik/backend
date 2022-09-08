import { PrismaClientOptions } from "@prisma/client/runtime";
import { Prisma, PrismaClient } from "@prisma/mongodb";

const mongoDBClient: PrismaClient<
  PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
> = new PrismaClient();

export default mongoDBClient;
