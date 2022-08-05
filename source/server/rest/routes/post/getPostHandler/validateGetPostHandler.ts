import { Post } from "@prisma/client";
import { NextFunction } from "express";
import Response from "../../../types/response/response";
import getPostHandlerValidator from "../../../validators/postValidators/getPostHandlerValidator/getPostHandlerValidator";

type ValidateGetPostHandler = {
  validationData: Pick<Post, "id">;
  response: Response;
  next: NextFunction;
};

const validateGetPostHandler = async ({
  validationData,
  response,
  next,
}: ValidateGetPostHandler): Promise<void> => {
  const validator = getPostHandlerValidator();
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
export default validateGetPostHandler;
