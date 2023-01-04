import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { User } from "@prisma/postgresql";
import { NextFunction } from "express";
import loggerClient from "~backend/source/server/clients/loggerClient/loggerClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import Response from "../../../types/response/response";

type AddUserHandlerErrorCodes = {
  response: Response;
  next: NextFunction;
  data: Omit<User, "id">;
};

const addUserHandlerErrorCodes = async ({
  response,
  next,
  data,
}: AddUserHandlerErrorCodes) => {
  try {
    await postgreSQLClient.user.create({
      data,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const { code, message } = error;
      if (code === "P2002") {
        loggerClient.info(`AddUserHandler - ${message}`);
        response.sendStatus(409);
      } else if (code === "P2000") {
        response.sendStatus(413);
      }
    } else {
      response.sendStatus(500);
    }
    return next();
  }
};
export default addUserHandlerErrorCodes;
