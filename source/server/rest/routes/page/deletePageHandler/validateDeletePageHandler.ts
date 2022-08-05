import { NextFunction } from "express";
import Response from "../../../types/response/response";
import deletePageHandlerValidator from "../../../validators/pageValidators/deletePageHandlerValidator/deletePageHandlerValidator";
import { AddPageHandlerBody } from "../addPageHandler/addPageHandler";

type ValidateDeletePageHandlerArguments = {
  response: Response;
  next: NextFunction;
  validationData: Pick<AddPageHandlerBody, "name">;
};

const validateDeletePageHandler = async ({
  response,
  next,
  validationData,
}: ValidateDeletePageHandlerArguments) => {
  const validator = deletePageHandlerValidator();
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
export default validateDeletePageHandler;
