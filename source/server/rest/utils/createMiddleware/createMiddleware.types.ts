import { NextFunction, Response } from "express";
import Request from "~server/rest/types/request/request";

export type JSONTypes = string | number | boolean | null;

export type RawMiddlewareGeneric = {
  body?: Record<string, JSONTypes | Record<string, JSONTypes> | JSONTypes[]>;
};

export type RawMiddlewareArguments<T = void | RawMiddlewareGeneric> = {
  request: Request<T>;
  response: Response;
  next: NextFunction;
};

export type RawMiddleware = (argument: RawMiddlewareArguments) => Promise<void>;

export type Middleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;

export type CreateMiddlewareArguments = {
  rawMiddleware: RawMiddleware;
};

export type CreateMiddlewareOutput = {
  middleware: Middleware;
};

export type CreateMiddleware = (
  argument: CreateMiddlewareArguments,
) => CreateMiddlewareOutput;
