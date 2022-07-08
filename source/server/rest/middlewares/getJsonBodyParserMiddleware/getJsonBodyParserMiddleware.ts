import type { NextHandleFunction } from "connect";
import { json as jsonBodyParser } from "express";
import type { GetJsonBodyParserMiddleware } from "./getJsonBodyParserMiddleware.types";

const getJsonBodyParserMiddleware: GetJsonBodyParserMiddleware =
  (): NextHandleFunction => {
    return jsonBodyParser();
  };

export default getJsonBodyParserMiddleware;
