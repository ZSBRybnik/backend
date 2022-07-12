import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

type VerifyTokenArguments = {
  token: string;
  response: Response;
  next: NextFunction;
  catchCallback?: (error: unknown) => void;
};

type VerifyToken = (argument: VerifyTokenArguments) => void;

const verifyToken: VerifyToken = ({
  response,
  next,
  token,
  catchCallback,
}: VerifyTokenArguments): void => {
  try {
    verify(token, "zsbrybnik");
  } catch (error) {
    if (catchCallback) {
      catchCallback(error);
    } else {
      response.sendStatus(401);
      next();
    }
  }
};

export default verifyToken;
