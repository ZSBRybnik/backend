import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction } from "express";
import postgreSQLClient from "~server/clients/postgreSQLClient/postgreSQLClient";
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
      const { code } = error;
      if (code === "P2002") {
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
