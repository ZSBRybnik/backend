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
  data: { brief, content, ...rest },
}: AddPostHandlerErrorCodes): Promise<void> => {
  try {
    const post = await postgreSQLClient.post.create({
      data: { ...rest, content, brief: brief || content.slice(0, 150) },
    });
    natsClient.publish("post.add", jsonCodec.encode(post));
  } catch {
    response.sendStatus(400);
    return next();
  }
};
export default addPostHandlerErrorCodes;
