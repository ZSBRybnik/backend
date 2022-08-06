import { Post, Prisma } from "@prisma/client";
import { NextFunction } from "express";
import Request from "../../../types/request/request";
import Response from "../../../types/response/response";

type DeletePostHandlerErrorCodes = {
  response: Response;
  next: NextFunction;
  where: Pick<Post, "id">;
  request: Request;
};

const deletePostHandlerErrorCodes = async ({
  response,
  next,
  where,
  request: { jsonRedisClient, postgreSQLClient },
}: DeletePostHandlerErrorCodes): Promise<void> => {
  try {
    const { id } = where;
    const redisDelete: Promise<Post> = jsonRedisClient.del(`post-${id}`);
    const databaseDelete: Prisma.Prisma__PostClient<Post> =
      postgreSQLClient.post.delete({
        where,
      });
    await Promise.all([redisDelete, databaseDelete]);
  } catch {
    response.sendStatus(404);
    return next();
  }
};
export default deletePostHandlerErrorCodes;
