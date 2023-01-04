import { PrismaClientOptions } from "@prisma/client/runtime";
import { Prisma, PrismaClient } from "@prisma/postgresql";

const postgreSQLClient: PrismaClient<
  PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
> = new PrismaClient();

export default postgreSQLClient;
