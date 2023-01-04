import { Post } from "@prisma/postgresql";
import { NextFunction } from "express";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import Response from "../../../types/response/response";
import { AddPostHandler } from "./addPostHandler";

type AddPostHandlerErrorCodes = {
  response: Response;
  next: NextFunction;
  data: AddPostHandler;
};

const addPostHandlerErrorCodes = async ({
  response,
  next,
  data: { brief /*, content,*/, ...rest },
}: AddPostHandlerErrorCodes): Promise<void> => {
  try {
    const { id, ...postData }: Post = await postgreSQLClient.post.create({
      data: {
        ...rest,
        isDisabled: false,
        brief: brief || "",
        /*content: {
          createMany: {
            data: content as unknown as PostContentItem[],
          },
        },*/
      },
    });
    natsClient.publish(`post.add.${id}`, jsonCodec.encode({ id, ...postData }));
  } catch {
    response.sendStatus(400);
    return next();
  }
};
export default addPostHandlerErrorCodes;
