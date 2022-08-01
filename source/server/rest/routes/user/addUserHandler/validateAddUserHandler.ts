import { NextFunction } from "express";
import Response from "../../../types/response/response";
import addUserHandlerValidator from "../../../validators/userValidators/addUserHandlerValidator/addUserHandlerValidator";
import { AddUserHandlerBody } from "./addUserHandler";

type ValidateAddUserHandlerArguments = {
  response: Response;
  next: NextFunction;
  data: AddUserHandlerBody;
};

const validateAddUserHandler = async ({
  response,
  next,
  data: { login, role, email, phoneNumber, enabledTwoFactorAuthentication },
}: ValidateAddUserHandlerArguments) => {
  const validator = addUserHandlerValidator();
  try {
    await validator.validate(
      { login, role, email, phoneNumber, enabledTwoFactorAuthentication },
      { strict: true, abortEarly: true },
    );
  } catch {
    response.sendStatus(400);
    return next();
  }
};
export default validateAddUserHandler;
