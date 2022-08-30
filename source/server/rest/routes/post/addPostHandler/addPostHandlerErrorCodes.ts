import { NextFunction } from "express";
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
    await postgreSQLClient.post.create({
      data: { ...rest, content, brief: brief || content.slice(0, 150) },
    });
  } catch {
    response.sendStatus(400);
    return next();
  }
};
export default addPostHandlerErrorCodes;
