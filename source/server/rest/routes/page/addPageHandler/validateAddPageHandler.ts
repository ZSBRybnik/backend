import { NextFunction } from "express";
import Response from "../../../types/response/response";
import addPageHandlerValidator from "../../../validators/pageValidators/addPageHandlerValidator/addPageHandlerValidator";
import { AddPageHandlerBody } from "./addPageHandler";

type ValidateAddPageHandlerArguments = {
  response: Response;
  next: NextFunction;
  validationData: AddPageHandlerBody;
};

const validateAddPageHandler = async ({
  response,
  next,
  validationData,
}: ValidateAddPageHandlerArguments) => {
  const validator = addPageHandlerValidator();
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
export default validateAddPageHandler;
