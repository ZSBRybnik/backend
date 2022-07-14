import { Application, NextFunction, Response } from "express";
import Request from "~server/rest/types/request/request";

export type JSONTypes = string | number | boolean | null;

export type RawHandlerGeneric = {
  body?: Record<string, JSONTypes | Record<string, JSONTypes> | JSONTypes[]>;
};

export type RawHandlerArguments<T = void | RawHandlerGeneric> = {
  request: Request<T>;
  response: Response;
  next: NextFunction;
};

export type RawHandler = (argument: RawHandlerArguments) => Promise<void>;

export type Handler = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;

export type CreateHandlerArguments = {
  rawHandler: RawHandler;
};

export type CreateHandlerOutput = {
  handler: Application;
};

export type CreateHandler = (
  argument: CreateHandlerArguments,
) => CreateHandlerOutput;
