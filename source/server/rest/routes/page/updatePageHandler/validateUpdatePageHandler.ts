import { NextFunction } from "express";
import Response from "../../../types/response/response";
import updatePageHandlerValidator from "../../../validators/pageValidators/updatePageHandlerValidator/updatePageHandlerValidator";
import { AddPageHandlerBody } from "../addPageHandler/addPageHandler";

type ValidateUpdatePageHandler = {
  response: Response;
  next: NextFunction;
  validationData: Omit<AddPageHandlerBody, "name">;
};

const validateUpdatePageHandler = async ({
  response,
  next,
  validationData,
}: ValidateUpdatePageHandler): Promise<void> => {
  const validator = updatePageHandlerValidator();
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
export default validateUpdatePageHandler;
