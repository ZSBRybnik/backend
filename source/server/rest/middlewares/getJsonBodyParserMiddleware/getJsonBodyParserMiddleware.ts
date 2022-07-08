import { json as jsonBodyParser } from "express";

const getJsonBodyParserMiddleware = () => {
  return jsonBodyParser();
};

export default getJsonBodyParserMiddleware;
