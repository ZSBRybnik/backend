import { NextFunction } from "express";
import Response from "../../../types/response/response";
import getPageHandlerValidator from "../../../validators/pageValidators/getPageHandlerValidator/getPageHandlerValidator";
import { AddPageHandlerBody } from "../addPageHandler/addPageHandler";

type ValidateGetPageHandlerArguments = {
  validationData: Pick<AddPageHandlerBody, "name">;
  response: Response;
  next: NextFunction;
};

const validateGetPageHandler = async ({
  validationData,
  response,
  next,
}: ValidateGetPageHandlerArguments) => {
  const validator = getPageHandlerValidator();
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
export default validateGetPageHandler;
