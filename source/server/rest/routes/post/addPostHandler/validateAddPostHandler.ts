import { NextFunction } from "express";
import Response from "../../../types/response/response";
import addPostHandlerValidator from "../../../validators/postValidators/addPostHandlerValidator/addPostHandlerValidator";
import { AddPostHandler } from "./addPostHandler";

type ValidateAddPostHandler = {
  response: Response;
  next: NextFunction;
  validationData: Pick<AddPostHandler, "title" | "authorId" | "content">;
};

const validateAddPostHandler = async ({
  response,
  next,
  validationData,
}: ValidateAddPostHandler) => {
  const validator = addPostHandlerValidator();
  try {
    await validator.validate(validationData, {
      strict: true,
      abortEarly: true,
    });
  } catch {
    response.sendStatus(400);
    return next();
  }
};
export default validateAddPostHandler;
