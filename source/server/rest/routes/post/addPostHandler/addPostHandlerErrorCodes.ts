import { NextFunction } from "express";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
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
    await mongoDBClient.post.create({
      data: post,
    });
  } catch {
    response.sendStatus(400);
    return next();
  }
};
export default addPostHandlerErrorCodes;
