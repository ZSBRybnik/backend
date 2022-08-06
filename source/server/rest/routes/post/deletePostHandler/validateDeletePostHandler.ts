import { Post } from "@prisma/client";
import { NextFunction } from "express";
import Response from "../../../types/response/response";
import deletePostHandlerValidator from "../../../validators/postValidators/deletePostHandlerValidator/deletePostHandlerValidator";

type ValidateDeletePostHandler = {
  validationData: Pick<Post, "id">;
  response: Response;
  next: NextFunction;
};

const validateDeletePostHandler = async ({
  validationData,
  response,
  next,
}: ValidateDeletePostHandler): Promise<void> => {
  const validator = deletePostHandlerValidator();
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
export default validateDeletePostHandler;
